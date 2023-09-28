/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
import * as Yup from "yup";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";

function AddWorkInformation() {
  const [show, setshow] = useState(false);
  const handleClose = () => {
    setshow(false);
    // set_visible(false);
    setrefresh(!refresh);
  };

  const handleShow = () => setshow(true);
  //   set_visible(false);

  const handleClick = () => {
    setshow(false);
    set_visible(false);
    setrefresh(!refresh);
  };

  //----------------state---------------
  const [fuel_filled_s, setfuel_filled_s] = useState("");
  const [vehicle_number, setvehicle_number] = useState("");
  const [vender_name, setvender_name] = useState("");

  const [asset_type, setasset_type] = useState("");
  const [asset_type_list, setasset_type_list] = useState([
    "Mobile Phone",
    "SIM Card",
    "Two Wheeler",
  ]);

  const send_fuel_details = (values) => {
    axios
      .post(
        ServerAddress + "Transporter/post-addfuel/",
        {
          Trip_id: id,
          Driver_Name: values.driver_name.uppercase(),
          Vehicle_Number: vehicle_number,
          Filled_Liter: values.filled_liter,
          Vendor_Name: vender_name,
          Amount: values.amount,
          Starting_Km: values.start_km,
          Current_Km: values.current_km,
          Full_Partial: fuel_filled_s,
        }
        // {
        //   headers: {
        //     Authorization: `Bearer ${accessToken}`,
        //   },
        // }
      )
      .then(function (response) {
        if (response.statusText === "Created") {
          // console.log("Done");
          alert("Done");
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting the Data`);
      });
  };

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      driver_name: "",
      filled_liter: "",
      amount: "",
      start_km: "",
      current_km: "",
    },
    validationSchema: Yup.object({
      driver_name: Yup.string().required("Enter Driver name "),
      filled_liter: Yup.string().required(" Enter Fuel Amount"),
      amount: Yup.string().required("Enter amount"),
      start_km: Yup.string().required("Enter Start KM"),
      current_km: Yup.string().required("Enter End KM"),
    }),
    onSubmit: (values) => {
      send_fuel_details(values);
    },
  });

  return (
    <>
      {/* <Button variant="info" onClick={handleShow}>
        Add Supporting Staff
      </Button> */}
      <p onClick={handleShow}>
        <span style={{ margin: "10px" }}>
          <GrAdd />
        </span>{" "}
        Add Work Info
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
          <Modal.Title>Add Work Info</Modal.Title>
        </Modal.Header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <Modal.Body>
            <div style={{ marginTop: "15px" }}>
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
                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label> Department </Label>
                              <Input
                                type="date"
                                className="form-control-md input"
                                name="issue_date"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>location </Label>
                              <NSearchInput
                                data_list={asset_type_list}
                                data_item_s={asset_type}
                                set_data_item_s={setasset_type}
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>Designation </Label>
                              <Input
                                type="text"
                                placeholder="Enter Asset Name"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>Role </Label>
                              <Input
                                type="text"
                                placeholder="Enter Asset Number"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>Employment_type </Label>
                              <Input
                                type="number"
                                min={0}
                                step={0.5}
                                placeholder="Enter Asset Cost"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>Date Of Joining </Label>
                              <Input
                                type="number"
                                min={0}
                                step={0.5}
                                placeholder="Enter Asset Cost"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>current_Experience </Label>
                              <Input
                                type="number"
                                min={0}
                                step={0.5}
                                placeholder="Enter Asset Cost"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>Total Experience </Label>
                              <Input
                                type="number"
                                min={0}
                                step={0.5}
                                placeholder="Enter Asset Cost"
                              />
                            </div>
                          </Col>

                          <Col lg={4} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>Reporting Manager </Label>
                              <Input
                                type="number"
                                min={0}
                                step={0.5}
                                placeholder="Enter Asset Cost"
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
              //  onClick={handleClick}
            >
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

export default AddWorkInformation;
