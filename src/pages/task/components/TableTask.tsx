import React from "react";
import { Table, Space, Avatar, Tag, Popover, Typography } from "antd";
import {
  ShareAltOutlined,
  CloseCircleOutlined,
  PlayCircleTwoTone,
  FireOutlined,
  FireTwoTone,
  SwapRightOutlined,
} from "@ant-design/icons";
import StatusTask from "../../../common/StatusTask";
import type { ColumnsType } from "antd/es/table";
import AssignUser from "../../../common/AssignUser";

interface DataType {
  key: React.Key;
  description?: string;
  children?: any;
}
const { Text } = Typography;

const getColor = (value: string) => {
  if (value === "OPEN") {
    return "#ddd8d8";
  } else if (value === "DOING") {
    return "#ff4700";
  } else if (value === "COMPLETED") {
    return "#4fff16";
  } else if (value === "ILLEGAL") {
    return "#ff00e0";
  } else if (value === "PENDDING") {
    return "#ffeb00";
  }
};

function TableTask({ task, getTasks }: any) {
  const [avatar, setAvatar] = React.useState<Array<any>>([
    {
      color: "#87d068",
      name: "H",
    },
  ]);
  const [fire, setFire] = React.useState(false);
  const [openTableTask, setOpenTableTask] = React.useState(true);
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      key: "id",
      render: (data) => {
        return (
          <>
            <Space
              style={{
                alignItems: "center",
                paddingLeft: "1rem",
              }}
            >
              <StatusTask
                initColor={getColor(data?.status)}
                idTask={data?.id}
                getTasks={getTasks}
              />
              <Space align="center">
                <Text>{data.descriptions}</Text>
                <Text
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "1px solid rgb(221 221 221 / 60%)",
                    marginLeft: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "3px",
                    cursor: "pointer",
                  }}
                >
                  <ShareAltOutlined style={{ color: "#666" }} />
                </Text>
              </Space>
            </Space>
          </>
        );
      },
    },
    {
      title: "Assign",
      key: "id",
      render: (data) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar.Group maxCount={2}>
            {avatar.map((data: any, index: number) => (
              <Avatar
                className="relative"
                key={index}
                style={{ overflow: "unset" }}
              >
                {data.name}
                <CloseCircleOutlined className="absolute top-0 right-[-10px] !text-[#000] bg-[#fff] rounded-full cursor-pointer" />
              </Avatar>
            ))}
          </Avatar.Group>
          <AssignUser />
        </div>
      ),
    },
    {
      title: "Estimate time",
      key: "id",
      render: (data) => (
        <>
          {/* <RangePicker /> */}
          <Space style={{ cursor: "pointer" }}>
            <Tag color="blue">{data.start_Time}</Tag>
            <SwapRightOutlined style={{ fontSize: "18px" }} />
            <Tag color="red">{data.end_Time}</Tag>
          </Space>
        </>
      ),
    },
    {
      title: "Level",
      dataIndex: "",
      key: "id",
      render: (data) => (
        <>
          {fire ? (
            <FireTwoTone
              style={{ fontSize: "20px", color: "red" }}
              onClick={() => setFire(!fire)}
            />
          ) : (
            <FireOutlined
              style={{ fontSize: "20px", color: "#888" }}
              onClick={() => setFire(!fire)}
            />
          )}
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => <a>Delete</a>,
    },
  ];
  return (
    <div className="mb-20">
      <div className="mb-[10px] flex items-center">
        <PlayCircleTwoTone
          className={`text-[18px] !text-[#999] mr-[10px] cursor-pointer ${
            openTableTask && "rotate-[90deg]"
          }`}
          style={{ transition: "all 0.2s" }}
          onClick={() => setOpenTableTask(!openTableTask)}
        />
        <Tag style={{ backgroundColor: getColor(task.type), fontWeight: 500 }}>
          {task.name}
        </Tag>
        {!openTableTask && (
          <div className="font-medium text-[13px]">
            {task?.data?.length} task
          </div>
        )}
      </div>
      {openTableTask && (
        <Table
          columns={columns}
          dataSource={task?.data}
          defaultExpandAllRows
          pagination={false}
        />
      )}
    </div>
  );
}

export default TableTask;
