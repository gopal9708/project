/* eslint-disable */
import React, { useState, useLayoutEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../../../assets/scss/forms/form.scss";
import {
  Card,
  Col,
  Row,
  CardBody,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ServerAddress } from "../../../../../constants/ServerAddress";
import toTitleCase from "../../../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../../../components/formComponent/nsearchInput/NSearchInput";
import { useSelector } from "react-redux";

function RenewalReminder({ data, id }) {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleClick = () => {
    setShow(false);
  };
  //----------------state---------------
  const [renewal_type, setrenewal_type] = useState("");
  const [renewal_type_list, setrenewal_type_list] = useState([
    "PUC",
    "INSURANCE",
    "REGISTRATION",
    "FITNESS",
  ]);

  const [notification, setnotification] = useState("");
  const [notification_list, setnotification_list] = useState(["YES", "NO"]);

  const [refesh, setrefesh] = useState(false);
  const [fuel_filled, setfuel_filled] = useState(["Full", "Partial"]);
  const [fuel_filled_s, setfuel_filled_s] = useState("");

  const [vender_name_list, setvender_name_list] = useState([
    "Others",
    "Bharat Petroleum",
    "Indian Oil Corporation",
    "Reliance Petroleum Limited",
    "Hindustan Petroleum Corporation",
    "Oil India Limited",
    "JIO BP FILLING STATION",
  ]);
  const [vender_name, setvender_name] = useState("");
  const [unit_list, setunit_list] = useState(["Liters", "Mili Liters"]);
  const [unit, setunit] = useState(unit_list[0]);

  const send_fuel = (values) => {
    axios
      .post(
        ServerAddress + "trip/add_fuel/",
        {
          vehicle: id,
          in_trip: false,
          driver: values.driver_name,
          vendor_name: vender_name,
          // vendor_Name: values.vendor_Name,
          filled_info: fuel_filled_s,
          quantity: values.filled_liter,
          amount: values.amount,
          starting_km: values.start_km,
          current_km: values.current_km,
          unit: unit,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "Created") {
          alert("Done");
          setShow(false);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting the Data`, error);
      });
  };

  //----------------Validation----------------//
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      odometer_reading: "",
      vendor: "",
      notes: "",
      resolved_issues: "",
      item_changes: "",
      labor_charge: "",
      items: "",
      parts: "",
      subtotal: "",
      tax_amount: "",
      discount: "",
      discount_amount: "",
      total: "",
      comments: "",
    },

    validationSchema: Yup.object({
      odometer_reading: Yup.string().required("Odometer Reading  is required"),
      vendor: Yup.string().required("Vendor Name is required"),
      notes: Yup.string().required("Notes is required"),
      resolved_issues: Yup.string().required("Resolved Issues is required"),
      item_changes: Yup.string().required("Item Charges is required"),
      labor_charge: Yup.string().required("Labor Change is required"),
      items: Yup.string().required("Item is required"),
      parts: Yup.string().required("Parts is required"),
      subtotal: Yup.string().required("Subtotal is required"),
      tax_amount: Yup.string().required("Tax Amount is required"),
      discount: Yup.string().required("Discount is required"),
      discount_amount: Yup.string().required("Discount Amount is required"),
      total: Yup.string().required("Total is required"),
    }),
    onSubmit: (values) => {
      send_fuel(values);
      setrefesh(!refesh);
    },
  });

  return (
    <>
      <div style={{ padding: "5px", textAlign: "center" }} onClick={handleShow}>
        <span>Renewal Reminder </span>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="main-modal"
        style={{ marginTop: "5px" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Reminder</Modal.Title>
        </Modal.Header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <Modal.Body>
            <div>
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
                            <div className="mb-2">
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
                            <div className="mb-2">
                              <Label className="header-child">
                                Renewal Type:
                              </Label>
                              <NSearchInput
                                data_list={renewal_type_list}
                                data_item_s={renewal_type}
                                set_data_item_s={setrenewal_type}
                                error_message={"Renewal Type is required"}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Due Date:</Label>
                              <Input
                                className="form-control-md "
                                id="input"
                                type="date"
                              />
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Due Soon Threshold::
                              </Label>
                              <Input
                                className="form-control-md "
                                id="input"
                                type="date"
                              />
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Enable Notification:
                              </Label>
                              <NSearchInput
                                data_list={notification_list}
                                data_item_s={notification}
                                set_data_item_s={setnotification}
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
            <Button variant="primary" type="submit">
              Submit
            </Button>

            <Button type="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default RenewalReminder;
