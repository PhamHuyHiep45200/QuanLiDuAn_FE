import React from "react";
import { Popover } from "antd";
import { updateTask } from "../services/task";
import { openCustomNotificationWithIcon } from "./Notifycations";
import { ContextProvider } from "../context/ContextProvider";

const data = [
  {
    id: 1,
    color: "#ddd8d8",
    name: "Chưa làm",
    type: "OPEN",
  },
  {
    id: 2,
    color: "#ff4700",
    name: "Đang làm",
    type: "DOING",
  },
  {
    id: 3,
    color: "#4fff16",
    name: "Hoàn thành",
    type: "COMPLETED",
  },
  {
    id: 4,
    color: "#ff00e0",
    name: "Không hợp lệ",
    type: "ILLEGAL",
  },
  {
    id: 5,
    color: "#ffeb00",
    name: "Tạm dừng",
    type: "PENDDING",
  },
];

function StatusTask({ initColor, idTask, getTasks }: any) {
  const socket = React.useContext(ContextProvider);
  const id_user: any = localStorage.getItem("id_user");
  const [color, setColor] = React.useState<string>(initColor);
  const [open, setOpen] = React.useState<boolean>(false);
  const changeStatus = async (item: any) => {
    const response = await updateTask(+idTask, {
      status: item.type,
      idUserChange: +id_user,
    });
    console.log(response);

    if (response?.data?.status === 200) {
      getTasks();
      setColor(item.color);
      setOpen(false);
      socket.emit("actionNotify", { status: item.type });
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };
  const content = (
    <div>
      {data.map((item) => (
        <div
          key={item.id}
          onClick={() => changeStatus(item)}
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
        >
          <span
            style={{
              background: item.color,
              width: "10px",
              height: "10px",
              display: "block",
              marginRight: "0.5rem",
              borderRadius: "2px",
            }}
          ></span>
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <Popover content={content} title={false} trigger="click" open={open}>
      <div
        style={{
          background: color,
          width: "10px",
          height: "10px",
          cursor: "pointer",
          borderRadius: "2px",
        }}
        onClick={() => setOpen(!open)}
      ></div>
    </Popover>
  );
}

export default StatusTask;
