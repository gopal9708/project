/* eslint-disable */
import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  CardBody,
  Form,
  Label,
  Button,
  FormGroup,
  Input,
} from "reactstrap";
import { FcCalendar } from "react-icons/fc";
import { AiOutlineFieldTime } from "react-icons/ai";
import NSearchInput from "../../../../components/formComponent/nsearchInput/NSearchInput";
import Clock from "./Clock";
import "./Attendance.css";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const AddAttendance = () => {


  const navigate = useNavigate();
  // TO get Current Date
  const Date_is = new Date();
  let year = Date_is.getFullYear();
  let day = Date_is.getDate();

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
  const month = month_list[Date_is.getMonth()];

  const [toggle, settoggle] = useState(false);
  // usestate for clock in
  const [clock_in, setclock_in] = useState(false);

  // for break in
  const [break_in, setbreak_in] = useState(false);

  // To Handle Modal

  const [break_type, setbreak_type] = useState("");
  const [break_type_list, setbreak_type_list] = useState([
    "Lunch Break",
    "Tea Break",
    "Emergency Break",
  ]);

  const [show, setshow] = useState(false);
  const handleClose = () => setshow(false);

  const handleSubmit = () => {
    // setShow(true)
    setbreak_in(true);
    setshow(false);

    // setmessage_error(false)
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Break Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">Break Type*</Label>
            <NSearchInput
              data_list={break_type_list}
              data_item_s={break_type}
              set_data_item_s={setbreak_type}
            />
            <div className="mt-1 error-text" color="danger">
              {/* {message_error ? "Please Enter Reject Resion" : null} */}
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Reson</Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              // onChange={(e) => {
              //   setmessage(e.target.value)
              // }}
            />
            <div className="mt-1 error-text" color="danger">
              {/* {message_error ? "Please Enter Reject Resion" : null} */}
            </div>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={() => handleSubmit()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


      <button onClick={() => {
        navigate("/attendance/myAttendance/MyAttendance")
      }}>My Attendance</button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <div className="m-4">
          <div className="text-center m-3 " style={{ fontSize: "32px" }}>
            DHTC Today Attendance
          </div>

          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardBody>
                <div className="main__body_div">
                  {toggle ? (
                    <div>Attendance Details</div>
                  ) : (
                    <>
                      {/* For Clock In */}

                      <div>
                        <h1 className="head_title">Start Work Day</h1>

                        <div className="time_main_div">
                          <span style={{ margin: "8px" }}>
                            <FcCalendar size={48} />
                          </span>
                          <span className="current_time_div">
                            {month} {""} {day} , {""} {year}
                          </span>
                        </div>
                      </div>

                      <div className="action_btn_container">
                        {!clock_in && (
                          <div>
                            <button
                              className="clock_in_btn"
                              onClick={() => {
                                alert("CLock In ");
                                setclock_in(true);
                              }}
                            >
                              Clock IN
                            </button>
                          </div>
                        )}

                        {clock_in && (
                          <div>
                            <button
                              className="clock_out_btn"
                              onClick={() => {
                                alert("Clock out");
                                setclock_in(false);
                                setbreak_in(false);
                              }}
                            >
                              Clock Out
                            </button>
                          </div>
                        )}
                      </div>

                      {clock_in === true && (
                        <>
                          {/* For Break */}
                          <div className="action_btn_container">
                            <h2
                              style={{
                                color: "green",
                                fontSize: "28px",
                                fontFamily:
                                  "Segoe UI, Tahoma, Geneva, Verdana, sansSerif",
                                fontWeight: "400",
                              }}
                            >
                              <AiOutlineFieldTime />
                              Start or Stop Break
                            </h2>

                            {!break_in && (
                              <div>
                                <button
                                  className="clock_in_btn"
                                  onClick={() => {
                                    alert("Break In ");
                                    // setbreak_in(true);
                                    setshow(true);
                                  }}
                                >
                                  Breake IN
                                </button>
                              </div>
                            )}

                            {break_in && (
                              <>
                                <Clock />
                                <div>
                                  <button
                                    className="clock_out_btn"
                                    onClick={() => {
                                      alert("Break out");
                                      setbreak_in(false);
                                    }}
                                  >
                                    Breake Out
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </>
                      )}

                      <div
                        style={{
                          textAlign: "center",
                          margin: "6px 24px 6px 24px",
                        }}
                      >
                        <p>
                          <b>Clocking in and out,</b> This is an attendance
                          management essential – employees should be able to
                          clock in, register break periods, and clock out after
                          the workday is complete
                        </p>
                      </div>
                    </>
                  )}
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
