import React from "react";
import { Card, Tabs } from "antd";
import Dashboard from "../../pages/dashboard";

function Contents() {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="List" key="1">
        <Card style={{ minHeight: "92vh", borderRadius: "10px" }}>
          {/* <Outlet /> */}
          <Dashboard />
        </Card>
      </Tabs.TabPane>
      <Tabs.TabPane tab="Board" key="2">
        <Card style={{ minHeight: "92vh", borderRadius: "10px" }}>
          {/* <Outlet /> */}
          <Dashboard />
        </Card>
      </Tabs.TabPane>
    </Tabs>
  );
}

export default Contents;
