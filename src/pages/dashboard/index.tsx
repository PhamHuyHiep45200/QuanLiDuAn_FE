import React, { useState } from "react";
import LoadingDashboard from "../../common/LoadingDashboard";
import EmptyData from "./components/EmptyData";
import DashBoardContent from "./components/DashBoardContent";
import { getProjectAll } from "../../services/project";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { CreateRefeshProject } from "../../layout/layoutHome/Contents";

function Dashboard() {
  const { refesh } = React.useContext(CreateRefeshProject);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataProject, setDataProject] = useState<Array<any>>([]);
  const getAllProject = async () => {
    setLoading(true);
    const idUser: string = localStorage.getItem("id_user")!;
    const response = await getProjectAll(+idUser);
    if (response.data.status === 200) {
      setDataProject(response.data.data);
      setLoading(false);
    } else {
      openCustomNotificationWithIcon("error", "Get Data", "Get Data Error");
    }
  };
  React.useEffect(() => {
    getAllProject();
  }, [refesh]);
  console.log(refesh);

  return (
    <>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : (
        <>
          {" "}
          {dataProject?.length > 0 ? (
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
