import React, { useEffect, useRef, useState } from "react";
import { Avatar, Input, Popover, Typography } from "antd";
import { CloseOutlined, UserAddOutlined } from "@ant-design/icons";
import styles from "../styles/task.module.scss";
import { useParams } from "react-router-dom";
import { searchUserQuery } from "../services/item";
import { openCustomNotificationWithIcon } from "./Notifycations";
const { Text } = Typography;
const getName = (name: string) => {
  return name.trim().split("")[0];
};
const avatar: any = [];
function AssignUser({ setState }: any) {
  const { id }: any = useParams();
  const ref = useRef<any>(undefined);
  const [data, setData] = useState<any>([]);
  const [search, setSearch] = useState<string>("");
  const [openSearch, setOpenSearch] = useState<boolean>(false);

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    clearTimeout(ref.current);
    ref.current = setTimeout(() => {
      getUserSearh(e.target.value);
    }, 400);
  };

  const getUserSearh = async (value: string) => {
    const response = await searchUserQuery(id, { q: value });
    if (response.data.status === 200) {
      setData(response.data.data);
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };

  const contentAvatar = (
    <div
      style={{ display: "flex", alignItems: "center" }}
      className="w-[250px] min-h-[100px] flex-col"
    >
      <div className="w-full">
        <Input placeholder="search" value={search} onChange={handleSearch} />
      </div>
      <div className="w-full">
        {data?.map((item: any, index: number) => (
          <div
            className="py-2 flex items-center justify-start w-full hover:bg-[#f5f5f5]"
            onClick={() => {
              setOpenSearch(false);
              setState(item?.User);
            }}
            key={index}
          >
            <div>
              <Avatar
                src={item?.User?.thumbnail.length > 0 && item?.User?.thumbnail}
              >
                {getName(item?.User?.email)}
              </Avatar>
            </div>
            <Text className="font-medium !text-[#000] ml-2 truncate cursor-pointer">
              {`${item?.User?.firstName} ${item?.User?.lastName}`}{" "}
              <Text className="font-normal text-[13px] !text-[#999]">
                ({item?.User?.email})
              </Text>
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
  // useEffect(() => {
  //   getAllUser();
  // }, []);
  // const getAllUser = async () => {
  //   const response = await searchUserAll(+id);
  //   if (response.data.status === 200) {
  //     setData(response.data.data.Group.UserGroup);
  //   } else {
  //     openCustomNotificationWithIcon("error", "error", "error");
  //   }
  // };
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
      <Popover
        title={false}
        content={contentAvatar}
        trigger="click"
        placement="bottom"
        open={openSearch}
      >
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
          onClick={() => setOpenSearch(!openSearch)}
        >
          <UserAddOutlined />
        </div>
      </Popover>
    </div>
  );
}

export default AssignUser;
