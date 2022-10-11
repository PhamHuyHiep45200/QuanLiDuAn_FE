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
      return <FolderOpenOutlined style={{ marginBottom: "6px" }} />;
    } else if (type === "GROUP") {
      return <TeamOutlined style={{ marginBottom: "6px" }} />;
    } else if (type === "LISTTASK") {
      return <UnorderedListOutlined style={{ marginBottom: "6px" }} />;
    } else if (type === "TASK") {
      return <BranchesOutlined style={{ marginBottom: "6px" }} />;
    }
  };
  return (
    <>
      {dataMockList.map((mock, index) => (
        <Row gutter={32} className={styles.rowContent} key={index}>
          <Space className={styles.div_row_content}>
            {GetIcon(mock.type)}
            {mock.name}
          </Space>
          {mock?.data?.map((data: any) => (
            <Col
              xl={6}
              lg={8}
              sm={12}
              xs={24}
              key={data.id}
              style={{ marginBottom: "10px" }}
            >
              <Card
                className={styles.card}
                // onClick={() => handleRedirectProject(data)}
              >
                <Space direction="vertical">
                  <Text strong className={styles.name_Project}>
                    {data.name}
                  </Text>
                  {data?.assign?.length > 0 ? (
                    <Avatar.Group maxCount={4} size="large">
                      {data?.assign?.map((user: any) => (
                        <Avatar key={user?.id} size="large">
                          {user?.thumbnailUrl
                            ? user?.thumbnailUrl
                            : getName(user?.name)}
                        </Avatar>
                      ))}
                    </Avatar.Group>
                  ) : (
                    <Text type="secondary"> Chưa có thành viên...</Text>
                  )}
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
}

export default DashBoardContent;
// DataGetListTask;
