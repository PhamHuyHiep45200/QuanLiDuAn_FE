import React from "react";
import { Button, Form, Input, Modal } from "antd";
import { openCustomNotificationWithIcon } from "../../../../common/Notifycations";
import { createGroup } from "../../../../services/group";
import { useSearchParams } from "react-router-dom";
import { createItem } from "../../../../services/item";

function ModalEmpty({ getItems, open, setOpen }: any) {
  const [form] = Form.useForm();
  const [searchParams] = useSearchParams();
  const handleSubmit = async (value: any) => {
    const idGroup: any = searchParams.get("group");
    const id: any = localStorage.getItem("id_user");
    const response = await createItem({
      id_group: +idGroup,
      id_user: +id,
      name: value.name,
    });
    if (response.data) {
      getItems();
      handleCancel();
    } else {
      openCustomNotificationWithIcon("error", "post item", "add error");
    }
  };
  const handleCancel = () => {
    setOpen(false);
    form.setFieldsValue({ name: "" });
  };

  return (
    <Modal
      title="Create Item"
      centered
      open={open}
      onCancel={handleCancel}
      footer={false}
    >
      <Form onFinish={handleSubmit} form={form}>
        <Form.Item name="name" label="item name">
          <Input />
        </Form.Item>
        <Button htmlType="submit">Add Item</Button>
      </Form>
    </Modal>
  );
}

export default ModalEmpty;
