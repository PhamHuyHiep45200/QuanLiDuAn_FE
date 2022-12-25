import React from "react";
const now = new Date();

const Data = () => {
  return (
    <>
      {[1].map((data) => (
        <div key={data}>ddaay la{data}</div>
      ))}
    </>
  );
};

export const event = [
  {
    id: 0,
    title: <Data />,
    allDay: true,
    start: "2022/12/10",
    end: "2022/12/15",
  },
  {
    id: 2,
    title: "contetnt 2",
    allDay: true,
    start: "2022/12/10",
    end: "2022/12/15",
  },
  {
    id: 3,
    title: "cnente 3",
    allDay: true,
    start: "2022/12/10",
    end: "2022/12/15",
  },
  {
    id: 4,
    title: "cnente 4",
    allDay: true,
    start: "2022/12/10",
    end: "2022/12/15",
  },
  {
    id: 1,
    title: "Long Event",
    start: "2022/12/5",
    end: "2022/12/6",
  },
];
