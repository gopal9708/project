import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../../components/pageTitle/PageTitle";
import Title from "../../../components/title/Title";
import { setToggle } from "../../../store/parentFilter/ParentFilter";
import SearchList from "../../../components/listDisplay/searchList/SearchList";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import Button from 'react-bootstrap/Button';
import { setAlertType, setDataExist, setShowAlert } from "../../../store/alert/Alert";
import {
  Input,
} from "reactstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import ImgModal from "../../../components/crop/ImgModal";
import Loader from "../../../components/loader/Loader";

const PacketTitle = [
  "Docket No.",
  "Packets",
  "Not Recieved",
  // ["Not Recieved", false],
];


const BoxDetail = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const location_data = useLocation();
  const navigate = useNavigate();
  const [data, setdata] = useState([]);
  const [docket_no, setdocket_no] = useState("")
  const [order_id, setorder_id] = useState()
  const [is_issue, setis_issue] = useState(false);
  const [remarks, setremarks] = useState("")
  const [local_cal_type, setlocal_cal_type] = useState("")
  //////
  const [isLoading, setIsLoading] = useState(false);
  const [received, setReceived] = useState([]);
  const [refresh, setrefresh] = useState(false);
  // console.log("received--------", received)
  const [row3, setrow3] = useState([{ 'issue_image': "" }]);
  // console.log("row3--------", row3)

  function handleIssueTypeChange(e, universal_no, index, universal_type, barcode, issue_location, barcode_type, issue_image) {
    setis_issue(true);
    const issueType = e.target.value;
    let remarks = "";

    const orderInfo = { universal_no, issueType, remarks, universal_type, barcode, issue_location, barcode_type, issue_image };
    if (["Broken", "Damage", "Not Received", "None", "Custom Check Failed", "Other"].includes(issueType)) {
      setReceived((prevReceived) => {
        const newReceived = [...prevReceived];
        newReceived[index] = orderInfo;
        return newReceived;
      });
    }

  }

  const [showModalOrder, setshowModalOrder] = useState({
    value: false,
    ind: "",
  });

  // console.log("showModalOrder---", showModalOrder)

  const getOrderBarcode = (no) => {
    axios.get(ServerAddress + `booking/orderboxqrcodecheck/${no}`, {

      headers: { Authorization: `Bearer ${accessToken}` }

    }).then((res) => {
      // console.log("ress", res)
      setdata(res.data);
      setdocket_no(res.data[0].docket_no)
      setlocal_cal_type(res.data[0].local_cal_type)
      let data = []
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        if (!data.includes(element.order)) {
          data.push(element.order);
        }
      }
      setorder_id(data)
      // console.log("data==========", data)
    }).catch((err) => {
      console.log("errrrrr", err)
    })
  }

  useLayoutEffect(() => {
    getOrderBarcode(location_data.state.order.vehicle_no);
    setdata([])
  }, [])

  const add_order_status = () => {
    setIsLoading(true)
    axios
      .post(
        ServerAddress + "booking/add_orderstatus/",
        {
          cal_type: local_cal_type,
          status: "SHIPMENT ARRIVED AT HUB",
          transit_status: "",
          transit_remarks: "",
          docket: order_id,
          // docket_no: docket_no,
          notreceived_pkt: received,
          remarks: toTitleCase(remarks).toUpperCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "Created") {
          setIsLoading(false)
          dispatch(
            setDataExist(
              `New Order Status 'SHIPMENT ARRIVED AT HUB' for Order ${docket_no
              } Added Sucessfully`
            )
          );
          dispatch(setAlertType("success"));
          dispatch(setShowAlert(true));
          navigate(-1);
        }
      })
      .catch((error) => {
        setIsLoading(false)
        alert(`Error Happen while posting Order Status  Data ${error}`);
      });
  };

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  return (
    <>
      <PageTitle page="PacketsDetail" />
      <Title title="Packets Detail" parent_title="PickedupOrders" />
      <div className="mx-3">
        <div className="container-fluid " style={{ background: "white" }}>
          <div className="mb-2 row">
            <div className="col-sm-4">
              <SearchList />
            </div>
            <div className="col-sm-8">
              <div
                className="text-sm-end"
              >
              </div>
            </div>

          </div>

          {/* DataTable */}
          <div className="table">
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
                  {PacketTitle.map((i, j) => {
                    return (
                      <th
                        style={{ whiteSpace: "nowrap", textAlign: "center" }}
                        key={j}
                      >
                        {i}
                      </th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {data.length === 0 ?
                  (
                    <tr>
                      <td>No Data Found</td>
                    </tr>
                  ) : (
                    data.map((pkt, index) => {
                      return (
                        <>
                          <tr
                            key={index}
                            style={{
                              borderWidth: 1,
                            }}
                          >
                            <td>{pkt.docket_no}</td>
                            <td>{pkt.barcode_no}</td>
                            <td>
                              <select
                                onChange={(e) =>
                                  handleIssueTypeChange(e, pkt.docket_no, index, "BOOKING", pkt.barcode_no, "ON RECEIVE", "PKT", '')
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
                                    placeholder="Enter Issue Remarks"
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
                      )
                    })
                  )

                }
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: "right" }}>
            {!isLoading ?
              <Button variant="success"
                onClick={() => {
                  add_order_status()
                }}
              >Save</Button>
              :
              <Button
                type="success"
                className={"btn btn-info m-1"}
              >
                <Loader />
              </Button>
            }
            <Button variant="danger" style={{ margin: "10px" }} onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default BoxDetail;
