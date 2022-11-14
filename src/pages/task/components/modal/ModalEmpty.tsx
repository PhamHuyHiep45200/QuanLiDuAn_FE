import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  Typography,
  Avatar,
} from "antd";
import Upload from "antd/es/upload";
import moment from "moment";
import { openCustomNotificationWithIcon } from "../../../../common/Notifycations";
import { CloseCircleOutlined } from "@ant-design/icons";
import AssignUser from "../../../../common/AssignUser";
import { useParams } from "react-router-dom";
import { createTask } from "../../../../services/task";
const { TextArea } = Input;
const getName = (name: string) => {
  const nameSplit = name.trim().split("");
  return nameSplit[0];
};
const { RangePicker } = DatePicker;
const { Text } = Typography;

function AddProject(props: any) {
  const { open, setOpen, getTasks } = props;
  const { id }: any = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(undefined);
  const [userManager, setUserManager] = useState<any>(undefined);
  const [fileList, setFileList] = useState<any[]>([]);
  const handleSubmit = async (value: any) => {
    const startTime = value.estimate[0].toISOString();
    const endTime = value.estimate[1].toISOString();
    const dataSubmit = {
      id_item: +id,
      id_user: user ? user?.id : null,
      status: "OPEN",
      id_taskParent: null,
      descriptions: value.descriptions,
      userManager: userManager ? userManager?.id : null,
      start_Time: startTime,
      end_Time: endTime,
      level: "NO",
    };
    const response = await createTask(dataSubmit);
    if (response.data) {
      getTasks();
      handleCancel();
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };
  const handleChangeImage = (value: any) => {
    console.log(value.file);
    const file = URL.createObjectURL(value.file);
    const data = fileList;
    data.push({
      status: "done",
      url: file,
      id: 2,
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="add task"
      open={open}
      footer={false}
      onCancel={handleCancel}
      width={800}
    >
      <Form onFinish={handleSubmit} labelAlign="left" colon={false}>
        <div className="flex items-center mb-2">
          <Text className="min-w-[125px]">assign user</Text>
          {user ? (
            <div className="relative">
              <Avatar src={user?.thumbnail.length > 0 && user?.thumbnail}>
                {getName(user?.email)}
              </Avatar>
              <CloseCircleOutlined
                className="absolute top-0 right-[-3px] bg-[#fff] rounded-full"
                onClick={() => setUser(undefined)}
              />
            </div>
          ) : (
            <AssignUser setState={setUser} />
          )}
        </div>
        <div className="flex items-center mb-2">
          <Text className="min-w-[125px]">assign manager</Text>
          {userManager ? (
            <div className="relative">
              <Avatar
                src={
                  userManager?.thumbnail.length > 0 && userManager?.thumbnail
                }
              >
                {getName(userManager?.email)}
              </Avatar>
              <CloseCircleOutlined
                className="absolute top-0 right-[-3px] bg-[#fff] rounded-full"
                onClick={() => setUserManager(undefined)}
              />
            </div>
          ) : (
            <AssignUser setState={setUserManager} />
          )}
        </div>
        <Form.Item
          label={<div className="min-w-[115px]">desription</div>}
          name="descriptions"
          rules={[{ required: true, message: "Please input your desription!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label={<div className="min-w-[115px]">estimate time</div>}
          name="estimate"
        >
          <RangePicker />
        </Form.Item>
        <Form.Item
          label={<div className="min-w-[115px]">desription</div>}
          name="thumbnail"
        >
          <Upload
            multiple
            directory={false}
            listType="picture-card"
            accept=".png, .jpg, .jpeg"
            fileList={fileList}
            customRequest={handleChangeImage}
            onRemove={(value) => console.log(value)}
          >
            {"+ Upload"}
          </Upload>
        </Form.Item>
        <div style={{ textAlign: "center" }}>
          <Button htmlType="submit" type="primary" loading={loading}>
            add task
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddProject;
