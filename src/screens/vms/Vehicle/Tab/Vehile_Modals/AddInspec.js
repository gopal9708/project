import React, { useState } from "react";
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
import axios from "axios";
import { ServerAddress } from "../../../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import toTitleCase from "../../../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../../../components/formComponent/nsearchInput/NSearchInput";

function AddInspec({ data, id }) {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const handleClick = () => {
    setShow(false);
  };

  const [fuel, setfuel] = useState("");
  const [fuel_list, setfuel_list] = useState([
    "FULL",
    "3/4",
    "1/2",
    "EMPTY",
    "1/4",
  ]);

  const [cond, setcond] = useState("");
  const [cond_list, setcond_list] = useState([
    "Excellent",
    "Have Issues But Safe To Operate",
    "Not Safe To Operate",
  ]);
  const [pass_fail_list, setpass_fail_list] = useState(["PASS", "FAIL"]);
  const [wransmission_type, setwransmission_type] = useState("");
  const [clutch_type, setclutch_type] = useState("");

  const [steering_type, setsteering_type] = useState("");
  const [horn_type, sethorn_type] = useState("");
  const [wind_type, setwind_type] = useState("");
  const [wiper_type, setwiper_type] = useState("");
  const [mirror_type, setmirror_type] = useState("");
  const [driving_type, setdriving_type] = useState("");
  const [parking_type, setparking_type] = useState("");
  const [service_type, setservice_type] = useState("");
  const [device_type, setdevice_type] = useState("");
  const [tires_type, settires_type] = useState("");
  const [emergency_type, setemergency_type] = useState("");
  const [wheel_type, setwheel_type] = useState("");

  const send_inspection = (values) => {
    axios
      .post(
        ServerAddress + "vms/api/VehicleInspection/",
        {
          vehicle_reg_no: id,
          odometer_reading: values.new_odometer,
          oil_life_left: values.oil_life,
          fuel_level: fuel,
          remarks: toTitleCase(values.add_remarks).toUpperCase(),
          vehicle_condition_ok: cond,
          transmission: wransmission_type,
          clutch: clutch_type,
          steering_mechanism: steering_type,
          horn: horn_type,
          windshield: wind_type,
          wipers_washers: wiper_type,
          rear_vision_mirrors: mirror_type,
          lighting_devices_and_reflectors: device_type,
          parking_brake: parking_type,
          service_brakes: service_type,
          // tires: wires_type,
          wheels_and_rims: wheel_type,
          emergency_equipment: emergency_type,
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
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting raches  Data ${error}`);
      });
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      oil_life: "",
      new_odometer: "",
      add_remarks: "",
    },
    validationSchema: Yup.object({
      oil_life: Yup.string().required("Oil life is required"),
    }),
    onSubmit: (values) => {
      // send_inspection(values);
    },
  });
  return (
    <>
      <div style={{ padding: "5px", textAlign: "center" }} onClick={handleShow}>
        <span>Inspection History</span>
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
          <Modal.Title>Inspection History</Modal.Title>
        </Modal.Header>
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit(e.values);
              return false;
            }}
          >
            <Modal.Body style={{ width: "100%" }}>
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
                            <Col lg={3} md={6} sm={6}>
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

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Fuel Level:
                                </Label>

                                <NSearchInput
                                  data_list={fuel_list}
                                  data_item_s={fuel}
                                  set_data_item_s={setfuel}
                                  error_message="Field is required"
                                  show_search={false}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Vehicle Condition:
                                </Label>

                                <NSearchInput
                                  data_list={cond_list}
                                  data_item_s={cond}
                                  set_data_item_s={setcond}
                                  error_message="Field is required"
                                  show_search={false}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Transmission*
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={wransmission_type}
                                  set_data_item_s={setwransmission_type}
                                  show_search={false}
                                  error_message={"Transmission is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Clutch*</Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={clutch_type}
                                  set_data_item_s={setclutch_type}
                                  show_search={true}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Steering*
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={steering_type}
                                  set_data_item_s={setsteering_type}
                                  show_search={false}
                                  error_message={"Steering is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Horn:*</Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={horn_type}
                                  set_data_item_s={sethorn_type}
                                  show_search={false}
                                  error_message={"Horn is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Wind Shield:*
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={wind_type}
                                  set_data_item_s={setwind_type}
                                  show_search={false}
                                  error_message={"Wind Shield is required"}
                                />
                              </div>
                            </Col>
                          </Row>

                          <Row>
                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Wipers*</Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={wiper_type}
                                  set_data_item_s={setwiper_type}
                                  show_search={false}
                                  error_message={"Wipers is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Rear Mirrors*
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={mirror_type}
                                  set_data_item_s={setmirror_type}
                                  show_search={false}
                                  error_message={"Rear Mirror is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Lighting driving*
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={driving_type}
                                  set_data_item_s={setdriving_type}
                                  show_search={false}
                                  error_message={"Lighting Driving is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Parking Brake*
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={parking_type}
                                  set_data_item_s={setparking_type}
                                  show_search={false}
                                  error_message={"parking Brake is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Service Brakes *
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={service_type}
                                  set_data_item_s={setservice_type}
                                  show_search={false}
                                  error_message={"Service Brakes is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Coupling Devices *
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={device_type}
                                  set_data_item_s={setdevice_type}
                                  show_search={false}
                                  error_message={"Coupling Device is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Tires *</Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={tires_type}
                                  set_data_item_s={settires_type}
                                  show_search={false}
                                  error_message={"Tires is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Emergency*
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={emergency_type}
                                  set_data_item_s={setemergency_type}
                                  show_search={false}
                                  error_message={"Emergency is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Wheel & Rims *
                                </Label>
                                <NSearchInput
                                  data_list={pass_fail_list}
                                  data_item_s={wheel_type}
                                  set_data_item_s={setwheel_type}
                                  show_search={false}
                                  error_message={"Wheel & Rims is required"}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">Odometer</Label>
                                <Input
                                  type="number"
                                  placeholder="Please Add Odometer History"
                                  className="form-control-md input"
                                  name="new_odometer"
                                  onChange={validation.handleChange}
                                  value={validation.vendor}
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-2">
                                <Label className="header-child">
                                  Oil Life Left:
                                </Label>
                                <Input
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.oil_life || ""}
                                  type="Number"
                                  name="oil_life"
                                  className="form-control-md input"
                                  placeholder="Enter the Oil Life Entry"
                                />
                                {validation.touched.oil_life &&
                                validation.errors.oil_life ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.oil_life}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Meter Verification
                                </Label>
                                <Input
                                  className="form-control form-control-md"
                                  id="formFileSm"
                                  type="file"
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Interior Cleanliness:
                                </Label>
                                <Input
                                  className="form-control form-control-md"
                                  id="formFileSm"
                                  type="file"
                                />
                              </div>
                            </Col>

                            <Col lg={3} md={6} sm={6}>
                              <div className="mb-3">
                                <Label className="header-child">
                                  Add Remarks
                                </Label>
                                <Input
                                  type="text"
                                  placeholder="Please mention Remarks"
                                  className="form-control-md input"
                                  name="add_remarks"
                                  onChange={validation.handleChange}
                                  value={validation.vendor}
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
export default AddInspec;
