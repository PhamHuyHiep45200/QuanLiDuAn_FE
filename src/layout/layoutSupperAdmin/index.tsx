import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

function LayoutSupperAdmin() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const onChange = (value: any) => {
    navigate(value.item.props.path);
  };
  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={onChange}
          items={
            [
              {
                key: "1",
                icon: <UserOutlined />,
                label: "Dự án",
                path: "/supper-admin/project",
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: "Nhóm",
                path: "/supper-admin/group",
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: "Giai đoạn",
                path: "/supper-admin/item",
              },
              {
                key: "4",
                icon: <UserOutlined />,
                label: "Thành viên",
                path: "/supper-admin/member",
              },
            ] as any
          }
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: "red" }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100%",
            overflowY: "auto",
            background: "white",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutSupperAdmin;
