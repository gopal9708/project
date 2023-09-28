/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import pdf from "../../../assets/images/Pdf/printer.png";
import correct from "../../../assets/images/bookings/check-mark.png";
import cross from "../../../assets/images/bookings/remove.png";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import {
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../../store/dataList/DataList";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";
import { HashLink } from "react-router-hash-link";
import Button from 'react-bootstrap/Button';
import { HiQuestionMarkCircle } from "react-icons/hi";
import Modal from 'react-bootstrap/Modal';

const OrderDataFormat = ({ data, data1, can_delete }) => {
  console.log("data--------------------", data)
  // Permissions
  // const user_permissions = useSelector(state => state.permissions.user_permissions)
  const user = useSelector((state) => state.authentication.userdetails);

  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const delete_order = (id) => {
    axios
      .post(
        ServerAddress + "booking/delete_order/",
        {
          data: id,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.statusText === "OK") {
          dispatch(setDeleteId(false));
          dispatch(setIds([]));
          dispatch(setSelect(false));
          setselected([]);
          dispatch(setIsDeleted(false));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Data Deleted Sucessfully`));
          dispatch(setAlertType("danger"));
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
        }
      })
      .catch((err) => {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Order Already Exists Some Where`
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setDeleteId(false));
        dispatch(setIds([]));
        dispatch(setSelect(false));
        setselected([]);
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  //For Sorting
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("docket_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("booking_at"));
    } else if (index === 2) {
      dispatch(setIndexValue("client_name"));
    } else if (index === 4) {
      dispatch(setIndexValue("shipper_city"));
    } else if (index === 5) {
      dispatch(setIndexValue("consignee_city"));
    } else if (index === 6) {
      dispatch(setIndexValue("shipper_name"));
    } else if (index === 7) {
      dispatch(setIndexValue("consignee_name"));
    } else if (index === 9) {
      dispatch(setIndexValue("manifest_no"));
    } else if (index === 10) {
      dispatch(setIndexValue("runsheet_no"));
    } else if (index === 11) {
      dispatch(setIndexValue("order_created_by"));
    } else if (index === 12) {
      dispatch(setIndexValue("is_completed"));
    } else if (index === 13) {
      dispatch(setIndexValue("cold_chain"));
    } else if (index === 14) {
      dispatch(setIndexValue("is_delivered"));
    } else if (index === 15) {
      dispatch(setIndexValue("total_quantity"));
    } else if (index === 16) {
      dispatch(setIndexValue("branch_name"));
    } else if (index === 17) {
      dispatch(setIndexValue("entry_type"));
    } else if (index === 18) {
      dispatch(setIndexValue("is_manifested"));
    } else if (index === 19) {
      dispatch(setIndexValue("delivery_type"));
    }
  }, [index]);

  //Multi Delete function
  const ids = useSelector((state) => state.datalist.ids);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);
  const [selected, setselected] = useState([]);

  const handlefunn = (id) => {
    if (selected.includes(id)) {
      let lis = [...selected];
      setselected(lis.filter((e) => e !== id));
    } else {
      setselected([...selected, id]);
    }
  };
  useEffect(() => {
    dispatch(setIds(selected));
  }, [selected]);
  useEffect(() => {
    if (ids !== [] && select_all === true) {
      setselected(ids);
    }
  }, [ids]);
  useEffect(() => {
    if (select_all === false) {
      setselected([]);
    }
  }, [select_all]);
  useEffect(() => {
    if (delete_id === true) {
      delete_order(ids);
    }
  }, [delete_id]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Order" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);

  // For C & M

  //For C&M
  const [showM, setShowM] = useState(false);

  const handleCloseM = () => setShowM(false);
  const handleShowM = () => setShowM(true);
  const [reject_resion, setreject_resion] = useState("")

  const handleModal = (commodity) => {
    console.log("NOT APPROVED-----", commodity)
    handleShowM()
    setreject_resion(commodity)
    console.log("reject_resion----", reject_resion)
  }
  const handleLinkClick = (e) => {
    e.preventDefault();
    const linkObject = {
      pathname: '/booking/orders/OrderPdf',
      state: { order: order, from: location.pathname }
    };
    const newWindow = window.open(
      `${window.location.origin}${linkObject.pathname}`,
      '_blank',
      'noopener noreferrer'
    );
    if (newWindow) {
      newWindow.opener = null;
      newWindow.location.search = queryString.stringify(linkObject.state);
    }
  };
  return (
    <>
      <Modal show={showM} onHide={handleCloseM}>
        <Modal.Header closeButton>
          <Modal.Title>Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ fontSize: "15px" }}>Status : {toTitleCase(reject_resion.cm_current_status)}</div>
          {reject_resion.cm_current_status === "REJECTED" && <div style={{ fontSize: "15px" }}>Resion: {toTitleCase(reject_resion.cm_remarks)}</div>}
        </Modal.Body>
      </Modal>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((order, index) => {
          let f_date_f = order.booking_at.split("T");
          let f_date = f_date_f[0];
          let f_time_r = String(f_date_f[1]).substring(0, 5);
          let l_fdate = f_date + " " + f_time_r;

          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
              {(can_delete || user.is_superuser) && (
                <td
                  className="selection-cell"
                  onClick={() => {
                    handlefunn(order.id);
                    dispatch(setSelect(true));
                  }}
                >
                  {selected.includes(order.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}
              {/* <td>
                {can_update || user.is_superuser ? (
                  <Link to="/booking/orders/addorder" state={{ order: order }}>
                    {order.docket_no}
                  </Link>
                )
                  :
                  order.awb_no
                }
              </td> */}
              <td>
                {/* VERIFIED CUSTOMER SUPPORT MANAGER */}
                {/* || order.transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER") && !user.is_superuser && user.user_department_name !== "ACCOUNTANT"  */}
                {
                  (selected.includes(order.id) || order.cm_transit_status == "APPROVED") && !user.is_superuser ? (
                    order.docket_no
                  )
                    : (order.cm_current_status !== "NOT APPROVED" && order.cm_current_status !== "REJECTED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                      ? order.docket_no
                      : (order.cm_current_status == "REJECTED" && (order.cm_transit_status == "VERIFIED OPERATION MANAGER" || order.cm_transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER") && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                        ? order.docket_no
                        : (order.cm_current_status !== "NOT APPROVED" && order.cm_current_status !== "REJECTED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                          ? order.docket_no
                          : (order.cm_current_status !== "REJECTED" && (order.cm_transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER" || order.cm_transit_status == "VERIFIED OPERATION MANAGER" || order.cm_transit_status == "VERIFIED ACCOUNTANT" || order.cm_transit_status == "VERIFIED ACCOUNT MANAGER" || order.cm_transit_status == "VERIFIED ACCOUNT MANAGER")
                            && (user.user_department_name + " " + user.designation_name === "OPERATION MANAGER" || user.user_department_name + " " + user.designation_name === "CUSTOMER SUPPORT MANAGER"))
                            ? order.docket_no
                            : (order.cm_current_status !== "REJECTED" && (order.cm_transit_status == "VERIFIED ACCOUNTANT" || order.cm_transit_status == "VERIFIED ACCOUNT MANAGER") && (user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER"))
                              ? order.docket_no
                              :
                              (
                                <Link
                                  to="/booking/orders/addorder"
                                  state={{ order: order ,is_checkermaker:false}}
                                >
                                  {order.docket_no}
                                </Link>)
                }
              </td>
              <td>{order.organization_name ? toTitleCase(order.organization_name) : "-"}</td>
              <td>{l_fdate}</td>
              <td>
                {
                  order.cm_current_status === "APPROVED" ?
                    <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-success btn-rounded"} onClick={() => { handleModal(), setreject_resion(order) }}>Approved</button>
                    :
                    order.cm_current_status === "REJECTED" && order.cm_transit_status === "NOT APPROVED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE") ? <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-danger btn-rounded"} onClick={() => { handleModal(), setreject_resion(order) }}>Reject <HiQuestionMarkCircle size={15} /></button>
                      : order.cm_current_status === "REJECTED" && (order.cm_transit_status == "VERIFIED OPERATION MANAGER" || order.cm_transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER") && (user.user_department_name + " " + user.designation_name === "OPERATION MANAGER" || user.user_department_name + " " + user.designation_name === "CUSTOMER SUPPORT MANAGER")
                        ? <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-danger btn-rounded"} onClick={() => { handleModal(), setreject_resion(order) }}>Reject <HiQuestionMarkCircle size={15} /> </button>
                        : order.cm_current_status === "REJECTED" && (order.cm_transit_status === "VERIFIED ACCOUNTANT" || order.cm_transit_status == "VERIFIED ACCOUNT MANAGER") && (user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER") ?
                          <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-danger btn-rounded"} onClick={() => { handleModal(), setreject_resion(order) }}>Reject <HiQuestionMarkCircle size={15} /> </button>
                          : <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-warning btn-rounded"} onClick={() => { handleModal(), setreject_resion(order) }}>Status <HiQuestionMarkCircle size={15} /></button>
                }
              </td>
              <td>
                {
                  (selected.includes(order.id) || order.cm_transit_status == "APPROVED") && !user.is_superuser ? (
                    <><span>Dimensions</span><br /><span>Status Info</span><br /><span>Images</span></>
                  )
                    : (order.cm_current_status !== "NOT APPROVED" && order.cm_current_status !== "REJECTED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                      ? <><span>Dimensions</span><br /><span>Status Info</span><br /><span>Images</span></>
                      : (order.cm_current_status == "REJECTED" && (order.cm_transit_status == "VERIFIED OPERATION MANAGER" || order.cm_transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER") && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                        ? <><span>Dimensions</span><br /><span>Status Info</span><br /><span>Images</span></>
                        : (order.cm_current_status !== "NOT APPROVED" && order.cm_current_status !== "REJECTED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                          ? <><span>Dimensions</span><br /><span>Status Info</span><br /><span>Images</span></>
                          : (order.cm_current_status !== "REJECTED" && (order.cm_transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER" || order.cm_transit_status == "VERIFIED OPERATION MANAGER" || order.cm_transit_status == "VERIFIED ACCOUNTANT" || order.cm_transit_status == "VERIFIED ACCOUNT MANAGER" || order.cm_transit_status == "VERIFIED ACCOUNT MANAGER")
                            && (user.user_department_name + " " + user.designation_name === "OPERATION MANAGER" || user.user_department_name + " " + user.designation_name === "CUSTOMER SUPPORT MANAGER"))
                            ? <><span>Dimensions</span><br /><span>Status Info</span><br /><span>Images</span></>
                            : (order.cm_current_status !== "REJECTED" && (order.cm_transit_status == "VERIFIED ACCOUNTANT" || order.cm_transit_status == "VERIFIED ACCOUNT MANAGER") && (user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER"))
                              ? <><span>Dimensions</span><br /><span>Status Info</span><br /><span>Images</span></>
                              :
                              <>
                                <HashLink
                                  to="/booking/orders/addorder#status_info"
                                  state={{ order: order, hash: "status_info" }}
                                >
                                  Status Info
                                </HashLink>
                                <br />
                                <HashLink
                                  to="/booking/orders/addorder#packages"
                                  state={{ order: order, hash: "packages" }}
                                >
                                  Dimensions
                                </HashLink>
                                <br />
                                <HashLink
                                  to="/booking/orders/addorder#images"
                                  state={{ order: order, hash: "images" }}
                                >
                                  Images
                                </HashLink>
                                <br />
                              </>
                }
              </td>
              <td>{toTitleCase(order.order_type)}</td>
              <td>{toTitleCase(order.client_name)}</td>
              <td>
                {order.order_type === "RETURN" ?
                  <>
                    {toTitleCase(order.consignee_city) +
                      ", " +
                      toTitleCase(order.consignee_state) +
                      ", " +
                      toTitleCase(order.consignee_locality)}
                  </>
                  : <> {toTitleCase(order.shipper_city) +
                    ", " +
                    toTitleCase(order.shipper_state) +
                    ", " +
                    toTitleCase(order.shipper_locality)}
                  </>
                }
              </td>
              <td>
                {order.order_type === "RETURN" ?
                  <>
                   {toTitleCase(order.shipper_city) +
                    ", " +
                    toTitleCase(order.shipper_state) +
                    ", " +
                    toTitleCase(order.shipper_locality)}
                  </>
                  :
                  <>
                    {toTitleCase(order.consignee_city) +
                      ", " +
                      toTitleCase(order.consignee_state) +
                      ", " +
                      toTitleCase(order.consignee_locality)}
                      </>
              }
                  </td>
                <td>{order.order_type === "RETURN" ? toTitleCase(order.consignee) : toTitleCase(order.shipper)}</td>
                <td>{order.order_type === "RETURN" ? toTitleCase(order.shipper) : toTitleCase(order.consignee)}</td>
                <td><span style={{ color: order.current_status === "SHORT DELIVERED" && "red" }}>{toTitleCase(order.current_status)}</span></td>
                <td>{toTitleCase(order.order_channel)}</td>
                
                <td>
                  <div>
                    <Link
                      // to="/booking/orders/OrderInvoicePdf"

                      to="/booking/orders/OrderPdf"
                      state={{ order: order }}                     
                      // target='_top'                   
                    
                    >
                      <img src={pdf} width="18" height="18" />
                    </Link>
                  </div>
                </td>
                <td>
                  {order.manifest_no == null ? (
                    "-"
                  ) : (
                    <Link
                    to="/manifest/roughmanfest"
                      state={{ manifest_no: order.manifest_no, is_manifest:false }}
                    >
                      {order.manifest_no}
                    </Link>
                  )}
                </td>
                <td>
                  {order.runsheet_no == null ? (
                    <div>-</div>
                  ) : (
                    <Link
                    to="/runsheet/runsheetPdf/RunsheetPDF"
                      state={{ rn_no: order.runsheet_no, is_runsheet:false }}
                    >
                      {order.runsheet_no}
                    </Link>
                  )}
                </td>
                <td>{toTitleCase(order.order_created_by)}</td>
                <td>{order.order_modified_by ? toTitleCase(order.order_modified_by) : "-"}</td>
                <td>
                  {order.is_completed ? (
                    <div>
                      <img src={correct} width="18" height="18" />
                    </div>
                  ) : (
                    <div>
                      <img src={cross} width="18" height="18" />
                    </div>
                  )}
                </td>
                <td>
                  {order.cold_chain ? (
                    <div>
                      <img src={correct} width="18" height="18" />
                    </div>
                  ) : (
                    <div>
                      <img src={cross} width="18" height="18" />
                    </div>
                  )}
                </td>
                <td>
                  {order.is_delivered ? (
                    <div>
                      <img src={correct} width="18" height="18" />
                      <br />
                      {/* <HashLink
                      to="/bookings/orders/addorders#order_delivery_info"
                      state={{ order: order, hash: "order_delivery_info" }}
                    >
                      Delivered Info
                    </HashLink> */}
                    </div>
                  ) : (
                    <div>
                      <img src={cross} width="18" height="18" />
                    </div>
                  )}
                </td>
                <td>{order.total_quantity}</td>
                <td>{toTitleCase(order.branch_name)}</td>
                <td>{toTitleCase(order.entry_type)}</td>
                <td>
                  {order.is_manifested ? (
                    <div>
                      <img src={correct} width="18" height="18" />
                    </div>
                  ) : (
                    <div>
                      <img src={cross} width="18" height="18" />
                    </div>
                  )}
                </td>
                <td>{toTitleCase(order.delivery_type)}</td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default OrderDataFormat;
