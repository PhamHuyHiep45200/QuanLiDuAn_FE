import React from "react";
import { Space, Typography, Avatar, Tooltip, Button } from "antd";

import { PlusCircleOutlined } from "@ant-design/icons";
import styles from "../../styles/header.module.scss";
import AddUser from "./modal/AddUser";

const { Text } = Typography;
const getName = (name: string) => {
  const nameSplit = name.trim().split("");
  return nameSplit[0];
};
function Headers({ user, name }: any) {
  const [open, setOpen] = React.useState<boolean>(false);
  console.log(user);

  return (
    <Space className={styles.space_header} style={{ width: "100%" }}>
      <Text strong>{name}</Text>
      <Avatar.Group
        maxCount={4}
        maxPopoverTrigger="click"
        maxStyle={{
          color: "#f56a00",
          backgroundColor: "#fde3cf",
          cursor: "pointer",
        }}
        className={styles.avatarGroup}
      >
        {user?.map((item: any, index: number) => (
          <Tooltip
            title={`${item?.User?.firstName} ${item?.User?.lastName}`}
            placement="top"
            key={index}
          >
            <Avatar>
              {item?.User?.thumbnail
                ? item?.User?.thumbnail
                : getName(item?.User?.email)}
            </Avatar>
          </Tooltip>
        ))}
        <Button className="ml-[20px]" onClick={() => setOpen(true)}>
          <div className=" flex items-center">
            <PlusCircleOutlined className="mr-[10px]" />
            <span>User</span>
          </div>
        </Button>
      </Avatar.Group>
      <AddUser open={open} setOpen={setOpen} />
    </Space>
  );
}

export default Headers;
