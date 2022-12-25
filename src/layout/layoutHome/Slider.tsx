import React, { useState } from "react";
import {
  Form,
  Modal,
  Input,
  Menu,
  Space,
  Divider,
  Typography,
  Button,
  Select,
  DatePicker,
} from "antd";
import { useNavigate } from "react-router-dom";
import { MenuLayoutHome } from "../../data/MenuLayoutHome";
import MenuHome from "../../common/menu";
import { PlusOutlined } from "@ant-design/icons";
import { createProject } from "../../services/project";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { CreateProviderProject } from ".";
const { Text } = Typography;
const { RangePicker } = DatePicker;

function Slider({ menu }: any) {
  const { setRefesh } = React.useContext(CreateProviderProject);
  const items = MenuLayoutHome();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const changePath = (value: any) => {
    console.log("value", value);

    items.map((item: any) => {
      if (+item.key === +value.key) {
        navigate(item.path);
      }
      item?.children?.length > 0 &&
        item?.children?.map((it: any) => {
          if (+it.key === +value.key) {
            navigate(it.path);
          }
          return 0;
        });
      return 0;
    });
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSubmit = async (value: any) => {
    const id_user: string | null = localStorage.getItem("id_user");
    const dataSubmit = {
      id_user: id_user ? +id_user : null,
      name: value.name,
      startDate: value.date[0].toISOString(),
      endDate: value.date[1].toISOString(),
    };
    const response = await createProject(dataSubmit);
    if (response.data) {
      setOpen(false);
      setRefesh(response.data);
    } else {
      openCustomNotificationWithIcon("error", `create project`, "create error");
      setOpen(false);
    }
  };
  return (
    <>
      <div className="mt-[60px]">
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["0"]}
          onClick={changePath}
          items={items}
        />
        <Divider>Share Task</Divider>
        <div className="text-center">
          <Button type="dashed" size="middle" onClick={() => setOpen(true)}>
            <div className="flex items-center">
              <PlusOutlined className="!text-[12px] mr-[4px]" />
              <Text>project</Text>
            </div>
          </Button>
        </div>
        <MenuHome menu={menu} />
      </div>
      <Modal
        title={`create space`}
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label={<div className="min-w-[50px]">name</div>}
            rules={[{ required: true, message: `validate name project ` }]}
            name="name"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="type"
            label={<div className="min-w-[50px]">type</div>}
          >
            <Select
              defaultValue="project"
              style={{ width: 120 }}
              options={[
                {
                  value: "project",
                  label: "project",
                },
                {
                  value: "group",
                  label: "group",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={<div className="min-w-[50px]">Thời gian</div>}
            name="date"
            rules={[{ required: true, message: "Bạn chưa nhập ngày" }]}
          >
            <RangePicker />
          </Form.Item>
          <Space className="w-full justify-center">
            <Button htmlType="submit" type="primary">
              create space
            </Button>
          </Space>
        </Form>
      </Modal>
    </>
  );
}

export default Slider;
