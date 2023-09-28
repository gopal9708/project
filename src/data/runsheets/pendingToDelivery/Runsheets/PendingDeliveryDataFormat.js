/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import pdf from "../../../../assets/images/Pdf/printer.png";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import toTitleCase from "../../../../lib/titleCase/TitleCase";
import PendingDeliveryDataTitle from "./PendingDeliveryDataTitle";

const PendingDeliveryDataFormat = ({ check, local_list }) => {
  const searchData = useSelector((state) => state.searchbar.search_item);
  const [data_title, setdata_title] = useState(PendingDeliveryDataTitle);
  console.log("local_list----", local_list);
  useEffect(() => {
    let a = local_list.map((v) => v.issue_location)
    console.log("a-------------", a)
  }, [local_list])

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
            {local_list.length === 0 ? (
              <tr>
                <td>No Data Found</td>
              </tr>
            ) : (
              local_list
                .filter((local) => {
                  if (searchData === "") {
                    return local;
                  } else if (
                    local.docket_no
                      .toLowerCase()
                      .includes(searchData.toLowerCase())
                  ) {
                    return local;
                  }
                  else if (
                    local.shipper_city
                      .toLowerCase()
                      .includes(searchData.toLowerCase())
                  ) {
                    return local;
                  }
                  else if (
                    local.consignee_city
                      .toLowerCase()
                      .includes(searchData.toLowerCase())
                  ) {
                    return local;
                  }
                  else if (
                    local.shipper_locality
                      .toLowerCase()
                      .includes(searchData.toLowerCase())
                  ) {
                    return local;
                  }
                  else if (
                    local.consignee_locality
                      .toLowerCase()
                      .includes(searchData.toLowerCase())
                  ) {
                    return local;
                  }
                })
                .map((local, index) => {
                  let booking_date_n = local.booking_at
                    ? local.booking_at.split("T")[0]
                    : "none";

                  return (
                    <tr
                      key={index}
                      style={{
                        borderWidth: 1,
                      }}
                    >
                      <td>{local.docket_no}</td>
                      <td>{local.booking_at ? booking_date_n : "-"}</td>
                      <td>
                        {toTitleCase(local.shipper_city) +
                          ", " +
                          toTitleCase(local.shipper_locality)}
                      </td>
                      <td>
                        {toTitleCase(local.consignee_city) +
                          ", " +
                          toTitleCase(local.consignee_locality)}
                      </td>
                      <td>
                      {
                        local.eway_bill_no ?
                        local.eway_bill_no

                        :
                        <div style={{color:"red"}}>No EwayBill</div>
                      }
                      
                      </td>
                      <td>{local.actual_weight}</td>
                      <td>{local.total_quantity}</td>

                      <td>{(local.issue).length}</td>
                      <td>{(local.issue_notreceived).length}</td>

                      <td>{toTitleCase(local.delivery_type)}</td>
                      <td>
                        {" "}
                        <Button
                          size="sm"
                          outline
                          color="success"
                          type="button"
                          onClick={() => {
                            check(index);
                          }}
                        >
                          Add
                        </Button>
                      </td>
                      <td>
                        <div>
                          {/* /manifests/manifest-pdf */}
                          <Link
                            to="/booking/orders/OrderPdf"
                            state={{ order: local }}
                          >
                            <img src={pdf} width="20" height="20" />
                          </Link>
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

export default PendingDeliveryDataFormat;
