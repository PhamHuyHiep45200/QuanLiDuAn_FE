import React, { useEffect, useState } from "react";
import { Avatar, Input, Popover, Typography } from "antd";
import { CloseOutlined, UserAddOutlined } from "@ant-design/icons";
import styles from "../styles/task.module.scss";
import { useParams } from "react-router-dom";
import { searchUserAll } from "../services/item";
const { Text } = Typography;

const avatar: any = [];
function AssignUser({ setState }: any) {
  const { id }: any = useParams();
  const [data, setData] = useState<any>([]);
  const contentAvatar = (
    <div
      style={{ display: "flex", alignItems: "center" }}
      className="w-[150px] min-h-[100px] flex-col"
    >
      <div>
        <Input placeholder="search" />
      </div>
      <div className="w-full">
        {data?.map((item: any, index: number) => (
          <div
            className="py-2 flex items-center justify-start w-full"
            onClick={() => setState()}
            key={index}
          >
            <Avatar>H</Avatar>
            <Text className="font-medium !text-[#000] ml-2">
              {item?.name}{" "}
              <Text className="font-normal text-[13px] !text-[#999]">
                ({item?.email})
              </Text>
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
  useEffect(() => {
    getAllUser();
  }, []);
  const getAllUser = async () => {
    const response = await searchUserAll(+id);
    console.log(response);
  };
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
