import React, { useId } from "react";
import { Typography } from "antd";
import {
  CaretRightOutlined,
  DeploymentUnitOutlined,
  FolderFilled,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const project = [
  {
    id: 1,
    name: "Mode Tour",
    type: "project",
    children: [
      {
        id: 10,
        name: "Developer",
        type: "group",
        children: [
          {
            id: 100,
            name: "Giai đoạn 1 ( 10/8/2022 - 20/8/2022)",
            type: "item",
            router: "/item",
          },
          {
            id: 102,
            name: "Giai đoạn 2 ( 21/8/2022 - 30/8/2022)",
            type: "item",
            router: "/item",
          },
        ],
      },
      {
        id: 11,
        name: "Tester",
        type: "group",
      },
    ],
  },
  {
    id: 2,
    name: "Smile Me",
    type: "project",
    children: [
      {
        id: 20,
        name: "Developer",
        type: "group",
      },
      {
        id: 21,
        name: "Tester",
        type: "group",
      },
    ],
  },
];

const { Text } = Typography;

const MenuItem = (props: any) => {
  const { array } = props;
  const id = useId();
  return (
    <>
      {array?.map((pro: any) => {
        return (
          <>
            {/* {pro?.type && ( */}
            {/* <div
              key={pro.id}
              className="h-[20px] w-full flex items-center px-[10px] py-[18px] cursor-pointer hover:bg-[#fafafa]"
            >
              <CaretRightOutlined className="mr-[10px] !text-[#9d9c9c]" />
              <FolderFilled className="!text-[#ff6a00]" />
              <Text className="text-[14px] font-medium ml-[10px]">
                {pro.name}
              </Text>
            </div> */}
            {/* )} */}

            {/* {pro?.type === "group" && (
              <div
                key={pro.id}
                className="h-[20px] w-full flex items-center px-[10px] py-[18px] cursor-pointer hover:bg-[#fafafa]"
              >
                <CaretRightOutlined className="mr-[10px] !text-[#9d9c9c]" />
                <TeamOutlined className="!text-[#1303c8]" />
                <Text className="text-[14px] font-medium ml-[10px]">
                  {pro.name}
                </Text>
              </div>
            )}
            {pro?.type === "item" && (
              <div
                key={pro.id}
                className="h-[20px] w-full flex items-center px-[10px] py-[18px] cursor-pointer hover:bg-[#fafafa]"
              >
                <CaretRightOutlined className="mr-[10px] !text-[#9d9c9c]" />
                <DeploymentUnitOutlined className="!text-[#28a82f]" />
                <Text className="text-[14px] font-medium ml-[10px]">
                  {pro.name}
                </Text>
              </div>
            )} */}
            {/* {array?.children?.length > 0 && ( */}
            {/* <MenuItem array={array?.children} key={array?.id} /> */}
            {array?.children?.length}
          </>
        );
      })}
    </>
  );
};

const GetFunc = ({ parentArray }: any) => {
  return (
    <div>
      {parentArray.map((data: any) => (
        <>
          {data.type === "project" && (
            <div
              key={data.id}
              className="h-[20px] w-full flex items-center px-[10px] py-[18px] cursor-pointer hover:bg-[#fafafa]"
            >
              <CaretRightOutlined className="mr-[3px] !text-[#9d9c9c]" />
              <FolderFilled className="!text-[#ff6a00]" />
              <Text className="text-[14px] font-medium ml-[10px]">
                {data.name}
              </Text>
            </div>
          )}
          {data.type === "group" && (
            <div
              key={data.id}
              className="h-[20px] w-full flex items-center px-[10px] py-[18px] cursor-pointer hover:bg-[#fafafa] pl-[20px]"
            >
              <CaretRightOutlined className="mr-[3px] !text-[#9d9c9c]" />
              <TeamOutlined className="!text-[#1303c8]" />
              <Text className="text-[13px] font-medium !text-[#444] ml-[10px]">
                {data.name}
              </Text>
            </div>
          )}
          {data.type === "item" && (
            <Link
              to="/"
              key={data.id}
              className="h-[20px] w-full flex items-center px-[10px] py-[18px] cursor-pointer hover:bg-[#fafafa] pl-[43px]"
            >
              <DeploymentUnitOutlined className="!text-[#28a82f]" />
              <Text className="text-[13px] !text-[#777] ml-[10px] truncate w-[160px]">
                {data.name}
              </Text>
            </Link>
          )}
          {data?.children?.length > 0 && (
            <GetFunc parentArray={data?.children} />
          )}
        </>
      ))}
    </div>
  );
};

function MenuHome() {
  return (
    <div>
      <GetFunc parentArray={project} />
    </div>
  );
}

export default MenuHome;
