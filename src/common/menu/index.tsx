import React, { useEffect, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Menu,
  Modal,
  Popover,
  Space,
  Typography,
} from "antd";
import {
  DeploymentUnitOutlined,
  FolderFilled,
  TeamOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { createGroup } from "../../services/group";
import { openCustomNotificationWithIcon } from "../Notifycations";
import { createItem } from "../../services/item";
import { CreateProviderProject } from "../../layout/layoutHome";
import moment from "moment";
const { Text } = Typography;
const { RangePicker } = DatePicker;

const getLabel = (arr: any, icon: any) => (
  <div className="flex items-center">
    {icon}
    <Text className="truncate">
      {arr?.name} (
      <Text type="success">{moment(arr?.startDate).format("YYYY-MM-DD")}</Text>{" "}
      <span>-</span>{" "}
      <Text type="danger">{moment(arr?.endDate).format("YYYY-MM-DD")}</Text> )
    </Text>
  </div>
);

const Add = ({ id, type }: any) => {
  const { setRefesh } = React.useContext(CreateProviderProject);
  const [open, setOpen] = useState(false);
  const handleCancel = () => {
    setOpen(false);
  };
  const handleSubmit = async (value: any) => {
    const id_user: string | null = localStorage.getItem("id_user");
    if (type === "group") {
      const dataSubmit = {
        id_project: id,
        id_user: id_user ? +id_user : null,
        name: value.name,
        startDate: value.date[0].toISOString(),
        endDate: value.date[1].toISOString(),
      };
      const response = await createGroup(dataSubmit);
      if (response.data) {
        setOpen(false);
        setRefesh(response.data);
      } else {
        openCustomNotificationWithIcon(
          "error",
          `create ${type}`,
          "create error"
        );
        setOpen(false);
      }
    } else if (type === "item") {
      const dataSubmit = {
        id_group: id,
        id_user: id_user ? +id_user : null,
        name: value.name,
        startDate: value.date[0].toISOString(),
        endDate: value.date[1].toISOString(),
      };
      const response = await createItem(dataSubmit);
      if (response.data) {
        setOpen(false);
        setRefesh(response.data);
      } else {
        setOpen(false);
        openCustomNotificationWithIcon(
          "error",
          `create ${type}`,
          "create error"
        );
      }
    }
  };
  return (
    <div>
      <Button type="dashed" size="middle" onClick={() => setOpen(true)}>
        <div className="flex items-center">
          <PlusOutlined className="!text-[12px]" />
          <Text>{type}</Text>
        </div>
      </Button>
      <Modal
        title={`create ${type}`}
        open={open}
        onCancel={handleCancel}
        footer={false}
      >
        <Form onFinish={handleSubmit}>
          <Form.Item
            label={`name ${type}`}
            rules={[{ required: true, message: `validate name ${type} ` }]}
            name="name"
          >
            <Input />
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
              create {type}
            </Button>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

const getData = (array: any) => {
  array.map((arr: any) => {
    if (arr?.typeName === "project") {
      arr["label"] = getLabel(arr, <FolderFilled />);
      arr["key"] = `${arr.id + arr.typeName}`;
      arr["children"] = arr?.Group
        ? [
            {
              label: <Add id={arr.id} type="group" />,
              key: `add_${arr.typeName}_${arr.id}`,
            },
            {
              label: "List member",
              key: `member_${arr.typeName}_${arr.id}`,
              router: `/home/project/list-member/${arr.id}`,
            },
            ...arr?.Group,
          ]
        : [];
    }
    if (arr?.typeName === "group") {
      arr["label"] = getLabel(arr, <TeamOutlined />);
      arr["key"] = `${arr.id + arr.typeName}`;
      arr["children"] = arr?.Item
        ? [
            {
              label: <Add id={arr.id} type="item" />,
              key: `add_${arr.typeName}_${arr.id}`,
            },
            {
              label: "List member",
              key: `member_${arr.typeName}_${arr.id}`,
              router: `/home/group/list-member/${arr.id}`,
            },
            ...arr?.Item,
          ]
        : [];
    }
    if (arr?.typeName === "item") {
      arr["label"] = getLabel(arr, <DeploymentUnitOutlined />);
      arr["key"] = `${arr.id + arr.typeName}`;
      arr["router"] = `task/${arr.id}`;
    }
    if (arr?.Group?.length > 0 || arr?.Item?.length > 0) {
      return getData(arr?.Group || arr?.Item);
    }
  });
  return array;
};

function MenuHome({ menu }: any) {
  const { setIdItem } = React.useContext(CreateProviderProject);
  const navigate = useNavigate();
  const [items, setItems] = useState<any>([]);
  const onChangMenu = (value: string[]) => {
    console.log(value);
  };
  const handleClickMenu = ({ item }: any) => {
    if (item.props.router) {
      navigate(item.props.router);
      setIdItem(+item.props.id);
    }
  };
  useEffect(() => {
    const dataMenu = getData(menu);
    setItems(dataMenu);
  }, [menu]);

  return (
    <div>
      <Menu
        items={items}
        mode="inline"
        onOpenChange={onChangMenu}
        onClick={handleClickMenu}
      />
    </div>
  );
}

export default MenuHome;
