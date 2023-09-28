import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getMonth } from "./util.js";

import { AiOutlineLeft, AiOutlineRight} from "react-icons/ai";
export default function SmallCalendar({ monthIndex, setSmallCalendarMonth, daySelected, setDaySelected }) {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    setCurrentMonthIdx(monthIndex);
  }, [monthIndex]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
  }
  function getDayClass(day) {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currDay = day.format(format);
    const slcDay = daySelected && daySelected.format(format);
    if (nowDay === currDay) {
      return "bg-blue-500 rounded-full text-white";
    } else if (currDay === slcDay) {
      return "bg-blue-100 rounded-full text-blue-600 font-bold";
    } else {
      return "";
    }
  }
  return (
    <div style={{ marginTop: '9px' }}>
    <header style={{ display: 'flex', justifyContent: 'space-between' }}>
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        {dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM YYYY')}
      </p>
      <div>
        <button onClick={handlePrevMonth} style={{background:"none", border:"none"}}>
          <span style={{ cursor: 'pointer', color: '#333333',    fontFamily: "Material Icons",
              
              fontWeight: "normal",
              fontStyle: "normal",
              fontSize: "1rem",
              lineHeight: "1",
              letterSpacing: "normal",
              textTransform: "none",
              display: "inlineBlock",
              whiteSpace: "nowrap", }}>
          <AiOutlineLeft/>
          </span>
        </button>
        <button onClick={handleNextMonth} style={{background:"none", border:"none"}}>
          <span style={{ cursor: 'pointer', color: '#333333',    fontFamily: "Material Icons",
             
              fontWeight: "normal",
              fontStyle: "normal",
              fontSize: "1rem",
              lineHeight: "0.5",
              letterSpacing: "normal",
              textTransform: "none",
              display: "inlineBlock",
              whiteSpace: "nowrap", }}>
          <AiOutlineRight/>
          </span>
        </button>
      </div>
    </header>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}>
      {currentMonth[0].map((day, i) => (
        <span key={i} style={{ fontSize: '0.875rem', padding: '0.25rem', textAlign: 'center', }}>
          {day.format('dd').charAt(0)}
        </span>
      ))}
      {currentMonth.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSmallCalendarMonth(currentMonthIdx);
                setDaySelected(day);
              }}
              style={{ "padding": '0.25rem', "width": '100%',"border":"none", "backgroundColor": getDayClass(day) ? '#0c8599' : 'inherit', "color": getDayClass(day) ? '#fff' : '#000' }}
            >
              <span style={{ fontSize: '0.875rem', }}>{day.format('D')}</span>
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
  
  );
}

     