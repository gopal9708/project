import React, { useEffect, useLayoutEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { gstin_no } from "../../../constants/CompanyDetails";
import UpateEwaybillPartB from "../../authentication/signin/UpateEwaybillPartB";
import LogInEwayBill from "../../authentication/signin/LogInEwayBill";
import { setRunsheetTab } from "../../../store/parentFilter/ParentFilter";

function CreateRunsheet({ awb_numbers, docket_no, issuereceived_total, issuenon_received_total, total_pieces }) {
  const dispatch = useDispatch();
  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);

  const accessToken = useSelector((state) => state.authentication.access_token);
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.authentication.userdetails);
  const navigate = useNavigate();

  //Vehicle Type
  // const [vehicle_type, setvehicle_type] = useState("TRUCK")
  const [delivery_staff, setdelivery_staff] = useState("")
  const [delivery_staff_phone, setdelivery_staff_phone] = useState("");
  //Route
  const [route_list, setroute_list] = useState([]);
  const [route, setroute] = useState("");
  const [defined_route_name, setdefined_route_name] = useState("")
  const [route_id, setroute_id] = useState("");
  const [search_route, setsearch_route] = useState("");
  const [route_loaded, setroute_loaded] = useState(false)
  const [route_count, setroute_count] = useState(1)
  const [route_bottom, setroute_bottom] = useState(103)
  const [route_page, setroute_page] = useState(1)

  //Vehicle
  //Vehicle
  const [vehicle_list_s, setvehicle_list_s] = useState([])
  const [vehicle_no, setvehicle_no] = useState("")
  const [vehicle_id, setvehicle_id] = useState("")
  const [vehicle_page, setvehicle_page] = useState(1)
  const [vehicle_error, setvehicle_error] = useState(false)
  const [vehicle_search_item, setvehicle_search_item] = useState("")
  const [vehicle_loaded, setvehicle_loaded] = useState(false)
  const [vehicle_count, setvehicle_count] = useState(1)
  const [vehicle_bottom, setvehicle_bottom] = useState(103)
  const [close, setclose] = useState(false)
  //Driver
  const [driver_phone_no, setdriver_phone_no] = useState("")
  const [driver_list, setdriver_list] = useState([]);
  const [driver_name, setdriver_name] = useState("");
  const [driver_id, setdriver_id] = useState(0);
  const [search_driver_name, setsearch_driver_name] = useState("");
  const [driver_count, setdriver_count] = useState(1)
  const [driver_page, setdriver_page] = useState(1)
  const [driver_bottom, setdriver_bottom] = useState(103)
  const [driver_loaded, setdriver_loaded] = useState(false)

  //Used for error
  const [route_error, setroute_error] = useState(false);
  const [vehicle_no_error, setvehicle_no_error] = useState(false);
  const [driver_name_error, setdriver_name_error] = useState(false);
  const userDetail = useSelector((state) => state.authentication.userdetails);

  const [is_contract_based, setis_contract_based] = useState(false);

  const [defined_route, setdefined_route] = useState(false);

  const awb_no_list = awb_numbers;
  const docket_nos = docket_no;
  // console.log("awb_no_list------", awb_no_list)

  const handleClose = () => {
    setShow(false)
    setclose(false)
  };
  const handleShow = () => setShow(true);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {},

    onSubmit: (values) => {
      if (runsheet_type === "Create_Runsheet") {
        if (vehicle_no === "" || vehicle_no?.toString().length !== 10) {
          setvehicle_error(true);
        }
        else {
          send_runsheet_data(values);
        }
      }
      else {
        if (branch_selected === "") {
          setbranch_error(true)
        }
        else {
          send_hub_data();
        }

      }

    },
  });

  //For Update Part B
  const [EwayBillData, setEwayBillData] = useState([])
  const [list_data, setlist_data] = useState([])

  const getEwayBills = (docket_num) => {
    axios
      .get(
        ServerAddress +
        `booking/get_all_ewaybill/?type=${"order"}&value=${docket_num}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        console.log("resres----", res)
        if (res?.data?.length !== 0) {
          setEwayBillData(prevData => prevData.concat(res.data));
        }

      })
      .catch((err) => {
        console.log("rerrerer", err);
      });
  };

  useEffect(() => {
    let li = [];
    EwayBillData?.forEach((e) => {
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
        vehicleNo: vehicle_no,
        reasonCode: "2",
        reasonRem: "text",
        userGstin: gstin_no,
        ewbNo: e.ewb_no,
      };
      li.push(obj);
    });
    setlist_data(li)
    // console.log("li--------", li)
    // Rest of your code...
  }, [EwayBillData, vehicle_no]);

  useEffect(() => {
    if (vehicle_no !== "" || vehicle_no?.toString().length === 10) {
      setvehicle_error(false)
    }
  }, [vehicle_no])

  useEffect(() => {
    setEwayBillData([])
    if (docket_nos.length > 0 && show) {
      for (let index = 0; index < docket_nos.length; index++) {
        getEwayBills(docket_nos[index])
      }

    }
  }, [docket_nos, show])

  // Post Runsheet Data
  const send_runsheet_data = () => {
    axios
      .post(
        ServerAddress + "runsheet/add_runsheet/",
        {
          // organization: user.organization,
          branch: user.home_branch,
          route: defined_route ? route_id : null,
          route_name: !defined_route ? (route).toUpperCase() : "",
          defined_route_name: (defined_route_name).toUpperCase(),
          is_defined_route: defined_route,
          // vehicle_type: "FIXED VEHICLE",
          driver_name: (driver_name).toUpperCase(),
          branch_name: user.branch_nm,
          driver: driver_id,
          contracted_vehicle: is_contract_based ? vehicle_id : null,
          vehicle_number: (vehicle_no).toUpperCase(),
          is_contract_vehicle: is_contract_based,
          // contracted_vehicle_no: (contract_based_vehicle_no).toUpperCase(),
          awb_no_list: awb_no_list,
          // vehicle_type: vehicle_type,
          delivery_staff: (delivery_staff).toUpperCase(),
          delivery_staff_phone: delivery_staff_phone ? delivery_staff_phone : null,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        // console.log("done", response.data);
        if (response.data.status === "success") {
          if (list_data.length > 0) {
            UpateEwaybillPartB({
              gstin_no: gstin_no,
              Data: list_data,
              ewayTokenB: business_access_token,
              access_token: accessToken,
            });
            // EwayUpdate();
          }
          dispatch(setRunsheetTab(4));
          setShow(false);
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Runsheet Created sucessfully`));
          navigate("/runsheet/allrunsheet");
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
      });
  };

  const send_hub_data = () => {
    axios
      .post(
        ServerAddress + "manifest/add_hub_manifest/",
        {
          type: "RUNSHEET",
          origin_branch: user.home_branch,
          destination_branch: branch_type_short,
          origin_location: user.branch_location_id,
          destination_location: branch_dest_id,
          awb_no_list: awb_no_list,
          created_by: user.id,
          destination_branch_name: branch_selected.toUpperCase(),
          origin_location_name: user.branch_orgin_city,
          destination_location_name: branch_dest,
          // organization: user.userdetails.organization,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setRunsheetTab(2));
          setShow(false)
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          // getPendindOrders();
          navigate("/runsheet/hubrunsheet");
          // setcreateRunsheet_list([]);
          dispatch(setDataExist(`Hub Runsheet Created sucessfully`));
        }
      })
      .catch((error) => {
        alert(`Error While Creating Manifest ${error}`);
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
        `master/all_vehcile/?search=${vehicle_search_item}&place_id=all&filter_by=all&p=${vehicle_page}&records=${10}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        // console.log("Response of getvehicles========");
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
              ...vehicle_list_s,
              ...resp.data.results.map((v) => [v.id, v.vehcile_no]),
            ];
          }
          setvehicle_count(vehicle_count + 2);
          setvehicle_list_s(vehicle_list);
        } else {
          setvehicle_list_s([]);
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get States Runsheet,Pending Delivery. ${err}`);
      });
  };


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
        // console.log("U Rresponse===", response)
        if (response.data.next === null) {
          setdriver_loaded(false);
        } else {
          setdriver_loaded(true);
        }
        if (response.data.results.length > 0) {
          if (driver_page === 1) {
            driver_lists = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.username), v.mobilenumber
            ]);
          } else {
            driver_lists = [
              ...driver_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.username), v.mobilenumber]),
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

  useEffect(() => {
    getRoutes();
  }, [search_route, route_page]);


  useEffect(() => {
    getvehicles()
  }, [vehicle_page, vehicle_search_item]);

  useEffect(() => {
    getDrivers();
  }, [search_driver_name, driver_page]);



  useEffect(() => {
    if (route !== "" || defined_route_name !== "") {
      setroute_error(false);
    }
    if (vehicle_no !== "") {
      setvehicle_no_error(false);
    }
    if (driver_name !== "") {
      setdriver_name_error(false);
    }
  }, [route, vehicle_no, driver_name, defined_route_name]);

  // const [eway_loaded, seteway_loaded] = useState(false)

  // useEffect(() => {
  //   seteway_loaded(true)
  // }, []);

  // const memoizedLogInEwayBill = useMemo(() => <LogInEwayBill />, []);

  //
  const [runsheet_type, setrunsheet_type] = useState("Create_Runsheet");
  //  For Fetching Branch Data Started
  const [branch_list, setbranch_list] = useState([]);
  // console.log("branch_list-------", branch_list)
  const [branch_type_short, setbranch_type_short] = useState("");
  const [branch_selected, setbranch_selected] = useState("");
  const [branch_dest, setbranch_dest] = useState("");
  const [branch_dest_id, setbranch_dest_id] = useState("");
  const [branch_search, setbranch_search] = useState("");
  const [branch_page, setbranch_page] = useState(1);
  const [branch_loaded, setbranch_loaded] = useState(false)
  const [branch_count, setbranch_count] = useState(1)
  const [branch_bottom, setbranch_bottom] = useState(103)
  const [branch_error, setbranch_error] = useState(false)

  const get_branch = () => {
    let temp = [];
    let temp2 = [];
    axios
      .get(
        ServerAddress +
        `master/all-branches/?search=${""}&p=${branch_page}&records=${10}&branch_name=${[
          "",
        ]}&branch_city=${[""]}&branch_search=${branch_search}&vendor=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setbranch_loaded(false);
        } else {
          setbranch_loaded(true);
        }

        if (response.data.results.length > 0) {
          temp = response.data.results;
          if (branch_page === 1) {
            temp2 = response.data.results.map((v) => [
              v.id,
              toTitleCase(v.name),
              toTitleCase(v.city_name),
              v.location,
            ]);
          } else {
            temp2 = [
              ...branch_list,
              ...response.data.results.map((v) => [v.id, toTitleCase(v.state), toTitleCase(v.city_name),
              v.location,]),
            ];
          }

          // console.log("response---temp-----", temp);
          // for (let index = 0; index < temp.length; index++) {
          //   temp2.push([
          //     temp[index].id,
          //     temp[index].name,
          //     temp[index].city_name,
          //     temp[index].location,
          //     // temp[index].locality_name
          //   ]);
          // }
          // temp2 = [...new Set(temp2.map((v) => `${v}`))].map((v) => v.split(","));
          setbranch_count(branch_count + 2);
          setbranch_list(temp2);
        }
        else {
          setbranch_list([])
        }
      })
      .catch((err) => {
        alert(`Error While Loading Branches , ${err}`);
      });
  };

  useLayoutEffect(() => {
    get_branch();
  }, [branch_search, branch_page]);


  return (
    <>
      {/* {!eway_loaded && memoizedLogInEwayBill} */}
      <LogInEwayBill />
      <div style={{ display: "flex" }}>
        <div
          className="form-check mb-2"
          style={{ marginTop: "25px", marginRight: "30px" }}
        >
          <Input
            className="form-check-input"
            type="radio"
            name="delivery_type"
            id="exampleRadios1"
            value="Createrunsheet"
            defaultChecked
            onClick={() => {
              setrunsheet_type("Create_Runsheet");
            }}
          />
          <Label>Create Runsheet</Label>
        </div>
        <div
          className="form-check mb-2"
          style={{ marginTop: "25px", marginRight: "30px" }}
        >
          <Input
            className="form-check-input"
            type="radio"
            name="delivery_type"
            id="exampleRadios2"
            value="Createrunsheet"
            onClick={() => {
              setrunsheet_type("Hub_Transfer");
            }}
          />
          <Label>Hub Transfer</Label>
        </div>
        <div
          className="form-check mb-2"
          style={{ marginTop: "20px" }}
        >
          <Button
            variant="primary"
            onClick={handleShow}
            disabled={awb_no_list.length === 0}
          >
            Create
          </Button>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        {/* contentClassName="content-test" */}
        <Modal.Header closeButton>
          <Modal.Title>{runsheet_type === "Create_Runsheet" ? "Create Runsheet" : "Hub Transfer"}</Modal.Title>
        </Modal.Header>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (route === "" && defined_route_name === "" && runsheet_type === "Create_Runsheet") {
              setroute_error(true);
            }
            if (driver_name === "" && runsheet_type === "Create_Runsheet") {
              setdriver_name_error(true);
            }
            validation.handleSubmit(e.values);
            return false;
          }}
        >
          <Modal.Body>
            {/* <Label>Is Defined Row</Label> */}
            {(issuereceived_total === 0 && issuenon_received_total === 0) || close ?
              <>
                {runsheet_type === "Create_Runsheet" ?
                  <>
                    {/* <div>
                      <Label>
                        Vehicle Type
                      </Label>
                      <Row>
                        <Col md={4} sm={5}>
                          <div className="form-check mb-2">
                            <Input
                              className="form-check-input"
                              type="radio"
                              name="vehicle_type"
                              id="exampleRadios3"
                              value="TRUCK"
                              onClick={() => {
                                setvehicle_type("TRUCK");
                              }}
                              checked={vehicle_type === "TRUCK"}
                              readOnly={true}
                            />
                            <Label
                              className="form-check-label input-box"
                              htmlFor="exampleRadios2"
                            >
                              Truck
                            </Label>
                          </div>
                        </Col>
                        <Col md={6} sm={7}>
                          <div className="form-check mb-2">
                            <Input
                              className="form-check-input"
                              type="radio"
                              name="vehicle_type"
                              id="exampleRadios4"
                              value="BIKE"
                              onClick={() => {
                                setvehicle_type("BIKE");
                              }}
                              checked={vehicle_type === "BIKE"}
                              readOnly={true}
                            />

                            <Label
                              className="form-check-label input-box"
                              htmlFor="exampleRadios1"
                            >
                              Bike
                            </Label>
                          </div>
                        </Col>
                      </Row>
                    </div> */}
                    <div style={{ marginTop: "10px" }}>
                      <Label>
                        {" "}
                        Route (Is Defined Route{" "}
                        <span onClick={() => setdefined_route(!defined_route)}>
                          {defined_route ? (
                            <FiCheckSquare size={15} />
                          ) : (
                            <FiSquare size={15} />
                          )}
                        </span>
                        )
                      </Label>

                      {defined_route ? (
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
                          error_message={"Please Select Any Route"}
                          error_s={route_error}
                          loaded={route_loaded}
                          count={route_count}
                          bottom={route_bottom}
                          setbottom={setroute_bottom}
                        />
                      ) : (
                        <Input
                          value={route}
                          onChange={(val) => {
                            setroute(val.target.value);
                          }}
                          onBlur={() => {
                            if (route === "") {
                              setroute_error(true)
                            }
                          }
                          }
                          invalid={
                            route_error
                          }
                          type="text"
                          className="form-control-md"
                          id="input"
                          placeholder="Enter route"
                        />
                      )}

                      {route_error && (
                        <FormFeedback type="invalid">
                          Please Select Route
                        </FormFeedback>
                      )}
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Label> Contract Based Vehicle :
                        <span onClick={() => setis_contract_based(!is_contract_based)}>
                          {is_contract_based ? (
                            <FiCheckSquare size={15} />
                          ) : (
                            <FiSquare size={15} />
                          )}
                        </span>
                      </Label>
                    </div>

                    {is_contract_based ? (
                      <div>
                        <SearchInput
                          data_list={vehicle_list_s}
                          setdata_list={setvehicle_list_s}
                          data_item_s={vehicle_no}
                          set_data_item_s={setvehicle_no}
                          set_id={setvehicle_id}
                          page={vehicle_page}
                          setpage={setvehicle_page}
                          error_message={"Please Select Any Vehicle"}
                          error_s={vehicle_error}
                          search_item={vehicle_search_item}
                          setsearch_item={setvehicle_search_item}
                          loaded={vehicle_loaded}
                          count={vehicle_count}
                          bottom={vehicle_bottom}
                          setbottom={setvehicle_bottom}
                        />
                        {vehicle_no_error && (
                          <div className="mt-1 error-text" color="danger">
                            Please Select Vehicle
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mb-2">
                        <Input
                          name="vehicle_no"
                          type="text"
                          id="input"
                          maxLength={10}
                          value={vehicle_no}
                          onChange={(e) => {
                            setvehicle_no(e.target.value);
                          }}
                          onBlur={() => {
                            if (vehicle_no === "" || vehicle_no?.toString().length !== 10) {
                              setvehicle_error(true)
                            }
                          }
                          }
                          invalid={
                            vehicle_error
                          }
                        />
                        {vehicle_error && (
                          <FormFeedback type="invalid">
                            Vehicle Number Must Have 10 Character
                          </FormFeedback>
                        )}
                      </div>
                    )}

                    <div style={{ marginTop: "10px" }}>
                      <Label> Driver *</Label>
                      <SearchInput
                        data_list={driver_list}
                        setdata_list={setdriver_list}
                        data_item_s={driver_name}
                        // set_data_item_s={setdriver_name}
                        set_data_item_s={(value) => {
                          let cv = driver_list.forEach((e) => {
                            if (e[1] === value) {
                              setdriver_phone_no(e[2]);
                            }
                          });

                          setdriver_name(value);
                        }}
                        set_id={setdriver_id}
                        search_item={search_driver_name}
                        setsearch_item={setsearch_driver_name}
                        error_message={"Please Select Any Driver"}
                        error_s={driver_name_error}
                        page={driver_page}
                        setpage={setdriver_page}
                        loaded={driver_loaded}
                        count={driver_count}
                        bottom={driver_bottom}
                        setbottom={setdriver_bottom}
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Label>Driver Phone No.</Label>
                      <Input
                        value={driver_phone_no}
                        type="text"
                        className="form-control-md"
                        id="input"
                        disabled
                      />
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <Label> Delivery Staff</Label>
                      <Input
                        value={delivery_staff}
                        onChange={(val) => {
                          setdelivery_staff(val.target.value);
                        }}
                        type="text"
                        className="form-control-md"
                        id="input"
                        placeholder="Enter Staff Name"
                      />
                    </div>

                    <div style={{ marginTop: "10px" }}>
                      <Label> Delivery Staff Phone No.</Label>
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
                  </>
                  :
                  <>
                    <div style={{ marginTop: "10px" }}>
                      <Label>
                        Select Branch to Forward *
                      </Label>
                      <SearchInput
                        data_list={branch_list}
                        setdata_list={setbranch_list}
                        data_item_s={branch_selected}
                        set_data_item_s={(value) => {
                          let cv = branch_list.forEach((e) => {
                            if (e[1] === value) {
                              setbranch_dest(e[2]);
                              setbranch_dest_id(e[3]);
                            }
                          });

                          setbranch_selected(value);
                        }}
                        set_id={setbranch_type_short}
                        setsearch_item={setbranch_search}
                        error_message={"Please select Branch To Forward"}
                        error_s={branch_error}
                        page={branch_page}
                        setpage={setbranch_page}
                        loaded={branch_loaded}
                        count={branch_count}
                        bottom={branch_bottom}
                        setbottom={setbranch_bottom}
                      />
                    </div>

                    <div style={{ marginTop: "10px" }}>
                      <Label>
                        Destination City
                      </Label>
                      <Input id="input" disabled value={branch_dest} />
                    </div>
                  </>
                }
              </>
              :
              <div>{`You have total "${total_pieces}" Quantity With in this "${issuereceived_total}" Pieces is Damaged and "${issuenon_received_total}" is not Received So, Do you want to Create Runsheet ?`}</div>
            }
          </Modal.Body>

          <Modal.Footer>
            {(issuereceived_total === 0 && issuenon_received_total === 0) || close ?
              <Button type="submit">
                Save
              </Button>
              :
              <Button type="button" onClick={() => setclose(true)}>
                Yes
              </Button>
            }
            <Button type="button" variant="secondary" onClick={handleClose}>
              {(issuereceived_total === 0 && issuenon_received_total === 0) ? "Close" : "Cancel"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
export default CreateRunsheet;
