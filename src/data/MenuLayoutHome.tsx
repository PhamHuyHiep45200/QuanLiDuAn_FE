import React from "react";
import { HomeOutlined, BellOutlined } from "@ant-design/icons";

export const MenuLayoutHome = () => {
  return [
    {
      key: 1,
      label: "Home",
      path: "/home",
      icon: <HomeOutlined />,
    },
    {
      key: 2,
      label: "Notifycations",
      path: "/home",
      icon: <BellOutlined />,
    },
  ];
};
