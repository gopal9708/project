import React, { useState } from "react";
// import plusImg from "../assets/plus.png.png";
import EventModal from "./EventModal";
export default function CreateEventButton() {
  const [showEventModal, setShowEventModal] = useState(false);
  return (
    <React.Fragment>
      {showEventModal && <EventModal setShowEventModal={setShowEventModal} />}
      <button
        onClick={() => setShowEventModal(true)}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        style={{
          padding: "0.5rem",
          width: "120px",
          display: "flex",
          top: "0.5rem",
          position: "relative",
          alignItems: "center",
          border: "none",
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
          transition: "all 0.3s ease-in-out",
          backgroundColor: "white",
          borderRadius: "25px",
          justifyContent: "center",
        }}
      >
        {/* <img src={plusImg} alt="create_event" className="w-7 h-7" /> */}
        <span
          style={{
            fontFamily: "roboto",
            fontWeight: "bold",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="pl-3 pr-9"
        >
          {" "}
          Create
        </span>
      </button>
    </React.Fragment>
  );
}
