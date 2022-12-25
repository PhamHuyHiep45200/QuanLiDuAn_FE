import React, { useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar-scheduler";
import moment from "moment";
import { event } from "./event";

const localizer = momentLocalizer(moment);

function Calender() {
  const defaultDate = useMemo(() => new Date(2015, 3, 1), []);
  return (
    <div className="h-[1000px]">
      <Calendar
        defaultDate={defaultDate}
        events={event}
        localizer={localizer}
        popup
      />
    </div>
  );
}

export default Calender;
