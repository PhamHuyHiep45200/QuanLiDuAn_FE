import { Modal } from "antd";
import React from "react";

interface ModalEmptyProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalEmpty(props: ModalEmptyProps) {
  const { open, setOpen } = props;
  return (
    <Modal
      title="Create Project"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      width={1000}
      bodyStyle={{ height: 500 }}
      footer={false}
    >
      <p>add project</p>
    </Modal>
  );
}

export default ModalEmpty;
