/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Unrunsheets_Data_title from "./UnrunsheetsDataTitle";
import pdf from "../../../../assets/images/Pdf/printer.png";
import remove from "../../../../assets/images/Pdf/trash.png";
import "./unmanifest.css";
import toTitleCase from "../../../../lib/titleCase/TitleCase";

const UnrunsheetsDataFormat = ({ Manifest_list, remove_list }) => {
  const [data_title, setdata_title] = useState(Unrunsheets_Data_title);

  return (
    <>
      <div className="table">
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
            {Manifest_list.length === 0 ? (
              <tr>
                <td>Select Docket To Create Manifest</td>
              </tr>
            ) : (
              Manifest_list.map((Manifest, index) => {
                let booking_date_n = Manifest.booking_at
                  ? Manifest.booking_at.split("T")[0]
                  : "none";
                return (
                  <tr
                    key={index}
                    style={{
                      borderWidth: 1,
                    }}
                  >
                    <td>{Manifest.docket_no}</td>

                    <td>{booking_date_n}</td>
                    <td>{toTitleCase(Manifest.shipper_city)+", "+toTitleCase(Manifest.shipper_locality)}</td>
                    <td>{toTitleCase(Manifest.consignee_city)+", "+toTitleCase(Manifest.consignee_locality)}</td>
                    <td>{Manifest.actual_weight}</td>
                    <td>{Manifest.total_quantity}</td>
                    <td>{(Manifest.issue).length}</td>
                    <td>{(Manifest.issue_notreceived).length}</td>
                    <td>{toTitleCase(Manifest.delivery_type)}</td>
                    {/* <td>
                      <div>
                        <img src={detail} width="20" height="20" />
                      </div>
                    </td> */}
                    <td>
                      <div>
                        <Link
                          // to="/manifest/manifestPdf"
                          to="../../../booking/orders/OrderPdf"
                          state={{ order: Manifest }}
                        >
                          <img src={pdf} width="20" height="20" />
                        </Link>
                      </div>
                    </td>
                    <td style={{ cursor: "pointer" }}>
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

export default UnrunsheetsDataFormat;
