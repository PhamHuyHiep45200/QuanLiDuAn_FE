import React, { useEffect, useRef, useState } from "react";
import { Input, Table, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";
import moment from "moment";
import { getFullProject, updateDeleteProject } from "../../services/project";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import UpdateDelete from "./UpdateDelete";

interface DataType {
  key: string;
  name: string;
  deleteFlg: boolean;
}

const ProjectSupperAdmin: React.FC = () => {
  const searchRef = useRef<any>();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState<any>();
  const columns: ColumnsType<DataType> = React.useMemo(() => {
    return [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
        align: "center",
      },
      {
        title: "Tên",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
        align: "center",
      },
      {
        title: "Ngày tạo",
        key: "action",
        render: (data) => (
          <>{moment(data?.createdAt).format("YYYY/MM/DD HH:mm:ss")}</>
        ),
        align: "center",
      },
      {
        title: "Tháo tác",
        key: "project",
        render: (data) => (
          <UpdateDelete
            type="project"
            data={data}
            functionDelete={functionDelete}
          />
        ),
        align: "center",
      },
    ];
  }, []);
  useEffect(() => {
    getProject();
  }, [params]);

  const getProject = async () => {
    setLoading(true);
    const response = await getFullProject(params);
    console.log(response);

    if (response?.data?.status === 200) {
      setData(response.data.data);
      setLoading(false);
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
      setLoading(false);
    }
  };

  const functionDelete = async (data: any, setLoadingComfirm: any) => {
    const response = await updateDeleteProject(data?.id, {
      status: !data?.deleteFlg,
    });
    if (response?.data?.status === 200) {
      getProject();
      setLoadingComfirm(false);
      openCustomNotificationWithIcon("sucess", "sucess", "sucess");
    } else {
      setLoadingComfirm(false);
      openCustomNotificationWithIcon("error", "error", "error");
    }
  };

  const onValuesChange = (value: any) => {
    clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setParams({ name: value.name });
    }, 400);
  };
  return (
    <div>
      <div className="flex justify-end">
        <Form onValuesChange={onValuesChange}>
          <Form.Item name="name">
            <Input allowClear placeholder="Tìm kiếm theo tên" />
          </Form.Item>
        </Form>
      </div>
      <Table columns={columns} dataSource={data} loading={loading} />
    </div>
  );
};

export default ProjectSupperAdmin;
