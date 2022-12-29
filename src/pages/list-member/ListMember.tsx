import React from "react";
import { Table, Avatar, Typography, Button, Popconfirm, Tag } from "antd";
import { useLocation, useParams } from "react-router-dom";
import { getUserProject } from "../../services/user-project";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { getUserGroup } from "../../services/user-group";
import { DeleteFilled, PlusCircleOutlined } from "@ant-design/icons";
import AddUser from "../../layout/layoutHome/modal/AddUser";
import PopupConfirm from "./PopupConfirm";

const { Text } = Typography;

function ListMember() {
  const { pathname } = useLocation();
  const { id }: any = useParams();

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState([]);

  const columns = React.useMemo(
    () => [
      {
        title: "Name",
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
        title: "Role",
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
        title: "Group",
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
    console.log(response.data.data);
    if (response.data.status === 200) {
      setData(response.data.data);
    } else {
      openCustomNotificationWithIcon("error", "get user", "get user error");
    }
  };

  const getUsersGroup = async () => {
    const response = await getUserGroup(+id);
    console.log(response.data.data);
    if (response.data.status === 200) {
      setData(response.data.data);
    } else {
      openCustomNotificationWithIcon("error", "get user", "get user error");
    }
  };

  return (
    <div>
      <div className="text-right mb-5">
        <Button
          className="!rounded-[4px] !bg-[#5555da] !text-[#fff] ml-[20px]"
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center">
            <PlusCircleOutlined className="mr-2" />
            user
          </div>
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
      <AddUser
        open={open}
        setOpen={setOpen}
        type={pathname}
        refesh={getDataMember}
      />
    </div>
  );
}

export default ListMember;
