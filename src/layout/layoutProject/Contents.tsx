import React from "react";
import { Card, Tabs } from "antd";
import Dashboard from "../../pages/dashboard";
import { Outlet } from "react-router-dom";

function Contents() {
  return (
    <div
      style={{ minHeight: "75vh", borderRadius: "10px", marginTop: "100px" }}
    >
      <Outlet />
    </div>
  );
}

export default Contents;
