import React, { useState, useEffect } from "react";
import "../../../assets/scss/forms/form.scss";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Form,
  Input,
  FormFeedback,
} from "reactstrap";
import { IconContext } from "react-icons";
// import { useSelector } from "react-redux";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import Page_Title from "../../../components/Page_Title/Page_Title";
import Title from "../../../components/Title/Title";
import axios from "axios";
import { server_address } from "../../../constants/server_details";
import Search_input from "../../../components/Form_Componenets/Search_input";

const Vehicle_maintainance = () => {
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.token.access_token);
  const [vehicle_number, setvehicle_number] = useState("");

  //  ----------------------validation-----------------------------------
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      insurance_policy_number: "",
      puc_no: "",
    },

    validationSchema: Yup.object({
      insurance_policy_number: Yup.string()
        .min(12)
        .max(12)
        .required("Insurance Policy Nnumber is required"),
      puc_no: Yup.string().min(7).max(7).required("PUC Nnumber is required"),
    }),

    onSubmit: (values) => {
      send_vehicle_maintainance_data(values);
    },
  });

  // const send_vehicle_maintainance_data = values => {
  //   console.log("send_vehicle_maintainance_data function run", values);
  //   axios
  //     .post(
  //       server_address + "vms/api/add_vehiclemaintainance/",
  //       {
  //         last_service: last_service_date,
  //         insurance_policy_no: values.insurance_policy_number,
  //         puc_no: values.puc_no,
  //         puc_exp: puc_expiry,
  //         insurance_exp: insurance_expiry_date,
  //       },

  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       console.log("VMS post response", response);
  //       if (response.status === 201) {
  //         navigate("/vms/vehicle_maintainance");
  //       }
  //     })
  //     .catch(error => {
  //       alert(`Error Happen while posting raches  Data ${error}`);
  //     });
  // };
  const [vehicle_id, setvehicle_id] = useState("");
  const [vehicle_number_list1, setvehicle_number_list1] = useState([]);
  let vehicle_number_list = [];

  // const get_vehicles_number = () => {
  //   axios
  //     .get(server_address + "vms/api/view_vehicle/", {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     })
  //     .then(response => {
  //       for (let index = 0; index < response.data.length; index++) {
  //         const element = response.data[index];
  //         vehicle_number_list.push([element.id, element.number_plate]);
  //       }
  //       // console.log("response",response)
  //       // setvehicle_number(response.data);
  //       console.log("number_list", vehicle_number_list);
  //       setvehicle_number_list1(vehicle_number_list);
  //     })
  //     .catch(err => {
  //       alert(`Error Occur in Get , ${err}`);
  //     });
  // };
  // useEffect(() => {
  //   get_vehicles_number();
  // }, []);

  // console.log("Dta",get_vehicles_number)
  // console.log("first",vehicle_number);

  //--------- circle button----------
  const [circle_btn, setcircle_btn] = useState(true);

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  //-------------for date------------
  const [last_service_date, setlast_service_date] = useState("");
  const [insurance_expiry_date, setinsurance_expiry_date] = useState("");
  const [puc_expiry, setpuc_expiry] = useState("");
  useEffect(() => {
    let date = new Date();
    let date_n =
      String(date.getDate()).length === 1
        ? "0" + String(date.getDate())
        : String(date.getDate());
    let month =
      String(date.getMonth() + 1).length === 1
        ? "0" + String(date.getMonth() + 1)
        : String(date.getMonth() + 1);
    let year = String(date.getFullYear());
    setlast_service_date(`${year}-${month}-${date_n}`);
    setinsurance_expiry_date(`${year}-${month}-${date_n}`);
    setpuc_expiry(`${year}-${month}-${date_n}`);
  }, []);

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <Page_Title page="Vehicle Maintainance" />
        <Title title="Vehicle Maintainance" parent_title="Vms" />
        {/* Maintainance */}
        <div className=" m-4">
          <div className=" mb-2 main-header">Add Vehicle Maintainance</div>
        </div>

        <div className=" m-4">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Maintainance
                  {/* <AddCircleOutline className="header-add-icon" /> */}
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle}>
                      {circle_btn ? (
                        <MdAddCircleOutline />
                      ) : (
                        <MdRemoveCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn ? (
                <CardBody>
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Vehicle Number:</Label>
                        <Search_input
                          data_list={vehicle_number_list1}
                          data_item_s={vehicle_number}
                          set_data_item_s={setvehicle_number}
                          set_id={setvehicle_id}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Last Service:</Label>
                        <input
                          type="date"
                          className="form-control d-block form-control-md "
                          //  value="2018-07-22"
                          value={last_service_date}
                          onChange={(val) => {
                            setlast_service_date(val.target.value);
                          }}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Insurance Policy Number*:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={
                            validation.values.insurance_policy_number || ""
                          }
                          invalid={
                            validation.touched.insurance_policy_number &&
                            validation.errors.insurance_policy_number
                              ? true
                              : false
                          }
                          type="text"
                          name="insurance_policy_number"
                          className="form-control-md input"
                          // id="customer_name"

                          placeholder="Enter the Insurance Policy Number"
                        />
                        {validation.touched.insurance_policy_number &&
                        validation.errors.insurance_policy_number ? (
                          <FormFeedback type="invalid">
                            {validation.errors.insurance_policy_number}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Insurance Expiry:
                        </Label>
                        <input
                          type="date"
                          className="form-control d-block form-control-md "
                          //  value="2018-07-22"
                          value={insurance_expiry_date}
                          onChange={(val) => {
                            setinsurance_expiry_date(val.target.value);
                          }}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">PUC No*:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.puc_no || ""}
                          invalid={
                            validation.touched.puc_no &&
                            validation.errors.puc_no
                              ? true
                              : false
                          }
                          type="text"
                          name="puc_no"
                          className="form-control-md input"
                          // id="customer_name"

                          placeholder="Enter the PUC Number"
                        />
                        {validation.touched.puc_no &&
                        validation.errors.puc_no ? (
                          <FormFeedback type="invalid">
                            {validation.errors.puc_no}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">PUC Expiry:</Label>
                        <input
                          type="date"
                          className="form-control d-block form-control-md "
                          //  value="2018-07-22"
                          value={puc_expiry}
                          onChange={(val) => {
                            setpuc_expiry(val.target.value);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/* Packages */}
        <div className=" m-4">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button type="submit" className="btn btn-info m-1">
                Save
              </button>

              <button type="submit" className="btn btn-info m-1">
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default Vehicle_maintainance;
