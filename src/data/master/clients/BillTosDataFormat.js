import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
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
import { HashLink } from "react-router-hash-link";
import { HiQuestionMarkCircle } from "react-icons/hi";
import Modal from 'react-bootstrap/Modal';

const BillTosDataFormat = ({ data, data1, can_delete }) => {
  
  console.log("fffffff===", data)
  const dispatch = useDispatch();
  const cust_user_permissions = useSelector(
    (state) => state.permissions.cust_user_permissions
  );

  const commidity_checker_maker_row = cust_user_permissions.find(
    (v) => v[0] === "Commodity"
  );

  let commidity_checker_maker = "Maker";

  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const [cu_status_com_id, setcu_status_com_id] = useState(null);
  const [cu_status, setcu_status] = useState("");
  const user = useSelector((state) => state.authentication.userdetails);

  const ids = useSelector((state) => state.datalist.ids);
  

  const [click, setclick] = useState(true);
  const delete_client_row = (id) => {
    axios
      .post(
        ServerAddress + "master/delete_billto/",
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
            `Client Already Exists Some Where`
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setDeleteId(false));
        dispatch(setIds([]));
        dispatch(setSelect(false));
        setselected([]);
      });
  };

  const changed_client_status = () => {
    axios
      .put(
        ServerAddress +
        "masters/api/update_client_status/" +
        cu_status_com_id,
        {
          user_id: user_id,
          cu_status: cu_status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) { })
      .catch(function () {
        alert("Error Error While  Updateing commidity");
      });
  };

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  useEffect(() => {
    if (cu_status !== "") {
      changed_client_status();
    }
  }, [cu_status]);

  useLayoutEffect(() => {
    if (commidity_checker_maker_row) {
      commidity_checker_maker = commidity_checker_maker_row[1];
    }
  }, []);

  const list_toggle = useSelector((state) => state.datalist.list_toggle);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  const select = useSelector((state) => state.datalist.select);
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
      delete_client_row(ids);
    }
  }, [delete_id]);
  //For Shorting
  const index = useSelector((state) => state.datalist.index);
  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("name"));
    } else if (index === 1) {
      dispatch(setIndexValue("number"));
    }
  }, [index]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Bill To" && e.update === true)
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

  const handleModal = (client) => {
    console.log("NOT APPROVED-----", client)
    handleShowM()
    setreject_resion(client)
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
        (list_toggle === true ? data1 : data).map((client, index) => {
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
                    handlefunn(client.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(client.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}
              <td>
                {(can_update && client.cm_current_status !== "APPROVED") || user.is_superuser ? (

                  <Link
                    to="/master/billtos/addbillto"
                    state={{ client: client }}
                  >
                    {toTitleCase(client.name)}
                  </Link>
                ) : (
                  toTitleCase(client.name)
                )}
              </td>
              <td>{client.pan_no}</td>
              <td>
                {(can_update && client.cm_current_status !== "APPROVED") || user.is_superuser ? (
                  <HashLink
                    to="/master/billtos/addbillto#customer"
                    state={{ client: client }}
                  >
                    See Clients Section
                  </HashLink>
                ) : (
                 " See Clients Section"
                )}
              </td>

              {/* total_client_count */}
              <td>
                {(can_update && client.cm_current_status !== "APPROVED") || user.is_superuser ? (
                  <HashLink
                    to="/master/billtos/addbillto#customer"
                    state={{ client: client }}
                  >
                    {client.total_client_count}
                  </HashLink>
                ) : (
                  client.total_client_count
                )}
              </td>
              <td>{client.organization_name ? toTitleCase(client.organization_name) : "-"}</td>
              <td>
                {
                  client.cm_current_status === "APPROVED" ?
                    <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-success btn-rounded"} onClick={() => { handleModal(client) }}>Approved</button>
                    :
                    client.cm_current_status === "REJECTED" && client.cm_transit_status === "NOT APPROVED" ? <button style={{ padding: "4px", fontSize: "12px" }} class={"btn btn-danger btn-rounded"} onClick={() => { handleModal(client) }}>Reject <HiQuestionMarkCircle size={15} /></button>
                      : <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-warning btn-rounded"} onClick={() => { handleModal(client) }}>Status <HiQuestionMarkCircle size={15} /></button>
                }
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default BillTosDataFormat;
