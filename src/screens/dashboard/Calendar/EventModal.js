import React, { useState } from "react";
import { MdOutlineDragHandle } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { BsBookmark } from "react-icons/bs";

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal({
  setShowEventModal,
  daySelected,
  dispatchCalEvent,
  selectedEvent,
}) {
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedLabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }

    setShowEventModal(false);
  }

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "fixed",
        left: "0",
        top: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        style={{
          backgroundColor: "white",
          borderRadius: "0.5rem",
          boxShadow: "0 0.25rem 0.5rem rgba(0, 0, 0, 0.15)",
          width: "25%",
        }}
      >
        <header
          style={{
            backgroundImage:
              "linear-gradient(to right, #434343 0%, black 100%)",
            backgroundColor: "#f8fafc",
            padding: "1rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Material Icons",
              color: "white",
              fontWeight: "normal",
              fontStyle: "normal",
              fontSize: "1.5rem",
              lineHeight: "1",
              letterSpacing: "normal",
              textTransform: "none",
              display: "inlineBlock",
              whiteSpace: "nowrap",
              wordWrap: "normal",
              direction: "ltr",
              "-webkit-font-feature-settings": "liga",
              "-webkit-font-smoothing": "antialiased",
            }}
          >
            <MdOutlineDragHandle />
          </span>
          <div>
            {selectedEvent && (
              <span
                // eslint-disable-next-line no-undef
                onClick={handleDelete}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button
              onClick={() => setShowEventModal(false)}
              style={{ background: "white", borderRadius: "12px" }}
            >
              <span
                style={{
                  fontfamily: "Material Icons",
                  color: "",
                  fontWeight: "normal",
                  fontStyle: "normal",
                  fontSize: "1.5rem",
                  lineHeight: "1",
                  letterSpacing: "normal",
                  textTransform: "none",
                  display: "inlineBlock",
                  whiteSpace: "nowrap",
                  wordWrap: "normal",
                  direction: "ltr",
                  "-webkit-font-feature-settings": "liga",
                  "-webkit-font-smoothing": "antialiased",
                }}
              >
                <GrFormClose />
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              required
              style={{
                paddingTop: "3px",
                border: "0",
                color: "gray",
                paddingBottom: "2px",
                width: "100%",
                borderBottom: "2px solid gray",
                outline: "none",
                transition: "border-color 0.2s ease-in-out",
                borderColor: "#cbd5e0",
              }}
              onChange={(e) => setTitle(e.target.value)}
            />



            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={description}
              required
               style={{
                paddingTop: "3px",
                border: "0",
                color: "gray",
                paddingBottom: "2px",
                width: "100%",
                borderBottom: "2px solid gray",
                outline: "none",
                transition: "border-color 0.2s ease-in-out",
                borderColor: "#cbd5e0",
              }}
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              <BsBookmark />
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            style={{
              backgroundColor: "#3A98B9",
              color: "#FEFBF3",
              borderRadius: "4px",
              fontSize: "16px",
              fontWeight: "bold",
              padding: "10px 20px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}
