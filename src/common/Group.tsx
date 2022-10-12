import React from "react";
import { Avatar, Card, Col, Space, Typography } from "antd";
import styles from "../styles/project.module.scss";

const { Text } = Typography;

interface GroupProps {
  id: number;
  data: any;
  getName: any;
}

function Group(props: GroupProps) {
  const { id, data, getName } = props;
  return (
    <Col
      xl={9}
      lg={16}
      sm={20}
      xs={24}
      key={id}
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
