/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Col, Row, CardBody, CardTitle, Label, Input, FormFeedback } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";

import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import Question from "../../../assets/images/bookings/question.png";
import { setLoaded, setOrder_id } from "../../../store/manifest/RecieveManifest";
import SearchInput from "../../../components/formComponent/searchInput/SearchInput";
import { gstin_no } from "../../../constants/CompanyDetails";
import UpateEwaybillPartB from "../../authentication/signin/UpateEwaybillPartB";
import LogInEwayBill from "../../authentication/signin/LogInEwayBill";
import ImgModal from "../../../components/crop/ImgModal";
import Loader from "../../../components/loader/Loader";
const RecieveHubManifest = ({ depart }) => {
  const userDetail = useSelector((state) => state.authentication.userdetails);
  const [is_issue, setis_issue] = useState(false);

  const business_access_token = useSelector((state) => state.eway_bill.business_access_token);
  // const [notReceived, setNotReceived] = useState([]);
  // console.log("Recived", received);
  // console.log("Not Recived", notReceived);
  const [refresh, setrefresh] = useState(false);
  const [is_issuerec, setis_issuerec] = useState(false);
  const [receivedrec, setReceivedrec] = useState([]);
  // console.log("receivedrec----", receivedrec)
  // const [notReceivedrec, setNotReceivedrec] = useState([]);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const success = useSelector((state) => state.alert.show_alert);
  const [remarks, setremarks] = useState("");
  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();
  const order_id = useSelector((state) => state.manifest.order_id);
  // console.log("location_data--location_data-Hub-", location_data)
  const issue_id = useSelector((state) => state.manifest.issueorder_id);
  const loaded = useSelector((state) => state.manifest.loaded);
  const [isLoading, setIsLoading] = useState(false);

  const [circle_btn1, setcircle_btn1] = useState(true);
  const toggle_circle1 = () => {
    setcircle_btn1(!circle_btn1);
  };

  // Navigation At the time of Cancel
  const handleAction = () => {
    dispatch(setToggle(true));
    navigate("/manifest/incomingmanifest");
  };
  const [is_break, setis_break] = useState(false);
  const [is_recv, setis_recv] = useState(false);

  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");
  const [from_branch, setfrom_branch] = useState("");
  const [to_branch, setto_branch] = useState("");
  const [hub_transfer_no, sethub_transfer_no] = useState("");
  const [manifest_id, setmanifest_id] = useState("");
  const [total_bags, settotal_bags] = useState("");
  const [manifest_weight, setmanifest_weight] = useState("");
  const [airway_bill_no, setairway_bill_no] = useState("");
  const [coloader_mode, setcoloader_mode] = useState("");
  const [flight_name, setflight_name] = useState("");
  const [data, setdata] = useState([]);

  const [vehicle_list, setvehicle_list] = useState([]);
  const [vehicle_id, setvehicle_id] = useState("");
  const [vehicle_n_page, setvehicle_n_page] = useState(1);
  const [search_vehicle_name, setsearch_vehicle_name] = useState("");
  const [vehicle_error, setvehicle_error] = useState(false);
  const [vehicle_loaded, setvehicle_loaded] = useState(false)
  const [vehicle_count, setvehicle_count] = useState(1)
  const [vehicle_bottom, setvehicle_bottom] = useState(103)

  const [rental, setrental] = useState(false);

  useLayoutEffect(() => {
    let manifest_data = location_data.state.hub;
    sethub_transfer_no(manifest_data.hub_transfer_no);
    setmanifest_id(manifest_data.id);
    setfrom_branch(manifest_data.from_branch_n);
    setto_branch(manifest_data.to_branch_n);
    setcoloader_mode(manifest_data.coloader_mode);
    setcoloader_id(manifest_data.coloader);
    setcoloader_selected(manifest_data.coloader_name);
    settotal_bags(manifest_data.bag_count);
    setmanifest_weight(manifest_data.total_weight);
    setairway_bill_no(manifest_data.airwaybill_no);
    setflight_name(manifest_data.carrier_name);
    setvehicle_no(manifest_data.vehicle_no)
    setremarks(manifest_data.remarks)
    setrental(manifest_data.is_rented_vehcile);
  }, []);

  const [trans_mode_list, settrans_mode_list] = useState([
    "Air",
    "Road",
    "Rail",
    "Ship",
    "In Transit",
  ]);
  const [trans_mode_selected, settrans_mode_selected] = useState("");
  const [vehicle_no, setvehicle_no] = useState("");
  const get_orderof_manifest = () => {
    axios
      .get(
        ServerAddress +
        `manifest/get_manifest_order/?manifest_no=${hub_transfer_no}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        // setdata(response.data);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useLayoutEffect(() => {
    hub_transfer_no && get_orderof_manifest();
  }, [hub_transfer_no, success]);

  const [mn_barcode, setmn_barcode] = useState([]);
  useEffect(() => {

    // console.log("hello ji pass check", location_data.state.hub.mn_barcode);
    if (location_data.state.hub.mn_barcode) {
      setmn_barcode(location_data.state.hub.mn_barcode);
    }
  }, [])

  const RecieveHubManifest = (steps) => {
    setIsLoading(true)
    axios
      .post(
        ServerAddress + "manifest/add_hubrecieve_manifest/",
        {
          hub_transfer_no: hub_transfer_no,
          is_received: "True",
          awb_no_list: order_id,
          issue_type: issue_id,
          is_issue: is_issue,
          vehicle_no: vehicle_no,
          is_disputed: false,
          disputed_by: "",
          dispute_username: "",
          remarks: remarks,
          issue_recieved_order: [],
          // issue_notrecieved_order: notReceived,
          vehicle_no: toTitleCase(vehicle_no).toUpperCase(),
          transport_mode: trans_mode_selected.toUpperCase(),
          step: steps,
          issue_recieved_order_rec: receivedrec,
          // issue_notrecieved_order_rec: notReceivedrec,
          is_issue_rec: is_issuerec,
          vehcile_no_f: vehicle_id,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        setIsLoading(false)
        setShow(false);
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
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Manifest  "${hub_transfer_no}" Recieved sucessfully`)
          );
          dispatch(setAlertType("info"));
          navigate(-1);
        }
      })
      .catch(function (err) {
        setIsLoading(false)
        alert(`Error While  Updateing Manifest ${err}`);
      });
  };


  //  For getting Vehcile number
  const get_vehcile_no = () => {
    let vehicle_temp = [];
    let data = [];
    axios
      .get(
        ServerAddress +
        `master/all_vehcile/?search=${search_vehicle_name}&p=${vehicle_n_page}&records=${10}&name_search=${''}&vehicle_name=&data=all`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        if (response.data.next === null) {
          setvehicle_loaded(false);
        } else {
          setvehicle_loaded(true);
        }
        data = response.data.results;
        if (response.data.results.length > 0) {
          if (vehicle_n_page == 1) {
            vehicle_temp = response.data.results.map((v) => [
              v.id,
              v.vehcile_no,
            ]);
          } else {
            vehicle_temp = [
              ...vehicle_list,
              ...response.data.results.map((v) => [v.id, v.vehcile_no]),
            ];
          }
          setvehicle_count(vehicle_count + 2);
          setvehicle_list(vehicle_temp);
        }
        else {
          setvehicle_list([])
        }

      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  useLayoutEffect(() => {
    get_vehcile_no();
  }, [vehicle_n_page, search_vehicle_name]);


  // useEffect(() => {
  //   if (is_submit) {
  //     RecieveHubManifest();
  //   }
  // }, [is_submit]);

  const [show, setShow] = useState(false);

  let docket_no_list = []

  for (let index = 0; index < data.length; index++) {
    const element = data[index]?.docket_no;
    docket_no_list.push(element)
    // console.log("docket_no_list hub-------", docket_no_list)
  }

  useEffect(() => {
    setdata(location_data.state.hub.orders)
  }, [location_data])

  //For Update Part B
  const [EwayBillData, setEwayBillData] = useState([])
  const [list_data, setlist_data] = useState([])

  const getEwayBills = (hub_num) => {
    axios
      .get(
        ServerAddress +
        `booking/get_all_ewaybill/?type=${"hub"}&value=${hub_num}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        // console.log("resres----", res);
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
    }
    // Rest of your code...
  }, [EwayBillData, vehicle_no]);
  // console.log("EwayBillData-----", EwayBillData)

  useEffect(() => {

    if (hub_transfer_no !== "") {
      getEwayBills(hub_transfer_no);
    }
  }, [hub_transfer_no])

  useEffect(() => {
    if (vehicle_no !== "" || vehicle_no?.toString().length === 10) {
      setvehicle_error(false)
    }
  }, [vehicle_no])

  //ReceivedRec
  function handleIssueTypeChangeRec(e, universal_no, index, universal_type, barcode, issue_location, barcode_type, issue_image) {
    setis_issuerec(true);
    const issueType = e.target.value;
    let remarks = "";
    const orderInfo = { universal_no, issueType, remarks, universal_type, barcode, issue_location, barcode_type, issue_image };

    if (["Broken", "Damage", "Not Received", "None", "Custom Check Failed", "Other"].includes(issueType)) {
      setReceivedrec((prevReceived) => {
        const newReceived = [...prevReceived];
        newReceived[index] = orderInfo;
        return newReceived;
      });
    }
  }

  const RecieveManifestTitle = [
    "Manifest No",
    "Bag or Box",
    "BarCode No",
    "Issue Type"
  ];

  const [showModalReceive, setshowModalReceive] = useState({
    value: false,
    ind: "",
  });
  const [row4, setrow4] = useState([{ 'issue_image': "" }]);



  //Received
  const [data2, setdata2] = useState([])

  const getOrderPieces = () => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
        `booking/orderboxqrcodecheck/${hub_transfer_no}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        console.log("respfff-------", resp)
        if (resp.data.length > 0) {
          setdata2(resp.data)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get orderboxqrcodecheck, ${err}`);
      });
  };

  useEffect(() => {
    let orderid_list = data2.map((v) => v.order);
    let unique_orderid_list = [...new Set(orderid_list)];
    dispatch(setOrder_id(unique_orderid_list));
  }, [data2]);


  useLayoutEffect(() => {
    if (hub_transfer_no !== "") {
      getOrderPieces()
    }
  }, [hub_transfer_no]);

  return (
    <>
      {/* {!eway_loaded && memoizedLogInEwayBill} */}
      <LogInEwayBill />
      <Modal
        show={is_recv}
        onHide={() => {
          setShow(false);
          setis_break(false);
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header></Modal.Header>

        <Modal.Body>
          <div style={{ marginLeft: "170px" }}>
            <img src={Question} width="100vw" height="100vh" />
          </div>
          <div
            style={{
              marginTop: "20px",
              fontSize: "14px",
              fontWeight: "bold",
              marginLeft: "20px",
              color: "blue",
            }}
          >
            Do You Want To Receive Of Hub Number {hub_transfer_no} Of All Bags And Boxes ?
            {/* In {hub_transfer_no} You Have Recieved All Bags And Boxes Do You Want To
            Update Status Connecting To Hub ? */}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setis_recv(false);
            }}
          >
            No
          </Button>
          {!isLoading ?
          <Button variant="success" onClick={() => {
            if (vehicle_no == "" || vehicle_no?.toString().length !== 10) {
              setvehicle_error(true);
            }
            else {
              RecieveHubManifest("STEP2");
            }
          }}>
            {/* Update */}
            Yes
          </Button>
           :
           <Button variant="success">
             <Loader />
           </Button>

         }
        </Modal.Footer>
      </Modal>

      {/* Modal For Break manifest Started*/}
      <Title title="Recieve Hub Manifest" parent_title="Manifests" />
      <PageTitle page="RecieveHubManifest" />
      <div className="mt-0 m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardBody style={{ paddingTop: "0px" }}>
              <Row>
                <div
                  className="container-fluid"
                  style={{ background: "white" }}
                >
                  <div className="mb-2 row ">

                    <div style={{ color: "blue", fontSize: "15px", marginTop: "10px" }}>
                      Docket Present In This Manifest = [
                      {
                        docket_no_list.map((v) => {
                          return <a>{v}{docket_no_list[docket_no_list.length - 1] === v ? null : ", "}</a>
                        }
                        )
                      }
                      ]
                    </div>

                  </div>

                  {/* DataTable */}
                  {/* <RecieveHubDataFormat
                    data={location_data.state.hub.orders}
                    barcode={mn_barcode}
                    // barcode={mn_barcode}
                    is_issue={is_issuerec}
                    setis_issue={setis_issuerec}
                    received={receivedrec}
                    setReceived={setReceivedrec}
                  /> */}
                  <div className="table">
                    <table
                      className="topheader table-light"
                      style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
                    >
                      <thead>
                        {showModalReceive.value ? (
                          <ImgModal
                            modal={showModalReceive.value}
                            modal_set={() => {
                              setshowModalReceive({
                                ...showModalReceive,
                                value: false,
                              });
                            }}
                            pre_image={showModalReceive.ind !== "" ? receivedrec[showModalReceive.ind]['issue_image'] : ""}
                            upload_image={(val) => {
                              if (showModalReceive.ind !== "") {
                                row4[showModalReceive.ind]['issue_image'] = val;
                                setshowModalReceive({
                                  ...showModalReceive,
                                  value: false,
                                  ind: "",
                                });
                              } else {
                                row4[row4.length - 1]['issue_image'] = val;
                              }
                            }}
                            result_image={(val) => {
                              setrefresh(!refresh)
                              if (showModalReceive.ind !== "") {
                                receivedrec[showModalReceive.ind]['issue_image'] = [val];
                              } else {
                                receivedrec[receivedrec.length - 1]['issue_image'] = [val];
                              }
                            }}
                          />
                        ) : null}
                        <tr style={{ lineHeight: 2, borderWidth: 1 }}>
                          {RecieveManifestTitle.map((item, index) => {
                            return (
                              <th
                                style={{ whiteSpace: "nowrap", textAlign: "center" }}
                                key={index}
                              >
                                {item}{" "}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>

                      <tbody>
                        {mn_barcode.length === 0 ? (
                          <tr>
                            <td>No Data Found</td>
                          </tr>
                        ) : (
                          mn_barcode.map((order, index) => {
                            // let f_date_f = order.booking_at.split("T")[0];
                            // .substring(0, 11);
                            console.log("hello ji", order)
                            return (
                              <>
                                <tr
                                  key={index}
                                  style={{
                                    borderWidth: 1,
                                  }}
                                >
                                  <td>{order.hub_transfer_no}</td>
                                  <td>{order.box_tpye}</td>
                                  <td>
                                    {order.barcode_no}
                                  </td>

                                  <td>
                                    <select
                                      onChange={(e) =>
                                        handleIssueTypeChangeRec(e, order.hub_transfer_no, index, "HUB MANIFEST", order.barcode_no, "ON RECEIVE", order.box_tpye, '')
                                      }
                                    >
                                      <option defaultChecked>Select...</option>
                                      <option value="Not Received">Not Received</option>
                                      <option value="Broken">Broken</option>
                                      <option value="Damage">Damage</option>
                                      <option value="Custom Check Failed">
                                        Custom Check Failed
                                      </option>
                                      <option value="Other">Other</option>
                                      <option value="None">None</option>

                                    </select>
                                  </td>

                                  {receivedrec[index] &&
                                    receivedrec[index]["issueType"] === "Broken" && (
                                      <td>
                                        <div style={{ width: "100%" }} key={index}>
                                          {receivedrec[index]['issue_image'] ? (
                                            <img
                                              src={receivedrec[index]['issue_image']}
                                              style={{
                                                height: "95px",
                                                width: "95px",
                                                borderRadius: "10px",
                                                paddingBottom: "5px",
                                              }}
                                              onClick={() => {
                                                setshowModalReceive({
                                                  ...showModalReceive,
                                                  value: true,
                                                  ind: index,
                                                });
                                              }}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                height: "95px",
                                                paddingTop: 35,
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  border: "0.5px solid #DAD7D7",
                                                  alignItems: "center",
                                                  height: "38px",
                                                  borderRadius: 5,
                                                  height: 31,
                                                }}
                                                onClick={() => {
                                                  setshowModalReceive({
                                                    ...showModalReceive,
                                                    value: true,
                                                    ind: index,
                                                  });
                                                }}
                                              >
                                                <a
                                                  style={{
                                                    marginLeft: "3px",
                                                    fontSize: 11,
                                                  }}
                                                >
                                                  Chooose File
                                                </a>
                                                <div
                                                  style={{
                                                    fontSize: "25px",
                                                    color: "#DAD7D7",
                                                    marginLeft: "5px",
                                                  }}
                                                >
                                                  |
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                    )}

                                  {receivedrec[index] &&
                                    receivedrec[index]["issueType"] === "Damage" && (
                                      <td>
                                        <div style={{ width: "100%" }} key={index}>
                                          {receivedrec[index]['issue_image'] ? (
                                            <img
                                              src={receivedrec[index]['issue_image']}
                                              style={{
                                                height: "95px",
                                                width: "95px",
                                                borderRadius: "10px",
                                                paddingBottom: "5px",
                                              }}
                                              onClick={() => {
                                                setshowModalReceive({
                                                  ...showModalReceive,
                                                  value: true,
                                                  ind: index,
                                                });
                                              }}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                height: "95px",
                                                paddingTop: 35,
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  border: "0.5px solid #DAD7D7",
                                                  alignItems: "center",
                                                  height: "38px",
                                                  borderRadius: 5,
                                                  height: 31,
                                                }}
                                                onClick={() => {
                                                  setshowModalReceive({
                                                    ...showModalReceive,
                                                    value: true,
                                                    ind: index,
                                                  });
                                                }}
                                              >
                                                <a
                                                  style={{
                                                    marginLeft: "3px",
                                                    fontSize: 11,
                                                  }}
                                                >
                                                  Chooose File
                                                </a>
                                                <div
                                                  style={{
                                                    fontSize: "25px",
                                                    color: "#DAD7D7",
                                                    marginLeft: "5px",
                                                  }}
                                                >
                                                  |
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                    )}

                                  {receivedrec[index] &&
                                    receivedrec[index]["issueType"] === "Custom Check Failed" && (
                                      <td>
                                        <div style={{ width: "100%" }} key={index}>
                                          {receivedrec[index]['issue_image'] ? (
                                            <img
                                              src={receivedrec[index]['issue_image']}
                                              style={{
                                                height: "95px",
                                                width: "95px",
                                                borderRadius: "10px",
                                                paddingBottom: "5px",
                                              }}
                                              onClick={() => {
                                                setshowModalReceive({
                                                  ...showModalReceive,
                                                  value: true,
                                                  ind: index,
                                                });
                                              }}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                height: "95px",
                                                paddingTop: 35,
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  border: "0.5px solid #DAD7D7",
                                                  alignItems: "center",
                                                  height: "38px",
                                                  borderRadius: 5,
                                                  height: 31,
                                                }}
                                                onClick={() => {
                                                  setshowModalReceive({
                                                    ...showModalReceive,
                                                    value: true,
                                                    ind: index,
                                                  });
                                                }}
                                              >
                                                <a
                                                  style={{
                                                    marginLeft: "3px",
                                                    fontSize: 11,
                                                  }}
                                                >
                                                  Chooose File
                                                </a>
                                                <div
                                                  style={{
                                                    fontSize: "25px",
                                                    color: "#DAD7D7",
                                                    marginLeft: "5px",
                                                  }}
                                                >
                                                  |
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                    )}

                                  {receivedrec[index] &&
                                    receivedrec[index]["issueType"] === "Other" && (
                                      <td>
                                        <div style={{ width: "100%" }} key={index}>
                                          {receivedrec[index]['issue_image'] ? (
                                            <img
                                              src={receivedrec[index]['issue_image']}
                                              style={{
                                                height: "95px",
                                                width: "95px",
                                                borderRadius: "10px",
                                                paddingBottom: "5px",
                                              }}
                                              onClick={() => {
                                                setshowModalReceive({
                                                  ...showModalReceive,
                                                  value: true,
                                                  ind: index,
                                                });
                                              }}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                height: "95px",
                                                paddingTop: 35,
                                              }}
                                            >
                                              <div
                                                style={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  border: "0.5px solid #DAD7D7",
                                                  alignItems: "center",
                                                  height: "38px",
                                                  borderRadius: 5,
                                                  height: 31,
                                                }}
                                                onClick={() => {
                                                  setshowModalReceive({
                                                    ...showModalReceive,
                                                    value: true,
                                                    ind: index,
                                                  });
                                                }}
                                              >
                                                <a
                                                  style={{
                                                    marginLeft: "3px",
                                                    fontSize: 11,
                                                  }}
                                                >
                                                  Chooose File
                                                </a>
                                                <div
                                                  style={{
                                                    fontSize: "25px",
                                                    color: "#DAD7D7",
                                                    marginLeft: "5px",
                                                  }}
                                                >
                                                  |
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                    )}

                                </tr>
                                {receivedrec[index] &&
                                  receivedrec[index]["issueType"] === "Other" && (
                                    <tr>
                                      <td colSpan={12}>
                                        <Input
                                          type="text"
                                          id="input"
                                          placeholder="Enter Issue"
                                          onChange={(val) => {
                                            receivedrec[index]["remarks"] =
                                              val.target.value;
                                            setrefresh(!refresh);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                  )}
                              </>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>

                </div>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </div>
      {/* Bag Info Ended */}

      {/* Colader Services */}
      <div className="m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardTitle className="mb-1 header">
              <div className="header-text-icon header-text">
                Docket Info:
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
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
              <CardBody>
                <Row>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">Manifest No* :</Label>

                      <Input
                        className="form-control-md"
                        id="input"
                        disabled
                        value={hub_transfer_no}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      <Label className="header-child">
                        Market Vehcile:
                      </Label>
                      <Row>
                        <Col lg={12} md={12} sm={12}>
                          {rental ? (
                            <FiCheckSquare
                              size={20}
                              onClick={() => {
                                setrental(false);
                              }}
                            />
                          ) : (
                            <FiSquare
                              size={20}
                              onClick={() => {
                                setrental(true);
                              }}
                            />
                          )}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col lg={4} md={6} sm={6}>
                    <div className="mb-2">
                      {rental ? (
                        <Label className="header-child">
                          {" "}
                          Market Vehcile No* :
                        </Label>
                      ) : (
                        <Label className="header-child">
                          Vehcile No* :
                        </Label>
                      )}
                      {rental ? null : (
                        <SearchInput
                          data_list={vehicle_list}
                          setdata_list={setvehicle_list}
                          data_item_s={vehicle_no}
                          set_data_item_s={setvehicle_no}
                          set_id={setvehicle_id}
                          page={vehicle_n_page}
                          setpage={setvehicle_n_page}
                          search_item={search_vehicle_name}
                          setsearch_item={setsearch_vehicle_name}
                          error_message={"Please Select Any Vechile Number"}
                          error_s={vehicle_error}
                          loaded={vehicle_loaded}
                          count={vehicle_count}
                          bottom={vehicle_bottom}
                          setbottom={setvehicle_bottom}
                          disable_me={true}
                        />
                      )}

                      {rental &&
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
                      }
                    </div>
                  </Col>
                  <Col lg={12} md={12} sm={12}>
                    <div className="mb-2">
                      <Label className="header-child"> Remarks :</Label>

                      <Input
                        value={remarks}
                        className="form-control-md"
                        id="input"
                        onChange={(e) => {
                          setremarks(e.target.value);
                        }}
                        placeholder="Enter Remarks"
                      />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            ) : null}
          </Card>
        </Col>

        <div className="m-3">
          <Col lg={12}>
            <div className="mb-1 footer_btn">
              {!isLoading ?
                <Button
                  type="button"
                  className="btn btn-info m-1 cu_btn"
                  onClick={() => {
                    if (vehicle_no == "" || vehicle_no?.toString().length !== 10) {
                      setvehicle_error(true);
                    }
                    else {
                      dispatch(setLoaded(true));
                      setis_recv(true);
                    }

                  }}
                >
                  Recieve
                </Button>
                :
                <Button type="button"
                  className="btn btn-info m-1 cu_btn">
                  <Loader />
                </Button>

              }
              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={handleAction}
              >
                Cancel
              </Button>
            </div>
          </Col>
        </div>
      </div>
    </>
  );
};

export default RecieveHubManifest;
