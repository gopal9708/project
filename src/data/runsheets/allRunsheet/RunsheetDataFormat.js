/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import pdf from "../../../assets/images/Pdf/printer.png";
import { Button } from "reactstrap";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import {
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../../store/dataList/DataList";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { HiQuestionMarkCircle } from "react-icons/hi";
import Modal from 'react-bootstrap/Modal';

const RunsheetDataFormat = ({ can_delete, data, data1 }) => {
  console.log("data---Runsheet------", data)
  const dispatch = useDispatch();
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);

  const del_runsheet = (id) => {
    axios
      .post(
        ServerAddress + "runsheet/delete_runsheet/",
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
          dispatch(setDataExist(`Runsheet Number Deleted Sucessfully`));
          dispatch(setAlertType("danger"));
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
        }
      })
      .catch((error) => {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Runsheet Already Exists Some Where`
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setDeleteId(false));
        dispatch(setIds([]));
        dispatch(setSelect(false));
        setselected([]);
      });
  };

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
      dispatch(setIndexValue("runsheet_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("orders"));
    } else if (index === 2) {
      dispatch(setIndexValue("created_at"));
    } else if (index === 3) {
      dispatch(setIndexValue("modified_at"));
    } else if (index === 4) {
      dispatch(setIndexValue("route_name"));
    } else if (index === 5) {
      dispatch(setIndexValue("vehicle_name"));
    } else if (index === 6) {
      dispatch(setIndexValue("driver_name"));
    } else if (index === 8) {
      dispatch(setIndexValue("is_delivered"));
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
      del_runsheet(ids);
    }
  }, [delete_id]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "All Runsheet" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);
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
      {(list_toggle === true ? data1 : data) === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((runsheet, index) => {
          let or_date_t = runsheet.created_at.split("T");
          let date_t = or_date_t[0];
          let time_tt = String(or_date_t[1]).substring(0, 8);
          let rn_date = date_t + "  " + time_tt;

          // let or_date_t_u =
          //   runsheet.modified_at !== null && runsheet.modified_at;
          // let date_t_u = or_date_t_u.split("T");
          // let time_tt_u = String(or_date_t_u[1]).substring(0, 8);
          // // let rn_date_u = date_t_u + "  " + time_tt_u;
          // let rn_date_u = or_date_t_u
          // // let can_delete = false;
          let rn_ords = runsheet.orders;

          for (let index = 0; index < rn_ords.length; index++) {
            let rn_ord = rn_ords[index];
            if (rn_ord.is_delivered) {
              can_delete = true;
              break;
            } else {
            }
          }

          return (
            <>
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
                      handlefunn(runsheet.id);
                      dispatch(setSelect(true));
                    }}
                  >
                    {selected.includes(runsheet.id) ? (
                      <FiCheckSquare size={14} />
                    ) : (
                      <FiSquare size={14} />
                    )}
                  </td>
                )}
                <td>
                  <span>{runsheet.runsheet_no}</span>
                </td>
                <td>{runsheet.organization_name ? toTitleCase(runsheet.organization_name) : "-"}</td>
                <td>{toTitleCase(runsheet.branch_name)}</td>
                <td>{runsheet.orders.length}</td>
                <td>
                  {
                    runsheet.cm_current_status === "APPROVED" ?
                      <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-success btn-rounded"} onClick={() => { handleModal(), setreject_resion(runsheet) }}>Approved</button>
                      :
                      runsheet.cm_current_status === "REJECTED" && runsheet.cm_transit_status === "NOT APPROVED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE") ? <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-danger btn-rounded"} onClick={() => { handleModal(), setreject_resion(runsheet) }}>Reject <HiQuestionMarkCircle size={15} /></button>
                        : runsheet.cm_current_status === "REJECTED" && (runsheet.cm_transit_status == "VERIFIED OPERATION MANAGER" || runsheet.cm_transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER") && (user.user_department_name + " " + user.designation_name === "OPERATION MANAGER" || user.user_department_name + " " + user.designation_name === "CUSTOMER SUPPORT MANAGER")
                          ? <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-danger btn-rounded"} onClick={() => { handleModal(), setreject_resion(runsheet) }}>Reject <HiQuestionMarkCircle size={15} /> </button>
                          : runsheet.cm_current_status === "REJECTED" && (runsheet.cm_transit_status === "VERIFIED ACCOUNTANT" || runsheet.cm_transit_status == "VERIFIED ACCOUNT MANAGER") && (user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER") ?
                            <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-danger btn-rounded"} onClick={() => { handleModal(), setreject_resion(runsheet) }}>Reject <HiQuestionMarkCircle size={15} /> </button>
                            : <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-warning btn-rounded"} onClick={() => { handleModal(), setreject_resion(runsheet) }}>Status <HiQuestionMarkCircle size={15} /></button>
                  }
                </td>
                <td>{rn_date}</td>
                {/* <td>{runsheet.modified_at}</td> */}
                <td>{runsheet.is_defined_route ? toTitleCase(runsheet.defined_route_name) : toTitleCase(runsheet.route_name)}</td>
                <td>
                  {runsheet.vehicle_number ? runsheet.vehicle_number : runsheet.contracted_vehicle_number}
                </td>
                <td>{toTitleCase(runsheet.driver_name)}</td>
                <td>
                  <div>
                    <Link
                      to="/runsheet/runsheetPdf/RunsheetPDF"
                      state={{ runsheet: runsheet, is_runsheet:true }}
                    >
                      <img src={pdf} width="20" height="20" />
                    </Link>
                  </div>
                </td>
                <td>
                  {" "}
                  {runsheet.is_delivered ? "Delivered" : "Not Delivered"}{" "}
                </td>
                {(can_update || user.is_superuser) && (               
                <td>
                  {
                    (selected.includes(runsheet.id) || runsheet.cm_transit_status == "APPROVED") && !user.is_superuser ? (
                      <Button size="sm" outline color="warning" type="button"
                        disabled
                      >
                        Edit
                      </Button>
                    )
                      : (runsheet.cm_current_status !== "NOT APPROVED" && runsheet.cm_current_status !== "REJECTED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                        ?
                        <Button size="sm" outline color="warning" type="button"
                          disabled
                        >
                          Edit
                        </Button>
                        : (runsheet.cm_current_status == "REJECTED" && (runsheet.cm_transit_status == "VERIFIED OPERATION MANAGER" || runsheet.cm_transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER") && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                          ?
                          <Button size="sm" outline color="warning" type="button"
                            disabled
                          >
                            Edit
                          </Button>
                          : (runsheet.cm_current_status !== "NOT APPROVED" && runsheet.cm_current_status !== "REJECTED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                            ?
                            <Button size="sm" outline color="warning" type="button"
                              disabled
                            >
                              Edit
                            </Button>
                            : (runsheet.cm_current_status !== "REJECTED" && (runsheet.cm_transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER" || runsheet.cm_transit_status == "VERIFIED OPERATION MANAGER" || runsheet.cm_transit_status == "VERIFIED ACCOUNTANT" || runsheet.cm_transit_status == "VERIFIED ACCOUNT MANAGER" || runsheet.cm_transit_status == "VERIFIED ACCOUNT MANAGER")
                              && (user.user_department_name + " " + user.designation_name === "OPERATION MANAGER" || user.user_department_name + " " + user.designation_name === "CUSTOMER SUPPORT MANAGER"))
                              ?
                              <Button size="sm" outline color="warning" type="button"
                                disabled
                              >
                                Edit
                              </Button>
                              : (runsheet.cm_current_status !== "REJECTED" && (runsheet.cm_transit_status == "VERIFIED ACCOUNTANT" || runsheet.cm_transit_status == "VERIFIED ACCOUNT MANAGER") && (user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER"))
                                ?
                                <Button size="sm" outline color="warning" type="button"
                                  disabled
                                >
                                  Edit
                                </Button>
                                :
                                (
                                  <Link
                                  to="/runsheet/changedrunsheet"
                                  state={{ runsheet: runsheet }}
                                >
                                  <Button size="sm" outline color="warning" type="button"
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                  )
                  }
                </td>
                 )} 
              </tr>
            </>
          );
        })
      )}
    </>
  );
};

export default RunsheetDataFormat;
