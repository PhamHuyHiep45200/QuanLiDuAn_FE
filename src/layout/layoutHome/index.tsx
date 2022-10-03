import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styles from "../../styles/layout.module.scss";
import Slider from "./Slider";
import Dashboard from "../../pages/dashboard";
import Contents from "./Contents";

const { Content, Footer, Sider } = Layout;

const LayoutHome = () => {
  return (
    <Layout className={styles.layouts}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: "100vh", width: "40rem" }}
      >
        <Slider />
      </Sider>
      <Layout
        className="site-layout"
        style={{ height: "100vh", overflowY: "auto" }}
      >
        <Content>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
            }}
          >
            <Contents/>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        ></Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutHome;
