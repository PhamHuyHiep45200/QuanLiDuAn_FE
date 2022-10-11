import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  description?: string;
  children?: any;
}

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    children: [
      {
        name: "hiep",
        age: 18,
        children: [
          { name: "hiep", age: 18 },
          { name: "dung", age: 17 },
        ],
      },
      { name: "dung", age: 17 },
    ],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    children: [
      {
        name: "hiep",
        age: 18,
        children: [
          { name: "hiep", age: 18 },
          { name: "dung", age: 17 },
        ],
      },
      { name: "dung", age: 17 },
    ],
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    children: [
      { name: "hiep", age: 18 },
      { name: "dung", age: 17 },
    ],
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    children: [
      { name: "hiep", age: 18 },
      { name: "dung", age: 17 },
    ],
  },
];
function List() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateDefault, setStateDefault] = useState<string[]>(["1"]);
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      key: "name",
      render: (data) => (
        <>
          {data.name} <Button onClick={showModal}>add sub task</Button>{" "}
        </>
      ),
    },
    { title: "Age", dataIndex: "age", key: "age" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Delete</a>,
    },
  ];
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (value: any) => {
    console.log(value);
    // const arr = stat;
    setStateDefault(["2"]);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        defaultExpandAllRows
        // // defaultExpandedRowKeys=
        // expandable={{ expandedRowKeys: [...stateDefault] }}
      />
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item name="descriptions">
            <Input placeholder="descriptions" />
          </Form.Item>
          <Button htmlType="submit">submit</Button>
        </Form>
      </Modal>
    </>
  );
}

export default List;
