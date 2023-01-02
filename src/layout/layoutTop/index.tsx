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

          <div className="px-20">
            <div className="text-center text-[30px] font-bold">
              Những lợi ích chúng tôi mang lại
            </div>
            <span>
              <div className="font-bold text-[18px]">
                quản lý công việc hợp lý mang lại lợi ích gì?
              </div>
              <div>
                <div>1. Hiểu rõ công việc hơn</div>
                <span>
                  Việc quản lý, sắp xếp công việc bạn sẽ giúp bạn nắm bắt thông
                  tin một cách chính xác hơn. Biết mình phải làm gì tiếp theo
                  theo thứ tự và thời gian cụ thể, rõ ràng. Giúp bạn tránh được
                  những lo lắng không đáng có và dự đoán được những sự cố để xử
                  lý và đối mặt dễ dàng hơn.
                </span>
              </div>
              <div>
                <div>2. Làm việc hiệu quả hơn</div>
                <span>
                  Kỹ năng này sẽ giúp loại bỏ những việc làm bạn lãng phí thời
                  gian bằng cách tập trung vào những việc quan trọng trước.{" "}
                </span>
              </div>
              <div>
                <div>3. Tiết kiệm chi phí</div>
                <span>
                  Nếu bạn vẫn đang loay hoay và tốn sức để tập trung và ưu tiên
                  vào các vấn đề không đáng, hiệu quả công việc không cao và nó
                  là một thứ vô tình níu giữ chân bạn không thể tiến về phía
                  trước và luôn trong trạng thái bận rộn.
                </span>
              </div>
              Nhờ có quản lý công việc, bạn có thể chia toàn bộ ngân sách của
              mình theo từng nhiệm vụ, từng loại công việc hợp lý hơn mà không
              bị thiếu trước hụt sau. Đảm bảo tiến độ công việc.{" "}
            </span>
            <div className="text-center text-[25px] font-medium">
              Hãy cùng bắt đầu thôi nào
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
