import React, { useEffect, useState } from "react";
import LoadingDashboard from "../../common/LoadingDashboard";
import EmptyData from "./components/EmptyData";
import Tasks from "./components/Tasks";
const datas: any = [];
function Task() {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      getTasks();
    }, 500);
  }, []);
  const getTasks = () => {
    setData(datas);
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : data.length > 0 ? (
        <Tasks data={[]} open={open} setOpen={setOpen} />
      ) : (
        <EmptyData open={open} setOpen={setOpen} />
      )}
    </>
  );
}

export default Task;
