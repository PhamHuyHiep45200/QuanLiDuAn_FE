import React, { useEffect, useState } from "react";
import { Row, Col, Space, Avatar, Button, Card, Typography, Image } from "antd";
import { getNotifycations } from "../../services/project";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { updateNitifyProject } from "../../services/user-project";
import { updateStatusNotifyGroup } from "../../services/user-group";
import moment from "moment";
import { ContextProvider } from "../../context/ContextProvider";

const { Text } = Typography;

const getName = (name: string) => {
  return name?.trim()?.split("")[0];
};
function NotifyCations() {
  const socket = React.useContext(ContextProvider);
  const id_user: any = localStorage.getItem("id_user");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getNotyfi();
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    return () => {
      socket.off("connect");
    };
  }, []);

  const getNotyfi = async () => {
    const response = await getNotifycations(+id_user);
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
  const handleSubmit = async (id: number, value: string, type: string) => {
    if (type === "project") {
      const response = await updateNitifyProject(id, {
        status: value,
        id_user: +id_user,
      });
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
    } else {
      const response = await updateStatusNotifyGroup(id, {
        status: value,
        id_user: id_user,
      });
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
                    item?.UserParent?.thumbnail?.length > 0 &&
                    item?.UserParent?.thumbnail
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
                    {item?.Project?.name || item?.Group?.name}
                  </Text>
                </Text>
                <Text className="block text-[14px] !text-[#888]">
                  ({item?.UserParent?.email})
                </Text>
                <Text className="block text-[12px] !text-[#999] mb-[10px]">
                  {moment(item?.updatedAt).fromNow()}
                </Text>
                <Space>
                  <Button
                    type="primary"
                    className="!rounded-[6px] !font-medium"
                    onClick={() =>
                      handleSubmit(item?.id, "APPROVED", item?.type)
                    }
                  >
                    accept
                  </Button>
                  <Button
                    className="!rounded-[6px] !bg-[#e1e0e0] !font-medium"
                    onClick={() => handleSubmit(item?.id, "REJECT", item?.type)}
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
