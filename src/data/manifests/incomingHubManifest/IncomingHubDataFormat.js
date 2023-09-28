import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import pdf from "../../../assets/images/Pdf/printer.png";
import {
  setIsDeleted,
  setToggle,
} from "../../../store/pagination/Pagination";
import {
  setIds,
  setIndexValue,
} from "../../../store/dataList/DataList";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { Button } from "reactstrap";

const IncomingHubDataFormat = ({ data, data1 }) => {
  
  
  const dispatch = useDispatch();
  

  
  const total_data = useSelector((state) => state.pagination.total_data);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  const [selected, setselected] = useState([]);
  const [manifest_no, setmanifest_no] = useState("")
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


  const handleModal = (manifest_no) => {
    setmanifest_no(manifest_no);
    setopenModal(true);
  };

  return (
    <>
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
              {/* <td>{toTitleCase(hub.coloader_name)}</td> */}
              <td>{hub.bag_count}</td>
              <td>{hub.box_count}</td>
              <td>{hub.total_weight}</td>
              <td>
                <div>
                  <Link
                    to="/manifest/branch_pdf"
                    state={{ manifest: hub }}
                  >
                    <img src={pdf} alt="pdf" width="20" height="20" />
                  </Link>
                </div>
              </td>
              <td>
                <div style={{ marginLeft: "20px" }}>
                  {hub.is_recieved ? (
                    <Link
                      to="/manifest/breakhubmanifest"
                      state={{ hub: hub }}
                    >
                      <Button
                        size="sm"
                        outline
                        color="warning"
                        type="button"
                        onClick={() => handleModal(hub.hub_transfer_no)}
                        disabled={hub.is_broken}
                      >
                        Break
                      </Button>
                    </Link>
                  ) : (
                    <Link
                      to="/manifest/recieve_hub_manifest"
                      state={{ hub: hub }}
                      disabled={hub.is_received === true}
                    >
                      <Button size="sm" outline color="success">
                        Receive
                      </Button>
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default IncomingHubDataFormat;
