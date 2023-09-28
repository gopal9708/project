import dayjs from "dayjs";
import React, { useState, useEffect } from "react";

export default function Day({ day, rowIdx, setDaySelected, setShowEventModal, events, setSelectedEvent }) {
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    // const eventsOfDay = events.filter((evt) => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
    // setDayEvents(eventsOfDay);
  }, [events, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-3">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p className={`text-sm p-1 my-3 mx-2 text-center  ${getCurrentDayClass()}`}>
          {day.format("DD")}
        </p>
      </header>
      <div className="flex-1 cursor-pointer" onClick={() => {
        setDaySelected(day);
        setShowEventModal(true);
      }}>
        {dayEvents.map((evt, idx) => (
          <div key={idx} onClick={() => setSelectedEvent(evt)} className={`bg-${evt.label}-200 p-1 mr-4 text-gray-600 text-sm rounded mb-1 truncate`}>
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
