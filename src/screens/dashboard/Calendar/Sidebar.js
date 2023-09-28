import React from "react";
import CreateEventButton from "./CreateEventButton";
// import SmallCalendar from "./SmallCalendar";
// import Labels from "./Labels";

export default function Sidebar() {
  return (
    <aside style={{backgroundColor:"#8D8DAA", color:"black",fontFamily:"roboto",fontSize:"18px", "maxWidth":"25%", }}>
      <CreateEventButton />
      {/* <SmallCalendar /> */}
      {/* <Labels /> */}
    </aside>
  );
}
