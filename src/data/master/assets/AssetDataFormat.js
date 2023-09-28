import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
// import { setMain_checkbox } from "../../../store/Components/ListDisplay/Main_Checkbox/action";
import axios from "axios";
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
import Modal from "react-bootstrap/Modal";
import cross from "../../../assets/images/ComponentsIcon/cross.png";
import correct from "../../../assets/images/ComponentsIcon/check-mark.png";
import { BsPrinterFill } from "react-icons/bs";
import { HiQuestionMarkCircle } from "react-icons/hi";

const AssetsDataFormat = ({ data, data1, can_delete }) => {
  // Permissions
  
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

  //    UseState
  const [openModal, setopenModal] = useState(false);
  const closeModal = () => setopenModal(false);
  const [asset_barcode, setasset_barcode] = useState("");
  const [asset_id, setasset_id] = useState("");
  const ids = useSelector((state) => state.datalist.ids);
  
  const [click, setclick] = useState(true);

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
          dispatch(setToggle(true));
        }
      })
      .catch((err) => {
        dispatch(setShowAlert(true));
        dispatch(
          setDataExist(
            `Asset Already Exists Some Where`
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
      dispatch(setIndexValue("asset_id"));
    } else if (index === 1) {
      dispatch(setIndexValue("barcode"));
    }
    else if (index === 2) {
      dispatch(setIndexValue("box_type"));
    }
    else if (index === 3) {
      dispatch(setIndexValue("product_id"));
    }
    else if (index === 4) {
      dispatch(setIndexValue("current_branch_n"));
    }
    else if (index === 5) {
      dispatch(setIndexValue("created_by_n"));
    }
    else if (index === 6) {
      dispatch(setIndexValue("in_use"));
    }
    else if (index === 7) {
      dispatch(setIndexValue("no_of_usage"));
    }
    else if (index === 8) {
      dispatch(setIndexValue("is_damaged"));
    }
    else if (index === 9) {
      dispatch(setIndexValue("created_branch_n"));
    }
  }, [index]);

  const handleModal = (a, b, c) => {
    setasset_barcode(a, b);
    setasset_id(c);
    if (asset_barcode) {
      setopenModal(true);
    }
  };

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Asset" && e.update === true)
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

  const handleModalCM = (asset) => {
    console.log("NOT APPROVED-----", asset)
    handleShowM()
    setreject_resion(asset)
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
      <Modal
        // contentClassName="content-test"
        show={openModal}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div style={{ color: "#2C74B3" }}>Asset Id :{asset_id}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <img src={asset_barcode} alt="asset_barcode" />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BsPrinterFill color="#82C3EC" size={30} />
          </div>
        </Modal.Body>
      </Modal>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((asset, index) => {
          // let box_t = data[index].box_type;
          // let arry = ["CREDO", "VYPE", "MULTI USE", "DRY ICE MULTI USE"];
          // let uses_type = "";
          // if (arry.includes(box_t)) {
          //   uses_type = "Multi Use";
          // } else {
          //   uses_type = "Single Use";
          // }

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
                    handlefunn(asset.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(asset.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}
              <td>
              {(can_update && asset.cm_current_status !== "APPROVED") || user.is_superuser ? (
                  <Link to="/master/add-asset" state={{ asset: asset }}>
                    {asset.asset_id}
                  </Link>
                ) : (
                  asset.asset_id
                )}
              </td>
              <td>
                <div
                  onClick={() => {
                    handleModal(asset.barcode, index, asset.asset_id);
                  }}
                >
                  <img
                    src={asset.barcode}
                    alt="barcode"
                    style={{ height: "70px", width: "90px" }}
                  />
                </div>
                <div style={{fontSize:"10px"}}>{asset.old_box_no}</div>
              </td>
              <td>{toTitleCase(asset.asset_type)}</td>
              <td>{toTitleCase(asset.box_type)}</td>
              <td>
                {asset.product_id ? (
                  asset.product_id
                ) : (
                  <div style={{ color: "red" }}>Product Id Not Added</div>
                )}
              </td>
              <td>{toTitleCase(asset.assigned_branch_n)}</td>
              <td>{toTitleCase(asset.current_branch_n)}</td>
              <td>{asset.created_by_n}</td>
              <td>
                {asset.in_use ? (
                  <img
                    src={correct}
                    alt="correct"
                    style={{ width: "22px", height: "22px" }}
                  />
                ) : (
                  <img src={cross} alt="cross" style={{ width: "22px", height: "22px" }} />
                )}
              </td>
              <td>{asset.no_of_usage}</td>
              <td>
                {asset.is_damaged ? (
                  <img
                    src={correct}
                    alt="correct1"
                    style={{ width: "22px", height: "22px" }}
                  />
                ) : (
                  <img src={cross} alt="cross1" style={{ width: "22px", height: "22px" }} />
                )}
              </td>
              <td>{toTitleCase(asset.created_branch_n)}</td>            
              <td>
                {
                  asset.cm_current_status === "APPROVED" ?
                    <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-success btn-rounded"} onClick={() => { handleModalCM(asset) }}>Approved</button>
                    :
                    asset.cm_current_status === "REJECTED" && asset.cm_transit_status === "NOT APPROVED" ? <button style={{ padding: "4px", fontSize: "12px" }} class={"btn btn-danger btn-rounded"} onClick={() => { handleModal(asset) }}>Reject <HiQuestionMarkCircle size={15} /></button>
                      : <button style={{ padding: "4px", fontSize: "12px" }} className={"btn btn-warning btn-rounded"} onClick={() => { handleModalCM(asset) }}>Status <HiQuestionMarkCircle size={15} /></button>
                }
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default AssetsDataFormat;
