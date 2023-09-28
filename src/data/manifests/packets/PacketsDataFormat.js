import React, { useLayoutEffect, useState, useEffect } from 'react'
import { Input } from "reactstrap";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import ImgModal from '../../../components/crop/ImgModal';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
const PacketTitle = [
  "Docket No.",
  "Packets",
  "Not Recieved",
  // ["Not Recieved", false],
];



const PacketsDataFormat = ({ data, received1,
  setReceived1, setis_issue }) => {


  const [received, setReceived] = useState([]);
  const [refresh, setrefresh] = useState(false);
  console.log("data--------", data)
  console.log("received--------", received)
  // received[received.length - 1]['issue_image'] ="0000"
  // console.log("received2222--------", received)
  // console.log("received-len-------", received[0]['issue_image'])
  const [row3, setrow3] = useState([]);
  console.log("row3======", row3)

  useLayoutEffect(() => {
    setReceived(received1)
    setrow3(received1)
  }, [received1])

  // useEffect(() => {
  //   setReceived1(received)
  // }, [received])


  // const [notreceived_packets, setnotreceived_packets] = useState([])
  // const [selected_id, setselected_id] = useState([]);
  // console.log("notreceived_packets----", notreceived_packets)
  // console.log("selected_id------", selected_id)
  // const handle_checked = (id) => {

  //   if (selected_id.includes(id)) {
  //     let lis = [...selected_id];
  //     setselected_id(lis.filter((e) => e !== id));
  //   } else {
  //     setselected_id([...selected_id, id]);
  //   }
  // };
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
    }

  }

  const [showModalOrder, setshowModalOrder] = useState({
    value: false,
    ind: "",
  });
  console.log("showModalOrde---r", showModalOrder)

  // useEffect(() => {
  //   if (img !== "" && received.length > 0) {
  //     received[received?.length - 1]['issue_image'] = img
  //   }
  // }, [img])

  return (
    <>
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

                  // setdocumentOrder(val);
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
                    received[showModalOrder.ind]['issue_image'] = val;
                  } else {
                    received[received.length - 1]['issue_image'] = val;
                  }
                  // setdoc_result_image([...doc_result_image, val])
                }}
              />
            ) : null}

            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {/* {PacketTitle.map((i,index)=>)} */}
              {PacketTitle.map((i, j) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={j}
                  >
                    {i}
                    {/* {typeof i === "object" ? (
                    <span
                    onClick={() => {
                      i[1] = !i[1];
                        if (i[1]) {
                          let ord_list = data.map((v) => v.barcode_no);
                          setselected_id(ord_list);
                        } else {
                          setselected_id([]);
                        }
                      
                    }}
                    >
                    {i[1] ? (
                          <FiCheckSquare size={15} />
                        ) : (
                          <FiSquare size={15} />
                        )}
                    </span>
                     ) : null} */}
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
                        {/* /////////// */}
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
                        {/* ////////////// */}
                        {received[index] &&
                          received[index]["issueType"] === "Damage" && (
                            <td>
                              <Input
                                type="file"
                                name="file"
                                id="exampleFile"
                                size={"sm"}
                                style={{ width: "12vw" }}
                              />
                            </td>
                          )}
                        {received[index] &&
                          received[index]["issueType"] === "Custom Check Failed" && (
                            <td>
                              <Input
                                type="file"
                                name="file"
                                id="exampleFile"
                                size={"sm"}
                                style={{ width: "12vw" }}
                              />
                            </td>
                          )}
                        {received[index] &&
                          received[index]["issueType"] === "Other" && (
                            <td>
                              <Input
                                type="file"
                                name="file"
                                id="exampleFile"
                                size={"sm"}
                                onChange={(val) => {
                                  received[index]["issue_image"] =
                                    val.target.files[0];
                                  setrefresh(!refresh);
                                }}
                                style={{ width: "12vw" }}
                              />
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
                      {/* <td
                        onClick={() => {
                          handle_checked(
                            pkt.barcode_no,
                          );
                        }}
                      >
                        {selected_id.includes(pkt.barcode_no) ? (
                          <FiCheckSquare size={15} />
                        ) : (
                          <FiSquare size={15} />
                        )}
                      </td> */}
                    </>
                  )
                })
              )

            }
          </tbody>
        </table>
      </div>
    </>

  )
}

export default PacketsDataFormat