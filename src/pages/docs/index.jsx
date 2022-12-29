import React, { useState, useEffect } from "react";
import { Button, Spin, Modal } from "antd";
import EditorJs from "react-editor-js";
// import EditorHtml from "editorjs-html";

import { EDITOR_JS_TOOLS } from "./constants";

import { getDocsById, updateDocs } from "../../services/docs";
import { useParams } from "react-router-dom";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
const Docs = () => {
  const instanceRef = React.useRef(null);
  const { id } = useParams();
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    setLoading(true);
    const saveData = await instanceRef.current.save();
    console.log(saveData);
    const save = JSON.stringify(saveData);
    const response = await updateDocs(id, { data: save });
    if (response.data.status === 200) {
      openCustomNotificationWithIcon(
        "success",
        "Lưu document",
        "Lưu thành công"
      );
      setLoading(false);
    } else {
      openCustomNotificationWithIcon("error", "Lưu document", "Lưu thất bại");
      setLoading(false);
    }
  }
  const getDocs = async () => {
    setLoading(true);
    const response = await getDocsById(id);
    console.log(response);
    if (response.data.status === 200) {
      const data = JSON.parse(response.data.data.data);
      console.log("data", data);
      setDocs(dataDocs);
      setLoading(false);
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
      setLoading(false);
    }
  };
  useEffect(() => {
    getDocs();
  }, []);
  const handleDelete = () => {
    console.log("ok");
  };

  return (
    <Spin spinning={false}>
      <div className="flex justify-between px-[100px] mb-10">
        <Button shape="round" onClick={handleSave} type="primary">
          Lưu
        </Button>
        <Button shape="round" onClick={handleDelete} type="danger">
          xóa
        </Button>
      </div>
      <EditorJs
        instanceRef={(instance) => (instanceRef.current = instance)}
        tools={EDITOR_JS_TOOLS}
        i18n={{
          messages: {},
        }}
        data={{
          time: 1556098174501,
          blocks: [
            {
              type: "header",
              data: {
                text: "Doccument",
                level: 2,
              },
            },
          ],
          version: "2.12.4",
        }}
      />
      <Modal></Modal>
    </Spin>
  );
};
export default Docs;
