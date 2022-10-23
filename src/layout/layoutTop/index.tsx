import React, { useEffect } from "react";
import { Space, Row, Col, Button, Typography, Image, Card } from "antd";
import { Menu, MenuLayoutTop } from "../../data/MenuLauout";
import { Link } from "react-router-dom";
import styles from "../../styles/layout.module.scss";
import Login from "../../pages/auth/login";
import Register from "../../pages/auth/register";
import IsLogo from "../../common/IsLogo";
import ImgaeTop from "../../assets/image/anhtop.png";
import LogoShask from "../../assets/image/logoShask.png";
import ModalContact from "../../pages/auth/contact/ModalContact";
import { login } from "../../services/auth";

const { Text, Title } = Typography;

function LayoutTop() {
  const [openLogin, setOpenLogin] = React.useState<boolean>(false);
  const [openRegister, setOpenRegister] = React.useState<boolean>(false);
  const [openContact, setOpenContact] = React.useState<boolean>(false);
  const [isLogo, setIsLogo] = React.useState<boolean>(false);
  const [offset, setOffset] = React.useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      setIsLogo(true);
    }, 3000);
  }, []);

  const [scrolled, setScrolled] = React.useState(false);
  const handleScroll = () => {
    if (window.pageYOffset > 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  const getLogin = async () => {
    const data = await login();
    console.log(data);
  };
  useEffect(() => {
    getLogin();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  console.log(scrolled);
  return (
    <>
      {isLogo ? (
        <div className={styles.rootLayout}>
          <Row
            justify="center"
            className={styles.layout}
            style={{
              background: scrolled
                ? "linear-gradient(144deg, #0b53da, #a80451)"
                : "transparent",
              boxShadow: scrolled ? "0 0 3px 3px #333" : "none",
            }}
          >
            <Col span={22}>
              <Row>
                <Col span={4}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Image src={LogoShask} preview={false} height={50} />
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        display: "block",
                        fontSize: "35px",
                        marginLeft: "6px",
                        marginTop: "10px",
                        fontFamily: "Dancing Script",
                      }}
                    >
                      hask
                    </Text>
                  </div>
                </Col>
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
                <Col span={6} style={{ display: "flex" }}>
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
              <Row style={{ marginTop: "50px" }}>
                <Col span={8} style={{ marginTop: "100px" }}>
                  <Title level={1} style={{ color: "white" }}>
                    Hệ thống quản lí doanh nghiệp vượt trội
                  </Title>
                  <Space>
                    <Button
                      size="large"
                      shape="round"
                      style={{ minWidth: "150px", fontWeight: "bold" }}
                      onClick={() => setOpenRegister(true)}
                    >
                      Đăng kí
                    </Button>
                    <Button
                      ghost
                      size="large"
                      shape="round"
                      style={{ fontWeight: "bold" }}
                      onClick={() => setOpenContact(true)}
                    >
                      Liên hệ tư vấn
                    </Button>
                  </Space>
                </Col>
                <Col span={16}>
                  <Image src={ImgaeTop} preview={false} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row justify="center" className={styles.content}>
            <Col span={22}>
              <Row gutter={24}>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Title level={3}>
                    Những thứ mà chúng tôi mang đến cho bạn
                  </Title>
                </Col>
                <Col span={6} style={{ minHeight: "150px" }}>
                  <Card>ke</Card>
                </Col>
                <Col span={6} style={{ minHeight: "150px" }}>
                  <Card>ke</Card>
                </Col>
                <Col span={6} style={{ minHeight: "150px" }}>
                  <Card>ke</Card>
                </Col>
                <Col span={6} style={{ minHeight: "150px" }}>
                  <Card>ke</Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Login openLogin={openLogin} setOpenLogin={setOpenLogin} />
          <Register
            openRegister={openRegister}
            setOpenRegister={setOpenRegister}
          />
          <ModalContact open={openContact} setOpen={setOpenContact} />
        </div>
      ) : (
        <IsLogo />
      )}
    </>
  );
}

export default LayoutTop;
