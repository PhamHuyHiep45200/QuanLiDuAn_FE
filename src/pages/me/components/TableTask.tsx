import React from "react";
import { Table, Space, Avatar, Tag, Typography } from "antd";
import { CloseCircleOutlined, PlayCircleTwoTone } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import AssignUser from "../../../common/AssignUser";
import moment from "moment";
import timeWork from "../../../common/funcTimeWork";
import styles from "../../task/task.module.scss";
import Description from "../../task/components/actions-task/Description";
import Date from "../../task/components/actions-task/Date";
import DeleteTask from "../../task/components/actions-task/DeleteTask";
import { getColor } from "../../task/components/task";
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
