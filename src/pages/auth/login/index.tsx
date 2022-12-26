import { Button, Modal, Form, Space, Typography } from "antd";
import Input from "antd/lib/input/Input";
import React from "react";
import { useNavigate } from "react-router-dom";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import { login, LoginType } from "../../../services/auth";

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
  return (
    <Modal open={openLogin} onCancel={onClose} title="Login" footer={false}>
      <Space
        direction="vertical"
        align="center"
        style={{ width: "100%", height: "100%", justifyContent: "center" }}
      >
        <Title level={4} style={{ width: "100%", textAlign: "center" }}>
          Login Shash
        </Title>
        <Form
          form={form}
          colon={false}
          style={{ marginBottom: "200px" }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="email"
            label={
              <div style={{ minWidth: "60px", textAlign: "left" }}>Email</div>
            }
            rules={[{ required: true, message: "Please input your username!" }]}
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
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <Button htmlType="submit" type="primary" loading={loading}>
              Login
            </Button>
          </Space>
        </Form>
      </Space>
    </Modal>
  );
}

export default Login;
