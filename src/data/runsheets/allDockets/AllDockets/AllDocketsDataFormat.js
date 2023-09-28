/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import All_Docket_title from "./AllDocketsDataTitle";
import Button from "react-bootstrap/Button";
import toTitleCase from "../../../../lib/titleCase/TitleCase";

const AllDocketsDataFormat = ({ check, local_list }) => {
  const [data_title, setdata_title] = useState(All_Docket_title);
  // const checked = useSelector(
  //   state => state.main_checkbox.main_checkbox.commodityes
  // );

  const [local_selected, setlocal_selected] = useState(false);
  const [selected_locals, setselected_locals] = useState([]);

  // useEffect(() => {
  //   setlocal_selected(checked);
  //   if (local_selected == false) {
  //     setselected_locals([]);
  //   }
  // }, [checked]);

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
            {local_list.length === 0 ? (
              <tr>
                <td>No Data Found</td>
              </tr>
            ) : (
              local_list.map((local, index) => {
                let booking_date_n = local.booking_at.split("T")[0];
                return (
                  <tr
                    key={index}
                    style={{
                      borderWidth: 1,
                      fontSize: "12.5px",
                    }}
                  >
                    <td>{local.docket_no}</td>
                    <td>{booking_date_n}</td>
                    <td>
                      {toTitleCase(local.shipper_state) +
                        ", " +
                        toTitleCase(local.shipper_city)}
                    </td>
                    <td>
                      {toTitleCase(local.consignee_state) +
                        ", " +
                        toTitleCase(local.consignee_city)}
                    </td>
                    <td>{local.actual_weight}</td>
                    <td>{local.total_quantity}</td>
                    <td>{(local.issue).length}</td>
                      <td>{(local.issue_notreceived).length}</td>
                    <td>{toTitleCase(local.delivery_type)}</td>
                    <td>
                      {" "}
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => {
                          check(index);
                        }}
                      >
                        Add
                      </Button>
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

export default AllDocketsDataFormat;
