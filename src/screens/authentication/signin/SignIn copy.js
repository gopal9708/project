import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Form,
  Input,
  FormFeedback,
  Label,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import profile from "../../../assets/images/profile-img.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IconContext } from "react-icons";
import { Helmet } from "react-helmet";
import * as company_details from "../../../constants/CompanyDetails";
import axios from "axios";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  setLoginID,
  setRefreshToken,
  setUserDetails,
  setUserPass,
  setUsername,
  setUserPermission,
} from "../../../store/authentication/Authentication";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setCustUserPermissions,
  setNavigationList,
  setUserPermissions,
} from "../../../store/permissions/Permissions";
import {
  setManifestTab,
  setRunsheetTab,
} from "../../../store/parentFilter/ParentFilter";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [client_lat, setclient_lat] = useState("");
  const [client_long, setclient_long] = useState("");
  const [client_ip, setclient_ip] = useState("");
  const [is_mobile, setis_mobile] = useState("");
  const [os, setos] = useState("");
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  // const is_supperuser = useSelector((state) => state.authentication.userdetails);
  // console.log("is_supperuser----", is_supperuser)
  console.log("userpermission----", userpermission);
  const userpass = useSelector((state) => state.authentication.userpass);
  const [loaded, setloaded] = useState(false);
  console.log("loaded-----", loaded);
  // const remb = [userpass.username,userpass.password].every(val => Boolean(val))

  const [showPass, setshowPass] = useState(false);
  const [error, seterror] = useState(false);
  // const [remember_me, setremember_me] = useState(remb)
  const [location_allow, setlocation_allow] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter  Your Password"),
    }),
    onSubmit: (values) => {
      log_in(values.username, values.password);

      // if (location_allow === false) {
      //   alert("Please allow Your Location First"); // Need To Add Pop Modal instead
      // } else {
      //   log_in(values.username, values.password);
      // }
    },
  });

  const getData = async () => {
    const fetchIp = () => {
      axios.get("https://api.ipify.org/?format=json").then((resp) => {
        setclient_ip(resp.data.ip);
      });
    };

    navigator.geolocation.getCurrentPosition(
      function (position) {
        setlocation_allow(true);
      },
      function () {
        setlocation_allow(false);
        // alert("Please allow to access your location");
      }
    );

    fetchIp();

    getPreciseLocation();
    var x = document.getElementById("location");
    function getPreciseLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showExactPosition);
      } else {
        x.innerHTML = "Geolocation is not supported";
      }
    }
    function showExactPosition(position) {
      // x.innerHTML
      let lat_long =
        "Latitude: " +
        position.coords.latitude +
        " br Longitude: " +
        position.coords.longitude;

      setclient_lat(position.coords.latitude);
      setclient_long(position.coords.longitude);
    }
    const { mobile, platform } = window.navigator.userAgentData;

    setis_mobile(mobile);
    setos(platform);
  };

  const [first, setfirst] = useState(false);
  const setMenus = () => {
    let booking = [];
    let master = [];

    let navigation_list = [
      // {

      //   id: 4,
      //   dropdown: "Master",
      //   dropdownMenu: master
      //  [
      //   ["Commodities", "/master/commodities"],
      //   ["Charges", "/master/charges"],
      //   ["Shipper/Consignee", "/master/orderorigins"],
      //   ["Bill To", "/master/clients"],
      //   ["Branches", "/master/branches"],
      //   ["Locations", "/master/locations"],
      //   ["Assets", "/master/assets"],
      //   ["Routes", "/master/routes"],
      //   ["Vendors", "/master/vendor/Vendor"],
      // ]
      //   ,
      //   trigger: false,
      // },
      // {
      //   id: 0,
      //   dropdown: "Dashboard",
      //   dropdownMenu: [["Dashboard", "/dashboard"]],
      //   trigger: false,
      // },
      {
        id: 1,
        dropdown: "EMS",
        dropdownMenu: [
          ["Login Details", "/ems/logindetails"],
          ["Users", "/ems/users"],
        ],
        trigger: false,
      },
      {
        id: 2,
        dropdown: "VMS",
        dropdownMenu: [
          ["Vehicle Model", "/vehicleModel/Model"],
          ["Vehicle Engine", "/vehicleEngine/AddVehicleEngine"],
          ["Vehicle Dimension", "/vehicleDimension/AddVehicleDimension"],
          [
            "Vehicle Model Performance",
            "/VehicleModelPerformance/AddModelPerformance",
          ],
          [
            "Vehicle Model Fuel Economy ",
            "/VehicleModelFuelEconomy/AddModelFuelEconomy",
          ],
          ["Vehicle Model Weight", "/vehicleModelWeight/AddModelWeight"],
          ["Vehicle Inspection", "/vehicleInspection/AddVehicleInspection"],
          [
            "Vehicle Transmission ",
            "/vehicleTransmission/AddVehicleTransmission",
          ],
          ["Vehicle Wheels", "/vehicleWheels/AddVehicleWheel"],
          ["Vehicle", "/Vehicle/Vehicle"],
        ],
        trigger: false,
      },
      {
        id: 3,
        dropdown: "Trip",
        dropdownMenu: [
          ["Transporter", "/transporter/Transporter"],
          ["Hired", "/hiredDetails/HiredDetails"],
        ],
        trigger: false,
      },

      // {

      //   id: 4,
      //   dropdown: "Master",
      //   dropdownMenu: master
      //  [
      //   ["Commodities", "/master/commodities"],
      //   ["Charges", "/master/charges"],
      //   ["Shipper/Consignee", "/master/orderorigins"],
      //   ["Bill To", "/master/clients"],
      //   ["Branches", "/master/branches"],
      //   ["Locations", "/master/locations"],
      //   ["Assets", "/master/assets"],
      //   ["Routes", "/master/routes"],
      //   ["Vendors", "/master/vendor/Vendor"],
      // ]
      //   ,
      //   trigger: false,
      // },

      // {
      //   id: 5,
      //   dropdown: "Booking",
      //   dropdownMenu: booking,
      //   trigger: false,
      // },
      {
        id: 6,
        dropdown: "Runsheet",
        dropdownMenu: [
          ["Pending Delivery", "/runsheet/pendingdelivery"],
          ["All Runsheet", "/runsheet/allrunsheet"],
        ],
        trigger: false,
      },
      {
        id: 7,
        dropdown: "Manifest",
        dropdownMenu: [
          ["Pending For Dispatch", "/manifest/pendingfordispatch"],
          ["Rough Manifest", "/manifest/roughmanifest"],
          ["Pending To Depart", "/manifest/pendingtodepart"],
          ["Incoming Manifest", "/manifest/incomingmanifest"],
          ["AllManifest", "/manifest/allmanifest"],
        ],
        trigger: false,
      },
      {
        id: 8,
        dropdown: "Billing",
        dropdownMenu: [
          ["Bill Closeds", "/billing/billclosed"],
          ["Waraies", "/billing/waraies"],
          ["Invoices", "/billing/invoices"],
        ],
        trigger: false,
      },
    ];

    console.log("user_permissions-----", userpermission);

    if (userpermission.length > 0) {
      alert("false");
      // Order
      if (
        userpermission.some((e) => e.sub_model === "Order" && e.read === true)
      ) {
        booking.push(["Orders", "/booking/orders"]);
      }
      if (booking.length > 0) {
        navigation_list.push({
          id: 5,
          dropdown: "Booking",
          dropdownMenu: booking,
          trigger: false,
        });
      }

      // Master
      if (
        userpermission.some((e) => e.sub_model === "Branch" && e.read === true)
      ) {
        master.push(["Branches", "/master/branches"]);
      }
      if (
        userpermission.some(
          (e) => e.sub_model === "Commodity" && e.read === true
        )
      ) {
        master.push(["Commodities", "/master/commodities"]);
      }
      if (
        userpermission.some((e) => e.sub_model === "Charges" && e.read === true)
      ) {
        master.push(["Charges", "/master/charges"]);
      }
      if (
        userpermission.some((e) => e.sub_model === "Bill To" && e.read === true)
      ) {
        master.push(["Bill To", "/master/clients"]);
      }
      if (
        userpermission.some(
          (e) => e.sub_model === "Shipper/Consignee" && e.read === true
        )
      ) {
        master.push(["Shipper/Consignee", "/master/orderorigins"]);
      }
      if (
        userpermission.some(
          (e) => e.sub_model === "Locations" && e.read === true
        )
      ) {
        master.push(["Locations", "/master/locations"]);
      }
      if (
        userpermission.some((e) => e.sub_model === "Asset" && e.read === true)
      ) {
        master.push(["Assets", "/master/assets"]);
      }
      if (
        userpermission.some((e) => e.sub_model === "Routes" && e.read === true)
      ) {
        master.push(["Routes", "/master/routes"]);
      }
      if (
        userpermission.some((e) => e.sub_model === "Vendoes" && e.read === true)
      ) {
        master.push(["Vendors", "/master/vendor/Vendor"]);
      }

      if (master.length > 0) {
        navigation_list.push({
          id: 4,
          dropdown: "Master",
          dropdownMenu: master,
          trigger: false,
        });
      }
    }
    // else{
    //   alert("true")
    //   navigation_list.push(
    //     {
    //     id: 4,
    //     dropdown: "Master",
    //     dropdownMenu:
    //      [
    //       ["Commodities", "/master/commodities"],
    //       ["Charges", "/master/charges"],
    //       ["Shipper/Consignee", "/master/orderorigins"],
    //       ["Bill To", "/master/clients"],
    //       ["Branches", "/master/branches"],
    //       ["Locations", "/master/locations"],
    //       ["Assets", "/master/assets"],
    //       ["Routes", "/master/routes"],
    //       ["Vendors", "/master/vendor/Vendor"],
    //     ]
    //     ,
    //     trigger: false,
    //   },)
    // }

    // if(master.sub_model === "charge name" && order.read === true){
    //   master.push(["Charges", "/master/charges"])
    // }
    // if(master.sub_model === "Client" && order.read === true){
    //   master.push(["Bill To", "/master/clients"])
    // }
    // if(master.sub_model === "locations" && order.read === true){
    //   master.push(["Locations", "/master/locations"])
    // }
    // if(master.sub_model === "Commodity" && order.read === true){
    //   master.push(["Commodities", "/master/commodities"])
    // }

    let dashboards_drp_menu = [];
    let analytics_drp_menu = [];
    let bookings_drp_menu = [];
    let billings_drp_menu = [];
    let manifests_drp_menu = [];
    let runsheets_drp_menu = [];
    let masters_drp_menu = [];
    let vms_drp_menu = [];
    let ems_drp_menu = [];

    // if (user_permissions.length > 0) {
    // Masters--------
    // if (user_permissions.includes("Can view asset_info")) {
    //   masters_drp_menu.push(["Asset", "/master/Asset_Info/Asset"])
    // }

    // if (user_permissions.includes("Can view Branch")) {
    //   masters_drp_menu.push(["Branches", "/master/branches/branches"])
    // }

    // if (user_permissions.includes("Can view charge name")) {
    //   masters_drp_menu.push(["Charges", "/master/charges/charges"])
    // }

    // if (user_permissions.includes("Can view Client")) {
    //   masters_drp_menu.push(["Clients", "/master/client/client"])
    // }

    // if (user_permissions.includes("Can view coloader")) {
    //   masters_drp_menu.push(["Coloader", "/master/coloader/coloader"])
    // }

    // if (user_permissions.includes("Can view Commodity")) {
    //   masters_drp_menu.push(["Commodities", "/master/commodities"]);
    // }

    // if (user_permissions.includes("Can view locations")) {
    //   masters_drp_menu.push(["Locations", "/master/locations/locations"]);
    // }
    // if (masters_drp_menu.length > 0) {
    //   navigation_list.push({
    //     id: 7,
    //     dropdown: "Masters",
    //     dropdownMenu: masters_drp_menu,
    //     trigger: false,
    //   });
    // }

    // Bookings--------
    //   if (user_permissions.includes("Can view Create Order")) {
    //     bookings_drp_menu.push(["Orders", "/bookings/orders/orders"])
    //   }

    //   if (user_permissions.includes("Can view docket issues")) {
    //     bookings_drp_menu.push(["Issues Dockets", "/bookings/issues_dockets/issues_dockets"])
    //   }

    //   if (bookings_drp_menu.length > 0) {
    //     navigation_list.push(
    //       {
    //         id: 3,
    //         dropdown: "Bookings",
    //         dropdownMenu: bookings_drp_menu,
    //         trigger: false,
    //       },)
    //   }

    //   // Billings--------
    //   if (user_permissions.includes("Can view warai charges")) {

    //     billings_drp_menu.push(["Overview", "/billing/overview"])
    //     billings_drp_menu.push(["Invoices", "/billing/invoices"])
    //     billings_drp_menu.push(["Bill Closed", "/billing/bill_closed/bill_closed"])
    //     billings_drp_menu.push(["Warai", "/billing/warai/warai"])
    //   }

    //   // if (user_permissions.includes("Can view Invoices ")) {
    //   //   billings_drp_menu.push(["Invoices", "/billing/invoices"])

    //   // }

    //   if (billings_drp_menu.length > 0) {
    //     navigation_list.push(
    //       {
    //         id: 4,
    //         dropdown: "Billings",
    //         dropdownMenu: billings_drp_menu,
    //         trigger: false,
    //       },)
    //   }

    //   // Manifests--------
    //   if (user_permissions.includes("Can view manifest")) {
    //     manifests_drp_menu.push(["All-Manifests", "/manifests/all-manifest"])
    //     manifests_drp_menu.push(["Pending For Dispatch", "/manifests/pending-for-dispatch"])
    //     manifests_drp_menu.push(["Pending To Depart", "/manifests/pending-to-depart"])
    //     manifests_drp_menu.push(["Rough Manifests", "/manifests/rough-manifest"])
    //     manifests_drp_menu.push(["Incoming Manifests", "/manifests/incoming-manifest"])
    //   }

    //   if (manifests_drp_menu.length > 0) {
    //     navigation_list.push(
    //       {
    //         id: 5,
    //         dropdown: "Manifests",
    //         dropdownMenu: manifests_drp_menu,
    //         trigger: false,
    //       },)
    //   }

    //   // Runsheets--------------

    //   if (user_permissions.includes("Can view runsheet")) {
    //     runsheets_drp_menu.push(["All-Runsheets", "/runsheet/all-runsheet"])
    //     runsheets_drp_menu.push(["Pending Delivery", "/runsheet/pending-delivery"])
    //   }

    //   if (runsheets_drp_menu.length > 0) {
    //     navigation_list.push(
    //       {
    //         id: 6,
    //         dropdown: "Runsheets",
    //         dropdownMenu: runsheets_drp_menu,
    //         trigger: false,
    //       },)
    //   }

    //   //VMS
    //   navigation_list.push(
    //       {
    //     id: 12,
    //     dropdown: "VMS",
    //     dropdownMenu: [
    //       ["Vehicles", "/vms/vehicle"],
    //       // ["Vehicles Maintainances", "/vms/vehicle_maintainance"],
    //     ],
    //     trigger: false,
    //   }
    //   )

    //   // Trip
    //   navigation_list.push(
    //     {
    //   id: 11,
    //   dropdown: "Trip",
    //   dropdownMenu: [
    //     ["Transporter", "/Transporter_details/Transporter"],
    //     ["Hired Details", "/Hired_Details/Hired_Details"],
    //     ["Trip Details", "/Trip_Details/Trip_Details"],
    //   ],
    //   trigger: false,
    // }
    //   )

    // EMS-----------------
    // if (user_permissions.includes("Can view login details")) {
    //   ems_drp_menu.push(["Login Details", "/ems/logindetails"])
    // }

    // if (user_permissions.includes("Can view Users")) {
    //   ems_drp_menu.push(["Users", "/Ems/User/Users"]);
    // }

    // if (user_permissions.includes("Can view attendance")) {
    //   ems_drp_menu.push(["Attendance", "/Ems/Attendence/Attendence"])
    // }

    // if (user_permissions.includes("Can view leave")) {
    //   ems_drp_menu.push(["Leave Apply", "/Ems/Leave_apply/Leave_apply"])
    // }
    //   if (ems_drp_menu.length > 0) {
    //     navigation_list.push({
    //       id: 9,
    //       dropdown: "EMS",
    //       dropdownMenu: ems_drp_menu,
    //       trigger: false,
    //     });
    //   }
    // }

    dispatch(setNavigationList(navigation_list));
  };

  const getUserDetails = (usern, passw, accessToken) => {
    axios
      .get(ServerAddress + "ems/get_user_details/?username=" + usern, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        dispatch(setUserDetails(resp.data));

        let user_permissions = [];
        if (resp.data.user_permissions.length > 0) {
          user_permissions = resp.data.user_permissions.map((v) => v.name);
        }
        dispatch(setUserPermissions(user_permissions));
      })
      .catch((err) => {
        alert(`Error Occur While Getting User Details, ${err}`);
      });
  };

  const getUserPermission = (usern, accessToken) => {
    axios
      .get(ServerAddress + "ems/get_userpermission/?username=" + usern, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        setloaded(true);
        console.log("resp-----", resp.data.permission);
        // setMenus(resp.data.permission);
        dispatch(setUserPermission(resp.data.permission));
      })
      .catch((err) => {
        alert(`Error Occur While Getting User Details, ${err}`);
      });
  };

  const send_login_details = (username_f, access_token_f) => {
    axios
      .post(
        ServerAddress + "ems/add_login_details/",
        {
          username: username_f,
          ip_address: client_ip,
          longitude: client_long,
          latitude: client_lat,
          os_name: os.toUpperCase(),
          is_mobile: is_mobile,
        },
        {
          headers: { Authorization: `Bearer ${access_token_f}` },
        }
      )
      .then(function (response) {
        dispatch(setLoginID(response.data.id));
      })
      .catch(function () {
        seterror(true);
      });
  };

  const log_in = (username, password) => {
    axios
      .post(ServerAddress + "ems/authentication/", {
        username: username,
        password: password,
      })
      .then(function (response) {
        if (response.status === 200) {
          dispatch(setUsername(username));
          setUsername(username);
          console.log("username----", username);
          console.log("response.data.access----", response.data.access);
          send_login_details(username, response.data.access);
          if (response.data.first_login === "True") {
            navigate("/resetpassword");
          } else {
            getUserDetails(username, password, response.data.access);
            getUserPermission(username, response.data.access);
          }
          dispatch(setAccessToken(response.data.access));
          dispatch(setRefreshToken(response.data.refresh));
        }
      })
      .catch(function (error) {
        seterror(true);
      });
  };

  useLayoutEffect(() => {
    getData();
    dispatch(setManifestTab(1));
    dispatch(setRunsheetTab(1));
  }, []);

  useEffect(() => {
    if (userpermission && loaded) {
      setMenus();
    }
  }, [userpermission, loaded]);

  return (
    <>
      <Helmet>
        <title> SignIn | {company_details.WebApp_Name}</title>
      </Helmet>
      <div className="account-pages my-5 pt-sm-5">
        <Container style={{ maxWidth: "810px" }}>
          <Row className="justify-content-center">
            <Col lg={6} md={6} xl={6}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to Logistic Cube.</p>
                      </div>
                    </Col>
                    <Col className="col-5">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={company_details.company_logo_square}
                            alt=""
                            // className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? (
                        <Alert
                          color="danger"
                          style={{ fontSize: "12px", padding: "6px" }}
                        >
                          Username and password are invalid. Please enter
                          correct username and password
                        </Alert>
                      ) : null}

                      <div className="mb-2">
                        <Label className="form-label">Username</Label>
                        <Input
                          style={{ fontSize: "12px" }}
                          name="username"
                          className="form-control"
                          placeholder="Enter Username"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            // validation.touched.username
                            //  &&
                            validation.errors.username ? true : false
                          }
                        />
                        {validation.touched.username &&
                        validation.errors.username ? (
                          <FormFeedback type="invalid">
                            {validation.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-2">
                        <Label className="form-label">Password</Label>

                        <InputGroup>
                          <Input
                            style={{ fontSize: "12px" }}
                            name="password"
                            value={validation.values.password || ""}
                            type={showPass ? "text" : "password"}
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />

                          <InputGroupText>
                            <IconContext.Provider
                              value={{
                                // color: "blue",
                                size: 16,
                              }}
                            >
                              <div
                                onClick={() => {
                                  setshowPass(!showPass);
                                }}
                              >
                                {showPass ? (
                                  <FaEyeSlash style={{ size: 30 }} />
                                ) : (
                                  <FaEye />
                                )}
                              </div>
                            </IconContext.Provider>
                          </InputGroupText>
                        </InputGroup>

                        <div
                          // style={{ fontSize: 10, color: "#F46A6A" }}

                          className="mt-1 error-text"
                          color="danger"
                        >
                          {validation.touched.password &&
                          validation.errors.password
                            ? "Please Enter Your Password"
                            : null}
                        </div>

                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                          // onClick={()=>{
                          //    setremember_me(!remember_me)
                          //   }}
                          readOnly={true}
                          // checked={remember_me}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                          style={{ fontSize: "12px" }}
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                          disabled={
                            validation.values.username === "" ||
                            validation.values.password === ""
                          }
                        >
                          Log In
                        </button>
                      </div>

                      <div
                        className="mt-2 text-center"
                        style={{ fontSize: "12px" }}
                      >
                        <Link to="/forget_password" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div>

                      <div
                        className="mt-2 text-center"
                        style={{ fontSize: "12px" }}
                      >
                        <Link to="/resetpassword" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Reset your password?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default SignIn;
