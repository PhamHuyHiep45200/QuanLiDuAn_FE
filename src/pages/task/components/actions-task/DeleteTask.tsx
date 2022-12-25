import React from "react";
import { Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteTask } from "../../../../services/task";
import { openCustomNotificationWithIcon } from "../../../../common/Notifycations";

function DeleteTask({ data, getTasks }: any) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const confirm = async () => {
    setLoading(true);
    const response = await deleteTask(data.id);
    if (response.data.status === 200) {
      openCustomNotificationWithIcon(
        "success",
        "delete task",
        "delete task success"
      );
      setOpen(false);
      getTasks();
    } else {
      openCustomNotificationWithIcon(
        "error",
        "delete task",
        "delete task error"
      );
    }
  };

  const cancel = (e: any) => {
    setOpen(false);
  };
  return (
    <Popconfirm
      title="Are you sure delete task?"
      onConfirm={confirm}
      onCancel={cancel}
      open={open}
      okText="Yes"
      cancelText="No"
    >
      <DeleteOutlined
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      />
    </Popconfirm>
  );
}

export default DeleteTask;
