import React, { useEffect, useState } from "react";
import { Image, Menu, Space, Divider, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/image/logoShash.png";
import { MenuLayoutHome } from "../../data/MenuLayoutHome";
import styles from "../../styles/layout.module.scss";
import MenuHome from "../../common/menu";
const { Text } = Typography;

function Slider() {
  const items = MenuLayoutHome();
  const navigate = useNavigate();

  const changePath = (value: any) => {
    console.log("value", value);

    items.map((item: any) => {
      if (+item.key === +value.key) {
        navigate(item.path);
      }
      item?.children?.length > 0 &&
        item?.children?.map((it: any) => {
          if (+it.key === +value.key) {
            navigate(it.path);
          }
          return 0;
        });
      return 0;
    });
  };

  return (
    <>
      <div>
        <Space
          style={{ width: "100%", cursor: "pointer", padding: "0.5rem 1rem" }}
          align="center"
          onClick={() => navigate("/home")}
        >
          <Image src={Logo} preview={false} height={50} />
          <Text strong>Shask</Text>
        </Space>
        <Divider style={{ marginTop: 0 }} />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["0"]}
          onClick={changePath}
          items={items}
        />
        <Divider>Share Task</Divider>
        <MenuHome />
      </div>
    </>
  );
}

export default Slider;
