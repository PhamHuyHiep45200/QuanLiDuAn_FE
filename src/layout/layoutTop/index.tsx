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
                      ????ng nh???p
                    </Button>
                    <Button
                      className={styles.layoutRegister}
                      onClick={() => setOpenRegister(true)}
                    >
                      ????ng k??
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
                    H??? th???ng qu???n l?? doanh nghi???p v?????t tr???i
                  </Title>
                  <Space>
                    <Button
                      size="large"
                      shape="round"
                      style={{ minWidth: "150px", fontWeight: "bold" }}
                      onClick={() => setOpenRegister(true)}
                    >
                      ????ng k??
                    </Button>
                    <Button
                      ghost
                      size="large"
                      shape="round"
                      style={{ fontWeight: "bold" }}
                      onClick={() => setOpenContact(true)}
                    >
                      Li??n h??? t?? v???n
                    </Button>
                  </Space>
                </Col>
                <Col span={16}>
                  <Image src={ImgaeTop} preview={false} />
                </Col>
              </Row>
            </Col>
          </Row>

          <div className="px-20">
            <div className="text-center text-[30px] font-bold">
              Nh???ng l???i ??ch ch??ng t??i mang l???i
            </div>
            <span>
              <div className="font-bold text-[18px]">
                qu???n l?? c??ng vi???c h???p l?? mang l???i l???i ??ch g???
              </div>
              <div>
                <div>1. Hi???u r?? c??ng vi???c h??n</div>
                <span>
                  Vi???c qu???n l??, s???p x???p c??ng vi???c b???n s??? gi??p b???n n???m b???t th??ng
                  tin m???t c??ch ch??nh x??c h??n. Bi???t m??nh ph???i l??m g?? ti???p theo
                  theo th??? t??? v?? th???i gian c??? th???, r?? r??ng. Gi??p b???n tr??nh ???????c
                  nh???ng lo l???ng kh??ng ????ng c?? v?? d??? ??o??n ???????c nh???ng s??? c??? ????? x???
                  l?? v?? ?????i m???t d??? d??ng h??n.
                </span>
              </div>
              <div>
                <div>2. L??m vi???c hi???u qu??? h??n</div>
                <span>
                  K??? n??ng n??y s??? gi??p lo???i b??? nh???ng vi???c l??m b???n l??ng ph?? th???i
                  gian b???ng c??ch t???p trung v??o nh???ng vi???c quan tr???ng tr?????c.{" "}
                </span>
              </div>
              <div>
                <div>3. Ti???t ki???m chi ph??</div>
                <span>
                  N???u b???n v???n ??ang loay hoay v?? t???n s???c ????? t???p trung v?? ??u ti??n
                  v??o c??c v???n ????? kh??ng ????ng, hi???u qu??? c??ng vi???c kh??ng cao v?? n??
                  l?? m???t th??? v?? t??nh n??u gi??? ch??n b???n kh??ng th??? ti???n v??? ph??a
                  tr?????c v?? lu??n trong tr???ng th??i b???n r???n.
                </span>
              </div>
              Nh??? c?? qu???n l?? c??ng vi???c, b???n c?? th??? chia to??n b??? ng??n s??ch c???a
              m??nh theo t???ng nhi???m v???, t???ng lo???i c??ng vi???c h???p l?? h??n m?? kh??ng
              b??? thi???u tr?????c h???t sau. ?????m b???o ti???n ????? c??ng vi???c.{" "}
            </span>
            <div className="text-center text-[25px] font-medium">
              H??y c??ng b???t ?????u th??i n??o
            </div>
          </div>
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
