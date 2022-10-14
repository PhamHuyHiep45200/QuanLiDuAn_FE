import React, { useState } from "react";
import LoadingDashboard from "../../common/LoadingDashboard";
import EmptyData from "./components/EmptyData";
import DashBoardContent from "./components/DashBoardContent";
import AddEvent from "../../common/AddEvent";

const data = [
  {
    id: 1,
    name: "Mr_Food",
    listUser: [
      {
        id: 12,
        name: "Phạm Huy Hiệp",
        thumbnailUrl: "",
      },
      {
        id: 13,
        name: "Trịnh Văn Quốc",
        thumbnailUrl: "",
      },
      {
        id: 14,
        name: "Lê Doãn Diệp",
        thumbnailUrl: "",
      },
      {
        id: 15,
        name: "Nguyễn Long Hải",
        thumbnailUrl: "",
      },
      {
        id: 16,
        name: "Trần Sơn Đông",
        thumbnailUrl: "",
      },
      {
        id: 17,
        name: "Nguyễn Dark Duy",
        thumbnailUrl: "",
      },
    ],
  },
  {
    id: 2,
    name: "Quan_Li_Cong_Viec",
    listUser: [
      {
        id: 12,
        name: "Phạm Huy Hiệp",
        thumbnailUrl: "",
      },
      {
        id: 13,
        name: "Trịnh Văn Quốc",
        thumbnailUrl: "",
      },
      {
        id: 14,
        name: "Lê Doãn Diệp",
        thumbnailUrl: "",
      },
    ],
  },
  {
    id: 3,
    name: "Smile_me",
  },
];

function Dashboard() {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataProject, setDataProject] = useState<Array<any>>([]);
  React.useEffect(() => {
    setTimeout(() => {
      setDataProject(data);
      setLoading(false);
    }, 500);
  });
  return (
    <>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : (
        <>
          {" "}
          {data.length > 0 ? (
            <DashBoardContent dataProject={dataProject} />
          ) : (
            <EmptyData />
          )}
        </>
      )}
    </>
  );
}

export default Dashboard;
