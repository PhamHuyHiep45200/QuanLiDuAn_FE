import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import { createTask, getTaskAll } from "../../../services/task";
import { Button, Form, Radio, Modal } from "antd";
import TableTask from "./TableTask";
import TaskWorkMe from "./TaskWorkMe";

function WorkMeTask() {
  const [form] = Form.useForm();
  const { id }: any = useParams();
  const [data, setData] = useState<Array<any>>([]);
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState<number>(0);

  const getTasks = async () => {
    const response = await getTaskAll(+id);
    if (response.data.status === 200) {
      setData(response.data.data);
      setCount(response.data.count);
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };
  const handleSubmit = async (value: any) => {
    const idUser: any = localStorage.getItem("id_user");

    const startTime =
      value?.estimate?.length > 0 ? value.estimate[0].toISOString() : null;
    const endTime =
      value?.estimate?.length > 0 ? value.estimate[1].toISOString() : null;

    let thumbnail: any = [];
    if (value.thumbnail) {
      thumbnail = value.thumbnail.map((thu: any) => thu.url);
    }
    const dataSubmit = {
      id_item: +id,
      id_user: +idUser,
      status: "OPEN",
      taskParentId: null,
      descriptions: value.descriptions,
      userManager: null,
      start_Time: startTime,
      end_Time: endTime,
      private: false,
      thumbnail: thumbnail,
    };

    const response = await createTask(dataSubmit);
    if (response.data) {
      getTasks();
      handleCancel();
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };
  const handleCancel = () => {
    setOpen(false);
    // setFileList([]);
    form.resetFields();
  };
  useEffect(() => {
    getTasks();

    if (localStorage.getItem("itemTask")) {
      localStorage.removeItem("itemTask");
    }
    localStorage.setItem("itemTask", id);
  }, []);
  return (
    <>
      <div className="text-right">
        <Button shape="round" onClick={() => setOpen(true)}>
          {" "}
          task
        </Button>
      </div>
      {data.map((task: any) => (
        <>
          {task?.data?.length > 0 && (
            <TableTask task={task} getTasks={getTasks} />
          )}
        </>
      ))}
      <Modal
        open={open}
        footer={false}
        title="Tạo công việc"
        onCancel={handleCancel}
      >
        <div className="mt-5">
          <Form
            colon={false}
            form={form}
            onFinish={handleSubmit}
            labelAlign="left"
          >
            <TaskWorkMe form={form} />
            <div className="text-center">
              <Button htmlType="submit" type="primary">
                Tạo
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  );
}

export default WorkMeTask;
