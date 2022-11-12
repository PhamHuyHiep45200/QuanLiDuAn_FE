import React from "react";
import { Avatar, Card, Col, Space, Typography, Table } from "antd";
import styles from "../styles/project.module.scss";

const { Text } = Typography;

const columns: any = [
  { title: "4 Task", dataIndex: "desriptions", key: "name" },
  { title: "Assign", dataIndex: "assign", key: "age" },
  { title: "Time task", dataIndex: "time", key: "address" },
];

const datas: any = [
  {
    key: 1,
    desriptions: "task này dành cho bạn",
    assign: "hiệp",
    time: "20/06/2023",
    children: [
      {
        key: 11,
        desriptions: "task này dành cho bạn",
        assign: "quốc",
        time: "20/06/2023",
      },
      {
        key: 12,
        desriptions: "task này dành cho bạn",
        assign: "dung",
        time: "20/06/2023",
      },
    ],
  },
  {
    key: 2,
    desriptions: "task này dành cho bạn",
    assign: "hiệp",
    time: "20/06/2023",
    children: [
      {
        key: 21,
        desriptions: "task này dành cho bạn",
        assign: "quốc",
        time: "20/06/2023",
      },
      {
        key: 22,
        desriptions: "task này dành cho bạn",
        assign: "dung",
        time: "20/06/2023",
      },
    ],
  },
  {
    key: 31,
    desriptions: "task này dành cho bạn",
    assign: "hiệp",
    time: "20/06/2023",
    children: [
      {
        key: 31,
        desriptions: "task này dành cho bạn",
        assign: "quốc",
        time: "20/06/2023",
      },
      {
        key: 32,
        desriptions: "task này dành cho bạn",
        assign: "dung",
        time: "20/06/2023",
      },
    ],
  },
  {
    key: 41,
    desriptions: "task này dành cho bạn",
    assign: "hiệp",
    time: "20/06/2023",
    children: [
      {
        key: 1,
        desriptions: "task này dành cho bạn",
        assign: "quốc",
        time: "20/06/2023",
      },
      {
        key: 42,
        desriptions: "task này dành cho bạn",
        assign: "dung",
        time: "20/06/2023",
      },
    ],
  },
];

interface TaskProps {
  data: any;
  getName: any;
}

function Task(props: TaskProps) {
  const { data, getName } = props;
  return (
    <Col xl={24} lg={24} sm={24} xs={24} style={{ marginBottom: "10px" }}>
      <Card
        className={styles.card}
        // onClick={() => handleRedirectProject(data)}
      >
        <Table columns={columns} dataSource={datas} pagination={false} />
      </Card>
    </Col>
  );
}

export default Task;
