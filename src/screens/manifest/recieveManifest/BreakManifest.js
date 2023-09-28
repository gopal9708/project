/* eslint-disable */
import React, { useState, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Col, Row, CardBody, CardTitle, Label, Input } from "reactstrap";
import Modal from "react-bootstrap/Modal";

import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
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
import ImgModal from "../../../components/crop/ImgModal";
import Loader from "../../../components/loader/Loader";
const BreakManifest = ({ depart }) => {
  const [is_issue, setis_issue] = useState(false);
  const [received, setReceived] = useState([]);
  const [notReceived, setNotReceived] = useState([]);
  // console.log("received received===", received)
  const [isLoading, setIsLoading] = useState(false);
  const [is_issuerec, setis_issuerec] = useState(false);
  const [receivedrec, setReceivedrec] = useState([]);
  const [notReceivedrec, setNotReceivedrec] = useState([]);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const success = useSelector((state) => state.alert.show_alert);
  const [remarks, setremarks] = useState("");
  const dispatch = useDispatch();
  const location_data = useLocation();
  const navigate = useNavigate();
  const order_id = useSelector((state) => state.manifest.order_id);
  const issue_id = useSelector((state) => state.manifest.issueorder_id);
  const loaded = useSelector((state) => state.manifest.loaded);

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

  const [coloader_selected, setcoloader_selected] = useState("");
  const [coloader_id, setcoloader_id] = useState("");
  const [from_branch, setfrom_branch] = useState("");
  const [to_branch, setto_branch] = useState("");
  const [manifest_no, setmanifest_no] = useState("");
  const [manifest_id, setmanifest_id] = useState("");
  const [total_bags, settotal_bags] = useState("");
  const [manifest_weight, setmanifest_weight] = useState("");
  const [airway_bill_no, setairway_bill_no] = useState("");
  const [coloader_mode, setcoloader_mode] = useState("");
  const [flight_name, setflight_name] = useState("");
  const [data, setdata] = useState([]);

  // console.log("99999999999999999", location_data)
  useLayoutEffect(() => {
    let manifest_data = location_data.state.depart;
    // console.log("vehicle no {{{{", manifest_data)
    setmanifest_no(manifest_data.manifest_no);
    setvehicle_no(manifest_data.vehicle_no);
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
  }, []);

  const [trans_mode_selected, settrans_mode_selected] = useState("");
  const [vehicle_no, setvehicle_no] = useState("");
  const get_orderof_manifest = () => {
    axios
      .get(
        ServerAddress +
        `manifest/get_manifest_order/?manifest_no=${manifest_no}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setdata(response.data);
      })
      .catch((err) => {
        alert(`Error While Loading Client , ${err}`);
      });
  };

  useLayoutEffect(() => {
    manifest_no && get_orderof_manifest();
  }, [manifest_no, success]);

  const RecieveManifest = (steps) => {
    setIsLoading(true)
    axios
      .post(
        ServerAddress + "manifest/add_recieve_manifest/",
        {
          manifest_no: manifest_no,
          is_received: "True",
          awb_no_list: order_id,
          issue_type: issue_id,
          is_issue: is_issue,
          is_disputed: false,
          disputed_by: "",
          dispute_username: "",
          remarks: remarks,
          issue_recieved_order: received,
          issue_notrecieved_order: notReceived,
          vehicle_no: vehicle_no,
          transport_mode: trans_mode_selected,
          step: steps,
          issue_recieved_order_rec: receivedrec,
          issue_notrecieved_order_rec: notReceivedrec,
          is_issue_rec: is_issuerec,
        },

        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        setIsLoading(false)
        if (response.data.status === "success") {
          setShow(false);
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Manifest  "${manifest_no}" Recieved sucessfully`)
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
  // useEffect(() => {
  //   if (is_submit) {
  //     RecieveManifest();
  //   }
  // }, [is_submit]);

  const [show, setShow] = useState(false);
  console.log("[][]data", data)
  let docket_no_list = []
  for (let index = 0; index < data.length; index++) {
    const element = data[index]?.docket_number;
    docket_no_list.push(element)
    console.log("element[]", element)
  }
  console.log("docket_number---", docket_no_list)
  const handleClose = () => {
    RecieveManifest("Steps1");
    setis_break(false);
    setShow(false);
  };
  const handleCloseAll = () => {
    setis_break(false);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  // For Image Modal
  const [data2, setdata2] = useState([])
  const [refresh, setrefresh] = useState(false);
  const getOrderPieces = () => {
    // let state_list = [...state_list_s];
    let state_list = [];
    axios
      .get(
        ServerAddress +
        `booking/orderboxqrcodecheck/${manifest_no}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((resp) => {
        console.log("resp-------", resp)
        if (resp.data.length > 0) {
          setdata2(resp.data)
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get orderboxqrcodecheck, ${err}`);
      });
  };


  function handleIssueTypeChange(e, universal_no, index, universal_type, barcode, issue_location, barcode_type, issue_image) {
    setis_issue(true);
    const issueType = e.target.value;
    let remarks = "";
    // if (issueType === "Other") {
    //   remarks = prompt("Enter remarks:");
    // }
    const orderInfo = { universal_no, issueType, remarks, universal_type, barcode, issue_location, barcode_type, issue_image };
    if (["Broken", "Damage", "Not Received", "None", "Custom Check Failed", "Other"].includes(issueType)) {
      setReceived((prevReceived) => {
        const newReceived = [...prevReceived];
        newReceived[index] = orderInfo;
        return newReceived;
      });
      // setNotReceived((prevNotReceived) =>
      //   prevNotReceived.filter((o) => o.docketNo !== docketNo)
      // );
    }
    // else {
    //   setNotReceived((prevNotReceived) => {
    //     const newNotReceived = [...prevNotReceived];
    //     newNotReceived[index] = orderInfo;
    //     return newNotReceived;
    //   });
    //   setReceived((prevReceived) =>
    //     prevReceived.filter((o) => o.docketNo !== docketNo)
    //   );
    // }
  }
  useLayoutEffect(() => {
    if (manifest_no !== "") {
      getOrderPieces()
    }
  }, [manifest_no]);

  const RecieveManifestTitle = [
    "Docket No",
    "Barcode Number",
    "Issue Type",
  ];
  const [showModalOrder, setshowModalOrder] = useState({
    value: false,
    ind: "",
  });

  const [row3, setrow3] = useState([{ 'issue_image': "" }]);


  return (
    <>
      <Modal
        show={is_break}
        onHide={() => {
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
            Are You Sure You Want To Break This Manifest {manifest_no}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              setis_break(false);
            }}
          >
            Cancel
          </Button>
          {!isLoading ?
            <Button variant="success" onClick={() => {
              RecieveManifest("STEP2");
            }}>
              Proceed
            </Button>
            :
            <Button
              variant="success"
            >
              <Loader />
            </Button>
          }
        </Modal.Footer>
      </Modal>


      {/* Modal For Break manifest Started*/}
      <Title title="Break Manifest" parent_title="Manifests" />
      <PageTitle page="BreakManifest" />
      <div className="mt-0 m-3">
        <Col lg={12}>
          <Card className="shadow bg-white rounded">
            <CardBody style={{ paddingTop: "0px" }}>
              <Row>
                <div
                  className="container-fluid"
                  style={{ background: "white" }}
                >

                  {/* DataTable */}
                  <div className="table" style={{ overflow: "scroll" }}>
                    <table
                      className="topheader table-light"
                      style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
                    >
                      <thead>
                        {showModalOrder.value ? (
                          <ImgModal
                            modal={showModalOrder.value}
                            modal_set={() => {
                              setshowModalOrder({
                                ...showModalOrder,
                                value: false,
                              });
                            }}
                            pre_image={showModalOrder.ind !== "" ? received[showModalOrder.ind]['issue_image'] : ""}
                            upload_image={(val) => {
                              if (showModalOrder.ind !== "") {
                                row3[showModalOrder.ind]['issue_image'] = val;
                                setshowModalOrder({
                                  ...showModalOrder,
                                  value: false,
                                  ind: "",
                                });
                              } else {
                                row3[row3.length - 1]['issue_image'] = val;
                              }
                            }}
                            result_image={(val) => {
                              setrefresh(!refresh)
                              if (showModalOrder.ind !== "") {
                                received[showModalOrder.ind]['issue_image'] = [val];
                              } else {
                                received[received.length - 1]['issue_image'] = [val];
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
                        {data2.length === 0 ? (
                          <tr>
                            <td>No Data Found</td>
                          </tr>
                        ) : (
                          data2.map((order, index) => {

                            return (
                              <>
                                <tr
                                  key={index}
                                  style={{
                                    borderWidth: 1,
                                  }}
                                >
                                  <td>{order.docket_no}</td>
                                  <td>{order.barcode_no}</td>

                                  <td>
                                    <select
                                      onChange={(e) =>
                                        handleIssueTypeChange(e, order.docket_no, index, "BOOKING", order.barcode_no, "ON BREAK", "PKT", '')
                                      }
                                    >
                                      <option defaultChecked>Select Issue</option>
                                      <option value="Not Received">Not Received</option>
                                      <option value="Broken">Broken</option>
                                      <option value="Damage">Damage</option>
                                      <option value="Custom Check Failed">Custom Check Failed</option>
                                      <option value="Other">Other</option>
                                      <option value="None">None</option>
                                    </select>
                                  </td>
                                  {received[index] &&
                                    received[index]["issueType"] === "Broken" && (
                                      <td>
                                        <div style={{ width: "100%" }} key={index}>
                                          {received[index]['issue_image'] ? (
                                            <img
                                              src={received[index]['issue_image']}
                                              style={{
                                                height: "95px",
                                                width: "95px",
                                                borderRadius: "10px",
                                                paddingBottom: "5px",
                                              }}
                                              onClick={() => {
                                                setshowModalOrder({
                                                  ...showModalOrder,
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
                                                  setshowModalOrder({
                                                    ...showModalOrder,
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


                                  {received[index] &&
                                    received[index]["issueType"] === "Damage" && (
                                      <td>
                                        <div style={{ width: "100%" }} key={index}>
                                          {received[index]['issue_image'] ? (
                                            <img
                                              src={received[index]['issue_image']}
                                              style={{
                                                height: "95px",
                                                width: "95px",
                                                borderRadius: "10px",
                                                paddingBottom: "5px",
                                              }}
                                              onClick={() => {
                                                setshowModalOrder({
                                                  ...showModalOrder,
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
                                                  setshowModalOrder({
                                                    ...showModalOrder,
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

                                  {received[index] &&
                                    received[index]["issueType"] === "Custom Check Failed" && (
                                      <td>
                                        <div style={{ width: "100%" }} key={index}>
                                          {received[index]['issue_image'] ? (
                                            <img
                                              src={received[index]['issue_image']}
                                              style={{
                                                height: "95px",
                                                width: "95px",
                                                borderRadius: "10px",
                                                paddingBottom: "5px",
                                              }}
                                              onClick={() => {
                                                setshowModalOrder({
                                                  ...showModalOrder,
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
                                                  setshowModalOrder({
                                                    ...showModalOrder,
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


                                  {received[index] &&
                                    received[index]["issueType"] === "Other" && (
                                      <td>
                                        <div style={{ width: "100%" }} key={index}>
                                          {received[index]['issue_image'] ? (
                                            <img
                                              src={received[index]['issue_image']}
                                              style={{
                                                height: "95px",
                                                width: "95px",
                                                borderRadius: "10px",
                                                paddingBottom: "5px",
                                              }}
                                              onClick={() => {
                                                setshowModalOrder({
                                                  ...showModalOrder,
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
                                                  setshowModalOrder({
                                                    ...showModalOrder,
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
                                {received[index] &&
                                  received[index]["issueType"] === "Other" && (
                                    <tr>
                                      <td colSpan={12}>
                                        <Input
                                          type="text"
                                          id="input"
                                          placeholder="Enter Issue"
                                          onChange={(val) => {
                                            received[index]["remarks"] =
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
                        value={manifest_no}
                      />
                    </div>
                  </Col>
                  <Col lg={4} md={8} sm={8}>
                    <div className="mb-2">
                      <Label className="header-child">Vehcile No* :</Label>
                      <Input
                        name="vehicle_no"
                        type="text"
                        id="input"
                        maxLength={10}
                        disabled
                        value={vehicle_no}
                        onChange={(e) => {
                          setvehicle_no(e.target.value);
                        }}
                      />
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
              <Button
                type="button"
                className="btn btn-info m-1 cu_btn"
                onClick={() => {
                  // dispatch(setLoaded(true));
                  setis_break(true);
                }}
              >
                Break
              </Button>

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

export default BreakManifest;
