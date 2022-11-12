import React from "react";
import { Avatar, Popover, Typography } from "antd";
import { CloseOutlined, UserAddOutlined } from "@ant-design/icons";
import styles from "../styles/task.module.scss";
const { Text } = Typography;

const avatar: any = [];
function AssignUser() {
  const contentAvatar = (
    <div
      style={{ display: "flex", alignItems: "center", padding: "0.5rem 1rem" }}
      onClick={() => {
        // const data: any = avatar;
        // data.push({ color: "pink", name: "D" });
        // setAvatar([...data]);
      }}
    >
      <Avatar style={{ color: "#f56a00" }}>D</Avatar>
      <Text>Dun Dun</Text>
    </div>
  );
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Avatar.Group maxCount={2}>
        {avatar.map((data: any, index: number) => (
          <Avatar
            className={styles.avatar}
            style={{
              backgroundColor: data.color,
              overflow: "unset",
            }}
            key={index}
          >
            <div
              className={styles.iconAvartar}
              style={{
                position: "absolute",
                top: -4,
                right: -10,
              }}
              // onClick={() => handleDeleteAvatar(data.name)}
            >
              <CloseOutlined style={{ fontSize: "8px", color: "black" }} />
            </div>
            {data.name}
          </Avatar>
        ))}
      </Avatar.Group>
      <Popover title={false} content={contentAvatar} trigger="click">
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            border: "1px dashed #9999",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <UserAddOutlined />
        </div>
      </Popover>
    </div>
  );
}

export default AssignUser;
