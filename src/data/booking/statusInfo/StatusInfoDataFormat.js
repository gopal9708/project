/* eslint-disable */

import React, { useState, useEffect } from "react";
// import { HashLink } from 'react-router-hash-link';
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { server_adgit dress } from '../../../constants/server_details';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { Modal } from "reactstrap";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { Button } from "reactstrap";
import { setIncomingTab, setManifestTab } from "../../../store/parentFilter/ParentFilter";

const StatusInfoDataFormat = ({ order_id, setstatus_data }) => {
  console.log("order_id---------", order_id)
  const dispatch = useDispatch();
  const success = useSelector((state) => state.alert.show_alert);
  const user = useSelector((state) => state.authentication.userdetails);
  // const active_order_last_status = useSelector(
  //   state => state.orders.last_active_order_status
  // );

  // Permissions
  const user_permissions = useSelector(
    (state) => state.permissions.user_permissions
  );

  // const active_order_id = useSelector(state => state.orders.active_order_id);
  // const active_order_no = useSelector(state => state.orders.active_order_no);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const [order_status_list, setorder_status_list] = useState([]);
  console.log("order_status_list-----", order_status_list)

  const [modal_backdrop, setmodal_backdrop] = useState(false);
  function tog_backdrop() {
    setmodal_backdrop(!modal_backdrop);
    removeBodyCss();
  }

  function removeBodyCss() {
    document.body.classList.add("no_padding");
  }

  const get_order_status = () => {
    let temp_list = [];
    axios
      .post(
        ServerAddress + "booking/get-status/" + order_id,
        {
          body: "nothing",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        console.log("response-----", response)
        setorder_status_list(response.data);
        setstatus_data(response.data)
      })
      .catch((error) => {
        alert(`Error Happen while Geting Order Status Data ${error}`);
      });
  };

  const delete_order_status = (id, status) => {
    axios
      .delete(ServerAddress + `booking/delete_order_status/` + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(function (resp) {
        if (resp.data.data == "Deleted") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Status "${toTitleCase(status)}" Deleted Sucessfully`)
          );
          dispatch(setAlertType("danger"));
        }
      })
      .catch((err) => {
        alert(`Error While delete Orders ${err}`);
      });
  };

  useEffect(() => {
    if (order_id) {
      get_order_status();
    }
  }, [order_id, success]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Order Status" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);

  return (
    <>
      {order_status_list.length === 0
        ? " No Data Found"
        : order_status_list.map((status, index) => {
          let added_at = "-";
          if (status.created_at) {
            let added_at_r = status.created_at.split("T");
            let date = added_at_r[0];
            let time = added_at_r[1].substring(0, 5);
            added_at = date + " " + time;
          }

          return (
            <>
              <tr
                key={index}
                style={{
                  borderWidth: 1,
                }}
              >
                <td>{index + 1}</td>
                <td

                  onClick={() => {
                    status.status !== "SHIPMENT ORDER RECEIVED" &&
                      dispatch(setManifestTab(5))
                    dispatch(setIncomingTab(3))
                  }
                  }>
                  {can_update || user.is_superuser ? (
                    <Link
                      to="/booking/orders/adddocketstatus"
                      // to="/manifest/pickeduporders"                      
                      state={{
                        order: status,
                        index: index,
                        status_len: order_status_list.length,
                        order_id: order_id,
                        type: "update"
                      }}

                    >
                      {toTitleCase(status.status)}
                    </Link>
                  ) : (
                    toTitleCase(status.status)
                  )}
                </td>
                {/* <td>
                  {user_permissions.includes('Can change Update Docket Status') ?
                  <Link
                    to="/booking/orders/adddocketstatus"
                    state={{
                      order: status,
                      index: index,
                      status_len: order_status_list.length,
                      order_id: order_id,
                    }}
                  >
                    {status.docket_no}
                  </Link>
                  // {/* :
                  //  "-"
                  // } 
                </td> */}
                <td className="selection-cell">{added_at}</td>

                <td>{toTitleCase(status.username)}</td>
                {/* <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td> */}

                {/* {user_permissions.includes('Can delete Update Docket Status') && */}
                <td>
                  {index == order_status_list.length - 1 &&
                    order_status_list.length > 1 &&
                    status.status !== "Shipment Delivered" ? (
                    <Button
                      size="sm"
                      outline
                      color="danger"
                      type="button"
                      onClick={() => {
                        if (
                          confirm(
                            `Do you want to delete of status "${status.status}"`
                          ) == true
                        ) {
                          delete_order_status(status.id, status.status);
                        }
                      }}
                      disabled={!user.is_superuser}
                    >
                      Delete
                    </Button>
                  ) : null}
                </td>
                {/* } */}
              </tr>

              <div></div>
            </>
          );
        })}
    </>
  );
};

export default StatusInfoDataFormat;
