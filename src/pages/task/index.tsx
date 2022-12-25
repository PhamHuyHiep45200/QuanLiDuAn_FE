import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingDashboard from "../../common/LoadingDashboard";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { getTaskAll } from "../../services/task";
import EmptyData from "./components/EmptyData";
import Tasks from "./components/Tasks";
import ModalEmpty from "./components/modal/ModalEmpty";
import { ContextProvider } from "../../context/ContextProvider";
const datas: any = [];
function Task() {
  const { id }: any = useParams();
  const socket = useContext(ContextProvider);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    setLoading(true);
    getTasks();
    socket.on("notify", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("notify");
    };
  }, [id]);
  const getTasks = async () => {
    const response = await getTaskAll(+id);
    if (response.data.status === 200) {
      setData(response.data.data);
      setCount(response.data.count);
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : count > 0 ? (
        <Tasks data={data} open={open} setOpen={setOpen} getTasks={getTasks} />
      ) : (
        <EmptyData open={open} setOpen={setOpen} getTasks={getTasks} />
      )}

      <ModalEmpty
        open={open}
        setOpen={setOpen}
        getTasks={getTasks}
        id_taskParent={null}
      />
    </>
  );
}

export default Task;
