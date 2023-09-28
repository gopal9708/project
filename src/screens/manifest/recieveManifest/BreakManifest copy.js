/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Col, Row, CardBody, CardTitle, Label, Input } from "reactstrap";
import Modal from "react-bootstrap/Modal";

import { IconContext } from "react-icons";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import NSearchInput from "../../../components/formComponent/nsearchInput/NSearchInput";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";

import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/pagination/Pagination";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import RecieveDataFormat from "../../../data/manifests/recieveManifest/RecieveManifestFormat";
import { setLoaded } from "../../../store/manifest/RecieveManifest";
import Question from "../../../assets/images/bookings/question.png";
import BreakManifestT from "../../../data/manifests/recieveManifest/BreakManifest";
const BreakManifest = ({ depart }) => {
  const [is_submit, setis_submit] = useState(false);
  const [is_issue, setis_issue] = useState(false);
  const [received, setReceived] = useState([]);
  const [notReceived, setNotReceived] = useState([]);
  console.log("received received===", received)

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
  const [is_recv, setis_recv] = useState(false);

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

  console.log("99999999999999999",location_data)
  useLayoutEffect(() => {
    let manifest_data = location_data.state.depart;
    console.log("vehicle no {{{{",manifest_data)
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
        alert(`Error While  Updateing Manifest ${err}`);
      });
  };
  // useEffect(() => {
  //   if (is_submit) {
  //     RecieveManifest();
  //   }
  // }, [is_submit]);

  const [show, setShow] = useState(false);
console.log("[][]data",data)
let docket_no_list = []
 for (let index = 0; index < data.length; index++) {
  const element = data[index]?.docket_number;
  docket_no_list.push(element)
  console.log("element[]",element)
 }
 console.log("docket_number---",docket_no_list)
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

  return (
    <>
      <Modal
        show={is_break}
        onHide={()=>{
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

          <Button variant="success" onClick={() => {
            RecieveManifest("STEP2");
          }}>
            Proceed
          </Button>
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
              
              <BreakManifestT
              manifest_no={manifest_no}
              is_issue={is_issue}
              setis_issue={setis_issue}
              received={received}
              setReceived={setReceived}
              // notReceived={notReceived}
              // setNotReceived={setNotReceived}
            />
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
                      {console.log("firstharshit998777787",is_break)}
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
