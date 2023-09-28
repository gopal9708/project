import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Question from "../../../assets/images/bookings/question.png";
import pdf from "../../../assets/images/Pdf/printer.png";
// import { setMain_checkbox } from "../../../store/Components/ListDisplay/Main_Checkbox/action";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setToggle,
} from "../../../store/pagination/Pagination";
import {
  setIds,
  setIndexValue,
} from "../../../store/dataList/DataList";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { Button } from "reactstrap";

const IncomingManifestDataFormat = ({ data, data1, can_delete }) => {
  console.log("data-----", data)
  const [manifest_no, setmanifest_no] = useState("");
  
  const user = useSelector((state) => state.authentication.userdetails);

  const dispatch = useDispatch();
  
  const accessToken = useSelector((state) => state.authentication.access_token);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  
  const [selected, setselected] = useState([]);

  //    UseState
  const [openModal, setopenModal] = useState(false);
  const closeModal = () => setopenModal(false);
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
  }, [openModal]);

  // useEffect(() => {
  //   dispatch(setIsDeleted("No"));
  // }, [total_data]);

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

  //Break Manifest
  const BreakManifest = () => {
    axios
      .post(
        ServerAddress + "manifest/add_break_manifest/",
        {
          manifest_no: manifest_no,
          futher_connected: [],
          is_broken: true,
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
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(
              `Manifest Number "${toTitleCase(manifest_no)}" Break Successfully`
            )
          );
          dispatch(setAlertType("info"));
          dispatch(setToggle(true));
        }
      })
      .catch(function (err) {
        alert(`Error While  Updateing Manifest ${err}`);
      });
  };

  const handleModal = (manifest_no) => {
    setmanifest_no(manifest_no);
    setopenModal(true);
    console.log("openModal------", openModal)
  };
  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Incoming Manifest" && e.update === true)
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
            Do You Sure You Want To Break Manifest Number {manifest_no} ?
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
                if (manifest_no) {
                  BreakManifest();
                }
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
        (list_toggle === true ? data1 : data).map((depart, index) => {
          console.log("depart[[[]]",depart)
          console.log("depart6666",depart)
          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
               {/* {(can_delete || user.is_superuser) && (
              <td
                className="selection-cell"
                onClick={() => {
                  handlefunn(depart.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false));
                }}
              >
                {selected.includes(depart.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
               )} */}
              <td>{depart.manifest_no}</td>
              <td>{toTitleCase(depart.orgin_branch_n)}</td>
              <td>{toTitleCase(depart.destination_branch_n)}</td>
              <td>{depart.orders.length}</td>
              <td>{toTitleCase(depart.coloader_name)}</td>
              <td>{depart.bag_count}</td>
              {/* <td>{depart.open_box
              ?
              <div>
                    <img src={correct} width="18" height="18" />
                  </div> : <div>
                    <img src={cross} width="18" height="18" />
                  </div>
              }</td> */}
              <td>{depart.box_count }</td>
              <td>{depart.total_weight}</td>
              <td>
                <div>
                  <Link
                    to="/manifest/roughmanfest"
                    state={{ manifest: depart, is_manifest:true }}
                  >
                    <img src={pdf} alt="pdf" width="20" height="20" />
                  </Link>
                </div>
              </td>

              {(can_update || user.is_superuser) && (

              <td>
                <div>
                  {depart.is_received ? (
                    <Link
                    to="/manifest/breakmanifest"
                    state={{depart:depart}}
                    >
                    <Button
                      size="sm"
                      outline
                      color="warning"
                      type="button"
                      onClick={() => handleModal(depart.manifest_no)}
                      disabled={depart.is_broken}
                    >
                      Break
                    </Button>
                    </Link>
                  ) : (
                    <Link
                    to="/manifest/recieve_manifest"
                    state={{ depart: depart }}
                  >
                    <Button
                      size="sm"
                      outline
                      color="success"
                      // {depart.is_departed  === false ? disabled : null }
                      disabled={depart.is_received === true}
                    >                 
                        Receive                    
                    </Button>
                    </Link>
                  )}
                </div>
              </td>
              )}
            </tr>
          );
        })
      )}
    </>
  );
};

export default IncomingManifestDataFormat;
