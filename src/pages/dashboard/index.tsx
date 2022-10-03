import React from "react";
import { Skeleton, Typography } from "antd";
const { Text } = Typography;
function Dashboard() {
  const [loading, setLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  return (
    <>
      <Skeleton active loading={loading} />
      <Skeleton active loading={loading} />
      <Skeleton active loading={loading} />
      <Skeleton active loading={loading} />
      {!loading && <Text strong>dashboard</Text>}
    </>
  );
}

export default Dashboard;
