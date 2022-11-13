import React, { useContext, useState } from "react";
import { Button, Form, Input, Modal, DatePicker, Typography } from "antd";
import Upload from "antd/es/upload";
import moment from "moment";
import { openCustomNotificationWithIcon } from "../../../../common/Notifycations";
import AssignUser from "../../../../common/AssignUser";
const { TextArea } = Input;

const { RangePicker } = DatePicker;
const { Text } = Typography;

function AddProject(props: any) {
  const { open, setOpen } = props;
  const [loading, setLoading] = useState<boolean>(false);
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
          <AssignUser />
        </div>
        <div className="flex items-center mb-2">
          <Text className="min-w-[125px]">assign manager</Text>
          <AssignUser />
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
