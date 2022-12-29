import React, { useState } from "react";
import {
  AntDesignOutlined,
  AreaChartOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Spin,
  Form,
  Image,
  Input,
  Modal,
  Popover,
  Tooltip,
  Typography,
} from "antd";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useLocation, useNavigate } from "react-router-dom";
import { CreateProviderProject } from ".";
import moment from "moment";
import EditInfo from "./EditInfo";
import { storage } from "../../firebase";
import { getOneUser, updateInfoUser } from "../../services/user";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { async } from "@firebase/util";
import { ContextProvider } from "../../App";
const { Text } = Typography;
const dataTabs = [
  {
    label: "List",
    value: "task",
    router: "/home/task/",
    icon: <UnorderedListOutlined className="text-[18px]" />,
  },
  {
    label: "Chart",
    value: "chart",
    router: "/home/chart/",
    icon: <AreaChartOutlined className="text-[18px]" />,
  },
];

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function ContentCenter() {
  const { user, setUser } = React.useContext(ContextProvider);
  const id: any = localStorage.getItem("id_user");
  const { idItem } = React.useContext(CreateProviderProject);
  const [form] = Form.useForm();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [infoUser, setInfoUser] = useState<any>();
  const [image, setImage] = useState(user?.thumbnail);
  const navigate = useNavigate();

  const handleTabs = (route: string) => {
    navigate(route + idItem ?? 0);
  };

  const content = () => (
    <div className="flex flex-col">
      <div
        className="py-[5px] px-5 hover:bg-[#f5f5f5] cursor-pointer"
        onClick={handleInfo}
      >
        Thông tin của tôi
      </div>
      <div
        className="py-[5px] px-5 hover:bg-[#f5f5f5] cursor-pointer"
        onClick={handleLogout}
      >
        Đăng xuất
      </div>
    </div>
  );
  const handleInfo = () => {
    setOpen(true);
    // getInfo();
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChangeImage = async (e: any) => {
    const file = e.target.files[0];
    const refImage = ref(storage, `/files/${file.name}`);
    const uploadChange = uploadBytesResumable(refImage, file);

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
        getDownloadURL(uploadChange.snapshot.ref).then(async (url) => {
          setImage(url);
          await updateInfoUser(+id, { thumbnail: url });
        });
      }
    );
  };

  const handleSubmit = async (value: any) => {
    const response = await updateInfoUser(id, value);
    console.log(response);

    if (response.data.status === 200) {
      setUser(response.data.data);
      openCustomNotificationWithIcon("success", "Sửa thông tin", "Thành công");
    } else {
      openCustomNotificationWithIcon(
        "success",
        "Sửa thông tin",
        "Đã có lỗi xảy ra !!!"
      );
    }
  };

  const getInfo = async () => {
    // setLoading(true);
    // const response = await getOneUser(+id);
    // console.log(response);
    // if (response.data.status === 200) {
    //   setLoading(false);
    //   setInfoUser(response.data.data);
    //   form.setFieldsValue({
    //     firstName: response.data.data?.firstName,
    //     lastName: response.data.data?.lastName,
    //     phone: response.data.data?.phone,
    //   });
    //   setImage(response.data.data.thumbnail);
    // } else {
    //   openCustomNotificationWithIcon("error", "error", "error");
    // }
  };

  return (
    <div className="flex justify-between w-full mx-10 items-center">
      <div className="flex items-center">
        <div className="ml-5 mr-10">tên</div>
        {dataTabs.map((tabs, index) => (
          <div
            key={index}
            className={`flex items-center px-[15px] border-l-[1px] border-[#d3d3d3] cursor-pointer ${
              pathname.split("/").includes(tabs.value) &&
              "!text-[blue] relative before:absolute before:content-[' '] before:top-[100%] before:w-[60px] before:h-[2px] before:bg-[blue] before:left-[50%] before:translate-x-[-50%]"
            }`}
            onClick={() => handleTabs(tabs.router)}
          >
            {tabs.icon}
            <Text
              className={`text-[16px] !text-[#000] block ml-[5px] ${
                pathname.split("/").includes(tabs.value) &&
                "!text-[blue] font-medium"
              }`}
            >
              {tabs.label}
            </Text>
          </div>
        ))}
      </div>
      <div className="cursor-pointer">
        <Popover content={content} title={false} className="!p-0">
          <div className="flex items-center">
            <Avatar src={user && user?.thumbnail}>
              {user && user?.email.split("")[0]}
            </Avatar>
            <span className="font-bold ml-[5px] text-[18px]">
              {user && user?.firstName} {user && user?.lastName}
            </span>
          </div>
        </Popover>
      </div>
      <Modal
        open={open}
        title={user?.firstName + " " + user?.lastName}
        footer={false}
        onCancel={handleClose}
        width={800}
      >
        <div>
          <div>
            <div className="flex justify-start">
              <div className="w-[50%] border-r-[2px] border-[#d3d3d3] p-5 flex flex-col items-center justify-center">
                <Image
                  src={image ?? user?.thumbnail}
                  width={300}
                  height={300}
                  className="rounded-full"
                  preview={false}
                />
                <div>
                  <input type="file" onChange={handleChangeImage} />
                </div>
              </div>

              <div className="p-5">
                <Form
                  form={form}
                  onFinish={handleSubmit}
                  initialValues={{
                    firstName: user && user.firstName,
                    lastName: user && user.lastName,
                    phone: user && user.phone,
                  }}
                >
                  <div className="flex items-center mt-5">
                    <span className="min-w-[150px]">Tên</span>
                    {/* <EditInfo
                        name={"firstName"}
                        data={infoUser?.firstName}
                        form={form}
                      /> */}
                    <Form.Item name="firstName" noStyle>
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="flex items-center mt-5">
                    <span className="min-w-[150px]">Tên Đệm</span>
                    {/* <EditInfo
                        name={"lastName"}
                        data={infoUser?.lastName}
                        form={form}
                      /> */}
                    <Form.Item name="lastName" noStyle>
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="flex items-center mt-5">
                    <span className="min-w-[150px]">Email</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center mt-5">
                    <span className="min-w-[150px]">Số điện thoại</span>
                    {/* <EditInfo
                        name={"phone"}
                        data={infoUser?.phone}
                        form={form}
                      /> */}
                    <Form.Item name="phone" noStyle>
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="flex items-center mt-5">
                    <span className="min-w-[150px]">Ngày Sinh</span>
                    <span>{moment(user?.birthday).format("YYYY-MM-DD")}</span>
                  </div>
                  <div className="flex items-center mt-5">
                    <span className="min-w-[150px]">Ngày tạo tài khoản</span>
                    <span>
                      {moment(user?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
                  </div>
                  <div className="text-center mt-5">
                    <Button htmlType="submit" type="primary">
                      Sửa
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ContentCenter;
