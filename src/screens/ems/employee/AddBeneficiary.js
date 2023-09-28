/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import "../../../../assets/scss/forms/form.scss";
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
// import Search_input from "../../../../components/Form_Componenets/Search_input";
import { GrAdd } from "react-icons/gr";
import axios from "axios";
// import { Server } from "../../../../constants/server_details";\
import { ServerAddress } from "../../../constants/ServerAddress";

function AddBeneficiary() {
  // console.log(props.id)
  // console.log("Trip id",id)
  //   const accessToken = useSelector(state => state.token.access_token);

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
  const [fuel_filled, setfuel_filled] = useState(["Full", "Partial"]);
  const [fuel_filled_s, setfuel_filled_s] = useState("");

  const [vehicle_number_list, setvehicle_number_list] = useState([
    "JH05CJ9867",
    "JH01hj8765",
  ]);
  const [vehicle_number, setvehicle_number] = useState("");

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
        Add beneficiary
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
          <Modal.Title>Add beneficiary</Modal.Title>
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
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-3">
                              <Label> Name</Label>
                              <Input
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.driver_name || ""}
                                invalid={
                                  validation.touched.driver_name &&
                                  validation.errors.driver_name
                                    ? true
                                    : false
                                }
                                type="text"
                                className="form-control-md input"
                                placeholder="Enter name "
                                name="driver_name"
                              />
                              {validation.touched.driver_name &&
                              validation.errors.driver_name ? (
                                <FormFeedback>
                                  {validation.errors.driver_name}
                                </FormFeedback>
                              ) : null}
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>Relationship</Label>
                              <Input
                                type="text"
                                placeholder="Enter Relationship"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>Mobile number:</Label>
                              <Input
                                type="number"
                                min={0}
                                placeholder="Enter phone number"
                              />
                            </div>
                          </Col>

                          <Col lg={6} md={6} sm={6}>
                            <div className="mb-3">
                              <Label>Percentage:</Label>
                              <Input
                                type="number"
                                step="any"
                                min="0"
                                placeholder="Enter Percentage"
                                className="form-control-md input"
                                name="Percentage"
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

export default AddBeneficiary;
