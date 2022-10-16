import React from "react";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import styles from "../../styles/layout.module.scss";
import ModalAdd from "./ModalAdd";

function Contents() {
  const [openModalAdd, setOpenModalAdd] = React.useState<boolean>(false);
  return (
    <div
      style={{
        minHeight: "75vh",
        borderRadius: "10px",
        marginTop: "100px",
      }}
    >
      <Outlet />
      <div className={styles.AddProject} onClick={() => setOpenModalAdd(true)}>
        {openModalAdd ? (
          <MinusOutlined className={styles.open_modal} />
        ) : (
          <PlusOutlined className={styles.open_modal} />
        )}
      </div>
      <ModalAdd open={openModalAdd} setOpen={setOpenModalAdd} />
    </div>
  );
}

export default Contents;
