import dayjs from "dayjs";
import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
// import logo from "../assets/logo.svg";

export default function CalendarHeader({ monthIndex, setMonthIndex }) {


function handleReset() {
setMonthIndex(
monthIndex === dayjs().month()
? monthIndex + Math.random()
: dayjs().month()
);
}

return (
<Navbar
  style={{
   backgroundColor:'#FFFFFF',
  }}
  className="px-4 py-2 flex items-center"
>
  <NavbarBrand>
   
   
    <h1
      style={{ color: "black" }}
      className="mr-10 text-xl fond-bold"
    >
      Calendar
    </h1>
  </NavbarBrand>
  <Nav className="mr-auto" navbar>
    <NavItem>
      <NavLink
        style={{
          backgroundColor: "#556ee6",
          color: "white",
          fontFamily: "roboto",
          fontWeight: "bold",
        }}
        onClick={handleReset}
        className="border rounded py-2 px-4 mr-5"
      >
        Today
      </NavLink>
    </NavItem>
    <NavItem>
     
    </NavItem>
    <NavItem>
    
    </NavItem>
    <NavItem>
      <NavItem
        style={{ color: "white" }}
        className="ml-4 text-xl text-gray-500 font-bold"
      >
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </NavItem>
    </NavItem>
  </Nav>
</Navbar>
);
}