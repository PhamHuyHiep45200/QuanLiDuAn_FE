import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import LoadingDashboard from "../../common/LoadingDashboard";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { getItemAll } from "../../services/item";
import Lists from "./components";

function List() {
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  console.log(searchParams.get("id_project"));

  useEffect(() => {
    setLoading(true);
    getItems();
  }, []);
  const getItems = async () => {
    const id_group: any = searchParams.get("group");
    const response = await getItemAll(+id_group);
    if (response.data) {
      console.log(response);
      setLoading(false);
    } else {
      openCustomNotificationWithIcon("error", "get items", "get items error");
      setLoading(false);
    }
  };
  return <>{loading ? <LoadingDashboard loading={loading} /> : <Lists />}</>;
}

export default List;
