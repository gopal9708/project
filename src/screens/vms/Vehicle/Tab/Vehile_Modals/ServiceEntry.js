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

function ServiceEntry({ data, id }) {
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

  const [priority, setpriority] = useState("");
  const [priority_list, setpriority_list] = useState([
    "SCHEDULED",
    "NON-SCHEDULED",
    "EMERGENCY",
  ]);

  const [taxation, settaxation] = useState("");
  const [taxation_list, settaxation_list] = useState([
    "CS-GST 0%",
    "CS-GST 5%",
    "CS-GST 12%",
    "CS-GST 18%",
    "CS-GST 28%",
  ]);

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
        <span>Service Entry </span>
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
          <Modal.Title>Add Entry</Modal.Title>
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
                                Repair Priority Class:
                              </Label>
                              <NSearchInput
                                data_list={priority_list}
                                data_item_s={priority}
                                set_data_item_s={setpriority}
                                error_message={"Repair Priority is required"}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Odometer Reading:
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.odometer_reading || ""}
                                invalid={
                                  validation.touched.odometer_reading &&
                                  validation.errors.odometer_reading
                                    ? true
                                    : false
                                }
                                className="form-control-md "
                                id="input"
                                type="number"
                                min={0}
                                name="odometer_reading"
                              />
                              {validation.touched.odometer_reading &&
                              validation.errors.odometer_reading ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.odometer_reading}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Entry Date</Label>
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
                                Completed Date:
                              </Label>
                              <Input
                                className="form-control-md "
                                id="input"
                                type="date"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Vendor:</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.vendor || ""}
                                invalid={
                                  validation.touched.vendor &&
                                  validation.errors.vendor
                                    ? true
                                    : false
                                }
                                className="form-control-md "
                                id="input"
                                type="text"
                                name="vendor"
                              />
                              {validation.touched.vendor &&
                              validation.errors.vendor ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.vendor}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Notes:</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.notes || ""}
                                invalid={
                                  validation.touched.notes &&
                                  validation.errors.notes
                                    ? true
                                    : false
                                }
                                type="text"
                                placeholder="Enter Notes "
                                className="form-control-md "
                                id="input"
                                name="notes"
                              />
                              {validation.touched.notes &&
                              validation.errors.notes ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.notes}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Resolved Issues:
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.resolved_issues || ""}
                                invalid={
                                  validation.touched.resolved_issues &&
                                  validation.errors.resolved_issues
                                    ? true
                                    : false
                                }
                                className="form-control-md "
                                id="input"
                                type="text"
                                name="resolved_issues"
                                placeholder="Enter Resolved Issue  "
                              />
                              {validation.touched.resolved_issues &&
                              validation.errors.resolved_issues ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.resolved_issues}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Item Changed/Repaired:
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.item_changes || ""}
                                invalid={
                                  validation.touched.item_changes &&
                                  validation.errors.item_changes
                                    ? true
                                    : false
                                }
                                className="form-control-md "
                                id="input"
                                type="text"
                                name="item_changes"
                              />
                              {validation.touched.item_changes &&
                              validation.errors.item_changes ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.item_changes}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Labor Charge:
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.labor_charge || ""}
                                invalid={
                                  validation.touched.labor_charge &&
                                  validation.errors.labor_charge
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                placeholder="Enter Labor Change "
                                className="form-control-md "
                                id="input"
                                name="labor_charge"
                              />
                              {validation.touched.labor_charge &&
                              validation.errors.labor_charge ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.labor_charge}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Items:</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.items || ""}
                                invalid={
                                  validation.touched.items &&
                                  validation.errors.items
                                    ? true
                                    : false
                                }
                                type="text"
                                placeholder="Enter Item "
                                className="form-control-md "
                                id="input"
                                name="items"
                              />
                              {validation.touched.items &&
                              validation.errors.items ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.items}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Parts:</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.parts || ""}
                                invalid={
                                  validation.touched.parts &&
                                  validation.errors.parts
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                placeholder="Enter Currentn KM  "
                                className="form-control-md "
                                id="input"
                                name="parts"
                              />
                              {validation.touched.parts &&
                              validation.errors.parts ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.parts}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Subtotal:</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.subtotal || ""}
                                invalid={
                                  validation.touched.subtotal &&
                                  validation.errors.subtotal
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                placeholder="Enter Subtotal  "
                                className="form-control-md "
                                id="input"
                                name="subtotal"
                              />
                              {validation.touched.subtotal &&
                              validation.errors.subtotal ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.subtotal}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Taxation:</Label>
                              <NSearchInput
                                data_list={taxation_list}
                                data_item_s={taxation}
                                set_data_item_s={settaxation}
                              />
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Tax. Amt.</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.tax_amount || ""}
                                invalid={
                                  validation.touched.tax_amount &&
                                  validation.errors.tax_amount
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                placeholder="Enter Tax Amount  "
                                className="form-control-md "
                                id="input"
                                name="tax_amount"
                              />
                              {validation.touched.tax_amount &&
                              validation.errors.tax_amount ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.tax_amount}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Discount%:</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.discount || ""}
                                invalid={
                                  validation.touched.discount &&
                                  validation.errors.discount
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                placeholder="Enter Discount  "
                                className="form-control-md "
                                id="input"
                                name="discount"
                              />
                              {validation.touched.discount &&
                              validation.errors.discount ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.discount}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Discount Amt.
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.discount_amount || ""}
                                invalid={
                                  validation.touched.discount_amount &&
                                  validation.errors.discount_amount
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                placeholder="Enter Discount Amoun  "
                                className="form-control-md "
                                id="input"
                                name="discount_amount"
                              />
                              {validation.touched.discount_amount &&
                              validation.errors.discount_amount ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.discount_amount}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Total:</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.total || ""}
                                invalid={
                                  validation.touched.total &&
                                  validation.errors.total
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                placeholder="Enter Total  "
                                className="form-control-md "
                                id="input"
                                name="total"
                              />
                              {validation.touched.total &&
                              validation.errors.total ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.total}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label>Photos *</Label>
                              <Input
                                type="file"
                                className="form-control-md input"
                                name="photos"
                              />
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label>Documents *</Label>
                              <Input
                                type="file"
                                className="form-control-md input"
                                name="doc"
                              />
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Comments:</Label>
                              <Input
                                onChange={validation.handleChange}
                                value={validation.values.comments || ""}
                                className="form-control-md "
                                id="input"
                                type="text"
                                name="comments"
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

export default ServiceEntry;
