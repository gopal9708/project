import React, { useState } from 'react'
import { Input } from "reactstrap";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
const PacketTitle = [
  "Docket No.",
  "Packets",
  "Not Recieved",
  // ["Not Recieved", false],
];



const PacketsDataFormat = ({ data, received,
  setReceived,setis_issue}) => {
    const [refresh, setrefresh] = useState(false);
  console.log("data--------", data)
  console.log("received--------", received)

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

  return (
    <>
      <div className="table">
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead>
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
                        {received[index] &&
                          received[index]["issueType"] === "Broken" && (
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