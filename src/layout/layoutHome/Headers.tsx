import React from "react";
import { Space, Typography, Avatar, Tooltip } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import styles from "../../styles/header.module.scss";

const { Text } = Typography;

function Headers() {
  return (
    <Space className={styles.space_header} style={{ width: "100%" }}>
      <Text strong>Tên dự án</Text>
      <Avatar.Group
        maxCount={2}
        maxPopoverTrigger="click"
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
          cursor: "pointer",
        }}
        className={styles.avatarGroup}
      >
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar
            style={{ backgroundColor: "#87d068" }}
            icon={<UserOutlined />}
          />
        </Tooltip>
        <Avatar
          style={{ backgroundColor: "#1890ff" }}
          icon={<AntDesignOutlined />}
        />
      </Avatar.Group>
    </Space>
  );
}

export default Headers;
