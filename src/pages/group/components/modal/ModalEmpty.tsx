import { Modal, Input, Form, Button } from "antd";
import React from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { openCustomNotificationWithIcon } from "../../../../common/Notifycations";
import { createGroup } from "../../../../services/group";

interface ModalEmptyProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getGroup: any;
}

function ModalEmpty(props: ModalEmptyProps) {
  const { open, setOpen, getGroup } = props;
  const [useSearch] = useSearchParams();
  const handleSubmit = async (value: any) => {
    const id: any = localStorage.getItem("id_user");
    const idAdd: any = useSearch.get("router_id");
    const response = await createGroup({
      id_project: +idAdd,
      id_user: +id,
      name: value.name,
    });
    if (response.data) {
      getGroup();
      setOpen(false);
    } else {
      openCustomNotificationWithIcon("error", "post group", "add error");
    }
  };

  return (
    <Modal
      title="Create Project"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={false}
    >
      <Form onFinish={handleSubmit}>
        <Form.Item name="name" label="Tên group">
          <Input />
        </Form.Item>
        <Button htmlType="submit">Add Group</Button>
      </Form>
    </Modal>
  );
}

export default ModalEmpty;
