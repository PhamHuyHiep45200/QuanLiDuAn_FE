import React from "react";
import IsLogo from "../../common/IsLogo";
import LayoutHome from "../../layout/layoutHome";

function Home() {
  const [loadingLogo, setLoadingLogo] = React.useState<boolean>(false);
  React.useEffect(() => {
    setTimeout(() => {
      setLoadingLogo(true);
    },2500);
  }, []);
  return <>{loadingLogo ? <LayoutHome /> : <IsLogo />}</>;
}

export default Home;
