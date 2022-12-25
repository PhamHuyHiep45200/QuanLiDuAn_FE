import moment from "moment";

const getTime = (start: string, end: string) => {
  const dataStart = start.split("-");
  const dataEnd = end.split("-");

  if (dataStart[2] > dataEnd[2]) {
    return "Hết hạn";
  } else if (dataStart[2] < dataEnd[2]) {
    return "1 năm";
  } else {
    if (dataStart[1] > dataEnd[1]) {
      return "Hết hạn";
    } else if (dataStart[1] < dataEnd[1]) {
      const month = +dataEnd[1] - +dataStart[1];
      return `${month} tháng`;
    } else {
      if (dataStart[0] > dataEnd[0]) {
        return "Hết hạn";
      } else if (dataStart[0] < dataEnd[0]) {
        const month = +dataEnd[0] - +dataStart[0];
        return `${month} ngày`;
      } else {
        return "Hôm nay";
      }
    }
  }
};

const timeWork = (value: string) => {
  const timeEnd = moment(value).format("DD-MM-YYYY");
  const timeNow = moment(new Date()).format("DD-MM-YYYY");
  return getTime(timeNow, timeEnd);
};

export default timeWork;
