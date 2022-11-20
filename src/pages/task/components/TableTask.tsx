import React from "react";
import { Table, Space, Avatar, Tag, Popover, Typography } from "antd";
import {
  ShareAltOutlined,
  CloseCircleOutlined,
  PlayCircleTwoTone,
  FireOutlined,
  FireTwoTone,
} from "@ant-design/icons";
import StatusTask from "../../../common/StatusTask";
import type { ColumnsType } from "antd/es/table";
import AssignUser from "../../../common/AssignUser";
import moment from "moment";
import timeWork from "../../../common/funcTimeWork";
import styles from "../task.module.scss";
import Description from "./actions-task/Description";
import { getColor } from "./task";
import Date from "./actions-task/Date";

interface DataType {
  key: React.Key;
  description?: string;
  children?: any;
}
const { Text } = Typography;

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
      title: "",
      key: "id",
      render: (data) => <Description data={data} getTasks={getTasks} />,
    },
    {
      title: "assign",
      key: "id",
      align: "center",
      render: (data) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar.Group maxCount={2}>
            {avatar.map((data: any, index: number) => (
              <Avatar
                className="relative"
                key={index}
                size={27}
                style={{ overflow: "unset" }}
              >
                {data.name}
                <CloseCircleOutlined className="absolute top-[-2px] right-[-7px] !text-[#000] bg-[#fff] rounded-full cursor-pointer text-[14px]" />
              </Avatar>
            ))}
          </Avatar.Group>
          <AssignUser />
        </div>
      ),
    },
    {
      title: "assign manager",
      key: "id",
      align: "center",
      render: (data) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar.Group maxCount={2}>
            {avatar.map((data: any, index: number) => (
              <Avatar
                className="relative"
                key={index}
                size={27}
                style={{ overflow: "unset" }}
              >
                {data.name}
                <CloseCircleOutlined className="absolute top-[-2px] right-[-7px] !text-[#000] bg-[#fff] rounded-full cursor-pointer text-[14px]" />
              </Avatar>
            ))}
          </Avatar.Group>
          <AssignUser />
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
            <Tag color="red">{timeWork(data.end_Time)}</Tag>
          </Space>
        </>
      ),
    },
    {
      title: "level",
      align: "center",
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
      title: "action",
      align: "center",
      dataIndex: "",
      key: "x",
      render: () => <a>Delete</a>,
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
        />
      )}
    </div>
  );
}

export default TableTask;
