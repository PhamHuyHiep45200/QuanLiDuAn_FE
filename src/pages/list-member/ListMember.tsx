import React from "react";
import {
  Table,
  Avatar,
  Typography,
  Button,
  Tag,
  Row,
  Col,
  Statistic,
  Card,
  Popover,
  Modal,
  Form,
  Input,
} from "antd";
import { useLocation, useParams } from "react-router-dom";
import { getUserProject } from "../../services/user-project";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { getUserGroup } from "../../services/user-group";
import {
  TeamOutlined,
  DropboxOutlined,
  DeploymentUnitOutlined,
  PlusCircleOutlined,
  SettingFilled,
} from "@ant-design/icons";
import AddUser from "../../layout/layoutHome/modal/AddUser";
import PopupConfirm from "./PopupConfirm";
import moment from "moment";
import styles from "./index.module.scss";
import { updateDeleteProject, updateProject } from "../../services/project";
import { updateDeleteGroup, updateGoup } from "../../services/group";
import { CreateProviderProject } from "../../layout/layoutHome";
const { Text } = Typography;

function ListMember() {
  const { setRefesh } = React.useContext(CreateProviderProject);
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const { id }: any = useParams();
  const id_user = localStorage.getItem("id_user");

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [type, setType] = React.useState("");
  const [data, setData] = React.useState([]);
  const [user, setUser] = React.useState<any>();
  const [groupItem, setGroupItem] = React.useState<any>();

  const columnsProject = React.useMemo(
    () => [
      {
        title: "Tên",
        key: "name",
        render: (data: any) => (
          <div className="flex items-center">
            <Avatar
              src={data?.User?.thumbnail?.length > 0 && data?.User?.thumbnail}
            >
              {data?.User?.email?.split("")[0]}
            </Avatar>
            <Text className="block ml-[5px]">
              {data?.User?.firstName + " " + data?.User?.lastName}
            </Text>
          </div>
        ),
      },
      {
        title: "Email",
        dataIndex: ["User", "email"],
        key: "email",
      },
      {
        title: "Ngày sinh",
        render: (data) => (
          <div>{moment(data.birthday).format("YYYY/MM/DD")}</div>
        ),
        key: "email",
      },
      {
        title: "Quyền",
        key: "role",
        render: (data) => (
          <Text
            strong
            style={{ color: data?.role === "ADMIN" ? "red" : "blue" }}
          >
            {data?.role}
          </Text>
        ),
      },
      {
        title: "Nhóm",
        render: (data) => (
          <>
            {data?.User?.UserGroup?.map((da: any) => (
              <Tag color="green" key={da?.id}>
                {da?.Group?.name}
              </Tag>
            ))}
          </>
        ),
        key: "email",
      },
      {
        title: "Delete",
        key: "delete",
        render: (data) => <PopupConfirm data={data} refesh={getDataMember} />,
      },
    ],
    []
  );
  const columnsGroup = React.useMemo(
    () => [
      {
        title: "Tên",
        key: "name",
        render: (data: any) => (
          <div className="flex items-center">
            <Avatar
              src={data?.User?.thumbnail?.length > 0 && data?.User?.thumbnail}
            >
              {data?.User?.email?.split("")[0]}
            </Avatar>
            <Text className="block ml-[5px]">
              {data?.User?.firstName + " " + data?.User?.lastName}
            </Text>
          </div>
        ),
      },
      {
        title: "Email",
        dataIndex: ["User", "email"],
        key: "email",
      },
      {
        title: "Ngày sinh",
        render: (data) => (
          <div>{moment(data.birthday).format("YYYY/MM/DD")}</div>
        ),
        key: "email",
      },
      {
        title: "Quyền",
        key: "role",
        render: (data) => (
          <Text
            strong
            style={{ color: data?.role === "ADMIN" ? "red" : "blue" }}
          >
            {data?.role}
          </Text>
        ),
      },
      {
        title: "Delete",
        key: "delete",
        render: (data) => <PopupConfirm data={data} refesh={getDataMember} />,
      },
    ],
    []
  );
  const columnMember = React.useMemo(
    () => [
      {
        title: "Tên",
        key: "name",
        render: (data: any) => (
          <div className="flex items-center">
            <Avatar
              src={data?.User?.thumbnail?.length > 0 && data?.User?.thumbnail}
            >
              {data?.User?.email?.split("")[0]}
            </Avatar>
            <Text className="block ml-[5px]">
              {data?.User?.firstName + " " + data?.User?.lastName}
            </Text>
          </div>
        ),
      },
      {
        title: "Email",
        dataIndex: ["User", "email"],
        key: "email",
      },
      {
        title: "Ngày sinh",
        render: (data) => (
          <div>{moment(data.birthday).format("YYYY/MM/DD")}</div>
        ),
        key: "email",
      },
    ],
    []
  );
  React.useEffect(() => {
    getDataMember();
    if (localStorage.getItem("itemTask")) {
      localStorage.removeItem("itemTask");
    }
    localStorage.setItem("itemTask", id);
  }, [pathname]);

  const getDataMember = () => {
    if (pathname.split("/").includes("project")) {
      getUsersProject();
    } else {
      getUsersGroup();
    }
  };

  const getUsersProject = async () => {
    const response = await getUserProject(+id);
    setType("project");
    if (response.data.status === 200) {
      const listUser = response.data.data;
      const userLoop = listUser.find((e: any) => e.id == id_user);
      if (userLoop?.role === "ADMIN") {
        setUser(true);
      } else {
        setUser(false);
      }

      form.setFieldValue("name", response?.data?.list?.name);
      setData(response.data.data);
      setGroupItem(response.data.list.Group);
    } else {
      openCustomNotificationWithIcon("error", "get user", "get user error");
    }
  };

  const getUsersGroup = async () => {
    const response = await getUserGroup(+id);
    setType("group");
    if (response.data.status === 200) {
      const listUser = response.data.data;
      const userLoop = listUser.find((e: any) => e.id_user == id_user);
      console.log(listUser, id_user);

      if (userLoop?.role === "ADMIN") {
        setUser(true);
      } else {
        setUser(false);
      }
      form.setFieldValue("name", response?.data?.list?.name);
      setData(response.data.data);
      setGroupItem(response.data.list.Item);
    } else {
      openCustomNotificationWithIcon("error", "get user", "get user error");
    }
  };
  const onClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };
  const handleUpdate = async (value: any) => {
    setLoading(true);
    let response;
    if (type === "project") {
      response = await updateProject(+id, { name: value.name });
    } else {
      response = await updateGoup(+id, { name: value.name });
    }
    if (response?.data?.status === 200) {
      setLoading(false);
      onClose();
      setRefesh(response?.data);
      openCustomNotificationWithIcon("success", "Đổi tên", "Thành công");
    } else {
      openCustomNotificationWithIcon("error", "Đổi tên", "Thất bại");
      setLoading(false);
    }
  };
  const handleDelete = async () => {
    setLoading(true);
    let response;
    if (type === "project") {
      response = await updateDeleteProject(+id, { status: true });
    } else {
      response = await updateDeleteGroup(+id, { status: true });
    }
    if (response?.data?.status === 200) {
      onClose();
      setRefesh(response?.data);
      openCustomNotificationWithIcon("success", "Đổi tên", "Thành công");
      setLoading(false);
    } else {
      openCustomNotificationWithIcon("error", "Đổi tên", "Thất bại");
      setLoading(false);
    }
  };
  const content = () => (
    <div className="flex flex-col">
      <div
        className="py-[5px] px-5 hover:bg-[#f5f5f5] cursor-pointer"
        onClick={() => setOpenEdit(true)}
      >
        Sửa Tên
      </div>
      <div
        className="py-[5px] bg-[#ff5e5e] px-5 hover:bg-[#db3535] cursor-pointer text-[#fff]"
        onClick={() => setOpenDelete(true)}
      >
        Xóa
      </div>
    </div>
  );

  console.log(user);

  return (
    <div>
      <div className="text-center underline">
        <span className="text-[30px] text-[#444] font-bold">
          {type === "project" ? "Dự án:" : "Nhóm:"}
        </span>
        <span className="text-[red] text-[25px] font-bold ml-[5px]">
          {form.getFieldValue("name")}
        </span>
      </div>
      {user && (
        <>
          <Popover content={content} title={false} placement="bottomLeft">
            <SettingFilled className="my-5 text-[22px] cursor-pointer" />
          </Popover>
          <div className={styles.statistic}>
            <Row gutter={16}>
              <Col span={4}>
                <Card>
                  <Statistic
                    title={type === "project" ? "Nhóm" : "Giai đoạn"}
                    value={groupItem?.length}
                    prefix={
                      type === "project" ? (
                        <DropboxOutlined className="mb-[15px] !text-[green]" />
                      ) : (
                        <DeploymentUnitOutlined className="mb-[15px] !text-[#ff15ad]" />
                      )
                    }
                  />
                </Card>
              </Col>
              <Col span={4}>
                <Card>
                  <Statistic
                    title="Thành viên"
                    value={data?.length}
                    prefix={<TeamOutlined className="mb-[15px] !text-[blue]" />}
                  />
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
      <div>
        <div className="flex justify-between">
          <span className="text-[18px] text-[#666] font-bold border-b-[2px] border-[#666] h-[30px]">
            Danh sách nhân viên
          </span>
          <div className="text-right mb-5">
            {user && (
              <Button
                className="!rounded-[4px] !bg-[#5555da] !text-[#fff] ml-[20px]"
                onClick={() => setOpen(true)}
              >
                <div className="flex items-center">
                  <PlusCircleOutlined className="mr-2" />
                  user
                </div>
              </Button>
            )}
          </div>
        </div>
        {type === "project" && (
          <Table
            columns={user ? columnsProject : columnMember}
            dataSource={data}
          />
        )}
        {type === "group" && (
          <Table
            columns={user ? columnsGroup : columnMember}
            dataSource={data}
          />
        )}
        <AddUser
          open={open}
          setOpen={setOpen}
          type={pathname}
          refesh={getDataMember}
        />
      </div>
      <Modal footer={false} onCancel={onClose} title="Sửa Tên" open={openEdit}>
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          >
            <Input placeholder="Nhập tên muốn sửa" />
          </Form.Item>
          <div className="text-center">
            <Button htmlType="submit" type="primary" loading={loading}>
              Sửa
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal footer={false} onCancel={onClose} title="Xoá" open={openDelete}>
        <span>Bạn có chắc chán muốn xóa {form.getFieldValue("name")}</span>
        <div className="text-right">
          <Button onClick={onClose} className="mr-5">
            Hủy
          </Button>
          <Button
            onClick={handleDelete}
            danger
            type="primary"
            loading={loading}
          >
            Xóa
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default ListMember;
