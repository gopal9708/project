import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setIsDeleted,
  setToggle,
  setToggleB,
} from "../../../store/pagination/Pagination";
import {
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
import { Button } from "reactstrap";
import Modal from "react-bootstrap/Modal";
import Question from "../../../assets/images/bookings/question.png";

const PendingHubDataFormat = ({ data, data1 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("data33-----", data);
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const user = useSelector((state) => state.authentication.userdetails);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);

  const [selected, setselected] = useState([]);

  //    UseState
  const [openModal, setopenModal] = useState(false);
  const closeModal = () => setopenModal(false);
  const [manifest_no, setmanifest_no] = useState("");
  const [manifest_id, setmanifest_id] = useState("");
  const ids = useSelector((state) => state.datalist.ids);
  

  const [click, setclick] = useState(true);

  const updateHub = (id) => {
    axios
      .put(
        ServerAddress + "manifest/update_hub_manifest/" + id,
        {
          is_departed: "True",
          departed: "True",
          forwarded:"False",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "success") {
          setopenModal(false);
          dispatch(setToggle(true));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Manifest Departed Updated sucessfully`));
          dispatch(setAlertType("info"));
          navigate("/manifest/pendingtodepartvehicle");
        } else if (response.data === "duplicate") {
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Already Departed Name 
              )}" already exists`
            )
          );
          dispatch(setAlertType("warning"));
        }
      })
      .catch(function (err) {
        alert(`Error While  Updateing Manifest ${err}`);
      });
  };

  const deleteCharge = (id) => {
    axios
      .post(
        ServerAddress + "master/delete-asset-info/",
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
          dispatch(setToggleB(true));
        }
      })
      .catch((err) => {
        alert(`Error While delete Asset ${err}`);
      });
  };

  useEffect(() => {
    dispatch(setToggleB(false));
  }, [openModal]);

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
      dispatch(setIndexValue("asset_id"));
    } else if (index === 1) {
      dispatch(setIndexValue("barcode"));
    }
  }, [index]);

  const handleModal = (a, b) => {
    setmanifest_id(a);
    setmanifest_no(b);
    setopenModal(true);
  };
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

  return (
    <>
      <Modal show={openModal} onHide={closeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div style={{ marginLeft: "170px" }}>
            <img src={Question} alt="question" width="100vw" height="100vh" />
          </div>
          <div
            style={{
              marginTop: "20px",
              fontSize: "14px",
              fontWeight: "bold",
              marginLeft: "20px",
            }}
          >
            Do You Sure You Want To Depart Manifest {manifest_no} ?
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <Button
              color="success"
              onClick={() => {
                updateHub(manifest_id);
              }}
            >
              Yes
            </Button>
            <Button color="danger" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((hub, index) => {
          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
              {/* <td
                className="selection-cell"
                onClick={() => {
                  handlefunn(hub.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false));
                }}
              >
                {selected.includes(hub.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td> */}

              <td>{hub.hub_transfer_no}</td>
              <td>{toTitleCase(hub.orgin_s)}</td>
              <td>{toTitleCase(hub.destination_s)}</td>
              <td>{hub.orders.length}</td>
              <td>{toTitleCase(hub.coloader_name)}</td>
              <td>{hub.bag_count}</td>
              <td>{hub.box_count}</td>
              <td>{hub.total_weight}</td>
              <td>{hub.orders[0].total_quantity}</td>
              {(can_update || user.is_superuser) && (
              <td>
                {/* <Link to="/manifest/edithub" state={{ hub: hub }}>
                  <Button size="sm" outline type="button" color="warning">
                    Edit
                  </Button>
                </Link> */}
                <Button
                  style={{ marginLeft: "15px" }}
                  size="sm"
                  outline
                  type="button"
                  color="success"
                  onClick={() => {
                    handleModal(hub.id, hub.hub_transfer_no);
                  }}
                >
                  Depart
                </Button>
              </td>
              )}
            </tr>
          );
        })
      )}
    </>
  );
};

export default PendingHubDataFormat;
