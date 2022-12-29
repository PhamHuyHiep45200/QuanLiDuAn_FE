import React from "react";
import { useNavigate } from "react-router-dom";
import { ContextProvider } from "../../App";
import LayoutHome from "../../layout/layoutHome";

function Home() {
  const { user } = React.useContext(ContextProvider);
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user && user?.role !== "USER") {
      navigate("/supper-admin/project");
    }
  }, []);
  return (
    <>
      <LayoutHome />
    </>
  );
}

export default Home;
