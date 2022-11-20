import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TabsFSecond() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home/task/2");
  });
  return <div className="hidden">TabsFSecond</div>;
}

export default TabsFSecond;
