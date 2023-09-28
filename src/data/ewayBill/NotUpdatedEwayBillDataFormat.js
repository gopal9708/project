import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";
import { setIsDeleted, setToggle } from "../../store/pagination/Pagination";
import correct from "../../assets/images/bookings/check-mark.png";
import cross from "../../assets/images/bookings/remove.png";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import {
  setClose,
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../store/dataList/DataList";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../store/alert/Alert";

// import { saveAs } from 'file-saver';

const NotUpdatedEwayBillDataFormat = ({ data, data1, can_delete }) => {
  console.log("dataaaaaaaaaa", data)
  const dispatch = useDispatch();
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const ids = useSelector((state) => state.datalist.ids);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const user = useSelector((state) => state.authentication.userdetails);
  const success = useSelector((state) => state.alert.show_alert);

  // For Delete Eay Bill Part B
  const delete_ewaybill_partb = (id) => {
    axios
      .post(
        ServerAddress + "analytic/delete_ewaybill_partb/",
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
        alert(`Error While delete Commidity ${err}`);
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
      delete_ewaybill_partb(ids);
    }
  }, [delete_id]);

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("ewb_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("docket_no"));
    }
    else if (index === 2) {
      dispatch(setIndexValue("ewb_id"));
    }
    else if (index === 3) {
      dispatch(setIndexValue("vehicle_no"));
    }
    else if (index === 4) {
      dispatch(setIndexValue("valid_upto"));
    }
    else if (index === 5) {
      dispatch(setIndexValue("created_at"));
    }
    else if (index === 6) {
      dispatch(setIndexValue("is_updated"));
    }
  }, [index]);

  //For Modal
  const [ewaypartb_id, setewaypartb_id] = useState("")
  const [eway_no, seteway_no] = useState("")
  console.log("ewaypartb_id=====", ewaypartb_id)
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setewaypartb_id("")
    setShow(false);
  }
  const handleShow = (e, val) => {
    seteway_no(val)
    setewaypartb_id(e)
    setShow(true);
  }

  const update_partb = async () => {

    try {
      const response = await axios.put(
        ServerAddress + "analytic/update_partb/" + ewaypartb_id,
        {
          is_updated: true,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.data.status === "success") {
        dispatch(setToggle(true));
        dispatch(
          setDataExist(`"${eway_no}" Updated Sucessfully`)
        );
        dispatch(setAlertType("info"));
        dispatch(setShowAlert(true));
        setShow(false);
      } else {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Some Thing Went Wrong`
          )
        );
        dispatch(setAlertType("warning"));
        setShow(false);
      }
    } catch (error) {
      alert("Error Error While Updateing branches");
    }
  };
  useEffect(() => {
    dispatch(setToggle(false));
  }, [success])

  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eway Bill</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Is Eway Bill Part B update with "${eway_no}" Eway Bill Number ?`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => update_partb()}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((ewaybill, index) => {
          var time = new Date(ewaybill.valid_upto).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
          var crtime = new Date(ewaybill.created_at).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
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
                    handlefunn(ewaybill.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(ewaybill.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}
              <td>{ewaybill.ewb_no}</td>
              <td>{ewaybill.docket_no}</td>
              <td>{ewaybill.ewb_id}</td>
              <td>{ewaybill.vehicle_no}</td>
              <td>{time}</td>
              <td>{crtime}</td>
              <td>
                {ewaybill.is_updated ? (
                  <div>
                    <img src={correct} alt="correct" width="18" height="18" />
                  </div>
                ) : (
                  <div>
                    <img src={cross} alt="cross" width="18" height="18" />
                  </div>
                )}
              </td>
              <td>
                <Button size="sm" variant="success" onClick={() => {
                  handleShow(ewaybill.id, ewaybill.ewb_no)
                }}>Updated</Button>
              </td>

            </tr>
          );
        })
      )}
    </>
  );
};

export default NotUpdatedEwayBillDataFormat;
