import React, { useEffect, useState } from "react";
import {
  Image,
  Row,
  Col,
  Progress,
  Button,
  Modal,
  Radio,
  Form,
  Input,
  DatePicker,
  Space,
  Typography,
} from "antd";
import Folder from "../../../assets/image/project.png";
import { useNavigate } from "react-router-dom";
import TaskWorkMe from "./TaskWorkMe";
import { createTask } from "../../../services/task";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import { getAllWorkMe } from "../../../services/work-me";
import TableTask from "./TableTask";
import { createItem } from "../../../services/item";
import { PlusOutlined } from "@ant-design/icons";
import EmptyImage from "../../../assets/image/smile-sad.webp";

const { Title } = Typography;
const { RangePicker } = DatePicker;

function WorkMeHome() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [typeSpace, setTypeSpace] = useState(false);
  const [open, setOpen] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [listTask, setListTask] = useState([]);
  const handleChangeType = (e: any) => {
    setTypeSpace(e.target.value);
  };
  const handleSubmit = async (value: any) => {
    const idUser: any = localStorage.getItem("id_user");

    const startTime =
      value?.estimate?.length > 0 ? value.estimate[0].toISOString() : null;
    const endTime =
      value?.estimate?.length > 0 ? value.estimate[1].toISOString() : null;
    if (typeSpace) {
      let thumbnail: any = [];
      if (value.thumbnail) {
        thumbnail = value.thumbnail.map((thu: any) => thu.url);
      }
      const dataSubmit = {
        id_item: null,
        id_user: +idUser,
        personCreate: +idUser,
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
        getWorkMe();
        handleCancel();
      } else {
        openCustomNotificationWithIcon("error", "error", "error");
      }
    } else {
      const dataSubmit = {
        id_group: null,
        id_user: +idUser,
        personCreate: +idUser,
        name: value.name,
        startDate: startTime,
        endDate: endTime,
      };

      const response = await createItem(dataSubmit);
      console.log(response);

      if (response.data) {
        getWorkMe();
        handleCancel();
      } else {
        openCustomNotificationWithIcon("error", "error", "error");
      }
    }
  };
  const handleCancel = () => {
    setOpen(false);
    // setFileList([]);
    form.resetFields();
  };
  const getWorkMe = async () => {
    const idUser: any = localStorage.getItem("id_user");
    const response = await getAllWorkMe(+idUser);
    console.log(response);
    if (response.data.status === 200) {
      console.log(response.data.dataItem);
      const getData = response.data.dataItem.map((da: any) => {
        const completed = da.Task.filter((e: any) => e.status === "COMPLETED");
        return {
          ...da,
          processWork:
            da.Task.length > 0 ? (completed.length / da.Task.length) * 100 : 0,
        };
      });
      setListTask(response.data.data);
      setListItem(getData);
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };
  useEffect(() => {
    getWorkMe();
  }, []);

  return (
    <div>
      {listItem?.length > 0 || listTask?.length > 0 ? (
        <div>
          <div className="text-right my-5">
            <Button shape="round" type="primary" onClick={() => setOpen(true)}>
              T???o c??ng vi???c
            </Button>
          </div>
          <Row gutter={[16, 16]} className="mb-10">
            {listItem?.map((da: any) => (
              <Col
                span={6}
                key={da.id}
                className="flex justify-center items-center"
              >
                <div
                  className="relative w-[80%] h-[40%] cursor-pointer"
                  onClick={() => navigate(`/me/${da.id}`)}
                >
                  <Image
                    src={Folder}
                    height={150}
                    width={170}
                    preview={false}
                  />
                  <div className="absolute top-[80%] left-[15%] translate-x-[-15%] font-bold text-[14px] text-[#444] truncate">
                    {da.name}
                  </div>
                  <div className="mt-[-20px]">
                    <Progress percent={da.processWork.toFixed(2)} />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
          {listTask.map((task: any) => (
            <>
              {task?.data?.length > 0 && (
                <TableTask task={task} getTasks={getWorkMe} />
              )}
            </>
          ))}
        </div>
      ) : (
        <Space style={{ width: "100%" }} direction="vertical" align="center">
          <Image src={EmptyImage} preview={false} height={300} />
          <Title level={4}>Ti???c qu??! B???n ch??a c?? task n??o...</Title>
          <Button
            type="primary"
            shape="round"
            size="large"
            className="animate-bounce"
            style={{
              background: "linear-gradient(144deg, #0b53da, #fc459b)",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => setOpen(true)}
          >
            <PlusOutlined />
            C??ng vi???c c???a t??i
          </Button>
        </Space>
      )}
      <Modal
        open={open}
        footer={false}
        title="T???o c??ng vi???c"
        onCancel={handleCancel}
      >
        <Radio.Group value={typeSpace} onChange={handleChangeType}>
          <Radio value={false}>th?? m???c</Radio>
          <Radio value={true}>task</Radio>
        </Radio.Group>
        <div className="mt-5">
          <Form form={form} onFinish={handleSubmit} labelAlign="left">
            {!typeSpace ? (
              <>
                <Form.Item
                  name="name"
                  label={<div className="min-w-[115px]">T??n th?? m???c</div>}
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={<div className="min-w-[115px]">estimate time</div>}
                  name="estimate"
                  rules={[{ required: true }]}
                >
                  <RangePicker />
                </Form.Item>
              </>
            ) : (
              <TaskWorkMe form={form} />
            )}
            <div className="text-center">
              <Button htmlType="submit" type="primary">
                T???o
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default WorkMeHome;
