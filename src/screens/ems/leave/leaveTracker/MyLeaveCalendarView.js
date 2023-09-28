import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function MyLeaveCalendarView() {
  const [value, onChange] = useState(new Date());

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
      <h1>asdfghj</h1>
    </div>
  );
}

export default MyLeaveCalendarView;
