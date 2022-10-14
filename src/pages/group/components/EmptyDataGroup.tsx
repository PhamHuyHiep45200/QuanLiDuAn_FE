import React, { useState } from "react";
import { Button, Image, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EmptyImage from "../../../assets/image/smile-sad.webp";
import ModalEmpty from "./modal/ModalEmpty";

const { Title } = Typography;

function EmptyDataGroup() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <Space style={{ width: "100%" }} direction="vertical" align="center">
      <Image src={EmptyImage} preview={false} height={300} />
      <Title level={4}>Tiếc quá! Bạn chưa có nhóm nào...</Title>
      <Button
        type="primary"
        shape="round"
        size="large"
        className="animate-bounce"
        style={{
          background: "linear-gradient(144deg, #0b53da, #fc459b)",
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => setOpenModal(true)}
      >
        <PlusOutlined />
        Group
      </Button>
      <ModalEmpty open={openModal} setOpen={setOpenModal} />
    </Space>
  );
}

export default EmptyDataGroup;
