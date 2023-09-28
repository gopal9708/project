import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiQuestionMarkCircle } from "react-icons/hi";

import {
  setIsDeleted,
  setToggle,
} from "../../../store/pagination/Pagination";
import {
  setIds,
  setIndexValue,
} from "../../../store/dataList/DataList";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import Modal from "react-bootstrap/Modal";
import pdf from "../../../assets/images/Pdf/printer.png";

const AllManifestDataFormat = ({ data, data1, can_delete }) => {

  const dispatch = useDispatch();

  const user = useSelector((state) => state.authentication.userdetails);

  const total_data = useSelector((state) => state.pagination.total_data);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);

  const [selected, setselected] = useState([]);

  const ids = useSelector((state) => state.datalist.ids);

  // const deleteCharge = (id) => {
  //   axios
  //     .post(
  //       ServerAddress + "master/delete-asset-info/",
  //       {
  //         data: id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (response) {
  //       if (response.statusText === "OK") {
  //         dispatch(setDeleteId(false));
  //         setclick(false);
  //         dispatch(setIds([]));
  //         dispatch(setSelect(false));
  //         setselected([]);
  //         dispatch(setShowAlert(true));
  //         dispatch(setDataExist(`Data Deleted Sucessfully`));
  //         dispatch(setAlertType("danger"));
  //         dispatch(setIsDeleted("Yes"));
  //         dispatch(setToggle(true));
  //       }
  //     })
  //     .catch((err) => {
  //       alert(`Error While delete Asset ${err}`);
  //     });
  // };

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

  // useEffect(() => {
  //   if (delete_id == true) {
  //     deleteCharge(ids);
  //   }
  // }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("asset_id"));
    } else if (index === 1) {
      dispatch(setIndexValue("barcode"));
    }
  }, [index]);

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
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((manifest, index) => {
          let f_date_f = manifest.manifest_date.split("T");
          let f_date = f_date_f[0];
          let f_time_r = String(f_date_f[1]).substring(0, 5);
          let l_fdate = f_date + " " + f_time_r;

          return (
            <tr
              key={index}
              style={{
                bmanifestWidth: 1,
              }}
            >
              {/* {(can_delete || user.is_superuser) && (
              <td
                className="selection-cell"
                onClick={() => {
                  handlefunn(manifest.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false));
                }}
              >
                {selected.includes(manifest.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
               )} */}
              {/* <td>
                <Link
                  to={{
                    pathname: `/manifest/updatemanifest`,
                  }}
                  state={{ manifest: manifest }}
                >
                  {manifest.manifest_no}
                </Link>
              </td> */}
              <td>
                {/* VERIFIED CUSTOMER SUPPORT MANAGER */}
                {/* || manifest.transit_status == "VERIFIED CUSTOMER SUPPORT MANAGER") && !user.is_superuser && user.user_department_name !== "ACCOUNTANT"  */}
                {
                  (selected.includes(manifest.id) || manifest.cm_transit_status === "APPROVED") && !user.is_superuser ? (
                    manifest.manifest_no
                  )
                    : (manifest.cm_current_status !== "NOT APPROVED" && manifest.cm_current_status !== "REJECTED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                      ? manifest.manifest_no
                      : (manifest.cm_current_status === "REJECTED" && (manifest.cm_transit_status === "VERIFIED OPERATION MANAGER" || manifest.cm_transit_status === "VERIFIED CUSTOMER SUPPORT MANAGER") && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                        ? manifest.manifest_no
                        : (manifest.cm_current_status !== "NOT APPROVED" && manifest.cm_current_status !== "REJECTED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE"))
                          ? manifest.manifest_no
                          : (manifest.cm_current_status !== "REJECTED" && (manifest.cm_transit_status === "VERIFIED CUSTOMER SUPPORT MANAGER" || manifest.cm_transit_status === "VERIFIED OPERATION MANAGER" || manifest.cm_transit_status === "VERIFIED ACCOUNTANT" || manifest.cm_transit_status === "VERIFIED ACCOUNT MANAGER" || manifest.cm_transit_status === "VERIFIED ACCOUNT MANAGER")
                            && (user.user_department_name + " " + user.designation_name === "OPERATION MANAGER" || user.user_department_name + " " + user.designation_name === "CUSTOMER SUPPORT MANAGER"))
                            ? manifest.manifest_no
                            : (manifest.cm_current_status !== "REJECTED" && (manifest.cm_transit_status === "VERIFIED ACCOUNTANT" || manifest.cm_transit_status === "VERIFIED ACCOUNT MANAGER") && (user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER"))
                              ? manifest.manifest_no
                              :
                              (
                                <Link
                                  to="/manifest/updatemanifest"
                                  state={{ manifest: manifest }}
                                >
                                  {manifest.manifest_no}
                                </Link>)
                }
              </td>
              <td>{manifest.organization_name ? toTitleCase(manifest.organization_name) : "-"}</td>
              <td>{l_fdate}</td>
              <td>
                {
                  manifest.cm_current_status === "APPROVED" ?
                    <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-success btn-rounded"} onClick={() => { handleModal(); setreject_resion(manifest) }}>Approved</button>
                    :
                    manifest.cm_current_status === "REJECTED" && manifest.cm_transit_status === "NOT APPROVED" && (user.user_department_name + " " + user.designation_name === "DATA ENTRY OPERATOR" || user.user_department_name + " " + user.designation_name === "CUSTOMER SERVICE EXECUTIVE") ? <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-danger btn-rounded"} onClick={() => { handleModal(); setreject_resion(manifest) }}>Reject <HiQuestionMarkCircle size={15} /></button>
                      : manifest.cm_current_status === "REJECTED" && (manifest.cm_transit_status === "VERIFIED OPERATION MANAGER" || manifest.cm_transit_status === "VERIFIED CUSTOMER SUPPORT MANAGER") && (user.user_department_name + " " + user.designation_name === "OPERATION MANAGER" || user.user_department_name + " " + user.designation_name === "CUSTOMER SUPPORT MANAGER")
                        ? <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-danger btn-rounded"} onClick={() => { handleModal(); setreject_resion(manifest) }}>Reject <HiQuestionMarkCircle size={15} /> </button>
                        : manifest.cm_current_status === "REJECTED" && (manifest.cm_transit_status === "VERIFIED ACCOUNTANT" || manifest.cm_transit_status === "VERIFIED ACCOUNT MANAGER") && (user.user_department_name === "ACCOUNTANT" || user.user_department_name + " " + user.designation_name === "ACCOUNT MANAGER") ?
                          <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-danger btn-rounded"} onClick={() => { handleModal(); setreject_resion(manifest) }}>Reject <HiQuestionMarkCircle size={15} /> </button>
                          : <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-warning btn-rounded"} onClick={() => { handleModal(); setreject_resion(manifest) }}>Status <HiQuestionMarkCircle size={15} /></button>
                }
              </td>
              <td>{toTitleCase(manifest.orgin_branch_n)}</td>
              <td>{toTitleCase(manifest.destination_branch_n)}</td>
              <td>{toTitleCase(manifest.coloader_name)}</td>
              <td>
                <div>
                  <Link
                    to="/manifest/roughmanfest"
                    state={{ manifest: manifest, is_manifest: true }}
                  >
                    <img src={pdf} alt="pdf" width="20" height="20" />
                  </Link>
                </div>
              </td>
              <td>{manifest.bag_count}</td>
              <td>{manifest.box_count}</td>
              <td>{manifest.total_weight}</td>

            </tr>
          );
        })
      )}
    </>
  );
};

export default AllManifestDataFormat;
