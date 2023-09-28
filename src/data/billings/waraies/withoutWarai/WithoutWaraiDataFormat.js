import React from "react";
import { Button, Label } from "reactstrap";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import WithoutWaraiDataTitle from "./WithoutWaraiDataTitle";

const WithoutWaraiDataFormat = ({ wow_ords_list, check }) => {

  return (
    <div className="table">
      <Label>Without Warai Orders</Label>
      <table
        className="topheader table-light"
        style={{ blocalCollapse: "collapse", width: "100%", blocalWidth: 1 }}
      >
        <thead>
          <tr style={{ lineHeight: 2, blocalWidth: 1 }}>
            {WithoutWaraiDataTitle.map((item, index) => {
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
          {wow_ords_list.length === 0
            ? " No Data Found"
            : wow_ords_list
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
                      <td>
                        {local.actual_weight
                          ? local.actual_weight
                            ? local.actual_weight
                            : local.order_id__actual_weight
                          : "-"}
                      </td>
                      <td>
                        {local.total_quantity
                          ? local.total_quantity
                          : local.order_id__total_quantity}
                      </td>
                      <td>
                        {local.delivery_type
                          ? local.delivery_type
                          : local.order_id__delivery_type}
                      </td>

                      <td>
                        {" "}
                        <Button
                          variant="success"
                          onClick={() => {
                            check(index);
                          }}
                        >
                          Add Warai
                        </Button>
                      </td>
                    </tr>
                  );
                })}
        </tbody>
      </table>
    </div>
  );
};

export default WithoutWaraiDataFormat;
