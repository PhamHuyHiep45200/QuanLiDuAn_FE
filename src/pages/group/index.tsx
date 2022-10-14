import React, { useEffect, useState } from "react";
import LoadingDashboard from "../../common/LoadingDashboard";
import Groups from "./components/Groups";

function Group() {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return <>{loading ? <LoadingDashboard loading={loading} /> : <Groups />}</>;
}

export default Group;
