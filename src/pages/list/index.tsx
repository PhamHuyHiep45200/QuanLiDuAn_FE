import React, { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingDashboard from "../../common/LoadingDashboard";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { CreateProviderProject } from "../../layout/layoutHome";
import { getItemAll } from "../../services/item";
import Lists from "./components";
import EmptyDataList from "./components/EmptyDataList";

function List() {
  const { setUser, setName } = useContext(CreateProviderProject);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<Array<any>>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  console.log(searchParams.get("id_project"));

  useEffect(() => {
    setLoading(true);
    getItems();
  }, []);
  const getItems = async () => {
    const id_group: any = searchParams.get("id_group");
    const response = await getItemAll(+id_group);
    if (response.data.status === 200) {
      console.log(response.data.item);

      setData(response.data.item.Item);
      setLoading(false);
      setUser(response.data.user);
      setName(response.data.item.name);
    } else {
      openCustomNotificationWithIcon("error", "get items", "get items error");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : data?.length > 0 ? (
        <Lists
          data={data}
          getItems={getItems}
          open={openModal}
          setOpen={setOpenModal}
        />
      ) : (
        <EmptyDataList
          open={openModal}
          setOpen={setOpenModal}
          getItems={getItems}
        />
      )}
    </>
  );
}

export default List;
