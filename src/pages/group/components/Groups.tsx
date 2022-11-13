import React from "react";
import { Card, Row, Col, Space, Avatar, Typography, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import ModalEmpty from "./modal/ModalEmpty";
import { useLocation, useNavigate } from "react-router-dom";
const { Text } = Typography;

const getName = (name: string) => {
  const nameSplit = name.trim().split("");
  return nameSplit[0];
};
function Groups({ data, getGroup }: any) {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);
  const handleRedirect = (id: number) => {
    console.log(id);
    navigate({
      pathname: "/home/item",
      search: `id_group=${id}&router=id_group`,
    });
  };
  return (
    <Row gutter={[16, 16]}>
      {data?.length > 0 &&
        data.map((item: any, index: number) => (
          <Col
            xl={8}
            lg={8}
            sm={8}
            xs={8}
            key={index}
            style={{ marginBottom: "10px" }}
          >
            <Card
              className="cursor-pointer"
              onClick={() => handleRedirect(item.id)}
            >
              <Space direction="vertical">
                <Text strong className="">
                  {item.name}
                </Text>
                {item?.assign?.length > 0 ? (
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
        ))}
      <Button
        size="large"
        icon={<PlusCircleOutlined />}
        onClick={() => setOpen(true)}
      >
        Group
      </Button>
      <ModalEmpty open={open} setOpen={setOpen} getGroup={getGroup} />
    </Row>
  );
}

export default Groups;
