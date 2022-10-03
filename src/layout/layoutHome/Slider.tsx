import React from "react";
import { Image, Menu, Space, Divider, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/image/logoShash.png";
import { MenuLayoutHome } from "../../data/MenuLayoutHome";
import styles from "../../styles/layout.module.scss";
const { Text } = Typography;

function Slider() {
  const item = MenuLayoutHome();
  const navigate = useNavigate();

  const changePath = (value: any) => {
    console.log("value", value);

    item.map((item: any) => {
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

  return (
    <>
      <div>
        <Space
          style={{ width: "100%", cursor: "pointer", padding: "0.5rem 1rem" }}
          align="center"
          onClick={() => navigate("/home")}
        >
          <Image src={Logo} preview={false} height={50} />
          <Text strong>Shash</Text>
        </Space>
        <Divider style={{marginTop:0}}/>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["0"]}
          onClick={changePath}
          items={item}
        />
      </div>
    </>
  );
}

export default Slider;
