import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TabsFirst() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home/task/1");
  });
  return <div className="hidden"></div>;
}

export default TabsFirst;
