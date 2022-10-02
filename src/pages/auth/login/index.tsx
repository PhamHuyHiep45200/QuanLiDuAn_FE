import { Button, Drawer, Form, Space, Typography } from "antd";
import Input from "antd/lib/input/Input";
import React from "react";

const { Title } = Typography;

interface LoginProps {
  openLogin: boolean;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SubmitForm {
  email: string;
  password: string;
}

function Login(props: LoginProps) {
  const { openLogin, setOpenLogin } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const onClose = () => {
    setOpenLogin(false);
  };

  const handleSubmit = (value: SubmitForm) => {
    console.log(value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpenLogin(false);
    }, 1000);
  };
  return (
    <Drawer
      title="Close"
      placement="right"
      onClose={onClose}
      open={openLogin}
      width={600}
    >
      <Space
        direction="vertical"
        align="center"
        style={{ width: "100%", height: "100%", justifyContent: "center" }}
      >
        <Title level={4} style={{ width: "100%", textAlign: "center" }}>
          Login Shash
        </Title>
        <Form
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
    </Drawer>
  );
}

export default Login;
