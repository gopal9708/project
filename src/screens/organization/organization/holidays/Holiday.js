import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import { ServerAddress } from "../../../../constants/ServerAddress";
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

  const handleDelete = (event) => {
    const ID = event.id;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );
    if (confirmDelete) {
      axios
        .delete(
          ServerAddress + `organization/delete_Holiday/` + ID
          // `organization/delete_Holiday/{ID}`
        )
        .then((response) => {
          console.log("Delete Event");
          setEventsData(eventsData.filter((e) => e.id !== event.id));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="calendar-container">
      <Calendar
        // views={["day", "agenda", "work_week", "month"]}
        selectable
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={eventsData}
        style={{ height: "100vh" }}
        // onSelectEvent={(event) => alert(event.title)}
        onSelectEvent={(event) => handleDelete(event)}
        onSelectSlot={handleSelect}
      />
    </div>
  );
}
