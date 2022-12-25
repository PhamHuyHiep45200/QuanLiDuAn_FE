import React, { useContext, useState } from "react";
import { Button, Form, Input, Modal, DatePicker } from "antd";
import Upload from "antd/es/upload";
import { create } from "../../../services/project";
import { CreateRefeshProject } from "../Contents";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import { createTask } from "../../../services/task";
import moment from "moment";
const { TextArea } = Input;

const { RangePicker } = DatePicker;

interface AddProjectProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  typeModal: string;
  typeModalParent: string | undefined;
}

function AddProject(props: AddProjectProps) {
  const { isModalOpen, handleCancel, typeModal, typeModalParent } = props;
  const { setRefesh } = useContext(CreateRefeshProject);
  const [loading, setLoading] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const handleSubmit = async (value: any) => {
    const id_user: any = localStorage.getItem("id_user");
    setLoading(true);
    if (typeModal !== "task") {
      const dataSubmit: any = {
        name: value[typeModal],
        id_user: +id_user,
      };
      if (typeModalParent) {
        dataSubmit[typeModalParent] = null;
      }
      const response = await create(dataSubmit, typeModal);
      if (response.data) {
        setRefesh(response.data);
        handleCancel();
        setLoading(false);
      } else {
        openCustomNotificationWithIcon(
          "error",
          `add ${typeModal}`,
          `add ${typeModal} error`
        );
        setLoading(false);
      }
    } else {
      const dataSubmit = {
        id_item: null,
        id_user: +id_user,
        id_taskParent: null,
        descriptions: value.descriptions,
        userManager: null,
        start_Time: moment(value.estimate[0]).format("YYYY-MM-DD"),
        end_Time: moment(value.estimate[1]).format("YYYY-MM-DD"),
        level: null,
      };
      const response = await createTask(dataSubmit);
      if (response.data) {
        setRefesh(response.data);
        handleCancel();
        setLoading(false);
      } else {
        openCustomNotificationWithIcon(
          "error",
          `add ${typeModal}`,
          `add ${typeModal} error`
        );
        setLoading(false);
      }
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

  return (
    <Modal
      title={`add ${typeModal}`}
      open={isModalOpen}
      footer={false}
      onCancel={handleCancel}
      width={typeModal === "task" ? 800 : 400}
    >
      <Form onFinish={handleSubmit} labelAlign="left" colon={false}>
        {typeModal === "task" ? (
          <>
            {/* <div className="flex items-center mb-2">
              <Text className="min-w-[125px]">assign user</Text>
              <AssignUser />
            </div>
            <div className="flex items-center mb-2">
              <Text className="min-w-[125px]">assign manager</Text>
              <AssignUser />
            </div> */}
            <Form.Item
              label={<div className="min-w-[115px]">desription</div>}
              name="descriptions"
              rules={[
                { required: true, message: "Please input your desription!" },
              ]}
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
          </>
        ) : (
          <Form.Item label="name" name={typeModal}>
            <Input />
          </Form.Item>
        )}
        <div style={{ textAlign: "center" }}>
          <Button htmlType="submit" type="primary" loading={loading}>
            add {typeModal}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default AddProject;
