import React, { useEffect, useState } from "react";
import { Menu, Popover, Typography } from "antd";
import {
  DeploymentUnitOutlined,
  FolderFilled,
  TeamOutlined,
  DashOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

const content = () => <div></div>;

const getLabel = (label: any, icon: any) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center">
      {icon}
      <Text className="truncate">{label}</Text>
    </div>
    <Popover content={content} title={false}>
      <DashOutlined />
    </Popover>
  </div>
);

const getData = (array: any) => {
  array.map((arr: any) => {
    if (arr.typeName === "project") {
      arr["label"] = getLabel(arr.name, <FolderFilled />);
      arr["key"] = `${arr.id + arr.typeName}`;
      arr["children"] = arr?.Group ? arr?.Group : [];
    }
    if (arr.typeName === "group") {
      arr["label"] = getLabel(arr.name, <TeamOutlined />);
      arr["key"] = `${arr.id + arr.typeName}`;
      arr["children"] = arr?.Item ? arr?.Item : [];
    }
    if (arr.typeName === "item") {
      arr["label"] = getLabel(arr.name, <DeploymentUnitOutlined />);
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
  const navigate = useNavigate();
  const [items, setItems] = useState<any>([]);
  const onChangMenu = (value: string[]) => {
    console.log(value);
  };
  const handleClickMenu = ({ item }: any) => {
    console.log(item.props.router);
    if (item.props.router) {
      navigate(item.props.router);
    }
  };
  useEffect(() => {
    const dataMenu = getData(menu);
    setItems(dataMenu);
  }, [menu]);
  console.log(items);

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
