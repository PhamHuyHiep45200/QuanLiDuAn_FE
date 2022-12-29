import React from "react";
import { Form, Input } from "antd";

function EditInfo({ name, data, form }: any) {
  const focus = React.useRef<any>();
  const [edit, setEdit] = React.useState(false);
  const [init, setInit] = React.useState(data);

  const handleChang = (e: any) => {
    setInit(e.target.value);
  };
  const handleBlur = () => {
    form.setFieldValue(name, init);
    setEdit(false);
  };
  return (
    <div className="relative">
      <div className={`${edit ? "z-[100]" : "z-[1]"}`} style={{ zIndex: 100 }}>
        <Form.Item name={name} noStyle>
          <Input ref={focus} onChange={handleChang} onBlur={handleBlur} />
        </Form.Item>
      </div>
      <span
        className="cursor-pointer absolute left-[-3px] top-[-6px] bg-[#fff] z-10 h-[40px] w-[200px] flex items-center"
        onClick={() => {
          setEdit(true);
          setTimeout(() => {
            focus.current.focus();
          }, 100);
        }}
      >
        {init}
      </span>
    </div>
  );
}

export default EditInfo;
