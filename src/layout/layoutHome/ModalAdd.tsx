import React from "react";
import { Modal } from "antd";
interface ModalAdd {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function ModalAdd(props: ModalAdd) {
  const { open, setOpen } = props;
  return (
    <Modal title="Basic Modal" open={open} onCancel={() => setOpen(false)}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}

export default ModalAdd;
