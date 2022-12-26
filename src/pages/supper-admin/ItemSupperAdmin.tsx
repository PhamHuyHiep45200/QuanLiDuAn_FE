import React from "react";
import { Form, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";
import moment from "moment";

interface DataType {
  key: string;
  name: string;
  project: string;
  group: string;
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
    title: "Thuộc Nhóm",
    key: "group",
    render: (data) => <Tag color="green">{data.group}</Tag>,
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
    name: "giai đoạn 1",
    project: "project 1",
    group: "group 1",
    deleteFlg: true,
  },
  {
    key: "2",
    name: "giai đoạn 2",
    project: "project 2",
    group: "group 1",
    deleteFlg: false,
  },
  {
    key: "3",
    name: "giai đoạn 3",
    project: "project 1",
    group: "group 1",
    deleteFlg: true,
  },
];

const ItemSupperAdmin: React.FC = () => {
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

export default ItemSupperAdmin;
