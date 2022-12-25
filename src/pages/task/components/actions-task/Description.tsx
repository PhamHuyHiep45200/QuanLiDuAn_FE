import React from "react";
import { Typography, Input, Form } from "antd";
import StatusTask from "../../../../common/StatusTask";
import { ShareAltOutlined } from "@ant-design/icons";
import { getColor } from "../task";
import { updateTask } from "../../../../services/task";
import { openCustomNotificationWithIcon } from "../../../../common/Notifycations";
import AddTask from "../modal/ModalEmpty";
const { Text } = Typography;

function Description({ data, getTasks }: any) {
  const [check, setCheck] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [valueInput, setValueInput] = React.useState(data?.descriptions);
  const refInput = React.useRef<any>(null);

  const handleEdit = () => {
    setCheck(true);
    setTimeout(() => {
      refInput.current.focus();
    }, 100);
  };
  const handleBlur = async () => {
    if (valueInput !== data?.descriptions) {
      const response = await updateTask(+data?.id, {
        descriptions: valueInput,
      });
      if (response.data.status === 200) {
        getTasks();
      } else {
        openCustomNotificationWithIcon("error", "error", "error");
      }
    }
    setCheck(false);
  };
  const onValuesChange = (value: any) => {
    setValueInput(value.descriptions.trim());
  };
  return (
    <div className="w-[400px]">
      <div className="flex items-center pl-[10px]">
        <div>
          {" "}
          <StatusTask
            initColor={getColor(data?.status)}
            idTask={data?.id}
            getTasks={getTasks}
          />
        </div>
        <div className="ml-3 flex items-center">
          {!check ? (
            <Text
              className="cursor-pointer font-normal !text-[#000] whitespace-pre-line"
              onClick={handleEdit}
            >
              {data.descriptions}
            </Text>
          ) : (
            <Form
              onValuesChange={onValuesChange}
              initialValues={{ descriptions: data?.descriptions }}
            >
              <Form.Item
                name="descriptions"
                rules={[
                  {
                    required: true,
                    message: "Please input your descriptions!",
                  },
                ]}
              >
                <Input ref={refInput} onBlur={handleBlur} />
              </Form.Item>
            </Form>
          )}
          <Text className="w-5 h-5 border-[1px] border-[rgb(221 221 221 / 60%)] ml-2 flex justify-center items-center rounded-[3px] cursor-pointer">
            <ShareAltOutlined
              style={{ color: "#666" }}
              onClick={() => setOpen(true)}
            />
          </Text>
          <AddTask
            open={open}
            setOpen={setOpen}
            getTasks={getTasks}
            id_taskParent={data.id}
          />
        </div>
      </div>
    </div>
  );
}

export default Description;
