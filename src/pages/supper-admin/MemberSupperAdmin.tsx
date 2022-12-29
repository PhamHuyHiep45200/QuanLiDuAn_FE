import React from "react";
import { Form, Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";
import moment from "moment";
import { searchUsers, updateDeleteUser } from "../../services/user";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import UpdateDelete from "./UpdateDelete";

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  deleteFlg: boolean;
}

const MemberSupperAdmin: React.FC = () => {
  const searchRef = React.useRef<any>();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [params, setParams] = React.useState<any>();

  const columns: ColumnsType<DataType> = React.useMemo(() => {
    return [
      {
        title: "Id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Tên",
        key: "name",
        render: (data) => (
          <a>
            {data?.firstName} {data?.lastName}
          </a>
        ),
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Quyền",
        dataIndex: "role",
        key: "role",
      },
      {
        title: "Số điện thoại",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "Giới tính",
        key: "action",
        dataIndex: "gender",
      },
      {
        title: "Ngày tạo",
        key: "action",
        render: (data) => (
          <>{moment(data?.createdAt).format("YYYY/MM/DD HH:mm:ss")}</>
        ),
      },
      {
        title: "Tháo tác",
        key: "project",
        render: (data) => (
          <UpdateDelete
            type="group"
            data={data}
            functionDelete={functionDelete}
          />
        ),
      },
    ];
  }, []);
  React.useEffect(() => {
    getProject();
  }, [params]);

  const getProject = async () => {
    setLoading(true);
    const response = await searchUsers(params);
    console.log(response);

    if (response?.data?.status === 200) {
      setData(response.data.data);
      setLoading(false);
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
      setLoading(false);
    }
  };

  const functionDelete = async (data: any, setLoadingComfirm: any) => {
    const response = await updateDeleteUser(data?.id, {
      status: !data?.deleteFlg,
    });
    if (response?.data?.status === 200) {
      getProject();
      setLoadingComfirm(false);
      openCustomNotificationWithIcon("sucess", "sucess", "sucess");
    } else {
      setLoadingComfirm(false);
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };

  const onValuesChange = (value: any) => {
    clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setParams({ q: value.name });
    }, 400);
  };
  return (
    <div>
      <div className="flex justify-end">
        <Form onValuesChange={onValuesChange}>
          <Form.Item name="name">
            <Input allowClear placeholder="Tìm kiếm theo tên" />
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
};

export default MemberSupperAdmin;
