import React, { useState, useRef } from "react";
import { Button, Form, Modal, Avatar, Select, Typography, Space } from "antd";
import { searchUsers } from "../../../services/user";
import { openCustomNotificationWithIcon } from "../../../common/Notifycations";
import styles from "./modal.module.scss";
import { addUserProject } from "../../../services/user-project";
import { useParams } from "react-router-dom";
import { addUserGroup, searchUserAddGroup } from "../../../services/user-group";

const { Text } = Typography;
const getName = (name: string) => {
  const nameSplit = name.trim().split("");
  return nameSplit[0];
};
const AddUser = ({ open, setOpen, type, refesh }: any) => {
  const ref = useRef<any>(null);
  const { id }: any = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [dataUser, setDataUser] = useState<Array<any>>([]);

  const handleSubmit = async (value: any) => {
    setLoading(true);
    const idUserParent: any = localStorage.getItem("id_user");
    if (type.split("/").includes("project")) {
      const dataSubmit = {
        id_user_parent: +idUserParent,
        id_user: +value.id,
        id_project: +id,
        status: "PENDDING",
        role: value.role,
      };
      const response = await addUserProject(dataSubmit);
      console.log(response);

      if (response.data) {
        setLoading(false);
        setOpen(false);
        refesh();
      } else {
        setLoading(false);
        openCustomNotificationWithIcon(
          "error",
          "add user",
          response.data.message
        );
      }
    } else {
      const dataSubmit = {
        id_user_parent: +idUserParent,
        id_user: +value.id,
        id_group: +id,
        role: value.role,
      };

      const response = await addUserGroup(dataSubmit);

      if (response.data) {
        setLoading(false);
        setOpen(false);
        refesh();
      } else {
        setLoading(false);
        setOpen(false);
        openCustomNotificationWithIcon(
          "error",
          "add user",
          response.data.message
        );
      }
    }
  };

  const onSearch = (value: any) => {
    if (value.trim().length > 0) {
      clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        searchUserProject(value);
      }, 400);
    } else {
      setDataUser([]);
    }
  };
  const searchUserProject = async (value: string) => {
    const response = await searchUsers({ q: value });
    if (response.data) {
      setDataUser(response.data.data);
    } else {
      openCustomNotificationWithIcon("error", "get User", "get user error");
    }
  };
  // const searchUserGroup = async (value: string) => {
  //   const response = await searchUserAddGroup({ q: value });
  //   if (response.data) {
  //     setDataUser(response.data.data);
  //   } else {
  //     openCustomNotificationWithIcon("error", "get User", "get user error");
  //   }
  // };

  const handleCancel = () => {
    setOpen(false);
    setDataUser([]);
    form.setFieldsValue({ id: undefined });
  };

  return (
    <Modal title="Add User" open={open} footer={false} onCancel={handleCancel}>
      <Form onFinish={handleSubmit} form={form}>
        <div className={styles.modal}>
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
        </div>
        <Form.Item
          name="role"
          label="Quyền"
          rules={[{ required: true, message: "Bạn chưa chọn quyền!" }]}
        >
          <Select
            placeholder="chọn quyền"
            style={{ width: 120 }}
            options={[
              {
                label: "admin",
                value: "ADMIN",
              },
              {
                label: "manager",
                value: "MANAGER",
              },
              {
                label: "user",
                value: "USER",
              },
            ]}
          />
        </Form.Item>
        <Space className="w-full justify-center">
          <Button htmlType="submit" loading={loading} type="primary">
            add user
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default AddUser;
