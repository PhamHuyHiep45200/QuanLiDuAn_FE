import { Avatar, Card, Col, Progress, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingDashboard from "../../common/LoadingDashboard";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";
import { getChartItem } from "../../services/chart";
import { taskStatus } from "./chart";
import DescriptionsTask from "./modal";
import TaskChart from "./TaskChart";
const { Text } = Typography;

function Chart() {
  const { id }: any = useParams();
  const [dataChart, setDataChart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [dataTask, setDatask] = useState();

  useEffect(() => {
    setLoading(true);
    getChart();
  }, []);
  const getChart = async () => {
    const response = await getChartItem(+id);
    if (response.data.status === 200) {
      response.data.data.map((da: any) => {
        const dataChart: any = {};
        taskStatus.map((status: any) => {
          if (da.data[status.status].length > 0) {
            dataChart[status.status] = da.data[status.status];
          }
        });
        da["dataTask"] = dataChart;
        da["done"] = da.data.done;
        da["percentDone"] = da.data.percentDone;
        da["count"] = da.data.count;
      });
      setLoading(false);
      setDataChart(response.data.data);
    } else {
      setLoading(false);
      openCustomNotificationWithIcon("error", "get data", "get data error");
    }
  };

  return (
    <div>
      {loading ? (
        <LoadingDashboard loading={loading} />
      ) : (
        <Row gutter={[10, 10]}>
          {dataChart.map((chart: any) => (
            <Col span={6} key={chart.id} className="min-h-[300px]">
              <Card className="!rounded-[6px] shadow-md h-full">
                <div className="flex items-center">
                  <div>
                    <Avatar src={chart?.thumbnail && chart?.thumbnail}>
                      {chart.email[0]}
                    </Avatar>
                  </div>
                  <div className="flex flex-col justify-start ml-[10px]">
                    <Text className="block font-medium truncate">
                      {chart.firstName} {chart.lastName}
                    </Text>
                    <Text className="!text-[#888] text-[12px] leading-[1] truncate">
                      ({chart.email})
                    </Text>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-[10px]">
                  <div className="flex flex-col">
                    <Text type="danger" className="font-medium">
                      {chart.data.count - chart.data.done}
                    </Text>
                    <Text type="danger" className="text-[12px] !text-[#999]">
                      not done
                    </Text>
                  </div>
                  <div className="flex flex-col">
                    <Text type="success" className="font-medium">
                      {chart.data.done}
                    </Text>
                    <Text type="success" className="text-[12px] !text-[#999]">
                      done
                    </Text>
                  </div>
                  <Progress
                    type="circle"
                    width={60}
                    percent={chart.data.percentDone}
                  />
                </div>
                <div className="my-[10px] h-[3px] w-full flex">
                  {taskStatus?.map((status: any) => (
                    <>
                      {chart?.dataTask[status?.status]?.length > 0 && (
                        <div
                          className="h-full"
                          style={{
                            width: `${
                              (chart?.dataTask[status?.status]?.length /
                                chart?.count) *
                              100
                            }%`,
                            backgroundColor: status.color,
                          }}
                        ></div>
                      )}
                    </>
                  ))}
                </div>
                <div className="mt-5 max-h-[200px] overflow-y-auto">
                  {taskStatus.map((status: any) => (
                    <>
                      {chart.dataTask[status.status] && (
                        <TaskChart
                          status={status}
                          task={chart.dataTask[status.status]}
                          setDatask={setDatask}
                          setOpenDescription={setOpenDescription}
                          refesh={getChart}
                        />
                      )}
                    </>
                  ))}
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      )}
      <DescriptionsTask
        open={openDescription}
        setOpen={setOpenDescription}
        title="giai ddoanj 1"
        data={dataTask}
        refesh={getChart}
      />
    </div>
  );
}

export default Chart;
