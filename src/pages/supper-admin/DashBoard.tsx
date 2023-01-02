import React, { useEffect } from "react";
import { Row, Col, Card, Statistic } from "antd";
import {
  FolderOpenFilled,
  TeamOutlined,
  DeploymentUnitOutlined,
  DropboxOutlined,
} from "@ant-design/icons";
import { getFullStatistic } from "../../services/chart";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";

const getIcon = (type: string) => {
  if (type === "project") {
    return <FolderOpenFilled className="mb-[13px]" />;
  } else if (type === "group") {
    return <DropboxOutlined className="mb-[13px]" />;
  } else if (type === "item") {
    return <DeploymentUnitOutlined className="mb-[13px]" />;
  } else if (type === "member") {
    return <TeamOutlined className="mb-[13px]" />;
  }
};

function DashBoard() {
  const navigate = useNavigate();
  const [data, setData] = React.useState<any>({
    project: 0,
    group: 0,
    item: 0,
    member: 0,
  });
  useEffect(() => {
    getStatistis();
  }, []);
  const getStatistis = async () => {
    const response = await getFullStatistic();
    if (response?.data?.status === 200) {
      setData({
        project: response?.data?.project,
        group: response?.data?.group,
        item: response?.data?.item,
        member: response?.data?.user,
      });
    } else {
      openCustomNotificationWithIcon(
        "error",
        "error data",
        "Lấy dữ liệu thất bại"
      );
    }
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {Object.entries(data).map(([key, values], i) => {
          return (
            <Col span={6} key={i}>
              <Card
                className={`${styles.statistic} cursor-pointer`}
                onClick={() => navigate(`/supper-admin/${key}`)}
              >
                <Statistic
                  title={key}
                  value={values}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={getIcon(key)}
                />
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default DashBoard;
