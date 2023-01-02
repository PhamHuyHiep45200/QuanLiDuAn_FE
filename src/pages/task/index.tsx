import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingDashboard from "../../common/LoadingDashboard";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { getTaskAll } from "../../services/task";
import EmptyData from "./components/EmptyData";
import Tasks from "./components/Tasks";
import ModalEmpty from "./components/modal/ModalEmpty";
import { SettingFilled } from "@ant-design/icons";
import { Form, Popover, Select, Switch, Modal, Button, Input } from "antd";
import { updateDeleteItem, updateItem } from "../../services/item";
import { CreateProviderProject } from "../../layout/layoutHome";
import { getUserGroupItem } from "../../services/user-group";
const datas: any = [];
function Task() {
  const role = "USER";
  const { setRefesh } = React.useContext(CreateProviderProject);
  const id_user: any = localStorage.getItem("id_user");
  const { id }: any = useParams();
  const [form] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const [user, setUser] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [count, setCount] = useState<number>(0);
  const [params, setParams] = useState<any>();
  const [listUser, setListUser] = useState<Array<any>>([]);
  useEffect(() => {
    getTasks();
    getUser();
    if (localStorage.getItem("itemTask")) {
      localStorage.removeItem("itemTask");
    }
    localStorage.setItem("itemTask", id);
  }, [id, params]);
  const getUser = async () => {
    const response = await getUserGroupItem(+id);
    console.log(response);

    if (response?.data?.status == 200) {
      setListUser(response.data.data.Group.UserGroup);
    } else {
      openCustomNotificationWithIcon("error", "Lấy dữ liệu thành viên", "Lỗi");
    }
  };
  const getTasks = async () => {
    setLoading(true);
    const response = await getTaskAll(+id, params);
    if (response.data.status === 200) {
      setLoading(false);
      formEdit.setFieldValue("name", response?.data?.list?.name);
      const listUser = response.data.list.Group.UserGroup;
      const userLoop = listUser.find((e: any) => e.id == id_user);
      if (userLoop?.role === "ADMIN") {
        setUser(true);
      } else {
        setUser(false);
      }
      setData(response.data.data);
      setCount(response.data.count);
    } else {
      setLoading(false);
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };
  const onValuesChange = (value: any) => {
    const idUser: any = localStorage.getItem("id_user");
    if (value.id_user) {
      setParams({ ...params, id_user: +idUser });
    } else {
      const param = params;
      delete param[Object.keys(value)[0]];
      setParams({ ...params });
    }
  };
  const content = () => (
    <div className="flex flex-col">
      <div
        className="py-[5px] px-5 hover:bg-[#f5f5f5] cursor-pointer text-center"
        onClick={() => setOpenEdit(true)}
      >
        Sửa Tên
      </div>
      <div
        className="py-[5px] bg-[#ff5e5e] px-5 hover:bg-[#db3535] cursor-pointer text-[#fff] text-center"
        onClick={() => setOpenDelete(true)}
      >
        Xóa
      </div>
    </div>
  );
  const onClose = () => {
    setOpenEdit(false);
    setOpenDelete(false);
  };
  const handleUpdate = async (value: any) => {
    setLoadingEdit(true);
    const response = await updateItem(+id, { name: value.name });
    if (response?.data?.status === 200) {
      setRefesh(response.data);
      setLoadingEdit(false);
      onClose();
      openCustomNotificationWithIcon("success", "Đổi tên", "Thành công");
    } else {
      openCustomNotificationWithIcon("error", "Đổi tên", "Thất bại");
      setLoadingEdit(false);
    }
  };
  const handleDelete = async () => {
    setLoadingEdit(true);
    const response = await updateDeleteItem(+id, { status: true });
    if (response?.data?.status === 200) {
      onClose();
      setRefesh(response.data);
      openCustomNotificationWithIcon("success", "Đổi tên", "Thành công");
      setLoadingEdit(false);
    } else {
      openCustomNotificationWithIcon("error", "Đổi tên", "Thất bại");
      setLoadingEdit(false);
    }
  };
  const handleChangeUserTask = (e: any) => {
    console.log(e);

    setParams({ ...params, id_user: +e });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        {user ? (
          <Popover content={content} title={false} placement="bottomLeft">
            <SettingFilled className="my-5 text-[22px] cursor-pointer" />
          </Popover>
        ) : (
          <div></div>
        )}
        <Form
          initialValues={{ private: false, taskMe: false }}
          onValuesChange={onValuesChange}
          form={form}
        >
          <div className="flex items-center justify-end mb-5">
            {!user ? (
              <div className="flex items-center">
                <span className="mr-[5px]">task của tôi:</span>
                <Form.Item name="id_user" noStyle>
                  <Switch checked={form.getFieldValue("id_user")} />
                </Form.Item>
              </div>
            ) : (
              // {/* admin */}
              <div className="flex items-center">
                <span className="mr-[5px]">task của:</span>
                <Select
                  defaultValue={+id_user}
                  style={{ width: 120 }}
                  allowClear
                  options={listUser.map((users) => {
                    return {
                      value: users.id,
                      label: (
                        <div>
                          {users.User.firstName} {users.User.lastName}
                        </div>
                      ),
                    };
                  })}
                  onChange={handleChangeUserTask}
                />
              </div>
            )}
          </div>
        </Form>
      </div>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : count > 0 ? (
        <Tasks
          data={data}
          open={open}
          setOpen={setOpen}
          getTasks={getTasks}
          params={params}
          setParams={setParams}
        />
      ) : (
        <EmptyData open={open} setOpen={setOpen} getTasks={getTasks} />
      )}

      <ModalEmpty
        open={open}
        setOpen={setOpen}
        getTasks={getTasks}
        id_taskParent={null}
      />
      <Modal footer={false} onCancel={onClose} title="Sửa Tên" open={openEdit}>
        <Form form={formEdit} onFinish={handleUpdate}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Không được bỏ trống" }]}
          >
            <Input placeholder="Nhập tên muốn sửa" />
          </Form.Item>
          <div className="text-center">
            <Button htmlType="submit" type="primary" loading={loadingEdit}>
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
            loading={loadingEdit}
          >
            Xóa
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Task;
