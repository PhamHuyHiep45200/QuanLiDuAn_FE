import { Button, Form, Input } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import { forgotPasswordId } from "../../../services/user";

function ChangePassWord() {
  const { id }: any = useParams();
  const handleSubmit = async (value: any) => {
    const response = await forgotPasswordId(+id, { password: value.password });
    if (response.data.status === 200) {
      openCustomNotificationWithIcon(
        "success",
        "Đổi mật khẩu",
        "Đổi mật khẩu thành công"
      );
    } else {
      openCustomNotificationWithIcon(
        "error",
        "Đổi mật khẩu",
        "Đổi mật khẩu thất bại"
      );
    }
  };
  return (
    <div className="flex justify-center items-center ">
      <div
        className="flex flex-col items-center w-[300px] h-[300px] mt-[100px] p-5"
        style={{ boxShadow: "0 0 3px 3px #f8f8f8" }}
      >
        <h3 className="text-[30px]">Quên mật khẩu</h3>
        <Form onFinish={handleSubmit}>
          <Form.Item
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: "không được để trống!",
              },
            ]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: "không được để trống!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>
          <div className="text-center">
            <Button htmlType="submit" type="primary">
              Đổi mật khẩu
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ChangePassWord;
