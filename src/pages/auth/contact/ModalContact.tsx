import React from "react";
import { Modal } from "antd";

interface ModalContact {
  open: boolean;
  setOpen: any;
}

function ModalContact(props: ModalContact) {
  const { open, setOpen } = props;
  return (
    <Modal
      title="Liên hệ tư vấn"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}

export default ModalContact;
