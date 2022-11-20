import React, { useEffect } from "react";
import { Image, Layout, Typography } from "antd";
import Slider from "./Slider";
import Contents from "./Contents";
import styles from "../../styles/layout.module.scss";
import { getProjectAll } from "../../services/project";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import LogoShask from "../../assets/image/logoShask.png";
import ContentCenter from "./ContentCenter";
const { Text } = Typography;

const { Content, Footer, Sider } = Layout;

export const CreateProviderProject = React.createContext<any>(null);

const LayoutHome = () => {
  const [menu, setMenu] = React.useState<Array<any>>([]);
  const getFolder = async () => {
    const id: any = localStorage.getItem("id_user");
    const response = await getProjectAll(+id);
    if (response.data.status === 200) {
      setMenu(response.data.data);
    } else {
      openCustomNotificationWithIcon(
        "error",
        "get project",
        "get project error"
      );
    }
  };
  useEffect(() => {
    getFolder();
  }, []);
  return (
    // <CreateProviderProject.Provider value={{ ...data }}>
    <Layout className={styles.layouts}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ height: "100vh", width: "40rem" }}
        width={250}
      >
        <Slider menu={menu} />
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
              height: "96vh",
              overflow: "auto",
            }}
          >
            <div className="bg-[#ffffff] fixed top-0 left-0 right-4 h-[60px] flex items-center px-10 z-10 shadow-md">
              <div className="flex item-center w-[250px]">
                <Image src={LogoShask} preview={false} height={25} />
                <Text
                  className="!text-[#000] font-bold block text-[20px] ml-[4px]"
                  style={{ fontFamily: "Dancing Script" }}
                >
                  hask
                </Text>
              </div>
              <ContentCenter />
            </div>
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
    // </CreateProviderProject.Provider>
  );
};

export default LayoutHome;
