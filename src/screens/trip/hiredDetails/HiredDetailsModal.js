/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../assets/scss/forms/form.scss";
import { Col, Label, Input, FormFeedback } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
function HiredDetailsModal({ get_data, id }) {
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [trip_start, settrip_start] = useState(false);

  //----------For Current Time--------------
  const time = null;
  const [gtime, setgtime] = useState(time);

  const handelTime = () => {
    let time = new Date().toLocaleTimeString();
    setgtime(time);
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // setcreateRunsheet_list([]);
  };
  const handleShow = () => {
    if (!trip_start) {
      setShow(true);
      settrip_start(true);
    }
  };
  const handleClick = () => {
    setShow(false);
    get_data();
  };

  const send_hire_data = (values) => {
    axios
      .post(
        ServerAddress + "Transporter/post-hiredetails/",
        {
          Id: id,
          Start_Km: values.start_km,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "Created") {
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting Start Trip Data ${error}`);
      });
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      start_km: "",
    },
    validationSchema: Yup.object({
      start_km: Yup.string().required("field is required"),
    }),
    onSubmit: (values) => {
      send_hire_data(values);
    },
  });

  return (
    <>
      <Button
        style={{
          background:
            // trip_start
            //   ? "radial-gradient(red, transparent)":
            "radial-gradient(#7aa2eb, transparent)",
          borderRadius: "5px",
          color: "blue",
        }}
        // id={trip_start ? "start" : ""}

        //   variant="info"
        onClick={handleShow}
      >
        {/* {trip_start ? "End" : "Start"} */}Start
      </Button>

      {/* <Button style={{background: "radial-gradient(#7aa2eb, transparent)",borderRadius:"5px",color:"blue"}} 
      
      //   variant="info"
         onClick={
          handleShow}>
        End
        </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        // backdrop="static"
        // keyboard={false}
        // dialogClassName="main-modal"
        // style={{ marginTop: "25px" }}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Start Trip</Modal.Title>
        </Modal.Header>

        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit(e.values);
              return false;
            }}
          >
            <Modal.Body>
              <div>
                <Col lg={10} md={12} sm={12}>
                  <div className="mb-3">
                    <Label>Start KM</Label>
                    <Input
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values.start_km || ""}
                      invalid={
                        validation.touched.start_km &&
                        validation.errors.start_km
                          ? true
                          : false
                      }
                      type="number"
                      min={0}
                      className="form-control-md input"
                      placeholder="Enter start KM"
                      name="start_km"
                    />
                    {validation.touched.start_km &&
                    validation.errors.start_km ? (
                      <FormFeedback type="invalid">
                        {validation.errors.start_km}
                      </FormFeedback>
                    ) : null}
                  </div>
                </Col>
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="primary" type="submit" onClick={handleClick}>
                Submit
              </Button>

              <Button type="button" variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </form>
        </>
      </Modal>
    </>
  );
}

export default HiredDetailsModal;
