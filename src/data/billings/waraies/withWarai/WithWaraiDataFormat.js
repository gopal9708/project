import React from "react";
import { Button, Label } from "reactstrap";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import WithWaraiDataTitle from "./WithWaraiDataTitle";

const WithWaraiDataFormat = ({ warai_ords_list, remove_list, total_warai }) => {

  return (
    <div className="table">
      <Label>With Warai Orders</Label>

      <table
        className="topheader table-light"
        style={{ blocalCollapse: "collapse", width: "100%", blocalWidth: 1 }}
      >
        <thead>
          <tr style={{ lineHeight: 2, blocalWidth: 1 }}>
            {WithWaraiDataTitle.map((item, index) => {
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
          {warai_ords_list.length === 0
            ? " No Data Found"
            : warai_ords_list
                // .filter(local => {
                //   if (
                //     local.order_id__awb_no ? local.order_id__awb_no.includes(search) : local.awb_no.includes(search)
                //   ) {
                //     return local;
                //   }
                // })
                .map((local, index) => {
                  let booking_date_n = local.booking_at.split("T")[0];

                  return (
                    <tr
                      key={index}
                      style={{
                        blocalWidth: 1,
                      }}
                    >
                      <td>{local.docket_no}</td>
                      <td>{booking_date_n}</td>
                      <td>
                        {local.shipper_pincode +
                          ", " +
                          toTitleCase(local.shipper_city)}
                      </td>
                      <td>
                        {local.consignee_pincode +
                          ", " +
                          toTitleCase(local.consignee_city)}
                      </td>
                      <td>{local.delivery_type}</td>
                      <td>{local.actual_weight}</td>
                      <td>{local.total_quantity}</td>
                      <td>{total_warai}</td>
                      <td>
                        {total_warai !== 0
                          ? local.total_quantity * total_warai
                          : "-"}
                      </td>
                      <td>
                        <div>
                          <Button
                            variant="danger"
                            onClick={() => {
                              remove_list(index);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
        </tbody>
      </table>
    </div>
  );
};

export default WithWaraiDataFormat;
