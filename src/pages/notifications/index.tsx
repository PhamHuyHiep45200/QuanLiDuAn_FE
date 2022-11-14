import React, { useEffect, useState } from "react";
import { Row, Col, Space, Avatar, Button, Card, Typography, Image } from "antd";
import { getNotifycations } from "../../services/project";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { updateNitifyProject } from "../../services/user-project";

const { Text } = Typography;

const getName = (name: string) => {
  const nameSplit = name?.trim()?.split("");
  return nameSplit[0];
};
function NotifyCations() {
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getNotyfi();
  }, []);

  const getNotyfi = async () => {
    const id: any = localStorage.getItem("id_user");
    const response = await getNotifycations(+id);
    if (response.data.status === 200) {
      setData(response.data.data);
    } else {
      openCustomNotificationWithIcon(
        "error",
        "get notify",
        "get notifications error"
      );
    }
  };
  const handleSubmit = async (id: number, value: string) => {
    const response = await updateNitifyProject(id, { status: value });
    console.log(response);

    if (response.data) {
      getNotyfi();
    } else {
      openCustomNotificationWithIcon(
        "error",
        "action notify",
        "action notifications error"
      );
    }
  };
  return (
    <Card className="min-h-[70vh]">
      {data?.length > 0 ? (
        data.map((item: any, index: number) => (
          <div key={index}>
            <Row
              className="cursor-pointer py-[10px] border-b-[1px]"
              gutter={16}
            >
              <Col span={2} align="right">
                <Avatar
                  size="large"
                  src={
                    item?.User?.thumbnail?.length > 0 && item?.User?.thumbnail
                  }
                >
                  {getName(item?.UserParent?.email)}
                </Avatar>
              </Col>
              <Col span={22}>
                <Text className="block text-[16px] !text-[#444]">
                  <Text className="text-[16px] !text-[#444] font-medium">
                    {item?.UserParent?.firstName} {item?.UserParent?.lastName}
                  </Text>
                  <Text className="text-[16px] mx-[4px]">
                    đã mời bạn tham gia vào
                  </Text>
                  <Text className="font-medium mr-[4px]">{item?.type}</Text>
                  <Text className="text-[18px] font-medium !text-[red]">
                    {item?.Project?.name}
                  </Text>
                </Text>
                <Text className="block text-[14px] !text-[#888]">
                  ({item?.UserParent?.email})
                </Text>
                <Text className="block text-[12px] !text-[#999] mb-[10px]">
                  2 hours ago
                </Text>
                <Space>
                  <Button
                    type="primary"
                    className="!rounded-[6px] !font-medium"
                    onClick={() => handleSubmit(item?.id, "APPROVED")}
                  >
                    accept
                  </Button>
                  <Button
                    className="!rounded-[6px] !bg-[#e1e0e0] !font-medium"
                    onClick={() => handleSubmit(item?.id, "REJECT")}
                  >
                    cancle
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>
        ))
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnTmG0iM3tD34cfS5dMTHCC_-CcfDm74M5XrCf-vAXh0-U-qNrfYTim1PPvHXITk8CJQ8&usqp=CAU"
            width={500}
            preview={false}
          />
        </div>
      )}
    </Card>
  );
}

export default NotifyCations;
