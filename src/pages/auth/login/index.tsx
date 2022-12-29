import { Button, Modal, Form, Space, Typography, Tabs } from "antd";
import Input from "antd/lib/input/Input";
import React from "react";
import { useNavigate } from "react-router-dom";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import { login, LoginType } from "../../../services/auth";
import { forgotPassword } from "../../../services/user";

const { Title } = Typography;

interface LoginProps {
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login(props: LoginProps) {
  const { openLogin, setOpenLogin } = props;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);
  const onClose = () => {
    setOpenLogin(false);
    form.resetFields();
  };

  const handleSubmit = async (value: LoginType) => {
    setLoading(true);
    console.log(value);

    const response = await login(value);
    if (response.data.status === 200) {
      setLoading(false);
      setOpenLogin(false);
      console.log(response.data);
      if (localStorage.getItem("id_user")) {
        localStorage.removeItem("id_user");
      }
      localStorage.setItem("id_user", response.data.user.id);
      navigate("/home");
    } else {
      openCustomNotificationWithIcon(
        "error",
        "Login",
        "Vui lòng kiểm tra lại thông tin!"
      );
      setLoading(false);
    }
  };
  const handleSendMail = async (value: any) => {
    setLoading(true);
    const response = await forgotPassword(value);
    if (response?.data?.status === 200) {
      setLoading(false);
      openCustomNotificationWithIcon(
        "success",
        "Quên mật khẩu",
        "Vui lòng check email để thay đổi mật khẩu"
      );
    } else {
      setLoading(false);
      openCustomNotificationWithIcon(
        "error",
        "Quên mật khẩu",
        "Đã có lỗi xảy ra?"
      );
    }
  };

  return (
    <Modal open={openLogin} onCancel={onClose} title="Login" footer={false}>
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: `Đăng nhập`,
            key: "1",
            children: (
              <Space
                direction="vertical"
                align="center"
                style={{
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <Title level={4} style={{ width: "100%", textAlign: "center" }}>
                  Login Shash
                </Title>
                <Form
                  form={form}
                  colon={false}
                  style={{ marginBottom: "50px" }}
                  onFinish={handleSubmit}
                >
                  <Form.Item
                    name="email"
                    label={
                      <div style={{ minWidth: "60px", textAlign: "left" }}>
                        Email
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please input your username!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label={
                      <div style={{ minWidth: "60px", textAlign: "left" }}>
                        Password
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Space
                    direction="vertical"
                    align="center"
                    style={{ width: "100%" }}
                  >
                    <Button htmlType="submit" type="primary" loading={loading}>
                      Login
                    </Button>
                  </Space>
                </Form>
              </Space>
            ),
          },
          {
            label: `Quên mật khẩu`,
            key: "2",
            children: (
              <Form onFinish={handleSendMail}>
                <Form.Item name="email" label="email">
                  <Input />
                </Form.Item>
                <div className="text-center">
                  <Button htmlType="submit" type="primary" loading={loading}>
                    Gửi qua Email
                  </Button>
                </div>
              </Form>
            ),
          },
        ]}
      />
    </Modal>
  );
}

export default Login;
