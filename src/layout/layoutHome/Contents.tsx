import React, { createContext } from "react";
import { Space, Button } from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
  PlusCircleOutlined,
  FolderOpenOutlined,
  TeamOutlined,
  UnorderedListOutlined,
  BranchesOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import styles from "../../styles/layout.module.scss";
import AddProject from "./modal/AddProject";

export const CreateRefeshProject = createContext<any>(null);

function Contents() {
  const [openModalAdd, setOpenModalAdd] = React.useState<boolean>(false);
  const [typeModal, setTypeModal] = React.useState<string>("");
  const [typeModalParent, setTypeModalParent] = React.useState<
    string | undefined
  >("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
  const [refesh, setRefesh] = React.useState<any>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSetModal = (type: string, typeParent: string | undefined) => {
    showModal();
    setTypeModal(type);
    setTypeModalParent(typeParent);
  };
  return (
    <CreateRefeshProject.Provider value={{ refesh, setRefesh }}>
      <div
        style={{
          minHeight: "75vh",
          borderRadius: "10px",
          marginTop: "100px",
        }}
      >
        <Outlet />
        <div
          className={styles.AddProject}
          onClick={() => setOpenModalAdd(!openModalAdd)}
        >
          {openModalAdd ? (
            <MinusOutlined className={styles.open_modal} />
          ) : (
            <PlusOutlined className={styles.open_modal} />
          )}
        </div>
        <div className={styles.AddProjectNone}>
          {openModalAdd && (
            <Space className={styles.AddProjectNonePopup} direction="vertical">
              <div style={{ textAlign: "right" }}>
                <CloseOutlined onClick={() => setOpenModalAdd(false)} />
              </div>
              <Space
                direction="vertical"
                style={{ width: "100%", padding: "0.5rem 0" }}
              >
                <Space style={{ width: "100%" }}>
                  <Button
                    onClick={() => {
                      handleSetModal("project", undefined);
                      setOpenModalAdd(!openModalAdd);
                    }}
                  >
                    <PlusCircleOutlined />
                    <FolderOpenOutlined />
                  </Button>
                </Space>
                <Space style={{ width: "100%" }}>
                  <Button
                    onClick={() => {
                      handleSetModal("group", "project");
                      setOpenModalAdd(!openModalAdd);
                    }}
                  >
                    <PlusCircleOutlined />
                    <TeamOutlined />
                  </Button>
                </Space>
                <Space style={{ width: "100%" }}>
                  <Button
                    onClick={() => {
                      handleSetModal("item", "group");
                      setOpenModalAdd(!openModalAdd);
                    }}
                  >
                    <PlusCircleOutlined />
                    <UnorderedListOutlined />
                  </Button>
                </Space>
                <Space style={{ width: "100%" }}>
                  <Button
                    onClick={() => {
                      handleSetModal("task", "item");
                      setOpenModalAdd(!openModalAdd);
                    }}
                  >
                    <PlusCircleOutlined />
                    <BranchesOutlined />
                  </Button>
                </Space>
              </Space>
            </Space>
          )}
          <AddProject
            isModalOpen={isModalOpen}
            handleCancel={handleCancel}
            typeModal={typeModal}
            typeModalParent={typeModalParent}
          />
        </div>
      </div>
    </CreateRefeshProject.Provider>
  );
}

export default Contents;
