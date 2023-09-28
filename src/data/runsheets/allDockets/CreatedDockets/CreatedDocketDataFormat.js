/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import remove from "../../../../assets/images/Pdf/trash.png";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import Create_Docket_Title from "./CreatedDocketDataTitle";

const CreatedDocketDataFormat = ({ sel_rn_list, remove_list }) => {
  const [domestic_selected, setdomestic_selected] = useState(false);
  const [selected_domestics, setselected_domestics] = useState([]);
  const [data_title, setdata_title] = useState(Create_Docket_Title);

  return (
    <>
      <div className="table" style={{ overflowY: "auto", maxHeight: "250px" }}>
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead>
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {data_title.map((item, index) => {
                return (
                  <th
                    style={{ whiteSpace: "nowrap", textAlign: "center" }}
                    key={index}
                  >
                    {item}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
          {sel_rn_list.length === 0 ? (
            <tr>
              <td>Select Docket To Create Runsheet</td>
            </tr>
          ) : (
            sel_rn_list.map((rn_sel_order, index) => {
              let booking_date = rn_sel_order.booking_at.split("T")[0];
              return (
                <tr
                  key={index}
                  style={{
                    borderWidth: 1,
                    fontSize: "12.5px",
                  }}
                >
                  <td>{rn_sel_order.docket_no}</td>

                  <td>{booking_date}</td>
                  <td>
                    {toTitleCase(rn_sel_order.shipper_state) +
                      ", " +
                      toTitleCase(rn_sel_order.shipper_city)}
                  </td>
                  <td>
                    {toTitleCase(rn_sel_order.consignee_state) +
                      ", " +
                      toTitleCase(rn_sel_order.consignee_city)}
                  </td>
                  <td>{rn_sel_order.actual_weight}</td>
                  <td>{rn_sel_order.total_quantity}</td>
                  <td>{(rn_sel_order.issue).length}</td>
                  <td>{(rn_sel_order.issue_notreceived).length}</td>
                  <td>{toTitleCase(rn_sel_order.delivery_type)}</td>

                  <td>
                    <div>
                      <img
                        src={remove}
                        width="20"
                        height="20"
                        onClick={() => {
                          remove_list(index);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
        </table>
      </div>
    </>
  );
};

export default CreatedDocketDataFormat;
