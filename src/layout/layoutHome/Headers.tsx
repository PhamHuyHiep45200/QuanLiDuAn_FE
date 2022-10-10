import React from "react";
import { Button, Space, Tabs, Typography } from "antd";
import {
  UnorderedListOutlined,
  PieChartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styles from "../../styles/header.module.scss";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const items = [
  {
    label: (
      <div className="flex items-center px-3">
        <HomeOutlined />
        Home
      </div>
    ),
    key: "1",
  },
];

interface DataKey {
  key: number;
  path: string;
}

const dataKey: DataKey[] = [
  {
    key: 1,
    path: "/home",
  },
];

function Headers() {
  const navigate = useNavigate();
  const handleChangeTabs = (key: string) => {
    const findKey: any = dataKey.find((data: DataKey) => data.key === +key);
    navigate(findKey.path);
  };
  return (
    <Space className={styles.space_header}>
      <Text strong>Tên dự án</Text>
      <Tabs items={items} onChange={handleChangeTabs} />
    </Space>
  );
}

export default Headers;
