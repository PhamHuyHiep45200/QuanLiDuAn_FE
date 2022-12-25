import React from "react";
import { Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { updateNitifyProject } from "../../services/user-project";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";

function PopupConfirm({ data, refesh }: any) {
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const idUser: any = localStorage.getItem("id_user");

  const showPopconfirm = () => {
    setOpenConfirm(!openConfirm);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    const response = await updateNitifyProject(data?.id, {
      status: "REJECT",
      id_user: +idUser,
    });
    if (response.data.status === 200) {
      openCustomNotificationWithIcon(
        "success",
        "Loại User",
        "Loại User thành công"
      );
      refesh();
    } else {
      openCustomNotificationWithIcon(
        "error",
        "Loại User",
        response.data.message
      );
    }
    setConfirmLoading(false);
    setOpenConfirm(false);
  };

  const handleCancel = () => {
    setOpenConfirm(false);
  };
  return (
    <Popconfirm
      title={`Loại bỏ ${
        data?.User?.firstName + " " + data?.User?.lastName
      } ra khỏi dự án？`}
      open={openConfirm}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <DeleteFilled className="cursor-pointer" onClick={showPopconfirm} />
    </Popconfirm>
  );
}

export default PopupConfirm;
