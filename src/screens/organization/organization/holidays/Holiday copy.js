import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
// import "./Holiday.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

export default function ReactBigCalendar() {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEventsData = async () => {
      const response = await axios.get(
        ServerAddress + `organization/get_Holiday/`
      );
      const data = response.data.results;
      setEventsData(data);
    };

    fetchEventsData();
  }, []);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event name");
    if (title) {
      const formattedData = {
        start: moment(start).format("YYYY-MM-DD"),
        end: moment(end).format("YYYY-MM-DD"),
        title: title,
      };
      axios
        .post(ServerAddress + `organization/add_Holiday/`, formattedData)
        .then((response) => {
          setEventsData([...eventsData, formattedData]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        onSelectEvent={(event) => alert(event.title)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
