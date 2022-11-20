import React from "react";
import { Button } from "antd";
import TableTask from "./TableTask";

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
