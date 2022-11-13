import React, { useEffect, useState, useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import LoadingDashboard from "../../common/LoadingDashboard";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { CreateProviderProject } from "../../layout/layoutHome";
import { getGroupInProject } from "../../services/group";
import EmptyDataGroup from "./components/EmptyDataGroup";
import Groups from "./components/Groups";

function Group() {
  const { setUser, setName } = useContext(CreateProviderProject);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [useSearch] = useSearchParams();
  useEffect(() => {
    setLoading(true);
    getGroup();
  }, []);

  const getGroup = async () => {
    const id: any = useSearch.get("router_id");
    const { response }: any = await getGroupInProject(+id);
    if (response.status === 200) {
      console.log(response);
      setName(response.data.group.name);
      setData(response.data.group.Group);
      setUser(response.data.user);
    } else {
      openCustomNotificationWithIcon("error", "get group", "get group error");
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : (
        <>
          {data?.length > 0 ? (
            <Groups data={data} getGroup={getGroup} />
          ) : (
            <EmptyDataGroup />
          )}
        </>
      )}
    </>
  );
}

export default Group;
