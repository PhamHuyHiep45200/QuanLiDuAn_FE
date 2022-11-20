import { Skeleton } from "antd";
import React from "react";
interface LoadingDashboardProps {
  loading: boolean;
}
function LoadingDashboard(props: LoadingDashboardProps) {
  const { loading } = props;
  return (
    <div>
      <Skeleton active loading={loading} />
      <Skeleton active loading={loading} />
      <Skeleton active loading={loading} />
    </div>
  );
}

export default LoadingDashboard;
