import React from "react";
import { LockOutlined, KeyOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

function UpdateDelete({ type, data, functionDelete }: any) {
  const [open, setOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showPopconfirm = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    functionDelete(data, handleCancel);
  };

  const handleCancel = () => {
    setOpen(false);
    setConfirmLoading(false);
  };
  return (
    <>
      <Popconfirm
        title={
          data?.deleteFlg
            ? `Bạn có muốn mở khóa ${type}`
            : `Bạn có chắc chắn muốn khóa ${type}`
        }
        open={open}
        onConfirm={handleOk}
        okButtonProps={{ loading: confirmLoading }}
        onCancel={handleCancel}
      >
        {data?.deleteFlg ? (
          <LockOutlined onClick={showPopconfirm} />
        ) : (
          <KeyOutlined onClick={showPopconfirm} />
        )}
      </Popconfirm>
    </>
  );
}

export default UpdateDelete;
