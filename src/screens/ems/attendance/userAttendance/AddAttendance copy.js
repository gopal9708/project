/* eslint-disable */
import React, { useState } from "react";
import { Card, Col, Row, CardBody, Form } from "reactstrap";
import { FcCalendar } from "react-icons/fc";
import Clock from "./Clock";

const AddAttendance = () => {
  const yer = new Date();
  let year = yer.getFullYear();
  let day = yer.getDate();

  const month_list = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  const month = month_list[d.getMonth()];

  console.log("MOnth", month);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <div className="m-4">
          <div className="text-justify">DHTC Today Attendance</div>

          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardBody>
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    border: "2px solid black ",
                    padding: "12px",
                  }}
                >
                  <div>
                    <h1
                      style={{
                        fontFamily:
                          "Segoe UI, Tahoma, Geneva, Verdana, sansSerif",
                        fontWeight: "300",
                        fontSize: "44px",
                      }}
                    >
                      Start Work Day
                    </h1>

                    <div style={{ margin: "12px", padding: "12px" }}>
                      <span style={{ margin: "8px" }}>
                        <FcCalendar size={48} />
                      </span>
                      <span style={{ fontSize: "28px", margin: "8px" }}>
                        {month} {""} {day} , {""} {year}
                      </span>
                    </div>
                  </div>
                  <button
                    style={{
                      background: " green",
                      color: "white",
                      fontSize: "18px",
                      width: "300px",
                      margin: "20px",
                      padding: "10px",
                      border: "none",
                    }}
                    onClick={() => {
                      alert("CLock In ");
                    }}
                  >
                    Clock IN
                  </button>{" "}
                  <br />
                  <button
                    style={{
                      background: "red",
                      color: "white",
                      fontSize: "18px",
                      width: "300px",
                      margin: "20px",
                      padding: "10px",
                      border: "none",
                    }}
                    onClick={() => {
                      alert("Clock out");
                    }}
                  >
                    Clock Out
                  </button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </div>
      </form>
    </div>
  );
};

export default AddAttendance;
