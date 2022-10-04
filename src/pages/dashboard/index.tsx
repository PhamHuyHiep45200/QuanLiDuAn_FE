import React from "react";
import LoadingDashboard from "./components/LoadingDashboard";
import EmptyData from "./components/EmptyData";
import DashBoardContent from "./components/DashBoardContent";

const data = [];

function Dashboard() {
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  return (
    <>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : (
        <> {data.length > 0 ? <DashBoardContent /> : <EmptyData />}</>
      )}
    </>
  );
}

export default Dashboard;
