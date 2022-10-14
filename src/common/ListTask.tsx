import React from "react";
import { Avatar, Card, Col, Space, Typography } from "antd";
import styles from "../styles/project.module.scss";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface ListTaskProps {
  id: number;
  data: any;
  getName: any;
}

function ListTask(props: ListTaskProps) {
  const { id, data, getName } = props;
  const navigate = useNavigate();
  return (
    <Col
      xl={18}
      lg={20}
      sm={22}
      xs={24}
      key={id}
      style={{ marginBottom: "10px" }}
    >
      <Card className={styles.card} onClick={() => navigate("/home/task")}>
        <Space>
          <Text strong className={styles.name_Project}>
            {data.name}
          </Text>
          {data?.assign?.length > 0 ? (
            <Avatar.Group maxCount={6} size="large">
              {data?.assign?.map((user: any) => (
                <Avatar key={user?.id} size="large">
                  {user?.thumbnailUrl
                    ? user?.thumbnailUrl
                    : getName(user?.name)}
                </Avatar>
              ))}
            </Avatar.Group>
          ) : (
            <Text type="secondary"> Chưa có thành viên...ListTask</Text>
          )}
        </Space>
      </Card>
    </Col>
  );
}

export default ListTask;
