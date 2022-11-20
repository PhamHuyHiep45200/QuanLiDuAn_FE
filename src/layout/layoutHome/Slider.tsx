import React, { useEffect, useState } from "react";
import { Image, Menu, Space, Divider, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MenuLayoutHome } from "../../data/MenuLayoutHome";
import MenuHome from "../../common/menu";
const { Text } = Typography;

function Slider({ menu }: any) {
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
      <div className="mt-[60px]">
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["0"]}
          onClick={changePath}
          items={items}
        />
        <Divider>Share Task</Divider>
        <MenuHome menu={menu} />
      </div>
    </>
  );
}

export default Slider;
