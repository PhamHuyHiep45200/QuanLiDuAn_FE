import React from "react";
import { HomeOutlined, BellOutlined, UserOutlined } from "@ant-design/icons";

export const MenuLayoutHome = () => {
  return [
    {
      key: 2,
      label: "Work Me",
      path: "/home/me",
      icon: <UserOutlined />,
    },
    {
      key: 3,
      label: "Notifycations",
      path: "/home/notifycations",
      icon: <BellOutlined />,
    },
  ];
};
