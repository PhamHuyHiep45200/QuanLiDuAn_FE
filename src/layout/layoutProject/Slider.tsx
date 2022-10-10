import React, { useEffect, useState } from "react";
import { Image, Menu, Space, Divider, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { FolderOpenOutlined } from "@ant-design/icons";
import Logo from "../../assets/image/logoShash.png";
import { MenuLayoutHome } from "../../data/MenuLayoutHome";
import styles from "../../styles/layout.module.scss";
import FolderProject from "./FolderProject";
const { Text } = Typography;

const data = [
  {
    id: "1",
    name: "project 1",
    icon: <FolderOpenOutlined />,
  },
  {
    id: "2",
    name: "project 2",
    icon: <FolderOpenOutlined />,
  },
  {
    id: "3",
    name: "project 3",
    icon: <FolderOpenOutlined />,
  },
];

function Slider() {
  const items = MenuLayoutHome();
  const navigate = useNavigate();
  const [menuFolderProject, setMenuFolderProject] = useState<Array<any>>([]);

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

  useEffect(() => {
    setMenuFolderProject(data);
  }, []);

  return (
    <>
      <div>
        <Space
          style={{ width: "100%", cursor: "pointer", padding: "0.5rem 1rem" }}
          align="center"
          onClick={() => navigate("/home")}
        >
          <Image src={Logo} preview={false} height={50} />
          <Text strong>Shask</Text>
        </Space>
        <Divider style={{ marginTop: 0 }} />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["0"]}
          onClick={changePath}
          items={items}
        />
        <Divider>PROJECT</Divider>
        <FolderProject
          menuFolderProject={menuFolderProject}
          setMenuFolderProject={setMenuFolderProject}
        />
      </div>
    </>
  );
}

export default Slider;
