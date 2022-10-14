import React, { useEffect, useState } from "react";
import LoadingDashboard from "../../common/LoadingDashboard";
import Tasks from "./components/Tasks";

function Task() {
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  return <>{loading ? <LoadingDashboard loading={loading} /> : <Tasks />}</>;
}

export default Task;
