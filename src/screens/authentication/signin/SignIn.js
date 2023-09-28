import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
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
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  setLoginID,
  setRefreshToken,
  setUserDetails,
  setUsername,
  setUserPermission,
} from "../../../store/authentication/Authentication";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setNavigationList,
  setPermission,
} from "../../../store/permissions/Permissions";
import {
  setManifestTab,
  setRunsheetTab,
} from "../../../store/parentFilter/ParentFilter";
import { setEAccessToken, setBusinesssAccessToken, setOrgs } from "../../../store/ewayBill/EwayBill";
import { setShowAlert, setDataExist, setAlertType } from "../../../store/alert/Alert";

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

  const userData = useSelector((state) => state.authentication.userdetails);
  const e_acess_token = useSelector((state) => state.eway_bill.e_access_token);

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

  const step_1 = () => {
    axios
      .post(
        "https://dev.api.easywaybill.in/ezewb/v1/auth/initlogin",

        {
          userid: "test.easywaybill@gmail.com",
          password: "Abcd@12345",
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log("response-------eway bill step 1", response.data.response);
        // console.log("token", response.data);
        dispatch(setEAccessToken(response.data.response.token));
        dispatch(setOrgs(response.data.response.orgs));
      })
      .catch((error) => {
        alert(`Error Happen while login  with eway bill ${error}`);
      });
  };

  const business_token = () => {
    alert()
    axios
      .post(
        "https://dev.api.easywaybill.in/ezewb/v1/auth/completelogin",
        {
          token: `${e_acess_token}`,
          orgid: "4",
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // console.log("responseblogin", response.data);
        // console.log("token", response.data.response.token);
        dispatch(setBusinesssAccessToken(response.data.response.token));
      })
      .catch((error) => {
        alert(error)
        dispatch(setShowAlert(true));
        dispatch(setDataExist(`Eway Bill Server Is Currently Down`));
        dispatch(setAlertType("danger"));
      });
  };


  useEffect(() => {
    // step_1();
  }, [])


  // useEffect(() => {
  //   if (!e_acess_token) {
  //     alert()
  //     // business_token();
  //   }
  // }, [e_acess_token])



  const getUserDetails = (usern, passw, accessToken) => {
    axios
      .get(ServerAddress + "ems/get_user_details/?username=" + usern, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((resp) => {
        dispatch(setUserDetails(resp.data));
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
        // console.log("sign in resp", response);
        dispatch(setUsername(username));
        if (response.status === 200) {
          // setusername(username);

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


  useLayoutEffect(() => {
    if (userpermission?.length > 0 &&
      userData &&
      userData.is_superuser === false) {
      let navigation_list = [];
      
        // Ems
        let ems = [];

        let ems_data = userpermission.find(({ sub_model }) => sub_model === "Login Details");
        if (ems_data.sub_model === "Login Details" && ems_data.read === true) {
          ems.push(["Login Details", "/ems/logindetails"]);
        }

        let user = userpermission.find(({ sub_model }) => sub_model === "Users");
        if (user.sub_model === "Users" && user.read === true) {
          ems.push(["Users", "/ems/users"]);
        }

        if (ems.length > 0) {
          navigation_list.push({
            id: 7,
            dropdown: "EMS",
            dropdownMenu: ems,
            trigger: false,
          });
        }

        // eWay Bill
        let eway = [];

        let eway_bill = userpermission.find(({ sub_model }) => sub_model === "eWaybill");
        if (eway_bill.sub_model === "eWaybill" && eway_bill.read === true) {
          eway.push(["DocketWithEwayBill", "/ewaybill/docketEwayBill"]);
          eway.push(["Eway Dashboard", "/ewaybill/dashboard"]);
        }
        if (eway.length > 0) {
          navigation_list.push({
            id: 8,
            dropdown: "EwayBill",
            dropdownMenu: eway,
            trigger: false,
          });
        }

        // Master
        let master = [];

        let d = userpermission.find(
          ({ sub_model }) => sub_model === "Commodity"
        );
        if (d.sub_model === "Commodity" && d.read === true) {
          master.push(["Commodities", "/master/commodities"]);
        }
        let e = userpermission.find(({ sub_model }) => sub_model === "Charges");
        if (e.sub_model === "Charges" && e.read === true) {
          master.push(["Charges", "/master/charges"]);
        }
        let f = userpermission.find(({ sub_model }) => sub_model === "Bill To");
        if (f.sub_model === "Bill To" && f.read === true) {
          master.push(["Bill To", "/master/billtos"]);
        }
        
        let c = userpermission.find(({ sub_model }) => sub_model === "Branch");
        if (c.sub_model === "Branch" && c.read === true) {
          master.push(["Branches", "/master/branches"]);
        }
        // let g = userpermission.find(
        //   ({ sub_model }) => sub_model === "Shipper/Consignee"
        // );
        // if (g.sub_model === "Shipper/Consignee" && g.read === true) {
        //   master.push(["Shipper/Consignee", "/master/orderorigins"]);
        // }
        let h = userpermission.find(
          ({ sub_model }) => sub_model === "Locations"
        );
        if (h.sub_model === "Locations" && h.read === true) {
          master.push(["Locations", "/master/locations"]);
        }
        let i = userpermission.find(({ sub_model }) => sub_model === "Asset");
        if (i.sub_model === "Asset" && i.read === true) {
          master.push(["Assets", "/master/assets"]);
        }
        let j = userpermission.find(({ sub_model }) => sub_model === "Routes");
        if (j.sub_model === "Routes" && j.read === true) {
          master.push(["Routes", "/master/routes"]);
        }
        let k = userpermission.find(({ sub_model }) => sub_model === "Vendor");
        if (k.sub_model === "Vendor" && k.read === true) {
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
        // Order
        let booking = [];

        let a = userpermission.find(({ sub_model }) => sub_model === "Order");
        if (a.sub_model === "Order" && a.read === true) {
          booking.push(["Orders", "/booking/orders"]);
        }
        let issue = userpermission.find(({ sub_model }) => sub_model === "Docket Issues");
        if (issue.sub_model === "Docket Issues" && issue.read === true) {
          booking.push(["Docket Issues", "/booking/docketIssue/DocketIssue"]);
        }
        let info = userpermission.find(({ sub_model }) => sub_model === "Delivery Info");
        if (info.sub_model === "Delivery Info" && info.read === true) {
          booking.push(["Delivery Info", "/booking/deliveryinfo"]);
        }
        if (booking.length > 0) {
          navigation_list.push({
            id: 5,
            dropdown: "Booking",
            dropdownMenu: booking,
            trigger: false,
          });
        }
        
        // Manifest
        let manifest = [];
        let mani = userpermission.find(
          ({ sub_model }) => sub_model === "Panding For Dispatch"
        );
        if (mani.sub_model === "Panding For Dispatch" && mani.read === true) {
          manifest.push([
            "Pending For Dispatch",
            "/manifest/pendingfordispatch",
          ]);
        }
        let depart = userpermission.find(
          ({ sub_model }) => sub_model === "Panding To Depart"
        );
        if (depart.sub_model === "Panding To Depart" && depart.read === true) {
          manifest.push(["Pending To Depart", "/manifest/pendingtodepart"]);
        }
        let raugh = userpermission.find(
          ({ sub_model }) => sub_model === "Raugh Manifest"
        );
        if (raugh.sub_model === "Raugh Manifest" && raugh.read === true) {
          manifest.push(["Raugh Manifest", "/manifest/roughmanifest"]);
        }
        let incoming = userpermission.find(
          ({ sub_model }) => sub_model === "Incoming Manifest"
        );
        if (
          incoming.sub_model === "Incoming Manifest" &&
          incoming.read === true
        ) {
          manifest.push(["Incoming Manifest", "/manifest/incomingmanifest"]);
        }
        let all = userpermission.find(
          ({ sub_model }) => sub_model === "All Manifest"
        );
        if (all.sub_model === "All Manifest" && all.read === true) {
          manifest.push(["All Manifest", "/manifest/allmanifest"]);
        }
        if (manifest.length > 0) {
          navigation_list.push({
            id: 7,
            dropdown: "Manifest",
            dropdownMenu: manifest,
            trigger: false,
          });
        }

        // Runsheet
        let runsheet = [];

        let p_delivery = userpermission.find(
          ({ sub_model }) => sub_model === "Pending Delivery"
        );
        if (
          p_delivery.sub_model === "Pending Delivery" &&
          p_delivery.read === true
        ) {
          runsheet.push(["Pending Delivery", "/runsheet/pendingdelivery"]);
        }
        let all_runsheet = userpermission.find(
          ({ sub_model }) => sub_model === "All Runsheet"
        );
        if (
          all_runsheet.sub_model === "All Runsheet" &&
          all_runsheet.read === true
        ) {
          runsheet.push(["All Runsheet", "/runsheet/allrunsheet"]);
        }
        if (runsheet.length > 0) {
          navigation_list.push({
            id: 6,
            dropdown: "Runsheet",
            dropdownMenu: runsheet,
            trigger: false,
          });
        }

        dispatch(setNavigationList(navigation_list));
        dispatch(setPermission(true));
      }
    
  }, [userpermission]);

  useEffect(() => {
    console.log("userData----", userData)
    if (userData && userData.is_superuser === true) {
      let navigation_list = [];
      navigation_list.push(
        // {
        //   id: 0,
        //   dropdown: "Dashboard",
        //   dropdownMenu: [["Dashboard", "/dashboard"]],
        //   trigger: false,
        // },
        {
          id: 15,
          dropdown:"WMS",
          dropdownMenu :[
            ["Warehouse","/wms/warehouse/Warehouse"],
            ["BinDetails","/wms/bindetails/BinDetails"],
            ["Outbound","/Outbound"],
            ["Inbound","/Inbound"],
            ["Inventory","/Inventory"],
          ],
          trigger:false,
        },
        {
          id: 1,
          dropdown: "Organization",
          dropdownMenu: [
          ["Organization", "/organization/organization"],
          ["Departments", "/organization/Department"],
          ["Designations", "/organization/designation"],       
          [" Holidays", "/organization/holidays/HolidayMain"],       
          ["Salary Parameter", "/organization/SalaryParameter"],       
          ["Salary Component", "/organization/SalaryComponent"],       
        ],
          trigger: false,
        },
        {  
          id: 2,
          dropdown: "HR",
          dropdownMenu: [
            ["OnBoard Employee", "/hr/onBoardEmployee/"],
            ["Employees", "/hr/Employee"],
            ["Job Advertisements", "/hr/recruitment/jobAdvertisements/JobList"],
            ["Job Applications", "/hr/recruitment/jobApplications"],
            ["Assign Work", "/"],
          ],
          trigger: false,
        },
        {
          id: 3,
          dropdown: "EMS",
          dropdownMenu: [
            ["Login Details", "/ems/logindetails"],
            ["Users", "/ems/users"],
            // ["Departments", "/ems/department"],
            // ["Designations", "/ems/designation"],
            ["Change Password", "/ems/adminChangePassword"],
            ["Attendance", "/attendance/userAttendance/AddAttendance"],
            ["Leave Apply", "/ems/leave"],
            ["Leave Tracker", "/ems/leave/leaveTracker"],
            ["PaySlip", "/ems/payroll/PaySlip"],
            ["Training", "/ems/traning/AddTraining"],
            ["Training Schedules", "/ems/traning/AddTrainingShedule"],
          ],
          trigger: false,
        },
        {
          id: 4,
          dropdown: "VMS",
          dropdownMenu: [
            ["Dashboard ","/"],
            ["Model", "/vehicleModel/Model"],
            ["Vehicle", "/vms/vehicle/vehicle"],
            // ["Engine", "/vehicleEngine/VehicleEngine"],
            // ["Dimension", "/vehicleDimension/VehicleDimension"],
            // [
            //   "Model Performance",
            //   "/VehicleModelPerformance/ModelPerformance",
            // ],
            // [
            //   "Model Fuel Economy ",
            //   "/VehicleModelFuelEconomy/AddModelFuelEconomy",
            // ],
            // ["Model Weight", "/vehicleModelWeight/AddModelWeight"],
            // ["Inspection", "/vehicleInspection/AddVehicleInspection"],
            // [
            //   "Transmission ",
            //   "/vehicleTransmission/AddVehicleTransmission",
            // ],
            // ["Wheels", "/vehicleWheels/AddVehicleWheel"],
            ["Reminders", "/"],
            ["Issues","/"],
            ["Service Vendor","/"],
            ["Service ","/"],

          ],
          trigger: false,
        },
        {
          id: 5,
          dropdown: "TRIP",
          dropdownMenu: [
            ["Dashboard", ""],
            ["Transporter", "/trip/transporter/transporter"],
            ["Hired Details", "/trip/hiredDetails/hired_details"],
            ["Tracking", "/trip/AllVehicle"],
            ["Vehicle InTransit", "/"],
          ],
          trigger: false,
        },
        {
          id: 6,
          dropdown: "Master",
          dropdownMenu: [
            ["Commodities", "/master/commodities"],
            ["Charges", "/master/charges"],
            // ["Shipper/Consignee", "/master/orderorigins"],
            ["Bill To", "/master/billtos"],
            ["Branches", "/master/branches"],
            ["Locations", "/master/locations"],
            ["Assets", "/master/assets"],
            ["Routes", "/master/routes"],
            ["Vendors", "/master/vendor/Vendor"],
            // ["Vehicle", "/master/Vehcile"],
          ],
          trigger: false,
        },
        {
          id: 7,
          dropdown: "Accounts",
          dropdownMenu: [
            ["Ledgers", "/account/ledger"],
            ["Voucher", "/accounts/voucher/Voucher"], 
           
          ],
          trigger: false,
        },
        {
          id: 8,
          dropdown: "Finance",
          dropdownMenu: [
            ["Loan", "/finance/Loan"],
            ["Card Master", "/finance/cardmaster/CardMaster"],
            ["Advances", "/finance/advances/Advance"],
            ["Expenses", "/finance/expenses/Expense"],
            ["Bank Account Master", "/finance/bankaccountmaster/BankAccountMaster"],
            ["Account Sub-Group Master", "/finance/accountsubgroupmaster/AccountSubGroupMaster"],
            ["Fund Master Entry", "/finance/fundmaster/FundMaster"],
          ],
          trigger: false,
        },
        {
          id: 9,
          dropdown: "EwayBill",
          dropdownMenu: [
            ["DocketWithEwayBill", "/ewaybill/docketEwayBill"],
            ["Eway Dashboard", "/ewaybill/dashboard"],
          ],
          trigger: false,
        },

        {
          id: 10,
          dropdown: "Booking",
          dropdownMenu: [
            ["Orders", "/booking/orders"],
            // ["Check Orders", "/orderCheckingPage/OrderCheckingPage"],
            ["Docket Issues", "/booking/docketIssue/DocketIssue"],
            ["Delivery Info", "/booking/deliveryinfo"],
            // ["Airport Order", "/booking/airportorder/airportorder"],

          ],
          trigger: false,
        },
        {
          id: 11,
          dropdown: "Runsheet",
          dropdownMenu: [
            ["Pending Delivery", "/runsheet/pendingdelivery"],
            ["All Runsheet", "/runsheet/allrunsheet"],
          ],
          trigger: false,
        },
        {
          id: 12,
          dropdown: "Manifest",
          dropdownMenu: [
            ["Pending For Dispatch", "/manifest/pendingfordispatch"],
            ["Hub Dispatch", "/manifest/hubvehicleforward"],
            ["Raugh Manifest", "/manifest/roughmanifest"],
            ["Pending To Depart", "/manifest/pendingtodepart"],
            ["Incoming Manifest", "/manifest/incomingmanifest"],
            ["All Manifest", "/manifest/allmanifest"],
          ],
          trigger: false,
        },
        {
          id: 13,
          dropdown: "Billing",
          dropdownMenu: [
            ["Bill Closeds", "/billing/billclosed"],
            ["Waraies", "/billing/waraies"],
            ["Invoices", "/billing/invoices"],
          ],
          trigger: false,
        },
        
        {
          id: 14,
          dropdown: "Analytics",
          dropdownMenu: [["Reports", "/analytics/reports"]],
          trigger: false,
        },
        {
          id: 15,
          dropdown: "Miscellaneous",
          dropdownMenu: [[" Notice Category", "/miscellaneous/Miscellaneous"]],
          trigger: false,
        },
      );
      dispatch(setNavigationList(navigation_list));
      dispatch(setPermission(true));
    }
  }, [userData]);

  return (
    <>
      <Helmet>
        <title> SignIn | {company_details.WebApp_Name}</title>
      </Helmet>
      <div style={{ textAlign: "right", margin: "10px", fontWeight: "600" }}>
        <p style={{ cursor: "pointer" }} onClick={() => {
          navigate("/track/trackingPage/TrackingOrder")
        }}>Track Order</p>
        {/* <Link to="/track/trackingPage/TrackingOrder">Track Order</Link> */}
      </div>
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

                      {/* <div
                        className="mt-2 text-center"
                        style={{ fontSize: "12px" }}
                      >
                        <Link to="/forgetpassword" className="text-muted">
                          <i className="mdi mdi-lock me-1" />
                          Forgot your password?
                        </Link>
                      </div> */}

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
