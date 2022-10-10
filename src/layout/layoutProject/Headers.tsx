import React from "react";
import { Button, Space, Tabs, Typography } from "antd";
import {
  UnorderedListOutlined,
  PieChartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styles from "../../styles/header.module.scss";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const { Text } = Typography;

const items = [
  {
    label: (
      <div className="flex items-center px-3">
        <UnorderedListOutlined />
        List
      </div>
    ),
    key: "1",
  },
  {
    label: (
      <div className="flex items-center px-3">
        <PieChartOutlined />
        Board
      </div>
    ),
    key: "2",
  },
];

interface DataKey {
  key: number;
  path: string;
}

const dataKey: DataKey[] = [
  {
    key: 1,
    path: "/project/:id/list",
  },
  {
    key: 2,
    path: "/project/:id/board",
  },
];

function Headers() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleChangeTabs = (key: string) => {
    const findKey: any = dataKey.find((data: DataKey) => data.key === +key);
    navigate(findKey.path + location.search);
  };

  return (
    <Space className={styles.space_header}>
      <Text strong>{location.search.split("=")[1]}</Text>
      <Tabs items={items} onChange={handleChangeTabs} />
    </Space>
  );
}

export default Headers;
