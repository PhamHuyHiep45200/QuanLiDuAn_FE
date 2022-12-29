import {
  Button,
  DatePicker,
  Modal,
  Form,
  Radio,
  Space,
  Typography,
  Upload,
} from "antd";
import Input from "antd/lib/input/Input";
import React from "react";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import { createUser } from "../../../services/user";

const { Title } = Typography;

interface RegisterProps {
  openRegister: boolean;
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SubmitForm {
  email: string;
  password: string;
}

function Register(props: RegisterProps) {
  const { openRegister, setOpenRegister } = props;
  const [loading, setLoading] = React.useState<boolean>(false);
  const onClose = () => {
    setOpenRegister(false);
  };

  const handleSubmit = async (value: any) => {
    setLoading(true);
    const dataSubmit = {
      ...value,
      birthday: value.birthday.toISOString(),
      thumbnail: "",
      role: "USER",
    };
    const response = await createUser(dataSubmit);
    console.log(response, dataSubmit);

    if (response?.data?.status === 200) {
      setLoading(false);
      openCustomNotificationWithIcon(
        "success",
        "Đăng kí tài khoản",
        "Bạn đã đăng kí thành công"
      );
      setOpenRegister(false);
    } else {
      setLoading(false);
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };
  return (
    <Modal
      title="Register"
      onCancel={onClose}
      open={openRegister}
      footer={false}
    >
      <Space
        direction="vertical"
        align="center"
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title level={4} style={{ width: "100%", textAlign: "center" }}>
          Register Shash
        </Title>
        <Form colon={false} onFinish={handleSubmit}>
          <Form.Item
            name="firstName"
            label={
              <div style={{ minWidth: "60px", textAlign: "left" }}>
                First Name
              </div>
            }
            rules={[
              { required: true, message: "Please input your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label={
              <div style={{ minWidth: "60px", textAlign: "left" }}>
                Last Name
              </div>
            }
            rules={[
              { required: true, message: "Please input your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="birthday"
            label={
              <div style={{ minWidth: "60px", textAlign: "left" }}>
                Birth Day
              </div>
            }
            rules={[
              { required: true, message: "Please input your birth day!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <div style={{ minWidth: "60px", textAlign: "left" }}>Email</div>
            }
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label={
              <div style={{ minWidth: "60px", textAlign: "left" }}>Phone</div>
            }
            rules={[{ required: true, message: "Please input your phone!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label={
              <div style={{ minWidth: "60px", textAlign: "left" }}>Gender</div>
            }
            rules={[{ required: true, message: "Please input your gender!" }]}
          >
            <Radio.Group value={"male"}>
              <Radio value={"male"}>male</Radio>
              <Radio value={"female"}>female</Radio>
              <Radio value={"other"}>other</Radio>
            </Radio.Group>
          </Form.Item>
          <Space direction="vertical" align="center" style={{ width: "100%" }}>
            <Button htmlType="submit" type="primary" loading={loading}>
              Register
            </Button>
          </Space>
        </Form>
      </Space>
    </Modal>
  );
}

export default Register;
