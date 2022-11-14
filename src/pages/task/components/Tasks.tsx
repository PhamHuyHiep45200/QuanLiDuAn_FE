import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Typography,
  Space,
  Avatar,
  Tag,
  Popover,
} from "antd";
import DatePicker from "antd/es/date-picker";
import TableTask from "./TableTask";
const { Text } = Typography;

interface DataType {
  key: React.Key;
  description?: string;
  children?: any;
}

function Tasks({ data, getTasks, setOpen }: any) {
  return (
    <>
      <div className="text-right mb-5">
        <Button shape="round" onClick={() => setOpen(true)}>
          + task
        </Button>
      </div>
      {data.map((task: any) => (
        <>
          {task?.data?.length > 0 && (
            <TableTask task={task} getTasks={getTasks} />
          )}
        </>
      ))}
    </>
  );
}

export default Tasks;
