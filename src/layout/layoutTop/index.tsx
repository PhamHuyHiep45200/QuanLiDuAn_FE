import React from "react";
import { Space, Row, Col } from "antd";
import { Menu, MenuLayoutTop } from "../../data/MenuLauout";
import { Link } from "react-router-dom";
import styles from "../../styles/layout.module.scss";

function LayoutTop() {
  return (
    <Row justify="center" className={styles.layout}>
      <Col span={22}>
        <Row>
          <Col span={4}>logo</Col>
          <Col span={16}>
            <Space style={{ width: "100%", justifyContent: "space-around" }}>
              {MenuLayoutTop.map((menu: Menu) => (
                <Link to={menu.router} key={menu.id}>
                  {menu.name}
                </Link>
              ))}
            </Space>
          </Col>
          <Col span={4} style={{ textAlign: "right" }}>
            login
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default LayoutTop;
