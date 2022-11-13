import React, { useState, useRef } from "react";
import { Button, Form, Modal, Avatar, Select, Typography, Space } from "antd";
import { getUsers } from "../../../services/user";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import styles from "./modal.module.scss";
import { addUserProject } from "../../../services/user-project";
import { useSearchParams } from "react-router-dom";
import { addUserGroup } from "../../../services/user-group";

const { Text } = Typography;
const getName = (name: string) => {
  const nameSplit = name.trim().split("");
  return nameSplit[0];
};
function AddUser({ open, setOpen }: any) {
  const ref = useRef<any>(null);
  const [useSearch] = useSearchParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<Array<any>>([]);

  const handleSubmit = async (value: any) => {
    setLoading(true);
    const idUserParent: any = localStorage.getItem("id_user");
    const name: any = useSearch.get("router");
    const idAdd: any = useSearch.get("router_id");
    if (name === "project") {
      const dataSubmit = {
        id_user_parent: +idUserParent,
        id_user: +value.id,
        [name]: +idAdd,
        status: "PENDDING",
        role: "USER",
      };
      const response = await addUserProject(dataSubmit);
      if (response.data) {
        setLoading(false);
      } else {
        setLoading(false);
        openCustomNotificationWithIcon("error", "add user", "add user error");
      }
    } else {
      const dataSubmit = {
        id_user_parent: +idUserParent,
        id_user: +value.id,
        [name]: +idAdd,
        role: "USER",
      };
      const response = await addUserGroup(dataSubmit);
      if (response.data) {
        setLoading(false);
      } else {
        setLoading(false);
        openCustomNotificationWithIcon("error", "add user", "add user error");
      }
    }
  };

  const onSearch = (value: any) => {
    if (value.trim().length > 0) {
      clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        getUser(value);
      }, 400);
    } else {
      setDataUser([]);
    }
  };
  const getUser = async (value: string) => {
    const response = await getUsers({ q: value });
    if (response.data) {
      setDataUser(response.data.data);
    } else {
      openCustomNotificationWithIcon("error", "get User", "get user error");
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setDataUser([]);
    form.setFieldsValue({ id: undefined });
  };

  return (
    <Modal
      title="Add User"
      open={open}
      footer={false}
      onCancel={handleCancel}
      className={styles.modal}
    >
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item
          label="user email"
          name="id"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Select
            showSearch
            placeholder="search user"
            // onChange={onChange}
            onSearch={onSearch}
            filterOption={false}
          >
            {dataUser?.map((item: any, index: number) => (
              <Select.Option key={index} value={item.id}>
                <div className="flex items-center">
                  <Avatar src={item?.thumbnail.length > 0 && item.thumbnail}>
                    {getName(item?.email)}
                  </Avatar>
                  <Text className="ml-[20px] !text-[#000] font-medium">
                    {`${item?.firstName} ${item.lastName}`}{" "}
                    <Text className="!text-[#666] text-[13px] font-normal">
                      ( {item.email} )
                    </Text>
                  </Text>
                </div>
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Space className="w-full justify-center">
          <Button htmlType="submit" loading={loading} type="primary">
            add user
          </Button>
        </Space>
      </Form>
    </Modal>
  );
}

export default AddUser;
