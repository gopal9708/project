import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import { HiQuestionMarkCircle } from "react-icons/hi";
import correct from "../../../assets/images/bookings/check-mark.png";
import cross from "../../../assets/images/bookings/remove.png";
import { BiRotateRight } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  setClose,
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../../store/dataList/DataList";
import { useNavigate } from "react-router-dom";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import {
  Label,
  Input,
  FormGroup
} from "reactstrap";
const DocketIssueDataFormate = ({ data, data1, can_delete }) => {
  console.log("Issue data", data)
  const dispatch = useDispatch();
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const ids = useSelector((state) => state.datalist.ids);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const user = useSelector((state) => state.authentication.userdetails);
  const success = useSelector((state) => state.alert.show_alert);

  const navigate = useNavigate();
  // For Delete Commodity
  const delete_issue = (id) => {
    axios
      .post(
        ServerAddress + "booking/delete_issue/",
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
            `Docket Already Exists Some Where`
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setDeleteId(false));
        dispatch(setIds([]));
        dispatch(setSelect(false));
        setselected([]);
      });
  };

  //Multi Delete
  const close = useSelector((state) => state.datalist.close);
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
    if (select_all === true) {
      setselected(ids);
    }
  }, [select_all, ids]);

  useEffect(() => {
    if (select_all === false) {
      setselected([]);
    }
  }, [select_all]);

  useEffect(() => {
    if (close === true) {
      setselected([]);
    }
  }, [close]);

  useEffect(() => {
    if (delete_id === true) {
      delete_issue(ids);
    }
  }, [delete_id]);

  useEffect(() => {
    dispatch(setToggle(false));
  }, [success]);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("universal_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("universal_type"));
    } else if (index === 2) {
      dispatch(setIndexValue("issue_location"));
    } else if (index === 3) {
      dispatch(setIndexValue("issue"));
    } else if (index === 4) {
      dispatch(setIndexValue("created_at"));
    } else if (index === 5) {
      dispatch(setIndexValue("barcode"));
    } else if (index === 6) {
      dispatch(setIndexValue("barcode_type"));
    } else if (index === 7) {
      dispatch(setIndexValue("is_solved"));
    } else if (index === 8) {
      dispatch(setIndexValue("image"));
    }
  }, [index]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Commodity" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);


  const [show, setShow] = useState(false);

  const handleClose = () => {
    setclk_reject(false)
    settoggle(false);
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const [remarks, setremarks] = useState("")
  console.log("setremarks========", remarks)
  const [is_resolved, setis_resolved] = useState(false)
  const [barcode_type, setbarcode_type] = useState("")
  const [barcode, setbarcode] = useState("")
  const [toggle, settoggle] = useState(false)
  const [clk_reject, setclk_reject] = useState(false)

  const update_issue = (id) => {

    axios
      .put(
        ServerAddress + "booking/update_issue/" + id,
        {
          is_solved: is_resolved,
          remarks: remarks !== null ? toTitleCase(remarks).toUpperCase() : "",
          change_fields: { 'is_solved': is_resolved, 'remarks': remarks, 'solved_by': user.username },
          barcode: barcode,
          barcode_type: barcode_type,
          //For C&M
          cm_transit_status: status_toggle === true ? current_status : "",
          cm_current_status: (current_status).toUpperCase(),
          cm_remarks: ""

        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          // dispatch(Toggle(true))
          dispatch(setToggle(true));
          setShow(false)
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Status Updated sucessfully`));
          dispatch(setAlertType("info"));
          settoggle(false);
        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };
  const [issue_id, setissue_id] = useState()

  const handleSubmit = (order, remarks) => {
    console.log("issue_id=========", order)
    setissue_id(order.id)
    setis_resolved(order.is_solved)
    setbarcode_type(order.barcode_type)
    setbarcode(order.barcode)
    setremarks(remarks)
    handleShow()
  }

  useEffect(() => {
    if (toggle && issue_id !== "") {
      update_issue(issue_id)
    }

  }, [toggle, issue_id])

  //For C&M
  const [current_status, setcurrent_status] = useState("");
  const [status_toggle, setstatus_toggle] = useState(false)
  const [message, setmessage] = useState("")
  const [message_error, setmessage_error] = useState(false);

  const [showM, setShowM] = useState(false);

  const handleCloseM = () => setShowM(false);
  const handleShowM = () => setShowM(true);
  const [reject_resion, setreject_resion] = useState("")

  const handleModal = (order) => {
    console.log("NOT APPROVED-----", order)
    handleShowM()
    setreject_resion(order)
    console.log("reject_resion----", reject_resion)
  }
  useEffect(() => {
    if (user.user_department_name + " " + user.designation_name ===
      "DATA ENTRY OPERATOR" ||
      user.user_department_name +
      " " +
      user.designation_name ===
      "CUSTOMER SERVICE EXECUTIVE") {
      setcurrent_status("NOT APPROVED")
      setstatus_toggle(true)
    }

    else if (user.user_department_name + " " + user.designation_name ===
      "OPERATION MANAGER" ||
      user.user_department_name +
      " " +
      user.designation_name ===
      "CUSTOMER SUPPORT MANAGER" || user.is_superuser) {
      setcurrent_status("APPROVED")
      setstatus_toggle(true)
    }
    else {
      setcurrent_status("NOT APPROVED")
      // setstatus_toggle(false)
    }

  }, [user])

  const update_issuestatus = (id) => {

    axios
      .put(
        ServerAddress + "booking/update_issue/" + id,
        {

          cm_current_status: "REJECTED",
          cm_remarks: toTitleCase(message).toUpperCase(),
          change_fields: { 'cm_current_status': 'REJECTED' },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          dispatch(setToggle(true));
          setShow(false)
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Status Updated sucessfully`));
          dispatch(setAlertType("info"));

        }
      })
      .catch(function (err) {
        alert(`rror While  Updateing Coloader ${err}`);
      });
  };
  const handleSubmit2 = () => {
    if (message === "") {
      setmessage_error(true);
    }
    else {
      update_issuestatus(issue_id)
      setShow(false)
    }
  }

  // Image Modal
  const [openModal, setopenModal] = useState(false);
  const handleCloseMod = () => {
    setopenModal(false);
  }
  const [img, setimg] = useState([]);
  const handle_img = (a) => {
    setimg(a)
  }

  const [img_data, setimg_data] = useState("")
  const [fullscreen, setFullscreen] = useState(true);
  const [showimg, setshowimg] = useState(false);

  function handleShowimg(breakpoint) {
    setFullscreen(breakpoint);
    setshowimg(true);
  }
  const [rotationAngle, setRotationAngle] = useState(0);
  const handleClick = () => {
    // Increase the rotation angle by 45 degrees on each click
    setRotationAngle(prevAngle => prevAngle + 90);
  };

  return (
    <>
      {/* For Big Img Modal */}
      <Modal show={showimg} size={"lg"} onHide={() => setshowimg(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Issue Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ overflow: "hidden" }}>
            <img src={img_data} style={{ maxWidth: "100%", maxHeight: "100%", display: "block", margin: "auto", borderRaidus: "15px", transform: `rotate(${rotationAngle}deg)` }}
              onClick={handleClick}
            />
          </div>
          <div style={{display:"flex", justifyContent:"right", cursor:"pointer", color:"blue"}}  onClick={handleClick}>
            <BiRotateRight size={25}/>
          </div>
        </Modal.Body>
      </Modal>

      {/* For Image Modal */}
      <Modal show={openModal} onHide={handleCloseMod}>
        <Modal.Header closeButton>
          <Modal.Title>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          {/* <img src={img} style={{ maxWidth: "100%", maxHeight: "100%", display: "block", margin: "auto", borderRaidus: "15px" }} /> */}
          {img.map((imageData) => (
            <img
              key={imageData.id}
              src={imageData.issue_image}
              
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                display: "inline-block",
                margin: "10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => {
                setimg_data(imageData.issue_image);
                handleShowimg(true)
              }}
              alt={`Image ${imageData.id + 1}`}
            />
          ))}

        </Modal.Body>

      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title>Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!clk_reject ?
            <>
              <div className="mb-3">
                <Label className="header-child">Is Resolved</Label>
                <br />
                <Input
                  className="form-check-input-sm"
                  type="checkbox"
                  value={is_resolved}
                  id="defaultCheck1"
                  onClick={() => {
                    setis_resolved(!is_resolved);
                  }}
                  readOnly={true}
                  checked={is_resolved}
                />
              </div>
              <div className="mb-2">
                <Label className="header-child">
                  Barcode Number
                </Label>
                <Input
                  value={barcode}
                  onChange={(e) => setbarcode(e.target.value)
                  }
                  type="text"
                  className="form-control-md"
                  id="input"
                  placeholder="Enter Remarks"
                />
              </div>
              <div className="mb-2">
                <Label className="header-child">
                  Barcode Type
                </Label>
                <Input
                  value={barcode_type}
                  onChange={(e) => setbarcode_type(e.target.value)
                  }
                  type="text"
                  className="form-control-md"
                  id="input"
                  placeholder="Enter Remarks"
                />
              </div>
              <div className="mb-2">
                <Label className="header-child">
                  Remarks
                </Label>
                <Input
                  value={remarks}
                  onChange={(e) => setremarks(e.target.value)
                  }
                  type="text"
                  className="form-control-md"
                  id="input"
                  placeholder="Enter Remarks"
                />
              </div>
            </>
            :
            <>
              <FormGroup>
                <Label for="exampleText">
                  Text Area
                </Label>
                <Input
                  id="exampleText"
                  name="text"
                  type="textarea"
                  style={{ height: "90px" }}
                  onChange={(e) => {
                    setmessage(e.target.value)
                  }}
                />
                <div className="mt-1 error-text" color="danger">
                  {message_error ? "Please Enter Reject Resion" : null}
                </div>
              </FormGroup>
            </>

          }
        </Modal.Body>
        <Modal.Footer>

          {/* <Button variant="primary" onClick={() => settoggle(true)}>Save</Button> */}
          {!clk_reject ?
            <Button
              onClick={() => settoggle(true)}
              type="submit"
              className={(user.user_department_name + " " + user.designation_name ===
                "DATA ENTRY OPERATOR" ||
                user.user_department_name +
                " " +
                user.designation_name ===
                "CUSTOMER SERVICE EXECUTIVE") ? "btn btn-primary m-1" : "btn btn-success m-1"}
            >
              {(user.user_department_name + " " + user.designation_name ===
                "DATA ENTRY OPERATOR" ||
                user.user_department_name +
                " " +
                user.designation_name ===
                "CUSTOMER SERVICE EXECUTIVE" || user.is_superuser) ? "Update" : "Approved"}
            </Button>
            :
            <Button variant="primary" onClick={() => handleSubmit2()}>Save</Button>
          }
          {
            ((user.user_department_name + " " + user.designation_name) !== "DATA ENTRY OPERATOR" &&
              (user.user_department_name + " " + user.designation_name) !== "CUSTOMER SERVICE EXECUTIVE") &&
            !user.is_superuser &&
            !clk_reject && (
              <Button
                type="button"
                variant="danger"
                // className="btn btn-danger m-1"
                onClick={() => setclk_reject(true)}
              >
                Rejected
              </Button>
            )
          }

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

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
          let f_date_f = order.created_at.split("T");
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
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(order.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}
              <td>
                {/* {can_update || user.is_superuser  ? ( */}
                {(can_update && order.cm_current_status !== "APPROVED") || user.is_superuser ? (

                  <a style={{ color: "blue" }}
                    onClick={() => handleSubmit(order, order.remarks)}
                  >
                    {/* {toTitleCase(order.docket_no)} */}
                    {order.universal_no}

                  </a>

                ) : (
                  // toTitleCase(order.commodity_name)
                  order.universal_no
                )}
              </td>
              {/* <td>{order.manifest_no}</td> */}
              <td>{toTitleCase(order.universal_type)}</td>
              <td>{toTitleCase(order.issue_location)}</td>
              <td>{toTitleCase(order.issue)}</td>
              <td>
                {
                  order.cm_current_status === "APPROVED" ?
                    <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-success btn-rounded"} onClick={() => { handleModal(order) }}>Approved</button>
                    :
                    order.cm_current_status === "REJECTED" && order.cm_transit_status === "NOT APPROVED" ? <button style={{ padding: "4px", fontSize: "12px" }} class={"btn btn-danger btn-rounded"} onClick={() => { handleModal(order) }}>Reject <HiQuestionMarkCircle size={15} /></button>
                      : <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-warning btn-rounded"} onClick={() => { handleModal(order) }}>Status <HiQuestionMarkCircle size={15} /></button>
                }
              </td>
              <td>{l_fdate}</td>
              {/* <td>{order.issue_type}</td> */}
              <td>{order.barcode}</td>
              <td>{toTitleCase(order.barcode_type)}</td>
              <td>
                {order.is_solved ? (
                  <div>
                    <img src={correct}  alt="correct" width="16" height="16" />
                  </div>
                ) : (
                  <div>
                    <img src={cross} alt="cross" width="16" height="16" />
                  </div>
                )}
              </td>
              {/* <td
                  onClick={() => {
                    handle_img(order.image);
                    setopenModal(true)
                  }}
                >
                  <img src={order.image} style={{ width: 70, height: 50 }} />
                </td> */}
              <td>
                <div
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={() => {
                    handle_img(order.issue_image);
                    setopenModal(true)
                  }}>
                  {(order.issue_image).length}
                </div>
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default DocketIssueDataFormate;