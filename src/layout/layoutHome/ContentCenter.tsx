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
const { Text } = Typography;
const dataTabs = [
  {
    label: "List",
    value: "task",
    router: "/home/task/1",
    icon: <UnorderedListOutlined className="text-[18px]" />,
  },
  {
    label: "Chart",
    value: "chart",
    router: "/home/chart/2",
    icon: <AreaChartOutlined className="text-[18px]" />,
  },
];

function ContentCenter() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleTabs = (route: string) => {
    navigate(route);
  };

  return (
    <div className="flex justify-between w-full mx-10 items-center">
      <div className="flex items-center">
        <div className="ml-5 mr-10">tên</div>
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
      <div className="flex items-center">
        <Avatar.Group maxCount={4}>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
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
          <Avatar
            style={{ backgroundColor: "#1690ff" }}
            icon={<AntDesignOutlined />}
          />
        </Avatar.Group>
        <Button className="!rounded-[4px] !bg-[#5555da] !text-[#fff] ml-[20px]">
          <div className="flex items-center">
            <PlusCircleOutlined className="mr-2" />
            user
          </div>
        </Button>
      </div>
    </div>
  );
}

export default ContentCenter;
