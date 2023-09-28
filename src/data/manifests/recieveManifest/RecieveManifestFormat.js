/* eslint-disable */
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import correct from "../../../assets/images/bookings/check-mark.png";
import cross from "../../../assets/images/bookings/remove.png";
import {
  setFuther_conn_id,
  setGoing_hub_id,
  setIssue_id,
  setOrder_id,
} from "../../../store/manifest/RecieveManifest";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { Input } from "reactstrap";

const RecieveManifestTitle = [
  "Manifest No",
  "Bag or Box",
  "BarCode No",
  "Issue Type"
];


const RecieveDataFormat = ({
  data,
  barcode,
  is_issue,
  setis_issue,
  received,
  setReceived,
  // notReceived,
  // setNotReceived,
}) => {
  const [refresh, setrefresh] = useState(false);
  const [selected_id, setselected_id] = useState([]);
  console.log("selected_id--===--", selected_id)
  console.log("data[[[[[", data)
  const [going_hub_id, setgoing_hub_id] = useState([]);
  console.log("going_hub_id----====---", going_hub_id)
  const [issue_id, setissue_id] = useState([]);
  const loaded = useSelector((state) => state.manifest.loaded);
  const [issue, setissue] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFuther_conn_id(selected_id));
    dispatch(setGoing_hub_id(going_hub_id));
  }, [selected_id, going_hub_id, issue]);

  useEffect(() => {
    let orderid_list = data.map((v) => v.id);
    dispatch(setOrder_id(orderid_list));
  }, [data]);

  useEffect(() => {
    if (issue.length >= 1) {
    }
    dispatch(setIssue_id(issue));
  }, [loaded]);


  function handleIssueTypeChange(e, universal_no, index, universal_type, barcode, issue_location, barcode_type, issue_image) {
    setis_issue(true);
    const issueType = e.target.value;
    let remarks = "";
    // if (issueType === "Other") {
    //   remarks = prompt("Enter remarks:");
    // }
    const orderInfo = { universal_no, issueType, remarks, universal_type, barcode, issue_location, barcode_type, issue_image };

    if (["Broken", "Damage", "Not Received", "None", "Custom Check Failed", "Other"].includes(issueType)) {
      console.log("issueType-----", issueType)
      setReceived((prevReceived) => {
        const newReceived = [...prevReceived];
        newReceived[index] = orderInfo;
        return newReceived;

      });
      // setNotReceived((prevNotReceived) =>
      //   prevNotReceived.filter((o) => o.bag_barcode !== bag_barcode)
      // );
    }
    // else {
    //   setNotReceived((prevNotReceived) => {
    //     const newNotReceived = [...prevNotReceived];
    //     newNotReceived[index] = orderInfo;
    //     return newNotReceived;
    //   });
    //   setReceived((prevReceived) =>
    //     prevReceived.filter((o) => o.bag_barcode !== bag_barcode)
    //   );
    // }
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
              {RecieveManifestTitle.map((item, index) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={index}
                  >
                    {item}{" "}
                    {typeof item === "object" ? (
                      <span
                        onClick={() => {
                          item[1] = !item[1];
                          setrefresh(!refresh);
                          if (item[0] === "Futher Connected") {
                            if (item[1]) {
                              let ord_list = data.map((v) => v.id);
                              setselected_id(ord_list);
                            } else {
                              setselected_id([]);
                            }
                          } else {
                            if (item[1]) {
                              let ord_list = data.map((v) => v.id);
                              setgoing_hub_id(ord_list);
                            } else {
                              setgoing_hub_id([]);
                            }
                          }
                        }}
                      >

                        {item[1] ? (
                          <FiCheckSquare size={15} />
                        ) : (
                          <FiSquare size={15} />
                        )}
                      </span>
                    ) : null}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {barcode.length === 0 ? (
              <tr>
                <td>No Data Found</td>
              </tr>
            ) : (
              barcode.map((order, index) => {
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
                      <td>{order.menifest_no}</td>
                      <td>{order.box_tpye}</td>
                      <td>
                        {order.barcode_no}
                      </td>

                      <td>
                        <select
                          onChange={(e) =>
                            handleIssueTypeChange(e, order.menifest_no, index, "MANIFEST", order.barcode_no, "ON RECEIVE", order.box_tpye, '')

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
                      {console.log("received999999", received)}
                      {/* {console.log("notReceived999999",notReceived)} */}

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
    </>
  );
};

export default RecieveDataFormat;
