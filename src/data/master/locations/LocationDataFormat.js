import React, { useState, useEffect } from "react";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { useDispatch, useSelector } from "react-redux";
import {
  setClose,
  setIds,
  setDeleteId,
  setIndexValue,
  setSelect,
} from "../../../store/dataList/DataList";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import { HiQuestionMarkCircle } from "react-icons/hi";
import Modal from 'react-bootstrap/Modal';

const LocationDataFormat = ({ data, data1, can_delete }) => {
  const dispatch = useDispatch();
  const ids = useSelector((state) => state.datalist.ids);
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const user = useSelector((state) => state.authentication.userdetails);

  const delete_location_row = (id) => {
    axios
      .post(
        ServerAddress + "master/delete_location/",
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
          dispatch(setDataExist(`Location of deleted sucessfully`));
          dispatch(setAlertType("danger"));
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
        }
      })
      .catch((err) => {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Location Already Exists Some Where`
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

  //Multi Delete function
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
      delete_location_row(ids);
    }
  }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("name"));
    } else if (index === 1) {
      dispatch(setIndexValue("state_name"));
    } else if (index === 2) {
      dispatch(setIndexValue("city_name"));
    } else if (index === 3) {
      dispatch(setIndexValue("pincode_name"));
    }
  }, [index]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some(
        (e) => e.sub_model === "Locations" && e.update === true
      )
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

  const handleModal = (location) => {
    console.log("NOT APPROVED-----", location)
    handleShowM()
    setreject_resion(location)
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
        (list_toggle === true ? data1 : data).map((location, index) => {
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
                    handlefunn(location.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(location.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}

              <td>
              {(can_update && location.cm_current_status !== "APPROVED") || user.is_superuser ? (

                  <Link
                    to="/master/locations/addlocation"
                    state={{ location: location }}
                  >
                    {toTitleCase(location.name)}
                  </Link>
                ) : (
                  toTitleCase(location.name)
                )}
              </td>
              <td>{toTitleCase(location.state_name)}</td>
              <td>
              {(can_update && location.cm_current_status !== "APPROVED") || user.is_superuser ? (

                  <Link
                    to="/master/city/AddCity"
                    state={{ city: location}}
                  >
                    {toTitleCase(location.city_name)}
                  </Link>
                ) : (
                  toTitleCase(location.city_name)
                )}
              </td>
              {/* <td>{toTitleCase(location.city_name)}</td> */}
              <td>
              {(can_update && location.cm_current_status !== "APPROVED") || user.is_superuser ? (
                  <Link
                    to="/master/pincode/AddPincode"
                    state={{ pincode: location, is_pincode:false }}
                  >
                    {toTitleCase(location.pincode_name)}
                  </Link>
                ) : (
                  location.pincode_name
                )}
              </td>
              <td>
                {
                  location.cm_current_status === "APPROVED" ?
                    <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-success btn-rounded"} onClick={() => { handleModal(location) }}>Approved</button>
                    :
                    location.cm_current_status === "REJECTED" && location.cm_transit_status === "NOT APPROVED" ? <button style={{ padding: "4px", fontSize: "12px" }} class={"btn btn-danger btn-rounded"} onClick={() => { handleModal(location) }}>Reject <HiQuestionMarkCircle size={15} /></button>
                      : <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-warning btn-rounded"} onClick={() => { handleModal(location) }}>Status <HiQuestionMarkCircle size={15} /></button>
                }
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default LocationDataFormat;
