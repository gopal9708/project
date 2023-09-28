import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { BiRotateRight } from "react-icons/bi";
import Modal from 'react-bootstrap/Modal';
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setIsDeleted,
  setToggle,
} from "../../../store/pagination/Pagination";
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
import correct from "../../../assets/images/bookings/check-mark.png";
import cross from "../../../assets/images/bookings/remove.png";

const VehcileDataFormat = ({ data, data1, can_delete }) => {

  console.log("data---", data)
  // Permissions
  const dispatch = useDispatch();

  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);

  const [selected, setselected] = useState([]);

  const ids = useSelector((state) => state.datalist.ids);

  const [click, setclick] = useState(true);

  const delete_vehicle = (id) => {
    axios
      .post(
        ServerAddress + "master/delete_vehicle/",
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
            `Vehicle Already Exists Some Where`
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
      delete_vehicle(ids);
    }
  }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("vehcile_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("organization_name"));
    } else if (index === 1) {
      dispatch(setIndexValue("vehcile_type"));
    } else if (index === 1) {
      dispatch(setIndexValue("vehcile_model"));
    } else if (index === 1) {
      dispatch(setIndexValue("vehcile_status"));
    }
  }, [index]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Charges" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);

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
          <div style={{ overflow: "hidden" }}>
            <img src={img} style={{ maxWidth: "100%", maxHeight: "100%", display: "block", margin: "auto", borderRaidus: "15px", transform: `rotate(${rotationAngle}deg)` }}
              onClick={handleClick}
            />
          </div>
          <div style={{display:"flex", justifyContent:"right", cursor:"pointer", color:"blue"}}  onClick={handleClick}>
            <BiRotateRight size={25}/>
          </div>

        </Modal.Body>

      </Modal>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((vehcile, index) => {
          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >

              <td
                className="selection-cell"
                onClick={() => {
                  handlefunn(vehcile.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false));
                }}
              >
                {selected.includes(vehcile.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
              <td>

                <Link
                  to="/master/Add_Vehcile"
                  state={{ vehcile: vehcile }}
                >
                  {vehcile.vehcile_no}
                </Link>


              </td>
              <td>{vehcile.organization_name ? toTitleCase(vehcile.organization_name) : "-"}</td>
              <td>{toTitleCase(vehcile.vehcile_owner)}</td>
              <td>{toTitleCase(vehcile.vehcile_type)}</td>
              <td>{toTitleCase(vehcile.vehcile_model)}</td>
              <td>{vehcile.vehcile_status ?
                <div>
                  <img src={correct} alt="correct" height="18px" width="18px" />
                </div> :
                <div>
                  <img src={cross} alt="cross" height="18px" width="18px" />
                </div>
              }</td>

              <td>
                <div onClick={() => {
                  handle_img(vehcile.image);
                  setopenModal(true)
                }}>
                  <img src={vehcile.image} alt="vehicle_image" height="70px" width="70px"

                  />
                </div>
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default VehcileDataFormat;
