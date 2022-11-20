import React, { useState } from "react";
import { Button, Image, Space, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EmptyImage from "../../../assets/image/smile-sad.webp";
import ModalEmpty from "./modal/ModalEmpty";

const { Title } = Typography;

function EmptyData({ open, setOpen, getTasks }: any) {
  return (
    <Space style={{ width: "100%" }} direction="vertical" align="center">
      <Image src={EmptyImage} preview={false} height={300} />
      <Title level={4}>Tiếc quá! Bạn chưa có task nào...</Title>
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
        onClick={() => setOpen(true)}
      >
        <PlusOutlined />
        task
      </Button>
    </Space>
  );
}

export default EmptyData;
