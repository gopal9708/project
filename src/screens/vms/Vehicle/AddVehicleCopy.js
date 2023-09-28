/* eslint-disable */
import React, { useEffect, useState, useLayoutEffect } from "react";
// import "../../../assets/scss/forms/form.scss";
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
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput.js";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";

const AddVehicle = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.authentication.access_token);
  // const page_num = useSelector((state) => state.pagination.page_number);
  // const [page, setpage] = useState(1);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isupdating, setisupdating] = useState(false);
  const [vehicle, setvehicle] = useState("");
  const [is_updating, setis_updating] = useState(false);
  //------------------circle button--------------------
  const [circle_btn, setcircle_btn] = useState(true);

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const [circle_btn2, setcircle_btn2] = useState(true);

  const toggle_circle2 = () => {
    setcircle_btn2(!circle_btn2);
  };

  //------------------drop down--------------------
  const [bharat_type, setbharat_type] = useState("");
  const [vehicle_type, setvehicle_type] = useState("");
  const [status_type, setstatus_type] = useState("");
  const [status, setstatus] = useState("");
  const [ownership, setownership] = useState("");
  const [fuel, setfuel] = useState("");

  //------drop down list-------------
  const [model_search_item, setmodel_search_item] = useState("");
  const [transporter_search_item, settransporter_search_item] = useState("");
  const [state_search_item, setstate_search_item] = useState("");

  const [model_nu, setmodel_nu] = useState("");
  const [model_nu_id, setmodel_nu_id] = useState("");
  const [model_nu_list, setmodel_nu_list] = useState("");

  const [vehicle_type_list, setveh_type_list] = useState([
    "CAR",
    "BUS",
    "PICKUP TRUCK",
    "SEMI TRUCK",
    "TRAILER",
    "LOADER ",
    "OTHER ",
  ]);

  const [bharat_type_list, setbharat_type_list] = useState([
    "BS1",
    "BS2",
    "BS3",
    "BS4",
    "BS5",
    "BS6",
  ]);

  const [status_list, setstatus_list] = useState(["CITY", "STATE", "NATIONAL"]);

  const [status_type_list, setstatus_type_list] = useState([
    "ACTIVE",
    "ENGAGE",
    "INACTIVE",
  ]);
  const [fuel_list, setfuel_list] = useState([
    "PETROL",
    "CNG",
    "ELECTRIC",
    "DIESEL",
  ]);

  const [ownership_list, setownership_list] = useState([
    "OWNED",
    "HIRED",
    "LEASED",
    "CUSTOMER",
  ]);

  const [get_transporter_name_list, setget_transporter_name_list] =
    useState("");
  const [get_transporter_name, setget_transporter_name] = useState("");
  const [transpoter_id, settranspoter_id] = useState("");

  const [reg_state_list, setreg_state_list] = useState([]);
  const [reg_state, setreg_state] = useState("");
  const [reg_state_id, setreg_state_id] = useState("");

  const [page, setpage] = useState(1);
  const [page1, setpage1] = useState(1);
  const [page2, setpage2] = useState(1);

  const search = useSelector((state) => state.searchbar.search_item);

  const [get_vehicle_data, setget_vehicle_data] = useState("");
  const [get_id, setget_id] = useState("");
  //  ----------------------validation-----------------------------------
  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      // This should be in small letter or smallcase
      trim_space: get_vehicle_data.trim || "",
      vehicle_reg_number: get_vehicle_data.registeration_no || "",
      // state_space: "",
      color_space: get_vehicle_data.color || "",
      // vehicle_owner_name:   "",
      vin_space: get_vehicle_data.vin_sn || "",
      fuel_tank_capacity: get_vehicle_data.fuel_tank_capacity || "",
      odo_number: "",
      last_odo: "",
    },

    validationSchema: Yup.object({
      // last_odo: Yup.string().required("Last Odo Meter is required"),
      vehicle_reg_number: Yup.string()
        .min(10, "Enter a valid Registration No")
        .max(10, "Enter a valid Registration No")
        .required("Vehicle Registration No is required"),
      // state_space: Yup.string().required("Registration State is required"),
      color_space: Yup.string().required("Color is required"),
      trim_space: Yup.string().required("Trim number is required"),
      // vehicle_owner_name: Yup.string().required(
      //   "Vehicle Owner name is required"
      // ),
      vin_space: Yup.string().required("Enter the ViN number"),
      fuel_tank_capacity: Yup.string().required(
        "Fuel Tank Capacity is required"
      ),
      // odo_number: Yup.string().required("Odo Meter is required"),
    }),

    onSubmit: (values) => {
      send_vehicles_data(values);
    },
  });

  const send_vehicles_data = (values) => {
    axios
      .post(
        ServerAddress + "vms/add_vehcile/",
        {
          model: model_nu_id,
          registeration_no: toTitleCase(
            values.vehicle_reg_number
          ).toUpperCase(),
          transporter: transpoter_id,
          vin_sn: values.vin_space,
          // vehicle_type: vehicle_type,
          vehicle_type: "Fixed vehicle",
          bharat_stage: bharat_type,
          vehicle_status: status_type,
          permit_type: status,
          fuel_type: fuel,

          ownership: ownership,
          trim: values.trim_space,
          color: toTitleCase(values.color_space).toUpperCase(),
          registration_state: reg_state_id,
          fuel_tank_capacity: values.fuel_tank_capacity,
          // odometer_reading: values.odo_number,
          // last_service_odometer_reading: values.last_odo,

          // vehicle_owner_name: values.vehicle_owner_name,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.status === 201) {
          dispatch(setShowAlert(true));
          dispatch(setAlertType("success"));
          dispatch(
            setDataExist(
              `Vehicle ${values.vehicle_reg_number} Added sucessfully`
            )
          );
          navigate(-1);

          // setData(loading_list, accessToken, dispatch, navigate);
        }
      })
      .catch((error) => {
        alert(`Error Happen while posting vehicle Data ${error}`);
      });
  };

  //--------get Data from other modal---------------//
  const get_vehicle = () => {
    let temp = [...model_nu_list];
    axios
      .get(
        ServerAddress +
        `vms/get_vehiclemodel/?p=${page}&records=${10}&name=${[
          "",
        ]}&model_name_search=${model_search_item}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        let data = response.data.results;
        for (let index = 0; index < data.length; index++) {
          temp.push([data[index].id, data[index].model_name]);
        }
        temp = [...new Set(temp.map((v) => `${v}`))].map((v) => v.split(","));
        setmodel_nu_list(temp);
      })
      .catch((error) => {
        alert(`Error occured while Gettting Data ${error}`);
      });
  };

  const get_transporter = () => {
    let temp1 = [...get_transporter_name_list];
    axios
      .get(
        ServerAddress +
        `trip/get_transporter/?p=${page2}&records=${10}&name=${[
          "",
        ]}&name_search=${transporter_search_item}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        let data = response.data.results;
        for (let i = 0; i < data.length; i++) {
          temp1.push([data[i].id, data[i].name]);
        }
        temp1 = [...new Set(temp1.map((v) => `${v}`))].map((v) => v.split(","));
        setget_transporter_name_list(temp1);
      })
      .catch((error) => {
        alert(`Error Occured While Getting Transporter ${error}`);
      });
  };

  const get_States = () => {
    let state_list = [...reg_state_list];
    axios
      .get(
        ServerAddress +
        `master/all-states/?p=${page1}&records=${10}&name=${[
          "",
        ]}&state_search=${state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        for (let index = 0; index < response.data.length; index++) {
          const element = response.data[index];
          state_list.push([element.id, toTitleCase(element.state)]);
        }
        state_list = [...new Set(state_list.map((v) => `${v}`))].map((v) =>
          v.split(",")
        );

        setreg_state_list(state_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  // get registration state  Function
  const getStates = () => {
    let state_list = [...reg_state_list];

    axios
      .get(
        ServerAddress +
        `master/all_states/?search=${""}&p=${page1}&records=${10}&state_search=${state_search_item}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.results.length > 0) {
          if (page1 == 1) {
            state_list = resp.data.results.map((v) => [
              v.id,
              toTitleCase(v.state),
            ]);
          } else {
            state_list = [
              ...reg_state_list,
              ...resp.data.results.map((v) => [v.id, toTitleCase(v.state)]),
            ];
          }
        }
        setreg_state_list(state_list);
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  useLayoutEffect(() => {
    getStates();
  }, [page1, state_search_item]);

  useLayoutEffect(() => {
    get_vehicle();
  }, [page, model_search_item]);

  // useLayoutEffect(() => {
  //   get_States();
  // }, [page1, state_search_item]);

  useLayoutEffect(() => {
    get_transporter();
  }, [page2, transporter_search_item]);

  //--------------------------error-------------
  const [vehicle_model_error, setvehicle_model_error] = useState(false);
  const [transporter_name_error, settransporter_name_error] = useState(false);
  const [vehicle_type_error, setvehicle_type_error] = useState(false);
  const [bharat_stage_error, setbharat_stage_error] = useState(false);
  const [fuel_type_error, setfuel_type_error] = useState(false);
  const [ownership_error, setownership_error] = useState(false);
  const [reg_state_error, setreg_state_error] = useState(false);

  useLayoutEffect(() => {
    try {
      setget_vehicle_data(location.state.item);
      setget_id(location.state.item.id);
      setmodel_nu(location.state.item.model);
      setbharat_type(location.state.item.bharat_stage);
      setget_transporter_name(location.state.item.Transporter);
      setvehicle_type(location.state.item.vehicle_type);
      setstatus_type(location.state.item.vehicle_status);
      setstatus(location.state.item.permit_type);
      setfuel(location.state.item.fuel_type);
      setownership(location.state.item.ownership);
      setis_updating(true);
    } catch (error) { }
  }, []);
  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          if (model_nu == "") {
            setvehicle_model_error(true);
          }
          if (transporter_name_error == "") {
            settransporter_name_error(true);
          }
          if (vehicle_type == "") {
            setvehicle_type_error(true);
          }
          if (bharat_type == "") {
            setbharat_stage_error(true);
          }
          if (fuel == "") {
            setfuel_type_error(true);
          }
          if (ownership == "") {
            setownership_error(true);
          }
          if (reg_state == "") {
            setreg_state_error(true);
          }
          validation.handleSubmit(e.values);
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page="Add Vehicle" />
          <Title
            title="Add Vehicle" // {is_updating ? "Update Vehicle": "
            // "}
            parent_title="Vms"
          />
        </div>

        {/*  Vehicle Deatils*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Vehicle Deatils
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
                      <div className="mb-3">
                        <Label className="header-child">Vehicle Model*</Label>
                        <SearchInput
                          data_list={model_nu_list}
                          setdata_list={setmodel_nu_list}
                          data_item_s={model_nu}
                          set_data_item_s={setmodel_nu}
                          set_id={setmodel_nu_id}
                          page={page}
                          setpage={setpage}
                          error_message={"Please Select Vehicle Mode"}
                          error_s={vehicle_model_error}
                          setsearch_item={setmodel_search_item}
                        />
                      </div>
                    </Col>
                    {/*
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Vehicle Owner Name:
                            <span style={{ color: "red", opacity: 0.8 }}>
                              {" "}
                              *
                            </span>
                          </Label>
                          <Input
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.vehicle_owner_name || ""}
                            invalid={
                              validation.touched.vehicle_owner_name &&
                              validation.errors.vehicle_owner_name
                                ? true
                                : false
                            }
                            type="text"
                            name="vehicle_owner_name"
                            className="form-control-md "
                            id="input"
                            placeholder="Enter the Vehicle Owner Name"
                          />
                          {validation.touched.vehicle_owner_name &&
                          validation.errors.vehicle_owner_name ? (
                            <FormFeedback type="invalid">
                              {validation.errors.vehicle_owner_name}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </Col> */}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Transporter Name:*
                        </Label>
                        <SearchInput
                          data_list={get_transporter_name_list}
                          setdata_list={setget_transporter_name_list}
                          data_item_s={get_transporter_name}
                          set_data_item_s={setget_transporter_name}
                          set_id={settranspoter_id}
                          page={page2}
                          setpage={setpage2}
                          error_message={"Please Select Any Option"}
                          error_s={transporter_name_error}
                          setsearch_item={settransporter_search_item}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Vehicle Registration No:*
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.vehicle_reg_number || ""}
                          invalid={
                            validation.touched.vehicle_reg_number &&
                              validation.errors.vehicle_reg_number
                              ? true
                              : false
                          }
                          type="text"
                          name="vehicle_reg_number"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter the Vehicle registration"
                        />
                        {validation.touched.vehicle_reg_number &&
                          validation.errors.vehicle_reg_number ? (
                          <FormFeedback type="invalid">
                            {validation.errors.vehicle_reg_number}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Vehicle Type:</Label>

                        <NSearchInput
                          data_list={vehicle_type_list}
                          data_item_s={vehicle_type}
                          set_data_item_s={setvehicle_type}
                          error_message={" PLease Select Vehicle Type"}
                          show_search={false}
                          error_s={vehicle_type_error}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">VIN/SN:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.vin_space || ""}
                          invalid={
                            validation.touched.vin_space &&
                              validation.errors.vin_space
                              ? true
                              : false
                          }
                          type="Number"
                          min={0}
                          name="vin_space"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter the seriel number"
                        />
                        {validation.touched.vin_space &&
                          validation.errors.vin_space ? (
                          <FormFeedback type="invalid">
                            {validation.errors.vin_space}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">
                          Bharat Stage(BS):
                        </Label>
                        <NSearchInput
                          data_list={bharat_type_list}
                          data_item_s={bharat_type}
                          set_data_item_s={setbharat_type}
                          show_search={false}
                          error_message={"Please Select BS"}
                          error_s={bharat_stage_error}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Vehicle Status:</Label>
                        <NSearchInput
                          data_list={status_type_list}
                          data_item_s={status_type}
                          set_data_item_s={setstatus_type}
                          show_search={false}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Permit Type:</Label>
                        <NSearchInput
                          data_list={status_list}
                          data_item_s={status}
                          set_data_item_s={setstatus}
                          show_search={false}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Fuel Type:</Label>
                        <NSearchInput
                          data_list={fuel_list}
                          data_item_s={fuel}
                          set_data_item_s={setfuel}
                          show_search={false}
                          error_message={"Please Select Fuel type"}
                          error_s={fuel_type_error}
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Documents Info*/}
        <div className=" m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Documents Info
                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle2}>
                      {circle_btn2 ? (
                        <MdAddCircleOutline />
                      ) : (
                        <MdRemoveCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn2 ? (
                <CardBody>
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Ownership:</Label>
                        <NSearchInput
                          data_list={ownership_list}
                          data_item_s={ownership}
                          set_data_item_s={setownership}
                          show_search={false}
                          error_message={"Please Select Owner Type"}
                          error_s={ownership_error}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">Trim:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.trim_space || ""}
                          invalid={
                            validation.touched.trim_space &&
                              validation.errors.trim_space
                              ? true
                              : false
                          }
                          type="text"
                          name="trim_space"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter the Trim Details"
                        />
                        {validation.touched.trim_space &&
                          validation.errors.trim_space ? (
                          <FormFeedback type="invalid">
                            {validation.errors.trim_space}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">color:</Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.color_space || ""}
                          invalid={
                            validation.touched.color_space &&
                              validation.errors.color_space
                              ? true
                              : false
                          }
                          type="text"
                          name="color_space"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter the Color of  Vehicle"
                        />
                        {validation.touched.color_space &&
                          validation.errors.color_space ? (
                          <FormFeedback type="invalid">
                            {validation.errors.color_space}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Registration State/Province:
                        </Label>
                        <SearchInput
                          data_list={reg_state_list}
                          setdata_list={setreg_state_list}
                          data_item_s={reg_state}
                          set_data_item_s={setreg_state}
                          set_id={setreg_state_id}
                          page={page1}
                          setpage={setpage1}
                          error_message={"Please Select Registration State"}
                          error_s={reg_state_error}
                          search_item={state_search_item}
                          setsearch_item={setstate_search_item}
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Fuel Tank Capacity:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.fuel_tank_capacity || ""}
                          invalid={
                            validation.touched.fuel_tank_capacity &&
                              validation.errors.fuel_tank_capacity
                              ? true
                              : false
                          }
                          type="Number"
                          min={0}
                          name="fuel_tank_capacity"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter the Fuel Tank Capacity"
                        />
                        {validation.touched.fuel_tank_capacity &&
                          validation.errors.fuel_tank_capacity ? (
                          <FormFeedback type="invalid">
                            {validation.errors.fuel_tank_capacity}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Total Odo Reading:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.odo_number || ""}
                          invalid={
                            validation.touched.odo_number &&
                              validation.errors.odo_number
                              ? true
                              : false
                          }
                          type="Number"
                          min={0}
                          name="odo_number"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter the Total Odo Meter Reading"
                        />
                        {validation.touched.odo_number &&
                          validation.errors.odo_number ? (
                          <FormFeedback type="invalid">
                            {validation.errors.odo_number}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Last Service Odo Reading:
                        </Label>
                        <Input
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.last_odo || ""}
                          invalid={
                            validation.touched.last_odo &&
                              validation.errors.last_odo
                              ? true
                              : false
                          }
                          type="Number"
                          min={0}
                          name="last_odo"
                          className="form-control-md "
                          id="input"
                          placeholder="Enter the Last Odo Reading"
                        />
                        {validation.touched.last_odo &&
                          validation.errors.last_odo ? (
                          <FormFeedback type="invalid">
                            {validation.errors.last_odo}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </Col>

                    <Col lg={4} md={5} sm={5}>
                      <div className="mb-3">
                        <Label className="header-child">Vehicle Image</Label>
                        <Input
                          className="form-control form-control-md"
                          id="formFileSm"
                          type="file"
                        />
                      </div>
                    </Col>

                    <Col lg={4} md={5} sm={5}>
                      <div className="mb-3">
                        <Label className="header-child">RC Book</Label>
                        <Input
                          className="form-control form-control-md"
                          id="formFileSm"
                          type="file"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Button */}
        <div className=" m-4">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              <button type="submit" className="btn btn-info m-1">
                Save
              </button>

              <button
                type="submit"
                className="btn btn-info m-1 "
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default AddVehicle;