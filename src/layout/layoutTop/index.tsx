import React, { useEffect } from "react";
import { Space, Row, Col, Button, Typography } from "antd";
import { Menu, MenuLayoutTop } from "../../data/MenuLauout";
import { Link } from "react-router-dom";
import styles from "../../styles/layout.module.scss";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import IsLogo from "../../common/IsLogo";

const { Text } = Typography;

function LayoutTop() {
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const [openRegister, setOpenRegister] = React.useState<boolean>(false);
  const [isLogo, setIsLogo] = React.useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLogo(true);
    }, 3000);
  }, []);
  return (
    <>
      {isLogo ? (
        <div className={styles.rootLayout}>
          <Row justify="center" className={styles.layout}>
            <Col span={22}>
              <Row>
                <Col span={4}>shask</Col>
                <Col span={14}>
                  <Space
                    align="center"
                    style={{
                      width: "100%",
                      height: "100%",
                      justifyContent: "space-around",
                    }}
                  >
                    {MenuLayoutTop.map((menu: Menu) => (
                      <Link to={menu.router} key={menu.id}>
                        <Text
                          strong
                          style={{
                            color: "white",
                          }}
                        >
                          {menu.name}
                        </Text>
                      </Link>
                    ))}
                  </Space>
                </Col>
                <Col span={6}>
                  <Space style={{ width: "100%", justifyContent: "flex-end" }}>
                    <Button
                      type="ghost"
                      className={styles.layoutLogin}
                      onClick={() => setOpenLogin(true)}
                    >
                      Đăng nhập
                    </Button>
                    <Button
                      className={styles.layoutRegister}
                      onClick={() => setOpenRegister(true)}
                    >
                      Đăng kí
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center" className={styles.content}>
            <Col span={22} style={{ marginTop: "100px" }}>
              content
            </Col>
          </Row>
          <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
          <Register
            openRegister={openRegister}
            setOpenRegister={setOpenRegister}
          />
        </div>
      ) : (
        <IsLogo />
      )}
    </>
  );
}

export default LayoutTop;
