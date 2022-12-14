import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  Typography,
  Avatar,
  Skeleton,
  Switch,
} from "antd";
import Upload from "antd/es/upload";
import { storage } from "../../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
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

function AddTask(props: any) {
  const { open, setOpen, getTasks, id_taskParent } = props;
  const [form] = Form.useForm();
  const { id }: any = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [user, setUser] = useState<any>(undefined);
  const [userManager, setUserManager] = useState<any>(undefined);
  const [fileList, setFileList] = useState<any[]>([]);
  const handleSubmit = async (value: any) => {
    let thumbnail: any = [];
    if (value.thumbnail) {
      thumbnail = value.thumbnail.map((thu: any) => thu.url);
    }
    const startTime =
      value?.estimate?.length > 0 ? value.estimate[0].toISOString() : null;
    const endTime =
      value?.estimate?.length > 0 ? value.estimate[1].toISOString() : null;
    const dataSubmit = {
      id_item: +id,
      id_user: user ? user?.id : null,
      status: "OPEN",
      taskParentId: id_taskParent ? id_taskParent : null,
      descriptions: value.descriptions,
      userManager: userManager ? userManager?.id : null,
      start_Time: startTime,
      end_Time: endTime,
      thumbnail: thumbnail,
    };
    console.log(dataSubmit);

    const response = await createTask(dataSubmit);
    if (response.data) {
      getTasks();
      handleCancel();
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };
  const handleChangeImage = async (value: any) => {
    setLoadingImage(true);
    const refImage = ref(storage, `/files/${value.file.name}`);
    const uploadChange = uploadBytesResumable(refImage, value.file);

    uploadChange.on(
      "state_changed",
      (snapshot) => {
        console.log(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadChange.snapshot.ref).then((url) => {
          const data = fileList;
          data.push({
            status: "done",
            url: url,
            id: Math.random(),
          });
          form.setFieldValue("thumbnail", data);
          setFileList([...data]);
          setLoadingImage(false);
        });
      }
    );
  };
  const handleCancel = () => {
    setOpen(false);
    setUser(undefined);
    setUserManager(undefined);
    setFileList([]);
    form.resetFields();
  };
  const handleDeleteImage = (value: any) => {
    const data = fileList;
    let position = 0;
    data.map((da, index) => {
      if (da.id === value.id) {
        position = index;
      }
    });
    data.splice(position, 1);
    setFileList([...data]);
    form.setFieldValue("thumbnail", data);
  };

  return (
    <Modal
      title="add task"
      open={open}
      footer={false}
      onCancel={handleCancel}
      width={800}
    >
      <Form
        onFinish={handleSubmit}
        labelAlign="left"
        colon={false}
        form={form}
        initialValues={{ private: false }}
      >
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
            onRemove={(value) => handleDeleteImage(value)}
          >
            {loadingImage ? <Skeleton.Image active={true} /> : "+ Upload"}
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

export default AddTask;
