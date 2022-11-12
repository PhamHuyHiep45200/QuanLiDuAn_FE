import React from "react";
import { Avatar, Card, Col, Space, Typography } from "antd";
import styles from "../styles/project.module.scss";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface ProjectProps {
  id: number;
  data: any;
  getName: any;
}

function Project(props: ProjectProps) {
  const { id, data, getName } = props;
  const navigate = useNavigate();
  return (
    <Col
      xl={6}
      lg={8}
      sm={12}
      xs={24}
      key={id}
      style={{ marginBottom: "10px" }}
    >
      <Card
        className={styles.card}
        onClick={() =>
          navigate({
            pathname: "/home/group",
            search: `id_project=${data.id}`,
          })
        }
      >
        <Space direction="vertical">
          <Text strong className={styles.name_Project}>
            {data.name}
          </Text>
          {data?.UserProject?.length > 0 ? (
            <Avatar.Group maxCount={4} size="large">
              {data?.UserProject?.map((user: any) => (
                <Avatar key={user?.id} size="large">
                  {user?.User?.thumbnailUrl
                    ? user?.thumbnailUrl
                    : getName(user?.User?.email)}
                </Avatar>
              ))}
            </Avatar.Group>
          ) : (
            <Text type="secondary"> Chưa có thành viên...Project</Text>
          )}
        </Space>
      </Card>
    </Col>
  );
}

export default Project;
