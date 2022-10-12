import React, { useMemo } from "react";
import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import styles from "../../../styles/project.module.scss";
import { useNavigate } from "react-router-dom";
import {
  FolderOpenOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import DataGetListTask from "../../../data/DataGetListTask";
import Project from "../../../common/Project";
import Group from "../../../common/Group";
import ListTask from "../../../common/ListTask";
import Task from "../../../common/Task";

const { Text } = Typography;

interface DashBoardContentProps {
  dataProject: Array<any>;
}

function DashBoardContent(props: DashBoardContentProps) {
  const { dataProject } = props;
  const navigate = useNavigate();

  const getName = (name: string) => {
    const nameSplit = name.trim().split("");
    return nameSplit[nameSplit.length - 1][0];
  };

  const handleRedirectProject = (data: any) => {
    navigate(`/project/${data.id}/list?project=${data.name}`);
  };

  const dataMockList = useMemo(() => DataGetListTask(), []);
  const GetIcon = (type: string) => {
    if (type === "PROJECT") {
      return (
        <FolderOpenOutlined
          style={{ marginBottom: "6px", color: getColor(type) }}
        />
      );
    } else if (type === "GROUP") {
      return (
        <TeamOutlined style={{ marginBottom: "6px", color: getColor(type) }} />
      );
    } else if (type === "LISTTASK") {
      return (
        <UnorderedListOutlined
          style={{ marginBottom: "6px", color: getColor(type) }}
        />
      );
    } else if (type === "TASK") {
      return (
        <BranchesOutlined
          style={{ marginBottom: "6px", color: getColor(type) }}
        />
      );
    }
  };
  const getColor = (colorType: string) => {
    if (colorType === "PROJECT") {
      return "red";
    } else if (colorType === "GROUP") {
      return "blue";
    } else if (colorType === "LISTTASK") {
      return "green";
    } else if (colorType === "TASK") {
      return "#e300c7";
    }
  };

  const getList = (typeList: string, index: number, data: any) => {
    if (typeList === "PROJECT") {
      return <Project id={index} data={data} getName={getName} />;
    } else if (typeList === "GROUP") {
      return <Group id={index} data={data} getName={getName} />;
    } else if (typeList === "LISTTASK") {
      return <ListTask id={index} data={data} getName={getName} />;
    } else if (typeList === "TASK") {
      return <Task id={index} data={data} getName={getName} />;
    }
  };
  console.log(dataMockList);

  return (
    <>
      {dataMockList.map((mock, index) => (
        <Row gutter={32} className={styles.rowContent} key={index}>
          <Space className={styles.div_row_content} style={{ color: "red" }}>
            {GetIcon(mock.type)}
            <Text strong style={{ color: getColor(mock.type) }}>
              {mock.name}
            </Text>
          </Space>
          {mock?.data?.map((data: any, index: number) =>
            getList(mock.type, index, data)
          )}
        </Row>
      ))}
    </>
  );
}

export default DashBoardContent;
