import React from "react";
import { Layout } from "antd";
import Slider from "./Slider";
import Contents from "./Contents";
import { Header } from "antd/lib/layout/layout";
import Headers from "./Headers";
import styles from "../../styles/layout.module.scss";

const { Content, Footer, Sider } = Layout;

export const CreateProviderProject = React.createContext<any>(null);

const LayoutHome = () => {
  const [user, setUser] = React.useState<Array<any>>([]);
  const [name, setName] = React.useState<string>("");
  const data = { user, setUser, name, setName };
  return (
    <CreateProviderProject.Provider value={{ ...data }}>
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
          <Header className={styles.header}>
            <Headers user={user} name={name} />
          </Header>
          <Content>
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                height: "96vh",
                overflow: "auto",
              }}
            >
              <Contents />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          ></Footer>
        </Layout>
      </Layout>
    </CreateProviderProject.Provider>
  );
};

export default LayoutHome;
