import React from "react";
import { Tag, DatePicker, Form } from "antd";
import moment from "moment";
import { updateTask } from "../../../../services/task";
import { openCustomNotificationWithIcon } from "../../../../common/Notifycations";

const dateFormat = "DD-MM-YYY";

function Date({ colorType, type, data, getTasks }: any) {
  const refDate = React.useRef<any>(null);
  const [check, setCheck] = React.useState(false);
  const [dateChange, setDateChange] = React.useState<any>("");
  const editDate = () => {
    setCheck(true);
    setTimeout(() => {
      refDate.current.focus();
    }, 100);
  };
  const handleBlur = async () => {
    const dateInit = moment(data).format("DD-MM-YYYY");
    const dateChangeValue = moment(dateChange).format("DD-MM-YYYY");
    if (dateInit !== dateChangeValue && dateChangeValue.length > 0) {
      const response = await updateTask(+data?.id, {
        [type]: dateChange.toISOString(),
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
    setDateChange(value[type]);
  };
  return (
    <>
      {!check ? (
        <Tag color={colorType} onClick={editDate}>
          {moment(data).format("DD-MM-YYYY")}
        </Tag>
      ) : (
        <Form
          onValuesChange={onValuesChange}
          initialValues={{
            [type]: moment(moment(data).format("DD-MM-YYYY"), dateFormat),
          }}
        >
          <Form.Item
            name={type}
            rules={[
              {
                required: true,
                message: `Please input your ${type}!`,
              },
            ]}
          >
            <DatePicker ref={refDate} format={dateFormat} onBlur={handleBlur} />
          </Form.Item>
        </Form>
      )}
    </>
  );
}

export default Date;
