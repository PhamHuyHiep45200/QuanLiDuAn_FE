import React from "react";
import { Avatar, Card, Col, Image, Space, Typography } from "antd";
import styles from "../styles/project.module.scss";
import { useNavigate } from "react-router-dom";
import Projects from "../assets/image/project.png";

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
      <div
        className={styles.card}
        style={{ position: "relative" }}
        onClick={() =>
          navigate({
            pathname: "/home/group",
            search: `router_id=${data.id}&router=id_project`,
          })
        }
      >
        <Image src={Projects} height={200} width={250} preview={false} />
        <Space direction="vertical" className="absolute top-16 left-10">
          <Text strong className="text-[20px] font-bold !text-[#333]">
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
      </div>
    </Col>
  );
}

export default Project;
