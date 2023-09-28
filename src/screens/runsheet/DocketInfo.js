/* eslint-disable */
import React, { useState, useEffect } from "react";
import DocketInfoDataTitle from "../../data/runsheets/docketInfo/DocketInfoDataTitle";
import toTitleCase from "../../lib/titleCase/TitleCase";
import { Button } from "reactstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../store/alert/Alert";
import { ServerAddress } from "../../constants/ServerAddress";

const DocketInfo = ({ runsheet_no }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [data_title, setdata_title] = useState(DocketInfoDataTitle);
  const [runsheet_orders, setrunsheet_orders] = useState([]);
  const success = useSelector((state) => state.alert.show_alert);
  console.log('runsheet_orders=======', runsheet_orders)

  const get_runsheetorder = (runsheet_no) => {
    axios
      .get(
        ServerAddress +
          "runsheet/get_runsheetorder/?runsheet_no=" +
          runsheet_no,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
      .then((response) => {
        setrunsheet_orders(response.data);
      })
      .catch((err) => {
        alert(`Error Occur while Order Delivery Info, ${err}`);
      });
  };

  const del_rn_ord = (id) => {
    axios
      .post(
        ServerAddress + "runsheet/delete_runsheetorder/",
        {
          order_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Data Deleted Sucessfully`));
          dispatch(setAlertType("danger"));
        }
      })
      .catch((err) => {
        alert(`Error While delete Dockets ${err}`);
      });
  };

  useEffect(() => {
    if (runsheet_no !== "") {
      get_runsheetorder(runsheet_no);
    }
  }, [runsheet_no, success]);

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
            {runsheet_orders &&
              runsheet_orders.map((rn_order, index) => {
                let or_date_t = rn_order.booking_at.split("T");
                let date_t = or_date_t[0];
                let time_tt = String(or_date_t[1]).substring(0, 8);
                let rn_order_date = date_t + "  " + time_tt;
                return (
                  <tr
                    key={index}
                    style={{
                      borderWidth: 1,
                      fontSize: "12.5px",
                    }}
                  >
                    <td>{rn_order.docket_no}</td>
                    <td>{toTitleCase(rn_order.shipper)}</td>
                    <td>{toTitleCase(rn_order.consignee)}</td>
                    <td>
                      {toTitleCase(rn_order.shipper_state) +
                        ", " +
                        toTitleCase(rn_order.shipper_city)}
                    </td>
                    <td>
                      {toTitleCase(rn_order.consignee_state) +
                        ", " +
                        toTitleCase(rn_order.consignee_city)}
                    </td>
                    <td>{rn_order.total_quantity}</td>
                    <td>{(rn_order.issue).length}</td>
                    <td>{(rn_order.issue_notreceived).length}</td>
                    <td>{rn_order.actual_weight}</td>
                    <td>{rn_order_date}</td>
                    <td>{toTitleCase(rn_order.current_status)}</td>

                    <td>
                      {runsheet_orders.length > 1 &&
                        rn_order.current_status != "SHIPMENT DELIVERED" && (
                          <Button
                            size="sm"
                            outline
                            color="danger"
                            onClick={() => {
                              if (
                                confirm(
                                  "Do you want to delete " + rn_order.docket_no
                                ) == true
                              ) {
                                del_rn_ord(rn_order.id);
                              }
                            }}
                          >
                            Remove
                          </Button>
                        )}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DocketInfo;
