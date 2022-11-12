import React from "react";
import { Row, Space, Typography, Card, Col } from "antd";
import { useNavigate } from "react-router-dom";
import {
  FolderOpenOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import Project from "../../../common/Project";
import Group from "../../../common/Group";
import ListTask from "../../../common/ListTask";
import Tasks from "../../task/components/Tasks";
import styles from "../../../styles/project.module.scss";

const { Text } = Typography;

interface DashBoardContentProps {
  dataProject: Array<any>;
}

function DashBoardContent(props: DashBoardContentProps) {
  const { dataProject } = props;
  const navigate = useNavigate();

  const getName = (name: string) => {
    const nameSplit = name.trim().split("");
    return nameSplit[0];
  };

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
    } else if (type === "ITEM") {
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
    } else if (colorType === "ITEM") {
      return "green";
    } else if (colorType === "TASK") {
      return "#e300c7";
    }
  };

  const getList = (typeList: string, index: number, data: any) => {
    if (typeList === "PROJECT") {
      return <Project key={index} id={index} data={data} getName={getName} />;
    } else if (typeList === "GROUP") {
      return <Group key={index} id={index} data={data} getName={getName} />;
    } else if (typeList === "ITEM") {
      return <ListTask key={index} id={index} data={data} getName={getName} />;
    }
  };

  return (
    <>
      {dataProject.map((dataPr, index) => (
        <>
          {dataPr?.data?.length > 0 && (
            <Row gutter={32} className={styles.rowContent} key={index}>
              <Space
                className={styles.div_row_content}
                style={{ color: "red" }}
              >
                {GetIcon(dataPr.type)}
                <Text strong style={{ color: getColor(dataPr.type) }}>
                  {dataPr.name}
                </Text>
              </Space>
              {dataPr?.type !== "TASK" &&
                dataPr?.data?.map((data: any, index: number) =>
                  getList(dataPr.type, index, data)
                )}
              {dataPr?.type === "TASK" && (
                <Col
                  xl={24}
                  lg={24}
                  sm={24}
                  xs={24}
                  style={{ marginBottom: "10px" }}
                >
                  <Card>
                    <Tasks data={dataPr?.data} />
                  </Card>
                </Col>
              )}
            </Row>
          )}
        </>
      ))}
    </>
  );
}

export default DashBoardContent;
