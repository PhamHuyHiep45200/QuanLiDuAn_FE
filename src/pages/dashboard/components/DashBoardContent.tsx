import React from "react";
import { Avatar, Card, Col, Row, Space, Typography } from "antd";
import styles from "../../../styles/project.module.scss";
import { useNavigate } from "react-router-dom";

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

  return (
    <Row gutter={32}>
      {dataProject?.map((data: any) => (
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
            onClick={() => handleRedirectProject(data)}
          >
            <Space direction="vertical">
              <Text strong className={styles.name_Project}>
                {data.name}
              </Text>
              {data?.listUser?.length > 0 ? (
                <Avatar.Group maxCount={4} size="large">
                  {data?.listUser?.map((user: any) => (
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
  );
}

export default DashBoardContent;
