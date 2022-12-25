import React from "react";
import { Table, Space, Avatar, Tag, Typography } from "antd";
import { CloseCircleOutlined, PlayCircleTwoTone } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import AssignUser from "../../../common/AssignUser";
import moment from "moment";
import timeWork from "../../../common/funcTimeWork";
import styles from "../task.module.scss";
import Description from "./actions-task/Description";
import { getColor } from "./task";
import Date from "./actions-task/Date";
import DeleteTask from "./actions-task/DeleteTask";
const { Text } = Typography;

interface DataType {
  key: React.Key;
  description?: string;
  children?: any;
}

function TableTask({ task, getTasks }: any) {
  const [openTableTask, setOpenTableTask] = React.useState(true);
  const columns: ColumnsType<DataType> = [
    {
      title: "",
      key: "id",
      render: (data) => <Description data={data} getTasks={getTasks} />,
    },
    {
      title: "assign",
      key: "id",
      align: "center",
      render: (data) => {
        return (
          <div className="w-full flex justify-center">
            <div
              style={{ display: "flex", alignItems: "center" }}
              className={`relative w-[30px] cursor-pointer justify-center ${styles.taskUser}`}
            >
              <Avatar
                size={27}
                style={{ border: "1px solid #d3d3d3" }}
                src={
                  data?.UserTask?.length > 0 &&
                  data?.UserTask[0].User?.thumbnail
                }
              >
                {data.name}
              </Avatar>
              <CloseCircleOutlined
                className={`absolute top-[-2px] right-[-1px] !text-[#555] bg-[#fff] rounded-full cursor-pointer text-[14px] ${styles.taskUserClose}`}
              />
              {/* <AssignUser /> */}
            </div>
          </div>
        );
      },
    },
    {
      title: "manager",
      key: "id",
      align: "center",
      render: (data) => (
        <div className="w-full flex justify-center">
          <div
            style={{ display: "flex", alignItems: "center" }}
            className={`relative w-[30px] cursor-pointer justify-center ${styles.taskUser}`}
          >
            <Avatar
              size={27}
              style={{ border: "1px solid #d3d3d3" }}
              src={
                data?.UserTask?.length > 0 && data?.UserTask[0].User?.thumbnail
              }
            >
              {data.name}
            </Avatar>
            <CloseCircleOutlined
              className={`absolute top-[-2px] right-[-1px] !text-[#555  ] bg-[#fff] rounded-full cursor-pointer text-[14px] ${styles.taskUserClose}`}
            />
            {/* <AssignUser /> */}
          </div>
        </div>
      ),
    },
    {
      title: "start time",
      key: "id",
      align: "center",
      render: (data) => (
        <div className="cursor-pointer">
          <Date colorType="blue" type="start_Time" data={data.start_Time} />
        </div>
      ),
    },
    {
      title: "end time",
      key: "id",
      align: "center",
      render: (data) => (
        <div className="cursor-pointer">
          <Tag color="red">{moment(data.end_Time).format("DD-MM-YYYY")}</Tag>
        </div>
      ),
    },
    {
      title: "time work",
      key: "id",
      align: "center",
      render: (data) => (
        <>
          {/* <RangePicker /> */}
          <Space style={{ cursor: "pointer" }}>
            <Text strong type="danger">
              {timeWork(data.end_Time)}
            </Text>
          </Space>
        </>
      ),
    },
    {
      title: "delete",
      align: "center",
      key: "id",
      render: (data) => <DeleteTask data={data} getTasks={getTasks} />,
    },
  ];

  return (
    <div className={`mb-20 ${styles.taskTable}`}>
      <div className="mb-[-6px] flex items-center">
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
          rowKey="id"
        />
      )}
    </div>
  );
}

export default TableTask;
