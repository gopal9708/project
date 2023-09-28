import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setIsDeleted,
  setToggle,
} from "../../../store/pagination/Pagination";
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

const VendorDataFormat = ({ data, data1, can_delete }) => {
  console.log("data========", data)
  const dispatch = useDispatch();
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const user = useSelector((state) => state.authentication.userdetails);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);

  const [selected, setselected] = useState([]);

  const ids = useSelector((state) => state.datalist.ids);

  const [click, setclick] = useState(true);

  const deleteCharge = (id) => {
    axios
      .post(
        ServerAddress + "master/delete_vendor/",
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
          setclick(false);
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
            `Vendor Already Exists Some Where`
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
      deleteCharge(ids);
    }
  }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("name"));
    } else if (index === 1) {
      dispatch(setIndexValue("emailp"));
    } else if (index === 2) {
      dispatch(setIndexValue("mobile_numberp"));
    } else if (index === 3) {
      dispatch(setIndexValue("company_type"));
    } else if (index === 4) {
      dispatch(setIndexValue("service_region"));
    } else if (index === 5) {
      dispatch(setIndexValue("lob"));
    }
  }, [index]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Vendor" && e.update === true)
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

  const handleModal = (vendor) => {
    console.log("NOT APPROVED-----", vendor)
    handleShowM()
    setreject_resion(vendor)
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
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((vendor, index) => {
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
                    handlefunn(vendor.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(vendor.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}
              <td>
              {(can_update && vendor.cm_current_status !== "APPROVED") || user.is_superuser ? (

                  <Link
                    to="/master/vendor/AddVendor"
                    state={{ vendor: vendor }}
                  >
                    {toTitleCase(vendor.name)}
                  </Link>
                ) : (
                  toTitleCase(vendor.name)
                )}
              </td>
              <td>{vendor.pan_no}</td>
              <td>
              
              {vendor.vendor_gst.length !== 0 ?
               vendor.vendor_gst.map((vendor, index) => {
                 return (
                <span>{vendor.gst_no +",  "}</span>
                 )
              }
              
              )
              : "-"
              
              }

            </td>
              <td>{vendor.emailp}</td>
              <td>{vendor.mobile_numberp}</td>
              <td>
              {(can_update && vendor.cm_current_status !== "APPROVED") || user.is_superuser ? (

                  <Link
                    to="/master/vendor/updatecompanytype"
                    state={{ vendor: vendor }}
                  >
                    {toTitleCase(vendor.company_type)}
                  </Link>
                ) : (
                  toTitleCase(vendor.company_type)
                )}
              </td>
              <td>{toTitleCase(vendor.service_region)}</td>
              <td>{toTitleCase(vendor.lob)}</td>
              <td>
                {
                  vendor.cm_current_status === "APPROVED" ?
                    <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-success btn-rounded"} onClick={() => { handleModal(vendor) }}>Approved</button>
                    :
                    vendor.cm_current_status === "REJECTED" && vendor.cm_transit_status === "NOT APPROVED" ? <button style={{ padding: "4px", fontSize: "12px" }} class={"btn btn-danger btn-rounded"} onClick={() => { handleModal(vendor) }}>Reject <HiQuestionMarkCircle size={15} /></button>
                      : <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-warning btn-rounded"} onClick={() => { handleModal(vendor) }}>Status <HiQuestionMarkCircle size={15} /></button>
                }
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default VendorDataFormat;
