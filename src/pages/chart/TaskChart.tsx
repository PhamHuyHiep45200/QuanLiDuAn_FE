import React, { useState } from "react";
import { Typography } from "antd";
import { RightOutlined } from "@ant-design/icons";
import StatusTask from "../../common/StatusTask";
import DescriptionsTask from "./modal";
const { Text } = Typography;

function TaskChart({
  status,
  task,
  setDatask,
  setOpenDescription,
  refesh,
}: any) {
  const [openTask, setOpenTask] = useState(false);
  return (
    <div className="cursor-pointer mt-[10px]" key={status.status}>
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setOpenTask(!openTask)}
      >
        <RightOutlined
          className={`text-[10px] !text-[#888] mr-[4px] transition-all ease-linear ${
            openTask && "rotate-90"
          }`}
        />
        <div
          className={`w-[10px] h-[10px] rounded-sm shadow-lg`}
          style={{ backgroundColor: status.color }}
        ></div>
        <Text className="text-[11px] font-bold ml-[5px]">
          {status.status}{" "}
          <Text className="!text-[#888] font-medium">({task.length})</Text>
        </Text>
      </div>
      {openTask && (
        <div style={{ borderBottom: `1px solid ${status.color}` }}>
          {task.map((ta: any) => (
            <div
              key={ta.id}
              className=" flex items-center cursor-pointer h-[30px] my-[5px] hover:bg-[#f8f8f8]"
            >
              <div className="min-w-[10px]">
                <StatusTask
                  initColor={status.color}
                  idTask={ta?.id}
                  getTasks={refesh}
                />
              </div>
              <div
                className="block truncate ml-[5px] text-[13px]"
                onClick={() => {
                  setOpenDescription(true);
                  setDatask(ta);
                }}
              >
                {ta.descriptions}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskChart;
