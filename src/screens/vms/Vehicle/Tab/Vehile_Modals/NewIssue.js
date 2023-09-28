import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../../../assets/scss/forms/form.scss";
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
import { Formik, useFormik } from "formik";
import axios from "axios";
import { ServerAddress } from "../../../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import toTitleCase from "../../../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../../../components/formComponent/nsearchInput/NSearchInput";

function NewIssue({ data, id }) {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleClick = () => {
    setShow(false);
  };

  //For Booking Date
  const [booking_dat, setbooking_dat] = useState("");
  const [issue_type_S, setissue_type_S] = useState("");
  const [issue_type_error, setissue_type_error] = useState(false);
  const [issue_type_S_list, setissue_type_S_list] = useState([
    "Open",
    "Over Due",
    "Resolved",
    "Closed",
  ]);
  const [priority_type_S, setpriority_type_S] = useState("");
  const [priority_type_error, setpriority_type_error] = useState(false);
  const [priority_type_S_list, setpriority_type_S_list] = useState([
    "LOW",
    "MEDIUM",
    "URGENT",
  ]);

  const send_issue = (values) => {
    axios
      .post(
        ServerAddress + "vms/add_vehicle-issue/",
        {
          vehicle: id,
          reported_by: toTitleCase(values.Reported_type).toUpperCase(),
          reported_date: booking_dat,
          odometer: values.Odometer_type,
          assigned_to: toTitleCase(values.Assigned_type).toUpperCase(),
          issue_status: issue_type_S,
          description: toTitleCase(values.Reason_type).toUpperCase(),
          priority: priority_type_S,
          summary: values.summary,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 201) {
          // navigate("/CustomerInvoice");
          setShow(false);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting raches  Data ${error}`);
      });
  };
  //----------------Validation----------------//
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      Reported_type: "",
      Reason_type: "",
      Odometer_type: "",
      Assigned_type: "",
      summary: "",
    },
    validationSchema: Yup.object({
      Reported_type: Yup.string().required("Reported by is required"),
      Odometer_type: Yup.string().required("Odometer is required"),
      Reason_type: Yup.string().required("Reason is required"),

      Assigned_type: Yup.string().required("Reason is required"),
    }),
    onSubmit: (values) => {
      send_issue(values);
    },
  });

  return (
    <>
      <div style={{ padding: "1px", textAlign: "center" }} onClick={handleShow}>
        <span>New Issue</span>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="main-modal"
        style={{ marginTop: "25px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>New Issue</Modal.Title>
        </Modal.Header>
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (issue_type_S == "") {
                setissue_type_error(true);
              }
              if (priority_type_S == "") {
                setpriority_type_error(true);
              }
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
                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Vehicle Number*
                                </Label>
                                <Input
                                  className="form-control-md "
                                  id="input"
                                  value={data}
                                  disabled
                                />
                              </div>
                            </Col>

                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Reported by
                                </Label>
                                <Input
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.Reported_type || ""}
                                  invalid={
                                    validation.touched.Reported_type &&
                                    validation.errors.Reported_type
                                      ? true
                                      : false
                                  }
                                  type="text"
                                  placeholder="Please Select"
                                  className="form-control-md "
                                  id="input"
                                  name="Reported_type"
                                />
                                {validation.touched.Reported_type &&
                                validation.errors.Reported_type ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.Reported_type}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Assigned to
                                </Label>
                                <Input
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.Assigned_type || ""}
                                  invalid={
                                    validation.touched.Assigned_type &&
                                    validation.errors.Assigned_type
                                      ? true
                                      : false
                                  }
                                  type="text"
                                  placeholder="Please Select"
                                  className="form-control-md "
                                  id="input"
                                  name="Assigned_type"
                                />
                                {validation.touched.Assigned_type &&
                                validation.errors.Assigned_type ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.Assigned_type}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>

                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Issue*</Label>
                                <NSearchInput
                                  data_list={issue_type_S_list}
                                  data_item_s={issue_type_S}
                                  set_data_item_s={setissue_type_S}
                                  show_search={false}
                                  error_message={"Please Select Issue Type"}
                                  error_s={issue_type_error}
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Priority*
                                </Label>
                                <NSearchInput
                                  data_list={priority_type_S_list}
                                  data_item_s={priority_type_S}
                                  set_data_item_s={setpriority_type_S}
                                  show_search={false}
                                  error_message={"Please Select Priority Type"}
                                  error_s={priority_type_error}
                                />
                              </div>
                            </Col>

                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Odometer</Label>
                                <Input
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.Odometer_type || ""}
                                  invalid={
                                    validation.touched.Odometer_type &&
                                    validation.errors.Odometer_type
                                      ? true
                                      : false
                                  }
                                  type="text"
                                  placeholder="Please Select"
                                  className="form-control-md "
                                  id="input"
                                  name="Odometer_type"
                                />
                                {validation.touched.Odometer_type &&
                                validation.errors.Odometer_type ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.Odometer_type}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Booking Date & Time *
                                </Label>
                                <div>
                                  <Input
                                    type="datetime-local"
                                    className="form-control-md "
                                    id="input"
                                    value={booking_dat}
                                    onChange={(val) => {
                                      setbooking_dat(val.target.value);
                                    }}
                                  />
                                </div>
                              </div>
                            </Col>

                            <Col lg={6} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Description :
                                </Label>
                                <Input
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.Reason_type || ""}
                                  invalid={
                                    validation.touched.Reason_type &&
                                    validation.errors.Reason_type
                                      ? true
                                      : false
                                  }
                                  type="text"
                                  placeholder="Enter Reason"
                                  className="form-control-md "
                                  id="input"
                                  name="Reason_type"
                                />
                                {validation.touched.Reason_type &&
                                validation.errors.Reason_type ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.Reason_type}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={12} md={12} sm={12}>
                              <div className="mb-3">
                                <Label className="header-child">Summary:</Label>
                                <Input
                                  onChange={validation.handleChange}
                                  value={validation.values.summary || ""}
                                  type="text"
                                  placeholder="Enter Summary"
                                  className="form-control-md "
                                  id="input"
                                  name="summary"
                                />
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
              <Button
                variant="primary"
                type="submit"
                // onClick={handleClick}
              >
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
export default NewIssue;
