import React from "react";
import { Avatar, Button, Card, Col, Space, Typography } from "antd";
import styles from "../styles/project.module.scss";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

interface GroupProps {
  id: number;
  data: any;
  getName: any;
}

function Group(props: GroupProps) {
  const { id, data, getName } = props;
  const navigate = useNavigate();
  return (
    <Col
      xl={8}
      lg={12}
      sm={20}
      xs={24}
      key={id}
      style={{ marginBottom: "10px" }}
    >
      <Card className={styles.card} onClick={() => navigate("/home/list")}>
        <Space direction="vertical">
          <Text strong className={styles.name_Project}>
            {data.name}
          </Text>
          {data?.assign?.length > 0 ? (
            <Avatar.Group maxCount={5} size="large">
              {data?.assign?.map((user: any) => (
                <Avatar key={user?.id} size="large">
                  {user?.thumbnailUrl
                    ? user?.thumbnailUrl
                    : getName(user?.name)}
                </Avatar>
              ))}
            </Avatar.Group>
          ) : (
            <Text type="secondary"> Chưa có thành viên...group</Text>
          )}
        </Space>
      </Card>
    </Col>
  );
}

export default Group;
