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

function AddFuel({ data, id }) {
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
  const [driver_list, setdriver_list] = useState([]);
  const [driver, setdriver] = useState("");

  const getDrivers = () => {
    axios
      .get(ServerAddress + `ems/get_driver/?search=${""}&p=1&records=10`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        if (response.data.results.length > 0) {
          let driver_list = response.data.results.map((v) => [
            v.id,
            v.username,
          ]);
          setdriver_list(driver_list);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  useLayoutEffect(() => {
    getDrivers();
  }, []);
  //----------------Validation----------------//
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      driver_name: "",
      vendor_Name: "",
      filled_liter: "",
      amount: "",
      start_km: "",
      current_km: "",
    },

    validationSchema: Yup.object({
      driver_name: Yup.string().required("Driver Name is required"),
      filled_liter: Yup.string().required(" Enter Fuel Amount"),
      amount: Yup.string().required("Enter amount"),
      start_km: Yup.string().required("Enter Start KM"),
      current_km: Yup.string().required("Enter End KM"),
    }),
    onSubmit: (values) => {
      send_fuel(values);
      setrefesh(!refesh);
    },
  });

  return (
    <>
      <div style={{ padding: "5px", textAlign: "center" }} onClick={handleShow}>
        <span>Add Fuel </span>
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
          <Modal.Title>Add Fuel</Modal.Title>
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
                                Driver Name
                              </Label>
                              <NSearchInput
                                data_list={driver_list}
                                data_item_s={driver}
                                set_data_item_s={setdriver}
                                error_message={"Driver is required"}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Vendor Name
                              </Label>
                              <NSearchInput
                                data_list={vender_name_list}
                                set_data_item_o={setvender_name_list}
                                data_item_s={vender_name}
                                set_data_item_s={setvender_name}
                                show_search={true}
                              />
                            </div>
                          </Col>

                          {vender_name === "Others" ? (
                            <Col lg={12} md={12} sm={12}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Vender Name
                                </Label>
                                <Input
                                  onChange={validation.handleChange}
                                  value={validation.values.vendor_Name || ""}
                                  type="text"
                                  className="form-control-md "
                                  id="input"
                                  name="vendor_Name"
                                  placeholder="Enter vender name"
                                />
                              </div>
                            </Col>
                          ) : null}

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Full/Partial
                              </Label>
                              <NSearchInput
                                data_list={fuel_filled}
                                set_data_item_k={setfuel_filled}
                                data_item_s={fuel_filled_s}
                                set_data_item_s={setfuel_filled_s}
                                show_search={false}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Filled Liter
                              </Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.filled_liter || ""}
                                invalid={
                                  validation.touched.filled_liter &&
                                  validation.errors.filled_liter
                                    ? true
                                    : false
                                }
                                className="form-control-md "
                                id="input"
                                type="number"
                                min={0}
                                name="filled_liter"
                                placeholder="Enter Fuel amount  "
                              />
                              {validation.touched.filled_liter &&
                              validation.errors.filled_liter ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.filled_liter}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Unit:*</Label>
                              <NSearchInput
                                data_list={unit_list}
                                data_item_s={unit}
                                set_data_item_s={setunit}
                                show_search={false}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Amount</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.amount || ""}
                                invalid={
                                  validation.touched.amount &&
                                  validation.errors.amount
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                placeholder="Enter amount "
                                className="form-control-md "
                                id="input"
                                name="amount"
                              />
                              {validation.touched.amount &&
                              validation.errors.amount ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.amount}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">
                                Starting KM
                              </Label>
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
                                placeholder="Enter Starting KM "
                                className="form-control-md "
                                id="input"
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
                        </Row>
                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label className="header-child">Current KM</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.current_km || ""}
                                invalid={
                                  validation.touched.current_km &&
                                  validation.errors.current_km
                                    ? true
                                    : false
                                }
                                type="number"
                                min={0}
                                placeholder="Enter Currentn KM  "
                                className="form-control-md "
                                id="input"
                                name="current_km"
                              />
                              {validation.touched.current_km &&
                              validation.errors.current_km ? (
                                <FormFeedback type="invalid">
                                  {validation.errors.current_km}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-2">
                              <Label>Upload Receipt *</Label>
                              <Input
                                type="file"
                                className="form-control-md input"
                                name="filled_liter"
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

export default AddFuel;
