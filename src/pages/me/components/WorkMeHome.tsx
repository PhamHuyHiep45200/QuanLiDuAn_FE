import React from "react";
import { Image, Row, Col, Progress } from "antd";
import Folder from "../../../assets/image/project.png";
import { useNavigate } from "react-router-dom";

const data = {
  folder: [
    {
      id: 1,
      name: "Đồ Án 1",
      processWork: 80,
    },
    {
      id: 2,
      name: "Đồ Án 2",
      processWork: 40,
    },
    {
      id: 3,
      name: "Đồ Án 3",
      processWork: 100,
    },
    {
      id: 4,
      name: "Đồ Án 4",
      processWork: 60,
    },
    {
      id: 5,
      name: "Đồ Án 5",
      processWork: 50,
    },
    {
      id: 6,
      name: "Đồ Án 6",
      processWork: 0,
    },
  ],
  task: [],
};

function WorkMeHome() {
  const navigate = useNavigate();
  return (
    <div>
      <Row gutter={[16, 16]}>
        {data?.folder?.map((da: any) => (
          <Col
            span={6}
            key={da.id}
            className="flex justify-center items-center"
          >
            <div
              className="relative w-[80%] h-[40%] cursor-pointer"
              onClick={() => navigate(`/me/${da.id}`)}
            >
              <Image src={Folder} height={150} width={170} preview={false} />
              <div className="absolute top-[80%] left-[15%] translate-x-[-15%] font-bold text-[14px] text-[#444] truncate">
                {da.name}
              </div>
              <div className="mt-[-20px]">
                <Progress percent={da.processWork} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default WorkMeHome;
