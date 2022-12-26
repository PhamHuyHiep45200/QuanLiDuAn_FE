import React from "react";
import { Form, Input, Table, Tag } from "antd";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";

interface DataType {
  key: string;
  name: string;
  project: string;
  deleteFlg: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: "id",
    dataIndex: "key",
    key: "key",
    align: "center",
  },
  {
    title: "Tên",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    align: "center",
  },
  {
    title: "Thuộc Dự Án",
    key: "project",
    render: (data) => <Tag color="blue">{data.project}</Tag>,
    align: "center",
  },
  {
    title: "Ngày tạo",
    key: "action",
    render: (data) => <>{moment(new Date()).format("YYYY/MM/DD HH:mm:ss")}</>,
    align: "center",
  },
  {
    title: "Tháo tác",
    key: "project",
    render: (data) => (
      <>{data.deleteFlg ? <LockOutlined /> : <KeyOutlined />}</>
    ),
    align: "center",
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "group 1",
    project: "project 1",
    deleteFlg: true,
  },
  {
    key: "2",
    name: "group 2",
    project: "project 2",
    deleteFlg: false,
  },
  {
    key: "3",
    name: "group 3",
    project: "project 1",
    deleteFlg: true,
  },
];

const GroupSupperAdmin: React.FC = () => {
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

export default GroupSupperAdmin;
