import React, { useState, useLayoutEffect, useEffect } from "react";
import "../../assets/scss/forms/form.scss";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import {
  Card,
  Col,
  Row,
  CardBody,
  CardTitle,
  Label,
  Form,
  Input,
  Button,
  FormGroup,
} from "reactstrap";
// import {
//   runsheetId,
//   setActive_rn_no,
//   setFRN_Id_List,
//   setORN_Id_List,
//   setPdOrders,
//   setRnOrders,
//   setRN_Del_Id_List,
// } from "../../store/Runsheet/Change_Runsheets/actions";
// import Add_Docket from "./Add_Another_Docket/Add_Docket";
import SearchInput from "../../components/formComponent/searchInput/SearchInput";
import toTitleCase from "../../lib/titleCase/TitleCase";
import DocketInfo from "./DocketInfo";
import PageTitle from "../../components/pageTitle/PageTitle";
import Title from "../../components/title/Title";
import AddDocket from "./AddDocket";
import { ServerAddress } from "../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../store/alert/Alert";
import { gstin_no } from "../../constants/CompanyDetails";
import UpateEwaybillPartB from "../authentication/signin/UpateEwaybillPartB";
import ImgModal from "../../components/crop/ImgModal";
import Loader from "../../components/loader/Loader";

const ChangedRusheet = () => {
  const dispatch = useDispatch();
  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);
  const userDetail = useSelector((state) => state.authentication.userdetails);
  const success = useSelector((state) => state.alert.show_alert);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [isupdating, setisupdating] = useState(false);
  const navigate = useNavigate();
  const [runsheet, setrunsheet] = useState([]);
  // console.log("runsheet-------", runsheet)
  const [runsheet_orders, setrunsheet_orders] = useState([])
  //Vehicle

  const [contract_based_vehicle_no, setcontract_based_vehicle_no] = useState("");
  const [vehicle_error, setvehicle_error] = useState(false)
  const [contract_based_vehicle_list, setcontract_based_vehicle_list] = useState([])
  const [contract_based_vehicle_id, setcontract_based_vehicle_id] = useState("")
  const [search_setcontract_based_vehicle, setsearch_setcontract_based_vehicle] = useState("")
  const [vehicle_loaded, setvehicle_loaded] = useState(false)
  const [vehicle_count, setvehicle_count] = useState(1)
  const [vehicle_bottom, setvehicle_bottom] = useState(103)
  const [vehicle_page, setvehicle_page] = useState(1)

  // const [vehicle_type_list, setvehicle_type_list] = useState([]);
  // const [vehicle_type, setvehicle_type] = useState(vehicle_type_list[0]);
  // const [search_vehicle_type, setsearch_vehicle_type] = useState("");

  // Runsheet No
  const [runsheet_no, setrunsheet_no] = useState("");

  // Delivery Staff
  const [delivery_staff, setdelivery_staff] = useState("")

  //Driver
  const [driver_list, setdriver_list] = useState([]);
  const [driver_name, setdriver_name] = useState("");
  const [driver_id, setdriver_id] = useState(0);
  const [search_driver_name, setsearch_driver_name] = useState("");
  const [driver_count, setdriver_count] = useState(1)
  const [driver_page, setdriver_page] = useState(1)
  const [driver_bottom, setdriver_bottom] = useState(103)
  const [driver_loaded, setdriver_loaded] = useState(false)

  const [delivery_staff_phone, setdelivery_staff_phone] = useState("");

  //Route
  const [route_list, setroute_list] = useState([]);
  const [defined_route_name, setdefined_route_name] = useState("")
  const [route_id, setroute_id] = useState("");
  const [search_route, setsearch_route] = useState("");
  const [route_loaded, setroute_loaded] = useState(false)
  const [route_count, setroute_count] = useState(1)
  const [route_bottom, setroute_bottom] = useState(103)
  const [route_page, setroute_page] = useState(1)

  const [route, setroute] = useState("");
  //Vehicle
  const [vehicle_no, setvehicle_no] = useState("");

  //Circle Toogle Btn
  const [circle_btn, setcircle_btn] = useState(true);
  const [circle_btn1, setcircle_btn1] = useState(true);

  const toggle_circle = () => {
    setcircle_btn(!circle_btn);
  };

  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };
  //For Pod Image
  const [modal, setmodal] = useState(false);
  const [uploaded_img, setuploaded_img] = useState("");
  const [result_img, setresult_img] = useState("")
  console.log("result image =====", result_img);

  //Get Driver Name
  const getDrivers = () => {
    let driver_lists = []
    axios
      .get(
        ServerAddress +
        `ems/get_driver/?search=${search_driver_name}&p=${driver_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setdriver_loaded(false);
        } else {
          setdriver_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (driver_page === 1) {
            driver_lists = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.username),
            ]);
          } else {
            driver_lists = [
              ...driver_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.username)]),
            ];
          }
          setdriver_count(driver_count + 2);
          setdriver_list(driver_lists);
        }
        else {
          setdriver_list([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };

  const getRoutes = () => {
    let route_lists = []
    axios
      .get(
        ServerAddress +
        `master/get_routes/?search=${""}&p=${route_page}&records=${10}&name_search=${search_route}&name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setroute_loaded(false);
        } else {
          setroute_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (route_page === 1) {
            route_lists = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
            ]);
          } else {
            route_lists = [
              ...route_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.name)]),
            ];
          }
          setroute_count(route_count + 2);
          setroute_list(route_lists);
        }
        else {
          setroute_list([])
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get Data ${err}`);
      });
  };


  const getvehicles = () => {
    // let state_list = [...state_list_s];
    let vehicle_list = [];
    axios
      .get(
        ServerAddress +
        `master/all_vehcile/?search=${search_setcontract_based_vehicle}&place_id=all&filter_by=all&p=${vehicle_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        if (resp.data.next === null) {
          setvehicle_loaded(false);
        } else {
          setvehicle_loaded(true);
        }
        if (resp.data.results.length > 0) {
          if (vehicle_page === 1) {
            vehicle_list = resp.data.results.map((v) => [
              v.id,
              v.vehcile_no,
            ]);
          } else {
            vehicle_list = [
              ...contract_based_vehicle_list,
              ...resp.data.results.map((v) => [v.id, v.vehcile_no]),
            ];
          }
          setvehicle_count(vehicle_count + 2);
          setcontract_based_vehicle_list(vehicle_list);
        } else {
          setcontract_based_vehicle_list([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get States, ${err}`);
      });
  };

  // Update Runsheet
  const update_runsheet = (id) => {
    setIsLoading(true)
    let fields_names = Object.entries({
      branch_name: user.branch_nm,
      driver_name: driver_name.toUpperCase(),
      route_name: route.toUpperCase(),
      vehicle_name: vehicle_no,
      // vehicle_type: vehicle_type.toUpperCase(),
      pod_image: result_img,
    });

    let change_fields = {};

    for (let j = 0; j < fields_names.length; j++) {
      const ele = fields_names[j];
      let prev = location.state.runsheet[`${ele[0]}`];
      let new_v = ele[1];
      if (String(prev).toUpperCase() !== String(new_v).toUpperCase()) {
        change_fields[`${ele[0]}`] = new_v.toString().toUpperCase();
      }
    }
    axios
      .put(
        ServerAddress + "runsheet/update_runsheet/" + id,
        {
          change_fields: change_fields,
          image: result_img?.substring(0, 4) !== "http" ? result_img : null,
          is_defined_route: runsheet.is_defined_route,
          defined_route_name: (defined_route_name).toUpperCase(),
          branch: user.home_branch,
          branch_name: user.branch_nm,
          route: runsheet.is_defined_route ? route_id : null,
          route_name: !runsheet.is_defined_route ? (route).toUpperCase() : "",
          // vehicle_type: (vehicle_type).toUpperCase(),
          delivery_staff: delivery_staff ? toTitleCase(delivery_staff).toUpperCase() : "",
          driver_name: (driver_name).toUpperCase(),
          branch_name: user.branch_nm,
          driver: driver_id,
          vehicle_number: !runsheet.is_contract_vehicle ? (vehicle_no).toUpperCase() : "",
          // vehicle_number: vehicle_no),
          // is_contract_vehicle: is_contract_based,
          contracted_vehicle: runsheet.is_contract_vehicle ? contract_based_vehicle_id : null,
          cm_transit_status: status_toggle === true ? cm_current_status : "",
          cm_current_status: cm_current_status.toUpperCase(),
          cm_remarks: toTitleCase(message).toUpperCase(),
          delivery_staff_phone: delivery_staff_phone ? delivery_staff_phone : null,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          setIsLoading(false)
          if (list_data.length > 0) {
            UpateEwaybillPartB({
              gstin_no: gstin_no,
              Data: list_data,
              ewayTokenB: business_access_token,
              access_token: accessToken,
            });
            // EwayUpdate();
          }
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Runsheet number ${runsheet.runsheet_no} Updated sucessfully`
            )
          );
          navigate(-1);
        }
      })
      .catch((error) => {
        setIsLoading(false)
        alert(`Error While Creating Manifest ${error}`);
      });
  };

  const handleSubmit = () => {
    update_runsheet(runsheet.id);
  };

  const get_runsheetorder = (runsheet_no) => {
    axios
      .get(
        ServerAddress +
        "runsheet/get_runsheetorder/?runsheet_no=" +
        runsheet_no,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setrunsheet_orders(response.data);
      })
      .catch((err) => {
        alert(`Error Occur while Order Delivery Info, ${err}`);
      });
  };

  useEffect(() => {
    if (runsheet_no !== "") {
      get_runsheetorder(runsheet_no);
    }
  }, [runsheet_no, success]);

  useEffect(() => {
    getRoutes();
  }, [search_route, route_page]);

  useEffect(() => {
    getvehicles();
  }, [search_setcontract_based_vehicle, vehicle_page]);

  useEffect(() => {
    getDrivers();
  }, [search_driver_name, driver_page]);

  useLayoutEffect(() => {
    try {
      let runsheets = location.state.runsheet;
      setrunsheet(location.state.runsheet);
      setisupdating(true);
      setdriver_name(toTitleCase(runsheets.driver_name));
      setdriver_id(runsheets.driver);
      setresult_img(runsheets.pod_image);
      setdelivery_staff_phone(runsheets.delivery_staff_phone)
      // setvehicle_type(toTitleCase(runsheets.vehicle_type));
      setrunsheet_no(runsheets.runsheet_no);
      setdelivery_staff(toTitleCase(runsheets.delivery_staff))
      if (runsheets.is_defined_route) {
        setroute_id(runsheets.route);
        setdefined_route_name(toTitleCase(runsheets.defined_route_name))
      }
      else {
        setroute(toTitleCase(runsheets.route_name));
      }

      if (runsheets.is_contract_vehicle) {
        setcontract_based_vehicle_id(runsheets.contracted_vehicle)
        setcontract_based_vehicle_no(runsheets.contracted_vehicle_number)
      }
      else {
        setvehicle_no(runsheets.vehicle_number)
      }
    } catch (error) { }
  }, []);

  const update_runsheetstatus = (id) => {

    axios
      .put(
        ServerAddress + "runsheet/update_runsheet/" + id,
        {

          cm_current_status: "REJECTED",
          cm_remarks: toTitleCase(message).toUpperCase(),
          change_fields: {},
          pod_image: result_img,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          // dispatch(Toggle(true))
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Status Updated sucessfully`));
          dispatch(setAlertType("info"));
          navigate(-1);
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };

  //For Checker & Maker
  const [toggle_rejected, settoggle_rejected] = useState(false);
  const [message, setmessage] = useState("");
  const [message_error, setmessage_error] = useState(false);
  const [status_toggle, setstatus_toggle] = useState(false);
  const [cm_current_status, setcm_current_status] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setmessage_error(false);
  };

  useEffect(() => {
    settoggle_rejected(false);
  }, []);


  const handleSubmit2 = () => {
    if (message === "") {
      setmessage_error(true);
    } else {
      update_runsheetstatus(runsheet.id);
      setShow(false);
    }
  };

  useEffect(() => {
    if (
      user.user_department_name + " " + user.designation_name ===
      "CUSTOMER SERVICE EXECUTIVE" ||
      user.user_department_name + " " + user.designation_name ===
      "DATA ENTRY OPERATOR"
    ) {
      setcm_current_status("NOT APPROVED");
      setstatus_toggle(true);
    } else if (
      user.user_department_name + " " + user.designation_name ===
      "OPERATION MANAGER"
    ) {
      setcm_current_status("VERIFIED OPERATION MANAGER");
      setstatus_toggle(true);
    } else if (
      user.user_department_name + " " + user.designation_name ===
      "CUSTOMER SUPPORT MANAGER"
    ) {
      setcm_current_status("VERIFIED CUSTOMER SUPPORT MANAGER");
      setstatus_toggle(true);
    } else if (user.user_department_name === "ACCOUNTANT") {
      setcm_current_status("VERIFIED ACCOUNTANT");
      setstatus_toggle(true);
    } else if (
      user.user_department_name + " " + user.designation_name ===
      "ACCOUNT MANAGER"
    ) {
      setcm_current_status("VERIFIED ACCOUNT MANAGER");
      setstatus_toggle(true);
    } else if (user.user_department_name === "ADMIN" || user.is_superuser) {
      setcm_current_status("APPROVED");
      setstatus_toggle(true);
    } else {
      setcm_current_status("NOT APPROVED");
      // setstatus_toggle(false)
    }
  }, [user, isupdating]);

  const [docket_nos, setdocket_nos] = useState([])

  useEffect(() => {
    if (runsheet_orders.length > 0) {
      let data = runsheet_orders.map((v) => v.docket_no)
      console.log("data-------", data)
      setdocket_nos(data)

    }
  }, [runsheet_orders, vehicle_no, runsheet])


  //For Update Part B
  const [EwayBillData, setEwayBillData] = useState([])
  const [list_data, setlist_data] = useState([])

  const getEwayBills = (runsheet_num) => {
    axios
      .get(
        ServerAddress +
        `booking/get_all_ewaybill/?type=${"runsheet"}&value=${runsheet_num}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("resres----", res);
        if (res?.data?.length !== 0) {
          setEwayBillData(res.data);
        }
      })
      .catch((err) => {
        console.log("rerrerer", err);
      });
  };


  useEffect(() => {
    if (EwayBillData?.length > 0) {
      let li = [];
      EwayBillData?.forEach((e) => {
        console.log("ewayDate=====", e)
        let obj = {
          transMode: "1",
          fromPlace: userDetail.branch_nm,
          fromState: userDetail.branch_location_state_code,
          transDocNo: e.trans_doc_no,
          transDocDate: String(
            e.docDate.split("-")[1] +
            "/" +
            e.docDate.split("-")[2] +
            "/" +
            e.docDate.split("-")[0]
          ),
          vehicleNo: runsheet.is_contract_vehicle ? contract_based_vehicle_no : vehicle_no,
          reasonCode: "2",
          reasonRem: "text",
          userGstin: gstin_no,
          ewbNo: e.ewb_no,
        };
        li.push(obj);
      });
      setlist_data(li)
    }
    // Rest of your code...
  }, [EwayBillData, vehicle_no, contract_based_vehicle_no]);
  console.log("EwayBillData=====", EwayBillData)
  console.log("list_data===", list_data)

  useEffect(() => {
    if (runsheet_no !== "") {
      getEwayBills(runsheet_no)
    }
  }, [runsheet_no, vehicle_no, success])

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reject Resion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup>
            <Label for="exampleText">Text Area</Label>
            <Input
              id="exampleText"
              name="text"
              type="textarea"
              style={{ height: "90px" }}
              onChange={(e) => {
                setmessage(e.target.value);
              }}
            />
            <div className="mt-1 error-text" color="danger">
              {message_error ? "Please Enter Reject Resion" : null}
            </div>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleSubmit2()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          return false;
        }}
      >
        <div className="mt-3">
          <PageTitle page={"Changed Runnsheet"} />
          <Title title={"Changed Runnsheet"} parent_title="Runsheet" />
        </div>
        <div className="m-3">
          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  <div>Runsheet Info </div>

                  <IconContext.Provider
                    value={{
                      className: "header-add-icon",
                    }}
                  >
                    <div onClick={toggle_circle}>
                      {circle_btn ? (
                        <MdRemoveCircleOutline />
                      ) : (
                        <MdAddCircleOutline />
                      )}
                    </div>
                  </IconContext.Provider>
                </div>
              </CardTitle>
              {circle_btn ? (
                <CardBody>
                  {/* <Form> */}
                  <Row>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child"> Runsheet No.</Label>
                        <Input
                          value={runsheet_no}
                          type="text"
                          name="runsheet_no"
                          className="form-control-md"
                          id="input"
                          placeholder="Runsheet No"
                          disabled
                        />
                      </div>
                    </Col>
                    {/* <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child"> Vehicle Type </Label>
                        <SearchInput
                          data_list={vehicle_type_list}
                          data_item_s={vehicle_type}
                          set_data_item_s={setvehicle_type}
                          show_search={false}
                          setsearch_item={setsearch_vehicle_type}
                          disable_me={true}
                        />
                      </div>
                    </Col> */}
                    {runsheet.is_defined_route ?
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label> Route *</Label>
                          <SearchInput
                            data_list={route_list}
                            setdata_list={setroute_list}
                            data_item_s={defined_route_name}
                            set_data_item_s={setdefined_route_name}
                            set_id={setroute_id}
                            page={route_page}
                            setpage={setroute_page}
                            search_item={search_route}
                            setsearch_item={setsearch_route}
                            loaded={route_loaded}
                            count={route_count}
                            bottom={route_bottom}
                            setbottom={setroute_bottom}
                          />
                        </div>
                      </Col>
                      :
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Route
                          </Label>
                          <Input
                            value={route}
                            onChange={(event) => {
                              setroute(
                                event.target.value
                              );
                            }}
                            type="text"
                            name="route"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Route Name"
                          />
                        </div>
                      </Col>
                    }
                    {!runsheet.is_contract_vehicle ? (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2">
                          <Label className="header-child">
                            Vehicle Number
                          </Label>
                          <Input
                            value={vehicle_no}
                            onChange={(event) => {
                              setvehicle_no(
                                event.target.value
                              );
                            }}
                            type="text"
                            name="vehicle_no"
                            className="form-control-md"
                            id="input"
                            placeholder="Enter Vehicle Number"
                          />
                        </div>
                      </Col>
                    ) : (
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-3">
                          <Label>Vehicle Number</Label>
                          <SearchInput
                            data_list={contract_based_vehicle_list}
                            setdata_list={setcontract_based_vehicle_list}
                            data_item_s={contract_based_vehicle_no}
                            set_data_item_s={setcontract_based_vehicle_no}
                            set_id={setcontract_based_vehicle_id}
                            error_message={"Please Select Any State"}
                            error_s={vehicle_error}
                            search_item={search_setcontract_based_vehicle}
                            setsearch_item={setsearch_setcontract_based_vehicle}
                            page={vehicle_page}
                            setpage={setvehicle_page}
                            loaded={vehicle_loaded}
                            count={vehicle_count}
                            bottom={vehicle_bottom}
                            setbottom={setvehicle_bottom}
                          />
                        </div>
                      </Col>
                    )}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-3">
                        <Label> Driver *</Label>
                        <SearchInput
                          data_list={driver_list}
                          setdata_list={setdriver_list}
                          data_item_s={driver_name}
                          set_data_item_s={setdriver_name}
                          set_id={setdriver_id}
                          setsearch_item={setsearch_driver_name}
                          page={driver_page}
                          setpage={setdriver_page}
                          loaded={driver_loaded}
                          count={driver_count}
                          bottom={driver_bottom}
                          setbottom={setdriver_bottom}
                        />
                      </div>
                    </Col>
                    {/* {vehicle_type === "Truck" && */}
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Delivery Staff
                        </Label>
                        <Input
                          value={delivery_staff}
                          onChange={(event) => {
                            setdelivery_staff(
                              event.target.value
                            );
                          }}
                          type="text"
                          name="delivery_staff"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Staff Name"
                        />
                      </div>
                    </Col>
                    <Col lg={4} md={6} sm={6}>
                      <div className="mb-2">
                        <Label className="header-child">
                          Delivery Staff Phone No.
                        </Label>
                        <Input
                          value={delivery_staff_phone}
                          onChange={(val) => {
                            setdelivery_staff_phone(val.target.value);
                          }}
                          type="number" min={0}
                          className="form-control-md"
                          id="input"
                          placeholder="Enter Phone Number"
                        />
                      </div>
                    </Col>
                    {/* } */}
                    {/* <Col md={4} sm={6}>
                      <div className="mb-3">
                        <Label className="header-child">Pod Image </Label>
                        <Input id="input" type="file" />
                      </div>
                    </Col> */}
                    <ImgModal
                      modal={modal}
                      modal_set={() => {
                        setmodal(false);
                      }}
                      upload_image={(val) => {
                        setuploaded_img(val);
                      }}
                      result_image={(val) => {
                        setresult_img(val);
                      }}
                    />
                    {(result_img === "" || !result_img) &&
                      <Col lg={4} md={6} sm={6}>
                        <div className="mb-2" style={{ position: "relative" }}>
                          <Label>Pod Image</Label>
                          <Input
                            style={{ background: "white" }}
                            className="form-control-md"
                            name="logo"
                            value={result_img}
                            onChange={(val) => {
                              setresult_img(val.target.value)
                            }}
                            // type=""
                            id="input"
                            disabled
                          // accept="image/png,image/jpeg, image/jpg"
                          />
                          <button
                            style={{
                              border: "none",
                              position: "absolute",
                              borderRadius: "2px",
                              height: "29px",
                              top: "28.5px",
                              marginLeft: ".9px",
                              background: "#e9ecef",
                            }}
                            className="form-control-md"
                            id="input"
                            type="button"
                            onClick={() => setmodal(true)}
                          >
                            Choose Image
                          </button>
                        </div>
                      </Col>
                    }
                    {result_img && (
                      <Col lg={4} md={4} sm={6}>
                        <Label>Pod Image</Label>
                        <div className="mb-3">
                          <img
                            onClick={() => setmodal(true)}
                            src={result_img}
                            style={{
                              width: "95px",
                              height: "95px",
                              borderRadius: "8px",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                          />
                        </div>
                      </Col>
                    )}
                  </Row>
                  {/* </Form> */}
                </CardBody>
              ) : null}
            </Card>
          </Col>

          <Col lg={12}>
            <Card className="shadow bg-white rounded">
              <CardTitle className="mb-1 header">
                <div className="header-text-icon header-text">
                  Docket Info
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <AddDocket runsheet={isupdating && runsheet} />
                    <IconContext.Provider
                      value={{
                        className: "header-add-icon",
                      }}
                    >
                      <div onClick={toggle_circle1}>
                        {circle_btn1 ? (
                          <MdRemoveCircleOutline />
                        ) : (
                          <MdAddCircleOutline />
                        )}
                      </div>
                    </IconContext.Provider>
                  </div>
                </div>
              </CardTitle>
              {circle_btn1 ? (
                <CardBody style={{ padding: "1px" }}>
                  <DocketInfo
                    runsheet_orders={isupdating && runsheet.orders}
                    runsheet_no={isupdating && runsheet.runsheet_no}
                  />
                </CardBody>
              ) : null}
            </Card>
          </Col>
        </div>

        {/*Button */}
        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              {!isLoading ?
                <Button
                  type="submit"
                  className={
                    isupdating &&
                      (user.user_department_name + " " + user.designation_name ===
                        "DATA ENTRY OPERATOR" ||
                        user.user_department_name +
                        " " +
                        user.designation_name ===
                        "CUSTOMER SERVICE EXECUTIVE")
                      ? "btn btn-info m-1"
                      : !isupdating
                        ? "btn btn-info m-1"
                        : "btn btn-success m-1"
                  }
                  onClick={() => handleSubmit()}
                >
                  {isupdating &&
                    (user.user_department_name + " " + user.designation_name ===
                      "DATA ENTRY OPERATOR" ||
                      user.user_department_name + " " + user.designation_name ===
                      "CUSTOMER SERVICE EXECUTIVE" ||
                      user.is_superuser)
                    ? "Update"
                    : !isupdating
                      ? "Save"
                      : "Approved"}
                </Button>
                :
                <Button
                  type="button"
                  className={
                    isupdating &&
                      (user.user_department_name + " " + user.designation_name ===
                        "DATA ENTRY OPERATOR" ||
                        user.user_department_name +
                        " " +
                        user.designation_name ===
                        "CUSTOMER SERVICE EXECUTIVE")
                      ? "btn btn-info m-1"
                      : !isupdating
                        ? "btn btn-info m-1"
                        : "btn btn-success m-1"
                  }
                >
                  <Loader />
                </Button>
              }

              {/* <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={() => handleSubmit()}
              >
                Update
              </Button> */}
              {isupdating &&
                user.user_department_name + " " + user.designation_name !==
                "DATA ENTRY OPERATOR" &&
                user.user_department_name + " " + user.designation_name !==
                "CUSTOMER SERVICE EXECUTIVE" &&
                !user.is_superuser && (
                  <button
                    type="button"
                    className="btn btn-danger m-1"
                    onClick={handleShow}
                  >
                    Rejected
                  </button>
                )}
              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={() => navigate("/runsheet/allrunsheet")}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default ChangedRusheet;
