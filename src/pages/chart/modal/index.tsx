import React, { memo, useContext, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  Typography,
  Avatar,
  Skeleton,
  Timeline,
} from "antd";
import Upload from "antd/es/upload";
import { CloseCircleOutlined, ClockCircleOutlined } from "@ant-design/icons";
import AssignUser from "../../../common/AssignUser";
import moment from "moment";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import { updateTask } from "../../../services/task";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../firebase";
import { createComment, getCommentTask } from "../../../services/comment-task";
import Comment from "./Comment";
const { TextArea } = Input;
const getName = (name: string) => {
  const nameSplit = name?.trim()?.split("");
  return nameSplit && nameSplit[0];
};
const { RangePicker } = DatePicker;
const { Text } = Typography;
const dateFormat = "YYYY/MM/DD";
const dataStatus = [
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
function DescriptionsTask(props: any) {
  const { open, setOpen, title, data, refesh } = props;
  const id_user: any = localStorage.getItem("id_user");
  const [form] = Form.useForm();
  const [formComment] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingImage, setLoadingImage] = useState<boolean>(false);
  const [user, setUser] = useState<any>(undefined);
  const [userManager, setUserManager] = useState<any>(undefined);
  const [fileList, setFileList] = useState<any[]>([]);
  const [comment, setComment] = useState<any>([]);
  const [history, setHistoty] = useState<any>([]);

  const handleSubmit = async (value: any) => {
    const thumbnail = value.thumbnail.map((thu: any) => thu.url);
    const startTime =
      value.estimate.length > 0 ? value.estimate[0].toISOString() : null;
    const endTime =
      value.estimate.length > 0 ? value.estimate[1].toISOString() : null;
    const dataSubmit = {
      // id_user: user ? user?.id : null,
      // status: "OPEN",
      descriptions: value.descriptions,
      // userManager: userManager ? userManager?.id : null,
      start_Time: startTime,
      end_Time: endTime,
      thumbnail,
    };
    const response = await updateTask(data.id, dataSubmit);
    if (response.data) {
      handleCancel();
      refesh();
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };
  const handleChangeImage = (value: any) => {
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
  const handleCancel = () => {
    setOpen(false);
  };
  useEffect(() => {
    const thumbnail = data?.thumbnail?.map((thu: any) => {
      return {
        status: "done",
        url: thu,
        id: Math.random(),
      };
    });
    form.setFieldsValue({
      descriptions: data?.descriptions,
      estimate: [
        moment(moment(data?.start_Time).format(dateFormat), dateFormat),
        moment(moment(data?.end_Time).format(dateFormat), dateFormat),
      ],
      thumbnail,
    });
    setFileList(thumbnail);
    setUser(data?.UserTask[0]?.User);
    commentGet();
    // setUserManager(data?.userManager);
  }, [data]);

  const commentGet = async () => {
    const response = await getCommentTask(data?.id);
    console.log(response.data);

    if (response?.data?.status === 200) {
      setComment(response?.data?.data);
      setHistoty(response?.data?.history);
    }
  };

  const handleComment = async (value: any) => {
    const dataSubmit = {
      taskId: data.id,
      userId: +id_user,
      content: value.content,
    };
    const response = await createComment(dataSubmit);
    if (response?.data?.status === 200) {
      commentGet();
      formComment.resetFields();
    } else {
      openCustomNotificationWithIcon("error", "BÌnh luận task", "Có lỗi");
    }
  };

  console.log(comment);

  return (
    <Modal
      title={title}
      open={open}
      footer={false}
      onCancel={handleCancel}
      width={1000}
    >
      <div className="flex">
        <div className=" border-r-[1px] border-[#d3d3d3] px-5 flex-1">
          <Form
            onFinish={handleSubmit}
            labelAlign="left"
            colon={false}
            form={form}
          >
            <div className="flex items-center mb-2">
              <Text className="min-w-[125px]">assign user</Text>
              {user ? (
                <div className="relative">
                  <Avatar src={user?.thumbnail?.length > 0 && user?.thumbnail}>
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
                      userManager?.thumbnail?.length > 0 &&
                      userManager?.thumbnail
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
                onRemove={(value) => handleDeleteImage(value)}
              >
                {loadingImage ? <Skeleton.Image active={true} /> : "+ Upload"}
              </Upload>
            </Form.Item>
            <div style={{ textAlign: "center" }}>
              <Button htmlType="submit" type="primary" loading={loading}>
                update
              </Button>
            </div>
          </Form>
        </div>
        <div className="px-5 w-[300px] flex flex-col justify-between">
          <div className="font-bold flex items-center mb-[5px]">
            Lịch sử thay đổi <ClockCircleOutlined className="ml-[5px]" />
          </div>
          <div className="h-[200px] py-[10px] overflow-y-auto">
            <Timeline>
              {history?.length > 0 &&
                history.map((e: any) => (
                  <Timeline.Item key={e.id}>
                    <span className="text-[12px] text-[#777]">
                      {e?.createTask && id_user == e?.UserHistory?.id && (
                        <span>
                          {moment(e.createdAt).format("YYYY-MM-DD HH:mm:ss")} :{" "}
                          <span className="text-[red]">Bạn</span> tạo task
                        </span>
                      )}
                      {e?.createTask && id_user != e?.UserHistory?.id && (
                        <span>
                          {moment(e.createdAt).format("YYYY-MM-DD HH:mm:ss")}{" "}
                          <Avatar
                            size={"small"}
                            src={e?.UserHistory?.thumbnail}
                            className="!w-[16px] !h-[16px]"
                          />
                          <span className="text-[red] mr-[5px] ml-[3px]">
                            {e?.UserHistory?.firstName}{" "}
                            {e?.UserHistory?.lastName}
                          </span>
                          tạo task
                        </span>
                      )}
                      {!e?.createTask && id_user == e?.UserHistory?.id && (
                        <div>
                          {moment(e.createdAt).format("YYYY-MM-DD HH:mm:ss")} :{" "}
                          <span className="text-[red]">Bạn</span> thay đổi trạng
                          thái từ{" "}
                          <div
                            className="w-[10px] h-[10px] rounded-[2px] mx-[2px]"
                            style={{
                              backgroundColor: dataStatus.find(
                                (da: any) => da.type === e?.oldStatus
                              )?.color,
                              display: "inline-block",
                              boxShadow: "0 0 1px 1px #f8f8f8",
                            }}
                          ></div>{" "}
                          thành{" "}
                          <div
                            className="w-[10px] h-[10px] rounded-[2px] mx-[2px] inline-block"
                            style={{
                              backgroundColor: dataStatus.find(
                                (da: any) => da.type === e?.newStatus
                              )?.color,
                              display: "inline-block",
                              boxShadow: "0 0 1px 1px #f8f8f8",
                            }}
                          ></div>{" "}
                        </div>
                      )}
                      {!e?.createTask && id_user != e?.UserHistory?.id && (
                        <span>
                          {moment(e.createdAt).format("YYYY-MM-DD HH:mm:ss")}{" "}
                          <Avatar
                            size={"small"}
                            src={e?.UserHistory?.thumbnail}
                            className="!w-[16px] !h-[16px]"
                          />
                          <span className="text-[red] mr-[5px] ml-[3px]">
                            {e?.UserHistory?.firstName}{" "}
                            {e?.UserHistory?.lastName}
                          </span>
                          Bạn thay đổi trạng thái từ{" "}
                          <div
                            className="w-[10px] h-[10px] rounded-[2px] mx-[2px]"
                            style={{
                              backgroundColor: dataStatus.find(
                                (da: any) => da.type === e?.oldStatus
                              )?.color,
                              display: "inline-block",
                              boxShadow: "0 0 1px 1px #f8f8f8",
                            }}
                          ></div>{" "}
                          thành{" "}
                          <div
                            className="w-[10px] h-[10px] rounded-[2px] mx-[2px]"
                            style={{
                              backgroundColor: dataStatus.find(
                                (da: any) => da.type === e?.newStatus
                              )?.color,
                              display: "inline-block",
                              boxShadow: "0 0 1px 1px #f8f8f8",
                            }}
                          ></div>{" "}
                        </span>
                      )}
                    </span>
                  </Timeline.Item>
                ))}
            </Timeline>
          </div>
          <div className="flex justify-end flex-col  mt-5">
            <div className="font-bold">Bình luận</div>
            <div
              className="w-full"
              style={{ boxShadow: "0 1px 1px 1px #888" }}
            ></div>
            <div className="overflow-y-auto h-[250px]">
              <div className="flex flex-col justify-end min-h-[250px]">
                {comment?.length > 0 ? (
                  comment?.map((e: any) => (
                    <Comment e={e} key={e.id} getData={commentGet} />
                  ))
                ) : (
                  <div className="text-center text-[#999] text-[13px] mb-5">
                    Chưa có bình luận cho task này.
                  </div>
                )}
              </div>
            </div>
            <Form onFinish={handleComment} form={formComment}>
              <div className="flex items-center">
                <Form.Item noStyle rules={[{ required: true }]} name="content">
                  <Input />
                </Form.Item>
                <Button className="ml-[10px]" type="primary" htmlType="submit">
                  Bình luận
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default memo(DescriptionsTask);
