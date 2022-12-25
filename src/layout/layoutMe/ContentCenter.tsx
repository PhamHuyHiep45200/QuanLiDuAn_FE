import React, { useState } from "react";
import {
  AntDesignOutlined,
  AreaChartOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Tooltip, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateProviderMe } from ".";
const { Text } = Typography;
const dataTabs = [
  {
    label: "List",
    value: "task",
    router: "/home/task/",
    icon: <UnorderedListOutlined className="text-[18px]" />,
  },
  {
    label: "Chart",
    value: "chart",
    router: "/home/chart/",
    icon: <AreaChartOutlined className="text-[18px]" />,
  },
];

function ContentCenter() {
  const { idItem } = React.useContext(CreateProviderMe);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTabs = (route: string) => {
    navigate(route + idItem);
  };

  return (
    <div className="flex justify-between w-full mx-10 items-center">
      <div className="flex items-center">
        <div className="ml-5 mr-10 font-bold">Work Me</div>
        {dataTabs.map((tabs, index) => (
          <div
            key={index}
            className={`flex items-center px-[15px] border-l-[1px] border-[#d3d3d3] cursor-pointer ${
              pathname.split("/").includes(tabs.value) &&
              "!text-[blue] relative before:absolute before:content-[' '] before:top-[100%] before:w-[60px] before:h-[2px] before:bg-[blue] before:left-[50%] before:translate-x-[-50%]"
            }`}
            onClick={() => handleTabs(tabs.router)}
          >
            {tabs.icon}
            <Text
              className={`text-[16px] !text-[#000] block ml-[5px] ${
                pathname.split("/").includes(tabs.value) &&
                "!text-[blue] font-medium"
              }`}
            >
              {tabs.label}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentCenter;
