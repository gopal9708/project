/*eslint-disable*/
import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ServerAddress } from "../../../../constants/ServerAddress";
import "bootstrap/dist/css/bootstrap.css";
import { FiMoreHorizontal } from "react-icons/fi";
import { GrOverview } from "react-icons/gr";
import Dropdown from "react-bootstrap/Dropdown";
import {
  Card,
  Button,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import AddFuel from "./Vehile_Modals/AddFuel.js";
import AddExpence from "./Vehile_Modals/AddExpence";
import NewIssue from "./Vehile_Modals/NewIssue";
import AddInspec from "./Vehile_Modals/AddInspec";
import AddMeter from "./Vehile_Modals/AddMeter";
import ServiceEntry from "./Vehile_Modals/ServiceEntry";
import RenewalReminder from "./Vehile_Modals/RenewalReminder";

import AddVehicleEngine from "../../vehicleEngine/AddVehicleEngine";
import AddVehicleDimension from "../../vehicleDimension/AddVehicleDimension";
import AddVehicleTransmission from "../../vehicleTransmission/AddVehicleTransmission";
import AddVehicleWheel from "../../vehicleWheels/AddVehicleWheel";
import AddVehicleInspection from "../../vehicleInspection/AddVehicleInspection";

const ModelTabs = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const [modeltabs_up, setmodeltabs_up] = useState("");
  console.log("modeltabs_up==", modeltabs_up);

  const [customActiveTab, setcustomActiveTab] = useState("1");
  //--------State For Modal--------
  const [visible_add_issue, setvisible_add_issue] = useState(false);
  const [vehicle, setvehicle] = useState("");
  // ??
  const [get_issue_data, setget_issue_data] = useState("");
  const [get_expense_data, setget_expense_data] = useState("");
  const [get_meter_data, setget_meter_data] = useState("");
  const [get_service_data, setget_service_data] = useState("");
  const [delmsg, setDelmsg] = useState("");
  const [get_vehicle_id, setget_vehicle_id] = useState("");
  const [get_owner_name, setget_owner_name] = useState("");
  const [vehicle_model, setvehicle_model] = useState("");
  const [vehicle_type, setvehicle_type] = useState("");
  //----------------for refresh while add the data---------
  const [refresh, setrefresh] = useState(false);

  useEffect(() => {
    try {
      setvehicle_reg_no(location.state.item.Vehicle_reg_no);
      // settrip_date(location.state.item.Trip_Start_Time);
    } catch (error) { }
  });
  const [vehicle_reg_no, setvehicle_reg_no] = useState("");
  const accessToken = useSelector((state) => state.authentication.access_token);
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  // useEffect(() => {
  //   try {
  //     setvehicle(location.state.veh);
  //     setisupdating(true);
  //     setget_vehicle_id(location.state.veh.vehicle_reg_nol);
  //     if (location.state.veh.current_status == "Approved") {
  //       setapproved_entry(true);
  //     }
  //   } catch (error) {}
  // }, []);

  const delete_vehicle = (id, reported_by) => {
    axios
      .delete(ServerAddress + "vms/api/delete-issue/" + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        if (response.statusText === "OK") {
          dispatch(showAlert(true));
          dispatch(dataExist(`Vehicle ${reported_by} deleted sucessfully`));
          dispatch(alertType("danger"));
          dispatch(setIsDeleted("Yes"));
          // dispatch(setToggle(true));
          setDelmsg(response.data.msg);
        }
      })
      .catch((err) => {
        alert(`Error While delete profile ${err}`);
      });
  };

  const expense_vehicle = (id, expense_type) => {
    axios
      .delete(ServerAddress + "vms/api/delete-expense/" + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        if (response.statusText === "OK") {
          dispatch(showAlert(true));
          dispatch(dataExist(`Vehicle ${expense_type} deleted sucessfully`));
          dispatch(alertType("danger"));
          dispatch(setIsDeleted("Yes"));
          // dispatch(setToggle(true));
          setDelmsg(response.data.msg);
        }
      })
      .catch((err) => {
        alert(`Error While delete profile ${err}`);
      });
  };

  const inspection_vehicle = (id, odometer_reading) => {
    axios
      .delete(ServerAddress + "vms/api/delete-inspection/" + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        if (response.statusText === "OK") {
          dispatch(showAlert(true));
          dispatch(
            dataExist(`Vehicle ${odometer_reading} deleted sucessfully`)
          );
          dispatch(alertType("danger"));
          dispatch(setIsDeleted("Yes"));
          // dispatch(setToggle(true));
          setDelmsg(response.data.msg);
        }
      })
      .catch((err) => {
        alert(`Error While delete profile ${err}`);
      });
  };
  const meter_vehicle = (id, primary_meter) => {
    axios
      .delete(ServerAddress + "vms/api/delete-meterhistory/" + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (response) {
        if (response.statusText === "OK") {
          dispatch(showAlert(true));
          dispatch(dataExist(`Vehicle ${primary_meter} deleted sucessfully`));
          dispatch(alertType("danger"));
          dispatch(setIsDeleted("Yes"));
          // dispatch(setToggle(true));
          setDelmsg(response.data.msg);
        }
      })
      .catch((err) => {
        alert(`Error While delete master vehicle ${err}`);
      });
  };

  //---------Function-----------
  const get_issue = () => {
    axios
      .get(ServerAddress + "vms/api/get-VehicleDetail/?id=" + get_vehicle_id, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((response) => {
        setget_issue_data(response.data[0].issue);
        setget_expense_data(response.data[0].expense);
        setget_meter_data(response.data[0].meter_entry);
        setget_service_data(response.data[0].inspection_history);
      })
      .catch((err) => {
        alert(`Error Occur in Get issue, ${err}`);
      });
  };

  useEffect(() => {
    if (get_vehicle_id) {
      get_issue();
    }
  }, [get_vehicle_id]);

  // useLayoutEffect(() => {
  //   setget_vehicle_id(location.state.item.vehicle_reg_no);
  //   setget_owner_name(location.state.item.vehicle_owner_name);
  //   setvehicle_model(location.state.item.vehicle_model_name);
  //   setvehicle_type(location.state.item.vehicle_type);
  // }, []);

  // ---------------------\
  useLayoutEffect(() => {
    try {
      setmodeltabs_up(location.state.item);
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <Nav tabs className="nav-tabs-custom nav-justified">
                <NavItem>
                  <NavLink
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "flex-start",
                      borderBottom: "2px solid white",
                    }}
                    className={classnames({
                      active: customActiveTab === "1",
                    })}
                    onClick={() => {
                      toggleCustom("1");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i
                        style={{ opacity: "0.5" }}
                      // className="fas fa-home"
                      >
                        <GrOverview />
                      </i>
                    </span>
                    <span className="d-none d-sm-block">Overview</span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "2",
                    })}
                    onClick={() => {
                      toggleCustom("2");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i
                      // className="far fa-user"
                      >
                        {/* <BiTrip /> */}
                      </i>
                    </span>
                    <span className="d-none d-sm-block">Engine</span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "3",
                    })}
                    onClick={() => {
                      toggleCustom("3");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i
                      // class="fa-sharp fa-solid fa-clipboard-list"
                      >
                        {/* <AiOutlineSchedule /> */}
                      </i>
                      {/* <i  class="fa-sharp fa-solid fa-clipboard-list-check"></i> */}
                    </span>
                    <span className="d-none d-sm-block">
                      Dimension
                    </span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "4",
                    })}
                    onClick={() => {
                      toggleCustom("4");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i
                      // class="fa-sharp fa-solid fa-clipboard-list"
                      >
                        {/* <AiOutlineSchedule /> */}
                      </i>
                      {/* <i  class="fa-sharp fa-solid fa-clipboard-list-check"></i> */}
                    </span>
                    <span className="d-none d-sm-block">
                      Transmission
                    </span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "5",
                    })}
                    onClick={() => {
                      toggleCustom("5");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i
                      // class="fa-sharp fa-solid fa-clipboard-list"
                      >
                        {/* <AiOutlineSchedule /> */}
                      </i>
                      {/* <i  class="fa-sharp fa-solid fa-clipboard-list-check"></i> */}
                    </span>
                    <span className="d-none d-sm-block">
                      Wheel
                    </span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    style={{ cursor: "pointer" }}
                    className={classnames({
                      active: customActiveTab === "6",
                    })}
                    onClick={() => {
                      toggleCustom("6");
                    }}
                  >
                    <span className="d-block d-sm-none">
                      <i
                      // class="fa-sharp fa-solid fa-clipboard-list"
                      >
                        {/* <AiOutlineSchedule /> */}
                      </i>
                      {/* <i  class="fa-sharp fa-solid fa-clipboard-list-check"></i> */}
                    </span>
                    <span className="d-none d-sm-block">
                      Inspection
                    </span>
                  </NavLink>
                </NavItem>

                <NavItem>
                  <Dropdown
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      backgroundColor: "white",
                      border: "2px solid white",
                    }}
                  >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      <FiMoreHorizontal />
                      Add More
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      style={{
                        width: "200px",
                        borderLeft: "3.5px solid #3ca0e7",
                      }}
                    >
                      {" "}
                      <span
                        style={{
                          cursor: "pointer",
                          fontFamily: " sans-serif",
                          fontSize: "17px",
                        }}
                      >
                        {" "}
                        <AddFuel
                          data={modeltabs_up.registeration_no}
                          id={modeltabs_up.id}
                        />
                      </span>
                      <span
                        style={{
                          cursor: "pointer",
                          fontFamily: "roboto, sans-serif",
                          fontSize: "17px",
                        }}
                      >
                        <AddExpence
                          data={modeltabs_up.registeration_no}
                          id={modeltabs_up.id}
                        />
                      </span>
                      <span
                        style={{
                          cursor: "pointer",
                          fontFamily: "roboto, sans-serif",
                          fontSize: "17px",
                        }}
                      >
                        <AddInspec
                          data={modeltabs_up.registeration_no}
                          id={modeltabs_up.id}
                        />
                      </span>
                      <span
                        style={{
                          cursor: "pointer",
                          fontFamily: "roboto, sans-serif",
                          fontSize: "17px",
                        }}
                      >
                        {" "}
                        <NewIssue
                          data={modeltabs_up.registeration_no}
                          id={modeltabs_up.id}
                        />
                      </span>
                      <span
                        style={{
                          cursor: "pointer",
                          fontFamily: "roboto, sans-serif",
                          fontSize: "17px",
                        }}
                      >
                        {" "}
                        <AddMeter
                          data={modeltabs_up.registeration_no}
                          id={modeltabs_up.id}
                        />{" "}
                      </span>{" "}
                      <span
                        style={{
                          cursor: "pointer",
                          fontFamily: "roboto, sans-serif",
                          fontSize: "17px",
                        }}
                      >
                        <ServiceEntry
                          data={modeltabs_up.registeration_no}
                          id={modeltabs_up.id}
                        />
                      </span>
                      <span
                        style={{
                          cursor: "pointer",
                          fontFamily: "roboto, sans-serif",
                          fontSize: "17px",
                        }}
                      >
                        <RenewalReminder
                          data={modeltabs_up.registeration_no}
                          id={modeltabs_up.id}
                        />
                      </span>
                    </Dropdown.Menu>
                  </Dropdown>
                </NavItem>
              </Nav>

              <TabContent
                activeTab={customActiveTab}
                className="p-3 text-muted"
              >
                <TabPane tabId="1">
                  <Row>
                    <Col lg={12}>
                      <CardText className="mb-0">
                        <Row>
                          <Col lg="6" md="12" sm="12">
                            <div>
                              <Card
                                style={{
                                  // width: "90%",
                                  // height: "100%",
                                  overflow: "scrollX",
                                  overflowY: "hidden",
                                }}
                                className="shadow bg-white rounded"
                              >
                                <CardTitle>
                                  <div
                                    style={{
                                      display: "flex",
                                      paddingLeft: "16px",
                                      paddingTop: "8px",
                                      paddingBottom: "2px",
                                      color: "Black",
                                      fontSize: "17px",
                                      fontFamily: "arial, sans-serif",
                                    }}
                                  >
                                    Model Basic information
                                  </div>
                                </CardTitle>
                                <CardBody>
                                  <div>
                                    <h6
                                      style={{ marginTop: "16px" }}
                                      className="fw-bold mb-1"
                                    >
                                      Model Name :{" "}
                                      <span
                                        className="badge bg-info rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          left: "20rem",
                                          fontFamily: "roboto, sans-serif",
                                        }}
                                      >
                                        {modeltabs_up.model_name}
                                      </span>
                                    </h6>

                                    <h6
                                      style={{ marginTop: "29px" }}
                                      className="fw-bold mb-1"
                                    >
                                      {" "}
                                      Make :
                                      <span
                                        className="badge bg-light rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          fontFamily: "roboto, sans-serif",
                                          left: "20rem",
                                        }}
                                      >
                                        {modeltabs_up.make}
                                      </span>{" "}
                                    </h6>

                                    <h6
                                      style={{ marginTop: "29px" }}
                                      className="fw-bold mb-1"
                                    >
                                      {" "}
                                      Make Year :
                                      <span
                                        className="badge bg-light rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          fontFamily: "roboto, sans-serif",
                                          left: "20rem",
                                        }}
                                      >
                                        {modeltabs_up.make_year}
                                      </span>{" "}
                                    </h6>

                                    <h6
                                      style={{ marginTop: "29px" }}
                                      className="fw-bold mb-1"
                                    >
                                      Towing Capacity :
                                      <span
                                        className="badge bg-light rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          fontFamily: "roboto, sans-serif",
                                          left: "20rem",
                                        }}
                                      >
                                        {modeltabs_up.towing_capacity}
                                      </span>
                                    </h6>

                                    <h6
                                      style={{ marginTop: "29px" }}
                                      className="fw-bold mb-1"
                                    >
                                      {" "}
                                      Max Payload :
                                      <span
                                        className="badge bg-light rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          fontFamily: "roboto, sans-serif",
                                          left: "20rem",
                                        }}
                                      >
                                        {modeltabs_up.max_payload}
                                      </span>
                                    </h6>

                                    <h6
                                      style={{ marginTop: "29px" }}
                                      className="fw-bold mb-1"
                                    >
                                      {" "}
                                      KMPL City :
                                      <span
                                        className="badge bg-light rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          fontFamily: "roboto, sans-serif",
                                          left: "20rem",
                                        }}
                                      >
                                        {modeltabs_up.kmpl_city}
                                      </span>
                                    </h6>
                                    
                                    <h6
                                      style={{ marginTop: "29px" }}
                                      className="fw-bold mb-1"
                                    >
                                      {" "}
                                      KMPL Highway :
                                      <span
                                        className="badge bg-light rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          fontFamily: "roboto, sans-serif",
                                          left: "20rem",
                                        }}
                                      >
                                        {modeltabs_up.kmpl_highway}
                                      </span>
                                    </h6>
                                    <h6
                                      style={{ marginTop: "29px" }}
                                      className="fw-bold mb-1"
                                    >
                                      {" "}
                                      KMPL Combined :
                                      <span
                                        className="badge bg-light rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          fontFamily: "roboto, sans-serif",
                                          left: "20rem",
                                        }}
                                      >
                                        {modeltabs_up.kmpl_combined}
                                      </span>
                                    </h6>
                                    <h6
                                      style={{ marginTop: "29px" }}
                                      className="fw-bold mb-1"
                                    >
                                      {" "}
                                      Kerb Weight :
                                      <span
                                        className="badge bg-light rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          fontFamily: "roboto, sans-serif",
                                          left: "20rem",
                                        }}
                                      >
                                        {modeltabs_up.kerb_weight}
                                      </span>
                                    </h6>
                                    <h6
                                      style={{ marginTop: "29px" }}
                                      className="fw-bold mb-1"
                                    >
                                      {" "}
                                      Gross Weight :
                                      <span
                                        className="badge bg-light rounded-pill"
                                        style={{
                                          fontWeight: "500",
                                          position: "absolute",
                                          fontFamily: "roboto, sans-serif",
                                          left: "20rem",
                                        }}
                                      >
                                        {modeltabs_up.gross_weight}
                                      </span>
                                    </h6>


                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          </Col>

                          <Col lg="6" md="12" sm="12">
                            <div>
                              <Card
                                className="shadow bg-white rounded"
                                style={{
                                  overflow: "scrollX",
                                  overflowY: "hidden",
                                }}
                              >
                                <CardTitle>
                                  <Carousel>
                                    <Carousel.Item>
                                      <img
                                        style={{
                                          maxWidth: "100%",
                                          height: "200px",
                                          margin: "0 auto",
                                          display: "block",
                                          objectFit: "contain",
                                        }}
                                        className="d-block w-100"
                                        src="https://www.tatamotors.com/wp-content/uploads/2020/08/ultra2.jpg"
                                        // src="{my.jpg}"
                                        alt="First slide"
                                      />
                                      <Carousel.Caption>
                                        <h3 style={{ color: "whitesmoke" }}>
                                          Logistic Cube
                                        </h3>
                                        <p></p>
                                      </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                      <img
                                        style={{
                                          maxWidth: "100%",
                                          height: "200px",
                                          margin: "0 auto",
                                          display: "block",
                                          objectFit: "contain",
                                        }}
                                        className="d-block w-100"
                                        src="https://gumlet.assettype.com/evoindia%2F2021-10%2F5e9cb492-262e-4025-a0b0-a05fa2463f1b%2FULTRA_Sleek_T_6.jpg?format=auto"
                                        alt="Second slide"
                                      />

                                      <Carousel.Caption>
                                        <h3>Logistic Cube</h3>
                                        <p></p>
                                      </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                      <img
                                        style={{
                                          maxWidth: "100%",
                                          height: "200px",
                                          margin: "0 auto",
                                          display: "block",
                                          objectFit: "contain",
                                        }}
                                        className="d-block w-100"
                                        src="https://5.imimg.com/data5/CB/RT/NS/SELLER-49784604/tata-lpt-1412-crx-500x500.jpg"
                                        alt="Third slide"
                                      />

                                      <Carousel.Caption>
                                        <h3>Logistic Cube</h3>
                                        <p></p>
                                      </Carousel.Caption>
                                    </Carousel.Item>

                                    <Carousel.Item>
                                      <img
                                        style={{
                                          maxWidth: "100%",
                                          height: "200px",
                                          margin: "0 auto",
                                          display: "block",
                                          objectFit: "contain",
                                        }}
                                        className="d-block w-100"
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOHuu3_VGGqcl91Jw1yb1AJo7BfCluahMYfQ&usqp=CAU"
                                        alt="Third slide"
                                      />

                                      <Carousel.Caption>
                                        <h3>Logistic Cube</h3>
                                        <p></p>
                                      </Carousel.Caption>
                                    </Carousel.Item>
                                  </Carousel>
                                </CardTitle>
                                <CardBody>
                                  <div>
                                    <table
                                      className="table table-borderless"
                                      style={{
                                        fontFamily: "arial, sans-serif",
                                      }}
                                    >
                                      <thead style={{ color: "black" }}>
                                        <tr
                                          className=""
                                          style={{ paddingLeft: "10px" }}
                                        >
                                          <th>{modeltabs_up.vehicle_number}</th>
                                          <th>{modeltabs_up.model_nm}</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {" "}
                                        {/* {get_meter_data.length == 0 ? (
                                          <span>No data found</span>
                                        ) : ( */}
                                        <>
                                          <tbody></tbody>
                                          {/* {get_meter_data.map(
                                              (item, index) => {
                                                return ( */}
                                          <tr>
                                            {/* <td>{item.vehicle_reg_no}</td> */}
                                            <td>
                                              {" "}
                                              <div className="d-flex align-items-center">
                                                <div className="ms-0.5">
                                                  <p className="badge bg-info rounded-pill">
                                                    {/* {item.primary_meter} */}
                                                    {get_vehicle_id}
                                                  </p>
                                                  {/* {item.reported_date} */}
                                                </div>
                                              </div>
                                            </td>
                                            {/*                                                   
                                                  <td>{item.amount}</td> */}
                                            <td>
                                              {" "}
                                              <div className="d-flex align-items-center">
                                                <div className="ms-0.5">
                                                  <p className="">
                                                    {vehicle_model}
                                                  </p>
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                          {/* );
                                              }
                                            )} */}
                                        </>
                                        {/* )} */}
                                      </tbody>
                                    </table>
                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          </Col>

                          <Col lg="6" md="12" sm="12">
                            <div>
                              <Card
                                className="shadow bg-white rounded"
                                style={{
                                  overflow: "scrollX",
                                  overflowY: "hidden",
                                }}
                              >
                                <CardTitle>
                                  <div
                                    style={{
                                      display: "flex",
                                      paddingLeft: "16px",
                                      paddingTop: "8px",
                                      paddingBottom: "2px",
                                      color: "Black",
                                      fontSize: "17px",
                                      fontFamily: "arial, sans-serif",
                                    }}
                                  >
                                    <h5 className="text-danger">{delmsg} </h5>{" "}
                                    New Issue
                                  </div>
                                </CardTitle>
                                <CardBody>
                                  <div>
                                    <table
                                      className="table table-borderless table table-hover"
                                      style={{
                                        fontFamily: "arial, sans-serif",
                                        hover: "",
                                      }}
                                    >
                                      <thead style={{ color: "black" }}>
                                        <tr
                                          className=""
                                          style={{ paddingLeft: "10px" }}
                                        >
                                          <th></th>
                                          <th>Reported Date</th>
                                          <th>Reported By</th>
                                          <th>Odometer</th>
                                          <th>Priority</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {" "}
                                        {get_issue_data.length == 0 ? (
                                          <span>No data found</span>
                                        ) : (
                                          <>
                                            {get_issue_data.map(
                                              (item, index) => {
                                                return (
                                                  <tr key={index}>
                                                    <td>
                                                      {" "}
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                      ></input>
                                                    </td>
                                                    <td>
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.reported_date}
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.reported_by}
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      {" "}
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.odometer}
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      {" "}
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.priority}
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        {" "}
                                                        <button
                                                          style={{
                                                            marginLeft: "10px",
                                                            marginRight: "10px",
                                                            width: "70px",
                                                            height: "35px",
                                                            backgroundColor:
                                                              "white",
                                                            boxShadow:
                                                              "5px 7px #888888",
                                                          }}
                                                          type="button"
                                                          className="btn btn-grey text"
                                                          onClick={() => {
                                                            if (
                                                              confirm(
                                                                "Do you want to dalete  ? =>" +
                                                                item.reported_by
                                                              ) == true
                                                            ) {
                                                              delete_vehicle(
                                                                item.id,
                                                                item.reported_by
                                                              );
                                                            } else {
                                                            }
                                                          }}
                                                        >
                                                          <i className="fa fa-trash"></i>
                                                        </button>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                          </>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          </Col>

                          <Col lg="6" md="12" sm="12">
                            <div>
                              <Card
                                className="shadow bg-white rounded "
                                style={{
                                  overflow: "scrollX",
                                  overflowY: "hidden",
                                }}
                              >
                                <CardTitle>
                                  <div
                                    style={{
                                      // textDecoration: "underline",
                                      display: "flex",
                                      // fontWeight: "700",
                                      paddingLeft: "16px",
                                      paddingTop: "8px",
                                      paddingBottom: "2px",
                                      color: "Black",
                                      fontSize: "17px",
                                      fontFamily: "arial, sans-serif",
                                    }}
                                  >
                                    <button
                                      style={{
                                        color: "Blue",
                                        position: "absolute",
                                        display: "flex",
                                        color: "#0d6efd",
                                        right: "1rem",
                                        fontFamily: "arial, sans-serif",
                                        backgroundColor: "white",
                                      }}
                                      type="button"
                                      className="btn btn- btn btn-light btn-rounded btn-sm fw-bold"
                                      data-mdb-ripple-color="dark"
                                    >
                                      {" "}
                                      <i
                                        style={{
                                          color: "black",
                                          opacity: "0.6",
                                          fontSize: "20px",
                                          transform: "translateY(-17%)",
                                        }}
                                        className="las la-user-edit"
                                      ></i>
                                      Edit
                                    </button>
                                    Inspection History
                                  </div>
                                </CardTitle>
                                <CardBody>
                                  <div>
                                    <table
                                      className="table table-borderless table table-hover"
                                      style={{
                                        fontFamily: "arial, sans-serif",
                                      }}
                                    >
                                      <thead style={{ color: "black" }}>
                                        <tr
                                          className=""
                                          style={{ paddingLeft: "10px" }}
                                        >
                                          <th>
                                            {" "}
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              name="allSelect"
                                            // checked={!users.some((user) => user?.isChecked !== true)}
                                            // onChange={handleChange}
                                            />
                                            All Select
                                          </th>
                                          <th>Odometer</th>
                                          {/* <th>Engine</th> */}
                                          <th>Fuel Level</th>
                                          <th>Remarks</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {" "}
                                        {get_service_data.length == 0 ? (
                                          <span>No data found</span>
                                        ) : (
                                          <>
                                            {get_service_data.map(
                                              (item, index) => {
                                                return (
                                                  <tr key={index}>
                                                    {/* <td>{item.vehicle_reg_no}</td> */}
                                                    <td>
                                                      {" "}
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                      ></input>
                                                    </td>
                                                    <td>
                                                      {" "}
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {
                                                              item.odometer_reading
                                                            }
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    {/* <td>{item.engine}</td> */}
                                                    <td>
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.fuel_level}
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.remarks}
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        {" "}
                                                        <button
                                                          style={{
                                                            marginLeft: "10px",
                                                            marginRight: "10px",
                                                            width: "70px",
                                                            height: "35px",
                                                            backgroundColor:
                                                              "white",
                                                            boxShadow:
                                                              "5px 7px #888888",
                                                          }}
                                                          type="button"
                                                          className="btn btn-grey text"
                                                          onClick={() => {
                                                            if (
                                                              confirm(
                                                                "Do you want to dalete  ? =>" +
                                                                item.odometer_reading
                                                              ) == true
                                                            ) {
                                                              inspection_vehicle(
                                                                item.id,
                                                                item.odometer_reading
                                                              );
                                                            } else {
                                                            }
                                                          }}
                                                        >
                                                          <i className="fa fa-trash"></i>
                                                        </button>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                          </>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          </Col>

                          <Col lg="6" md="12" sm="12">
                            <div>
                              <Card
                                className="shadow bg-white rounded"
                                style={{
                                  overflow: "scrollX",
                                  overflowY: "hidden",
                                }}
                              >
                                <CardTitle>
                                  <div
                                    style={{
                                      // textDecoration: "underline",
                                      display: "flex",
                                      // fontWeight: "700",
                                      paddingLeft: "16px",
                                      paddingTop: "8px",
                                      paddingBottom: "2px",
                                      color: "Black",
                                      fontSize: "17px",
                                      fontFamily: "arial, sans-serif",
                                    }}
                                  >
                                    <button
                                      style={{
                                        color: "#0d6efd",
                                        position: "absolute",
                                        display: "flex",
                                        right: "1rem",
                                        fontFamily: "arial, sans-serif",
                                        backgroundColor: "white",
                                      }}
                                      type="button"
                                      className="btn btn- btn btn-light btn-rounded btn-sm fw-bold"
                                      data-mdb-ripple-color="dark"
                                    >
                                      <i
                                        style={{
                                          color: "black",
                                          opacity: "0.6",
                                          fontSize: "20px",
                                          transform: "translateY(-17%)",
                                        }}
                                        className="las la-user-edit"
                                      ></i>
                                      Edit
                                    </button>
                                    Expense History
                                  </div>
                                </CardTitle>
                                <CardBody>
                                  <div>
                                    <table
                                      className="table table-borderless table table-hover"
                                      style={{
                                        fontFamily: "arial, sans-serif",
                                      }}
                                    >
                                      <thead style={{ color: "black" }}>
                                        <tr
                                          className=""
                                          style={{ paddingLeft: "10px" }}
                                        >
                                          <th>
                                            {" "}
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              name="allSelect"
                                            // checked={!users.some((user) => user?.isChecked !== true)}
                                            // onChange={handleChange}
                                            />
                                            All Select
                                          </th>
                                          <th>Expense</th>
                                          <th>Amount</th>
                                          <th>Date</th>
                                          <th>Action</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {" "}
                                        {get_expense_data.length == 0 ? (
                                          <span>No data found</span>
                                        ) : (
                                          <>
                                            <tbody></tbody>
                                            {get_expense_data.map(
                                              (item, index) => {
                                                return (
                                                  <tr key={index}>
                                                    {/* <td>{item.vehicle_reg_no}</td> */}
                                                    <td>
                                                      {" "}
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                      ></input>
                                                    </td>
                                                    <td>
                                                      {" "}
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.expense_type}
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      {" "}
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.amount}
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      {" "}
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.date}
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        {" "}
                                                        <button
                                                          style={{
                                                            marginLeft: "10px",
                                                            marginRight: "10px",
                                                            width: "70px",
                                                            height: "35px",
                                                            backgroundColor:
                                                              "white",
                                                            boxShadow:
                                                              "5px 7px #888888",
                                                          }}
                                                          type="button"
                                                          className="btn btn-grey text"
                                                          onClick={() => {
                                                            if (
                                                              confirm(
                                                                "Do you want to dalete  ? =>" +
                                                                item.expense_type
                                                              ) == true
                                                            ) {
                                                              expense_vehicle(
                                                                item.id,
                                                                item.expense_type
                                                              );
                                                            } else {
                                                            }
                                                          }}
                                                        >
                                                          <i className="fa fa-trash"></i>
                                                        </button>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                          </>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          </Col>

                          <Col lg="6" md="12" sm="12">
                            <div>
                              <Card
                                className="shadow bg-white rounded"
                                style={{
                                  overflow: "scrollX",
                                  overflowY: "hidden",
                                }}
                              >
                                <CardTitle>
                                  <div
                                    style={{
                                      // textDecoration: "underline",
                                      display: "flex",
                                      // fontWeight: "700",
                                      paddingLeft: "16px",
                                      paddingTop: "8px",
                                      paddingBottom: "2px",
                                      color: "Black",
                                      fontSize: "17px",
                                      fontFamily: "arial, sans-serif",
                                    }}
                                  >
                                    <button
                                      style={{
                                        color: "#0d6efd",
                                        position: "absolute",
                                        display: "flex",
                                        right: "1rem",
                                        fontFamily: "arial, sans-serif",
                                        backgroundColor: "white",
                                      }}
                                      type="button"
                                      className="btn btn- btn btn-light btn-rounded btn-sm fw-bold"
                                      data-mdb-ripple-color="dark"
                                    >
                                      {" "}
                                      <i
                                        style={{
                                          color: "black",
                                          opacity: "0.6",
                                          fontSize: "20px",
                                          transform: "translateY(-17%)",
                                        }}
                                        className="las la-user-edit"
                                      ></i>
                                      Edit
                                    </button>
                                    Meter History
                                  </div>
                                </CardTitle>
                                <CardBody>
                                  <div>
                                    <table
                                      className="table table-borderless table table-hover"
                                      style={{
                                        fontFamily: "arial, sans-serif",
                                      }}
                                    >
                                      <thead style={{ color: "black" }}>
                                        <tr
                                          className=""
                                          style={{ paddingLeft: "10px" }}
                                        >
                                          <th>
                                            {" "}
                                            <input
                                              type="checkbox"
                                              className="form-check-input"
                                              name="allSelect"
                                            // checked={!users.some((user) => user?.isChecked !== true)}
                                            // onChange={handleChange}
                                            />
                                            All Select
                                          </th>
                                          <th>Primary Meter</th>
                                          <th>Booking date & Time</th>
                                          <th>Action</th>
                                          {/* <th>Time</th> */}
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {" "}
                                        {get_meter_data.length == 0 ? (
                                          <span>No data found</span>
                                        ) : (
                                          <>
                                            <tbody></tbody>
                                            <div className="form-check"></div>
                                            {get_meter_data.map(
                                              (item, index) => {
                                                return (
                                                  <tr key={index}>
                                                    {/* <td>{item.vehicle_reg_no}</td> */}
                                                    <td>
                                                      {" "}
                                                      <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value=""
                                                        id="flexCheckDefault"
                                                      ></input>
                                                    </td>
                                                    <td>
                                                      {" "}
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {item.primary_meter}
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    {/*                                                   
                                                  <td>{item.amount}</td> */}
                                                    <td>
                                                      {" "}
                                                      <div className="d-flex align-items-center">
                                                        <div className="ms-0.5">
                                                          <p className="">
                                                            {
                                                              item.booking_date_time
                                                            }
                                                          </p>
                                                          {/* {item.reported_date} */}
                                                        </div>
                                                      </div>
                                                    </td>
                                                    <td>
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          flexDirection: "row",
                                                        }}
                                                      >
                                                        {" "}
                                                        <button
                                                          style={{
                                                            marginLeft: "10px",
                                                            marginRight: "10px",
                                                            width: "70px",
                                                            height: "35px",
                                                            backgroundColor:
                                                              "white",
                                                            boxShadow:
                                                              "5px 7px #888888",
                                                          }}
                                                          type="button"
                                                          className="btn btn-grey text"
                                                          onClick={() => {
                                                            if (
                                                              confirm(
                                                                "Do you want to dalete  ? =>" +
                                                                item.primary_meter
                                                              ) == true
                                                            ) {
                                                              meter_vehicle(
                                                                item.id,
                                                                item.primary_meter
                                                              );
                                                            } else {
                                                            }
                                                          }}
                                                        >
                                                          <i className="fa fa-trash"></i>
                                                        </button>
                                                      </div>
                                                    </td>
                                                  </tr>
                                                );
                                              }
                                            )}
                                          </>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </CardBody>
                              </Card>
                            </div>
                          </Col>
                        </Row>
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="2">
                  <Row>
                    {/* <Col sm="12">
                      <CardText className="mb-0">
                        <Row> */}
                          <Col lg={12} md={12} sm={12} xs={12}>
                            {/* <div> */}
                              <Card className="shadow bg-white rounded">
                                {/* <CardTitle>
                                  <div>Trip Details</div>
                                </CardTitle>
                                <CardBody> */}
                                  <div><AddVehicleEngine /></div>
                                {/* </CardBody> */}
                              </Card>
                            {/* </div> */}
                          </Col>
                        {/* </Row> */}
                      {/* </CardText> */}
                    {/* </Col> */}
                  </Row>
                </TabPane>

                <TabPane tabId="3">
                  <Row>
                    {/* <Col sm="12">
                      <CardText className="mb-0">
                        <Row> */}
                          <Col lg={12} md={12} sm={12} xs={12}>
                            {/* <div> */}
                              <Card className="shadow bg-white rounded">
                                {/* <CardTitle>
                                  <div>Trip Details</div>
                                </CardTitle>
                                <CardBody> */}
                                  <div><AddVehicleDimension /></div>
                                {/* </CardBody> */}
                              </Card>
                            {/* </div> */}
                          </Col>
                        {/* </Row> */}
                      {/* </CardText> */}
                    {/* </Col> */}
                  </Row>
                </TabPane>

                <TabPane tabId="4">
                  <Row>
                    {/* <Col sm="12">
                      <CardText className="mb-0">
                        <Row> */}
                          <Col lg={12} md={12} sm={12} xs={12}>
                            {/* <div> */}
                              <Card className="shadow bg-white rounded">
                                {/* <CardTitle>
                                  <div>Trip Details</div>
                                </CardTitle>
                                <CardBody> */}
                                  <div><AddVehicleTransmission /></div>
                                {/* </CardBody> */}
                              </Card>
                            {/* </div> */}
                          </Col>
                        {/* </Row> */}
                      {/* </CardText> */}
                    {/* </Col> */}
                  </Row>
                </TabPane>

                <TabPane tabId="5">
                  <Row>
                    {/* <Col sm="12">
                      <CardText className="mb-0">
                        <Row> */}
                          <Col lg={12} md={12} sm={12} xs={12}>
                            {/* <div> */}
                              <Card className="shadow bg-white rounded">
                                {/* <CardTitle>
                                  <div>Trip Details</div>
                                </CardTitle>
                                <CardBody> */}
                                  <div><AddVehicleWheel /></div>
                                {/* </CardBody> */}
                              </Card>
                            {/* </div> */}
                          </Col>
                        {/* </Row> */}
                      {/* </CardText> */}
                    {/* </Col> */}
                  </Row>
                </TabPane>

                <TabPane tabId="6">
                  <Row>
                    {/* <Col sm="12">
                      <CardText className="mb-0">
                        <Row> */}
                          <Col lg={12} md={12} sm={12} xs={12}>
                            {/* <div> */}
                              <Card className="shadow bg-white rounded">
                                {/* <CardTitle>
                                  <div>Trip Details</div>
                                </CardTitle>
                                <CardBody> */}
                                  <div><AddVehicleInspection /></div>
                                {/* </CardBody> */}
                              </Card>
                            {/* </div> */}
                          </Col>
                        {/* </Row> */}
                      {/* </CardText> */}
                    {/* </Col> */}
                  </Row>
                </TabPane>

                
                <TabPane tabId="7">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        <Row>
                          <Col lg={12} md={12} sm={12} xs={12}>
                            <div>
                              <Card className="shadow bg-white rounded">
                                <CardTitle>
                                  <div>Vehicle Details</div>
                                </CardTitle>
                                <CardBody>
                                  <div>Body of the card</div>
                                </CardBody>
                              </Card>
                            </div>
                          </Col>
                        </Row>
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tabId="8">
                  <Row>
                    <Col sm="12">
                      <CardText className="mb-0">
                        {/* <AllRunsheet /> */}
                        <div>Runsheet</div>
                      </CardText>
                    </Col>
                  </Row>
                </TabPane>

              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ModelTabs;
