import React from "react";
import { Form, Table, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";
import moment from "moment";

interface DataType {
  key: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  deleteFlg: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
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
    render: (data) => <>{moment(new Date()).format("YYYY/MM/DD HH:mm:ss")}</>,
  },
  {
    title: "Tháo tác",
    key: "project",
    render: (data) => (
      <div className="cursor-pointer">
        {data.deleteFlg ? <LockOutlined /> : <KeyOutlined />}
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    email: "hhh@gm.co",
    role: "USER",
    phone: "095435743",
    gender: "Nam",
    deleteFlg: false,
  },
  {
    key: "1",
    name: "Hie",
    email: "hhh@gm.co",
    role: "USER",
    phone: "095435743",
    gender: "Nam",
    deleteFlg: true,
  },
  {
    key: "1",
    name: "Dun",
    email: "hhh@gm.co",
    role: "USER",
    phone: "095435743",
    gender: "Nam",
    deleteFlg: false,
  },
];
const MemberSupperAdmin: React.FC = () => {
  const onValuesChange = (value: { [key: string]: string }) => {
    console.log(value);
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
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default MemberSupperAdmin;
