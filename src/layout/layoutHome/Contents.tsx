import React from "react";
import { Card, Tabs } from "antd";
import Dashboard from "../../pages/dashboard";

function Contents() {
  return (
    <div
      style={{ minHeight: "75vh", borderRadius: "10px", marginTop: "100px" }}
    >
      {/* <Outlet /> */}
      <Dashboard />
    </div>
  );
}

export default Contents;
