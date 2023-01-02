import React, { useEffect, useState } from "react";
import events from "./event";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Spin } from "antd";
import { getCalendar } from "../../services/calendar";
import { openCustomNotificationWithIcon } from "../../common/Notifycations";

moment.locale("en-GB");
BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(
  (k) => BigCalendar.Views[k]
);
function Calender() {
  const [calendar, setCalendar] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState({
    start_date: moment(new Date()).startOf("month").toISOString(),
    end_date: moment(new Date()).endOf("month").toISOString(),
  });
  useEffect(() => {
    setLoading(true);
    getCalendars();
  }, []);
  const getCalendars = async () => {
    const id_user: any = localStorage.getItem("id_user");
    const id_item: any = localStorage.getItem("itemTask");
    const dataSubmit = {
      id_user: +id_user,
      id_item: id_item,
      ...date,
    };
    const response = await getCalendar(dataSubmit);

    if (response?.data?.status === 200) {
      const list = response?.data?.data;
      const dataFormat = list.map((l: any) => {
        return {
          title: l.descriptions,
          start: l.start_Time,
          end: l.end_Time,
        };
      });
      setCalendar([...dataFormat]);
      setLoading(false);
    } else {
      openCustomNotificationWithIcon("error", "error", "error");
      setLoading(false);
    }
  };
  return (
    <Spin spinning={loading}>
      <div style={{ height: 700 }}>
        <BigCalendar
          events={calendar}
          step={60}
          views={allViews}
          defaultDate={new Date()}
          popup={false}
          onNavigate={(focusDate: any) => {
            setDate({
              start_date: moment(focusDate).startOf("month").toISOString(),
              end_date: moment(focusDate).endOf("month").toISOString(),
            });
          }}
        />
      </div>
    </Spin>
  );
}

export default Calender;
