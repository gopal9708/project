import React, { useState } from "react";
import { Input, Label } from "reactstrap";
import ClientOrdersDataTitle from "./ClientOrdersDataTitle";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

const ClientOrdersDataFormat = ({ cl_ords_list }) => {
  const [refresh, setrefresh] = useState(false);

  return (
    <div className="table">
      <Label>Client Orders</Label>
      <table
        className="topheader table-light"
        style={{ blocalCollapse: "collapse", width: "100%", blocalWidth: 1 }}
      >
        <thead>
          <tr style={{ lineHeight: 2, blocalWidth: 1 }}>
            {ClientOrdersDataTitle.map((item, index) => {
              return (
                <th
                  style={{ whiteSpace: "nowrap", textAlign: "center" }}
                  key={index}
                >
                  {typeof item === "object" && (
                    <span
                      onClick={() => {
                        item[1] = !item[1];

                        for (const or of cl_ords_list) {
                          or.included = !item[1];
                        }

                        setrefresh(!refresh);
                      }}
                    >
                      {item[1] ? (
                        <FiCheckSquare size={20} />
                      ) : (
                        <FiSquare size={20} />
                      )}
                    </span>
                  )}{" "}
                  {typeof item === "object" ? item[0] : item}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {cl_ords_list.length === 0 ? (
            <tr>" No Data Found"</tr>
          ) : (
            cl_ords_list.map((ord, index) => {
              let booking_date_n = ord.booking_at.split("T")[0];

              let freight_charge = ord.ordertocost.filter(
                (v) => v.cost_name.toUpperCase() === "FREIGHT"
              );
              let oda_charge = ord.ordertocost.filter(
                (v) => v.cost_name.toUpperCase() === "ODA"
              );
              let warai_charge = ord.ordertocost.filter(
                (v) => v.cost_name.toUpperCase() === "WARAI"
              );

              let other_charge = ord.ordertocost.filter(
                (v) =>
                  v.cost_name.toUpperCase() !== "WARAI" &&
                  v.cost_name.toUpperCase() !== "ODA" &&
                  v.cost_name.toUpperCase() !== "FREIGHT"
              );

              let frg =
                freight_charge.length > 0
                  ? Math.round(freight_charge[0]["cost_value"])
                  : "-";

              let od =
                oda_charge.length > 0
                  ? Math.round(oda_charge[0]["cost_value"])
                  : "-";
              let wra =
                warai_charge.length > 0
                  ? Math.round(warai_charge[0]["cost_value"])
                  : "-";
              let oth = 0;
              if (other_charge.length > 0) {
                oth = Math.round(
                  other_charge.map((v) => v.cost_value).reduce((a, b) => a + b)
                );
              } else {
                oth = "-";
              }

              return (
                <tr key={index}>
                  <td>
                    <div
                      onClick={() => {
                        ord.included = !ord.included;
                        setrefresh(!refresh);
                      }}
                    >
                      {ord.included ? (
                        <div>
                          <FiSquare size={20} />
                        </div>
                      ) : (
                        <div>
                          <FiCheckSquare size={20} />
                        </div>
                      )}
                    </div>
                  </td>
                  <td>{ord.docket_no}</td>
                  <td>{ord.delivery_type}</td>
                  <td>{booking_date_n}</td>
                  <td>{ord.shipper_pincode + ", " + ord.shipper_city}</td>
                  <td>{ord.consignee_pincode + ", " + ord.consignee_city}</td>
                  <td>{ord.local_delivery_type}</td>
                  <td>{ord.actual_weight}</td>
                  <td>{ord.total_quantity}</td>
                  <td>{ord.cold_chain ? "Yes" : "No"}</td>
                  <td>{frg}</td>
                  <td>{od}</td>
                  <td>{wra}</td>
                  <td>{oth}</td>
                  <td>
                    <Input
                      value={ord.add_rmark}
                      onChange={(val) => {
                        ord.add_rmark = val.target.value;
                        setrefresh(!refresh);
                      }}
                    />
                  </td>
                  <td>{ord.commodity_name}</td>
                  <td>{ord.shipper_name}</td>
                  <td>{ord.consignee_name}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientOrdersDataFormat;
