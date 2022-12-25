import React, { useState } from "react";

import EditorJs from "react-editor-js";
// import EditorHtml from "editorjs-html";

import { EDITOR_JS_TOOLS } from "./constants";

const Docs = () => {
  const instanceRef = React.useRef(null);

  async function handleSave() {
    const savedData = await instanceRef.current.save();

    console.log("savedData", savedData);
    // const edjsParser = EditorHtml();
    // const html = edjsParser.parse(savedData);
    // console.log("ini html", html);
  }
  return (
    <>
      <button onClick={handleSave}>Save!</button>
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
                text: "Editor.js",
                level: 2,
              },
            },
            {
              type: "paragraph",
              data: {
                text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
              },
            },
            {
              type: "header",
              data: {
                text: "Key features",
                level: 3,
              },
            },
          ],
          version: "2.12.4",
        }}
      />
    </>
  );
};
export default Docs;
