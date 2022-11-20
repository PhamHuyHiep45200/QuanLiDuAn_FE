import React, { memo, useContext, useEffect, useState } from "react";
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
import { CloseCircleOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import AssignUser from "../../../common/AssignUser";
import moment from "moment";
const { TextArea } = Input;
const getName = (name: string) => {
  const nameSplit = name.trim().split("");
  return nameSplit[0];
};
const { RangePicker } = DatePicker;
const { Text } = Typography;
const dateFormat = "YYYY/MM/DD";

function DescriptionsTask(props: any) {
  const [form] = Form.useForm();
  const { open, setOpen, title, data, refesh } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(undefined);
  const [userManager, setUserManager] = useState<any>(undefined);
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = async (value: any) => {
    console.log(value);
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
  useEffect(() => {
    form.setFieldsValue({
      descriptions: data?.descriptions,
      estimate: [
        moment(moment(data?.start_Time).format(dateFormat), dateFormat),
        moment(moment(data?.end_Time).format(dateFormat), dateFormat),
      ],
    });
  }, [data]);

  return (
    <Modal
      title={title}
      open={open}
      footer={false}
      onCancel={handleCancel}
      width={800}
    >
      <Form onFinish={handleSubmit} labelAlign="left" colon={false} form={form}>
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
            update
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default memo(DescriptionsTask);
