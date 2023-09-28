import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../../../assets/scss/forms/form.scss";
//import { GiPayMoney } from "react-icons/gi";
import { BsSpeedometer2 } from "react-icons/bs";
import SearchInput from "../../../../../components/formComponent/searchInput/SearchInput.js";
import {
  Card,
  Col,
  Row,
  CardBody,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
import { ServerAddress } from "../../../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";

function AddMeter({ data, id }) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleClick = () => {
    setShow(false);
  };
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [booking_dat, setbooking_dat] = useState("");

  // const send_meter = values => {
  //   axios
  //     .post(
  //       ServerAddress + "vms/api/MeterHistory/",
  //       {
  //         vehicle_reg_no: vehicle_nu_id,
  //         primary_meter: values.Primary_type,
  //         booking_date_time:booking_dat,

  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       console.log("CustomerInvoice Response", response.status);
  //       if (response.status === 201) {
  //         // navigate("/CustomerInvoice");
  //         console.log("response", response.data);
  //       }
  //     })
  //     .catch(error => {
  //       alert(`Error Happen while posting raches  Data ${error}`);
  //     });
  //   };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      Primary_type: "",
    },
    validationSchema: Yup.object({
      Primary_type: Yup.string().required("Primary Mater is required"),
    }),
    onSubmit: (values) => {
      // send_meter(values);
    },
  });
  return (
    <>
      <p style={{ padding: "1px", textAlign: "center" }} onClick={handleShow}>
        {/* <span>
          <BsSpeedometer2 style={{ position: "relative", left: "-55px" }} />{" "}
        </span> */}
        Meter History
      </p>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="main-modal"
        style={{ marginTop: "25px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Meter History</Modal.Title>
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
              <div className="">
                <Col lg={12} md={12} sm={12}>
                  <Card className="shadow bg-white rounded">
                    {/* <h3>All Docket</h3> */}
                    <CardBody>
                      <Row>
                        <div
                          className="container-fluid "
                          style={{ background: "white" }}
                        >
                          <Row>
                            <Col lg={12} md={12} sm={12}>
                              <div className="mb-3">
                                <Label>Vehicle Number *</Label>
                                <Input
                                  className="form-control-md"
                                  id="input"
                                  value={data}
                                  disabled
                                />
                              </div>
                            </Col>

                            <Col lg={12} md={12} sm={12}>
                              <div className="mb-3">
                                <Label>Primary Meter</Label>
                                <Input
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.Primary_type || ""}
                                  invalid={
                                    validation.touched.Primary_type &&
                                    validation.errors.Primary_type
                                      ? true
                                      : false
                                  }
                                  type="number"
                                  className="form-control-md "
                                  id="input"
                                  placeholder="Please Select"
                                  name="Primary_type"
                                />
                                {validation.touched.Primary_type &&
                                validation.errors.Primary_type ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.Primary_type}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>

                            <Col lg={12} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Booking Date & Time{" "}
                                </Label>
                                <div>
                                  <input
                                    type="date"
                                    className="form-control d-block form-control-md "
                                    value={booking_dat}
                                    onChange={(val) => {
                                      setbooking_dat(val.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit" onClick={handleClick}>
                Submit
              </Button>
            </Modal.Footer>
          </form>
        </>
      </Modal>
    </>
  );
}
export default AddMeter;
