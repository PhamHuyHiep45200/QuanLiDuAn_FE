import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingDashboard from "../../common/LoadingDashboard";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { getTaskAll } from "../../services/task";
import EmptyData from "./components/EmptyData";
import Tasks from "./components/Tasks";
import ModalEmpty from "./components/modal/ModalEmpty";
import { ContextProvider } from "../../context/ContextProvider";
import { Form, Select, Switch } from "antd";
const datas: any = [];
function Task() {
  const role = "USER";
  const { id }: any = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<Array<any>>([]);
  const [count, setCount] = useState<number>(0);
  const [params, setParams] = useState<any>();
  useEffect(() => {
    setLoading(true);
    getTasks();

    if (localStorage.getItem("itemTask")) {
      localStorage.removeItem("itemTask");
    }
    localStorage.setItem("itemTask", id);
    // socket.on("notify", (data) => {
    //   console.log(data);
    // });
    // return () => {
    //   socket.off("notify");
    // };
  }, [id, params]);
  const getTasks = async () => {
    const response = await getTaskAll(+id, params);
    if (response.data.status === 200) {
      setData(response.data.data);
      setCount(response.data.count);
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
    }
    setLoading(false);
  };
  const onValuesChange = (value: any) => {
    const idUser: any = localStorage.getItem("id_user");
    if (value[Object.keys(value)[0]]) {
      if (Object.keys(value)[0] == "id_user") {
        setParams({ ...params, id_user: +idUser });
      } else {
        form.setFieldValue("id_user", true);
        setParams({ ...params, ...value, id_user: +idUser });
      }
    } else {
      const param = params;
      if (!value.id_user && params.private) {
        form.setFieldValue("private", false);
        delete param["private"];
      }
      delete param[Object.keys(value)[0]];
      setParams({ ...params });
    }
  };

  return (
    <>
      <Form
        initialValues={{ private: false, taskMe: false }}
        onValuesChange={onValuesChange}
        form={form}
      >
        <div className="flex items-center justify-end mb-5">
          <div className="flex items-center mr-5">
            <span className="mr-[5px]">Riêng tư:</span>
            <Form.Item name="private" noStyle>
              <Switch checked={form.getFieldValue("private")} />
            </Form.Item>
          </div>
          {role === "USER" ? (
            <div className="flex items-center">
              <span className="mr-[5px]">task của tôi:</span>
              <Form.Item name="id_user" noStyle>
                <Switch checked={form.getFieldValue("id_user")} />
              </Form.Item>
            </div>
          ) : (
            // {/* admin */}
            <div className="flex items-center">
              <span className="mr-[5px]">task của:</span>
              <Form.Item name="id_user" noStyle>
                <Select
                  defaultValue="lucy"
                  style={{ width: 120 }}
                  allowClear
                  options={[
                    {
                      value: "me",
                      label: "Tôi",
                    },
                  ]}
                />
              </Form.Item>
            </div>
          )}
        </div>
      </Form>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : count > 0 ? (
        <Tasks
          data={data}
          open={open}
          setOpen={setOpen}
          getTasks={getTasks}
          params={params}
          setParams={setParams}
        />
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
