import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { BiRotateRight } from "react-icons/bi";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import { HiQuestionMarkCircle } from "react-icons/hi";
import Modal from 'react-bootstrap/Modal';
import {
  setClose,
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../../store/dataList/DataList";
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
import Button from 'react-bootstrap/Button';

const OrderDeliveryDataFormate = ({ data, data1, can_delete }) => {
  // console.log("Issue data", data)
  const dispatch = useDispatch();
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const ids = useSelector((state) => state.datalist.ids);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const user = useSelector((state) => state.authentication.userdetails);
  const success = useSelector((state) => state.alert.show_alert);

  // For Delete Commodity
  const delete_delivery_info = (id) => {
    axios
      .post(
        ServerAddress + "booking/delete_delivery_info/",
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

  // useEffect(() => {
  //   if (delete_id === true) {
  //     delete_commidity_row(ids);
  //   }
  // }, [delete_id]);
  useEffect(() => {
    if (delete_id === true) {
      delete_delivery_info(ids);
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
      dispatch(setIndexValue("docket_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("signature_person_name"));
    } else if (index === 2) {
      dispatch(setIndexValue("signature_person_phone_number"));
    } else if (index === 3) {
      dispatch(setIndexValue("created_date"));
    } else if (index === 4) {
      dispatch(setIndexValue("pod_image"));
    } else if (index === 5) {
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

  //////

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setclk_reject(false)
    settoggle(false);
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const [mobile_no, setmobile_no] = useState("")
  const [name, setname] = useState("")
  const [toggle, settoggle] = useState(false)
  const [clk_reject, setclk_reject] = useState(false)

  const update_issue = (id) => {

    axios
      .put(
        ServerAddress + "booking/update_POD/" + id,
        {
          signature_person_name: name,
          signature_person_phone_number: mobile_no,
          change_fields: { 'signature_person_name': name, 'signature_person_phone_number': mobile_no, 'modified_by': user.username },

          //For C&M
          cm_transit_status: status_toggle === true ? current_status : "",
          cm_current_status: (current_status).toUpperCase(),
          cm_remarks: "",
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
  const [pod_id, setpod_id] = useState()

  const handleSubmit = (order) => {
    console.log("pod_id=========", order)
    setpod_id(order.id)
    setmobile_no(order.signature_person_phone_number)
    setname(toTitleCase(order.signature_person_name))
    handleShow()
  }

  useEffect(() => {
    if (toggle && pod_id !== "") {
      update_issue(pod_id)
    }

  }, [toggle, pod_id])

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
        ServerAddress + "booking/update_POD/" + id,
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
      update_issuestatus(pod_id)
      setShow(false)
    }
  }

  // Image Modal
  const [openModal, setopenModal] = useState(false);
  const handleCloseMod = () => {
    setopenModal(false);
  }
  const [img, setimg] = useState("");
  const handle_img = (a) => {
    setimg(a)
  }
  const [rotationAngle, setRotationAngle] = useState(0);
  const handleClick = () => {
    // Increase the rotation angle by 45 degrees on each click
    setRotationAngle(prevAngle => prevAngle + 90);
  };

  return (
    <>
      <Modal show={openModal} onHide={handleCloseMod}>
        <Modal.Header closeButton>
          <Modal.Title>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div style={{overflow:"hidden"}}>
              <img src={img} alt="img" style={{ width: "100%", height: "100%", display: "block", margin: "auto", borderRaidus: "15px", transform: `rotate(${rotationAngle}deg)` }}
                onClick={handleClick}
              />
          </div>
          <div style={{display:"flex", justifyContent:"right", cursor:"pointer", color:"blue"}}  onClick={handleClick}>
            <BiRotateRight size={25}/>
          </div>

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
              <div className="mb-2">
                <Label className="header-child">
                  Person Name
                </Label>
                <Input
                  value={name}
                  onChange={(e) => setname(e.target.value)
                  }
                  type="text"
                  className="form-control-md"
                  id="input"
                  placeholder="Enter Remarks"
                />
              </div>
              <div className="mb-2">
                <Label className="header-child">
                  Mobile Number
                </Label>
                <Input
                  value={mobile_no}
                  onChange={(e) => setmobile_no(e.target.value)
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
          let added_at = "-";
          if (order.created_at) {
            console.log("order.created_date----", order.created_at)
            let added_at_r = order.created_at?.split("T");
            let date = added_at_r[0];
            let time = added_at_r[1]?.substring(0, 5);
            added_at = date + " " + time;
          }
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
                  <Link to="/booking/updatedeliveryinfo" state={{ order: order }}>
                    {order.docket_no}
                  </Link>

                ) : (
                  // toTitleCase(order.commodity_name)
                  order.docket_no
                )}
              </td>
              <td>{order.signature_person_name}</td>
              <td>
                {order.signature_person_phone_number}
              </td>
              <td className="selection-cell">{added_at}</td>

              <td
                onClick={() => {
                  handle_img(order.pod_image);
                  setopenModal(true)
                }}
              >
                <img src={order.pod_image} alt="pod_image" style={{ width: 70, height: 50 }} />
              </td>
              <td
                onClick={() => {
                  handle_img(order.image);
                  setopenModal(true)
                }}
              >
                <img src={order.image} alt="order_image" style={{ width: 70, height: 50 }} />
              </td>
              <td>
                {
                  order.cm_current_status === "APPROVED" ?
                    <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-success btn-rounded"} onClick={() => { handleModal(order) }}>Approved</button>
                    :
                    order.cm_current_status === "REJECTED" && order.cm_transit_status === "NOT APPROVED" ? <button style={{ padding: "4px", fontSize: "12px" }} class={"btn btn-danger btn-rounded"} onClick={() => { handleModal(order) }}>Reject <HiQuestionMarkCircle size={15} /></button>
                      : <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-warning btn-rounded"} onClick={() => { handleModal(order) }}>Status <HiQuestionMarkCircle size={15} /></button>
                }
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default OrderDeliveryDataFormate;