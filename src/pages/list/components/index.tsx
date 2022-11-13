import React from "react";
import { Row, Col, Card, Space, Button, Typography } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import ModalEmpty from "./modal/ModalEmpty";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

function Lists({ data, open, setOpen, getItems }: any) {
  const navigate = useNavigate();
  const handleRedirect = (id: number) => {
    console.log(id);
    navigate({ pathname: `/home/task/${id}` });
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
              </Space>
            </Card>
          </Col>
        ))}
      <Button
        size="large"
        icon={<PlusCircleOutlined />}
        onClick={() => setOpen(true)}
      >
        items
      </Button>
      <ModalEmpty open={open} setOpen={setOpen} getItems={getItems} />
    </Row>
  );
}

export default Lists;
