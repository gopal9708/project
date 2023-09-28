import React, { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsXLg } from "react-icons/bs";
import { FiSquare, FiCheckSquare, FiMinusSquare } from "react-icons/fi";
import { RiArrowUpDownLine } from "react-icons/ri";

import {
  setDataLoaded,
  setNext,
  setNextB,
  setPrev,
  setPrevB,
  setTotalData,
  setTotalDataB,
} from "../../../store/pagination/Pagination";
import {
  setClose,
  setDeleteId,
  setIds,
  setIndex,
  setIndexValue,
  setListToggle,
  setSelect,
  setSelectAll,
} from "../../../store/dataList/DataList";
import { Modal, Button } from "react-bootstrap";
import {
  setFilterA,
  setFilterB,
  setFilterC,
  setFilterD,
  setFilterE,
  setFilterF,
  setFilterG,
  setFilterH,
} from "../../../store/filterValue/FilterValue";

const DataList = ({
  Data_Title,
  Data_Format,
  path,
  pathb,
  value,
  order_id = "",
  checkbox = "",
  can_delete,
  setstatus_data
}) => {
  const [data_title, setdata_title] = useState(Data_Title);

  const myArr = JSON.parse(JSON.stringify(data_title));

  // Additional Field
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.authentication.access_token);
  const [data, setdata] = useState([]);
  const [datab, setdatab] = useState([]);
  const page_num = useSelector((state) => state.pagination.page_number);
  const is_deleted = useSelector((state) => state.pagination.is_deleted);
  const toggle = useSelector((state) => state.parentfilter.toggle);
  const tog = useSelector((state) => state.pagination.toggle);
  const is_search = useSelector((state) => state.searchbar.is_search);
  const next = useSelector((state) => state.pagination.next);
  const prev = useSelector((state) => state.pagination.prev);
  const page_numb = useSelector((state) => state.pagination.page_numberb);
  const is_deletedb = useSelector((state) => state.pagination.is_deletedb);
  const nextb = useSelector((state) => state.pagination.nextb);
  const prevb = useSelector((state) => state.pagination.prevb);
  const togb = useSelector((state) => state.pagination.toggleb);
  const cm_value = useSelector((state) => state.datalist.cm_filter);

  const [data_ids, setdata_ids] = useState([]);
  const user = useSelector((state) => state.authentication.userdetails);
  const index_value = useSelector((state) => state.datalist.index_value);

  const getdata = async () => {
    try {
      const response = await axios.get(ServerAddress + path, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      // console.log(" response.data==========",  response.data)
  
      const { results, count, previous, next } = response.data;
  
      const tempDataIds = results.map((element) => element.id);
  
      setdata(results);
      dispatch(setTotalData(count));
      dispatch(setDataLoaded(true));
      dispatch(setPrev(previous));
      dispatch(setNext(next));
      setdata_ids(tempDataIds);
    } catch (err) {
      console.warn(`Error Occurred in Get Data ${err}`);
    }
  };
  
  const getdatab = async () => {
    try {
      const response = await axios.get(ServerAddress + pathb, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const { results, count, previous, next } = response.data;
  
      setdatab(results);
      dispatch(setTotalDataB(count));
      dispatch(setPrevB(previous));
      dispatch(setNextB(next));
      dispatch(setDataLoaded(true));
    } catch (err) {
      console.warn(`Error Occurred in Get Data ${err}`);
    }
  };

  useLayoutEffect(() => {
    if (path) {
      getdata();
    }
  // }, [tog, page_num, toggle, is_search, is_deleted, cm_value]);
  }, [tog, page_num, toggle, is_search, is_deleted, prev, next, cm_value]);

  useLayoutEffect(() => {
    if (pathb) {
      getdatab();
    }
  // }, [togb, page_numb, toggle, is_search, is_deletedb]);
  }, [togb, page_numb, toggle, is_search, is_deletedb, prevb, nextb]);

  // ------------Shorting---------------

  const data_length = useSelector((state) => state.pagination.data_length);

  const [data1, setdata1] = useState(data);

  const [order, setorder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        String(a[col]).toLowerCase() > String(b[col]).toLowerCase() ? 1 : -1
      );
      setdata1(sorted);
      setorder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        String(a[col]).toLowerCase() < String(b[col]).toLowerCase() ? 1 : -1
      );
      setdata1(sorted);
      setorder("ASC");
    }
  };

  const sortFunc = (index) => {
    dispatch(setIndex(index));
    sorting(index_value);
    dispatch(setListToggle(true));
  };

  useEffect(() => {
    dispatch(setListToggle(false));
  }, [data_length, page_num, is_search, is_deleted]);

  useEffect(() => {
    dispatch(setIndex(""));
    dispatch(setIndexValue(""));
  }, []);

  // ---------Multi Delete---------------
  const select_all = useSelector((state) => state.datalist.select_all);
  const ids = useSelector((state) => state.datalist.ids);

  const handleDelete = () => {
    handleShow();
  };

  const select = useSelector((state) => state.datalist.select);
  const [toggle_name, settoggle_name] = useState("");
  const [togAll, settogAll] = useState(false);
  const handleClk = () => {
    dispatch(setSelect(false));
    dispatch(setSelectAll(!togAll));
    dispatch(setDeleteId(false));
    dispatch(setClose(false));
  };

  useEffect(() => {
    if (select_all === true) {
      settoggle_name("check");
      dispatch(setIds(data_ids));
    } else if (select_all === false) {
      settoggle_name("notcheck");
      dispatch(setIds([]));
    }
  }, [select_all]);

  useEffect(() => {
    if (select === true && select_all === true) {
      settoggle_name("minus");
    }
  }, [select, select_all]);

  const handleClose = () => {
    dispatch(setIds([]));
    dispatch(setSelectAll(false));
    dispatch(setSelect(false));
    dispatch(setClose(true));
  };
  useEffect(() => {
    dispatch(setDeleteId(false));
    dispatch(setSelectAll(false));
    dispatch(setIds([]));
    dispatch(setClose(false));
  }, []);

  //-------------For Modal----------------
  const [show, setShow] = useState(false);

  const handleCls = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDel = () => {
    dispatch(setDeleteId(true));
    setShow(false);
    dispatch(setSelectAll(false));
  };

  useEffect(() => {
    dispatch(setFilterA([]));
    dispatch(setFilterB([]));
    dispatch(setFilterC([]));
    dispatch(setFilterD([]));
    dispatch(setFilterE([]));
    dispatch(setFilterF([]));
    dispatch(setFilterG([]));
    dispatch(setFilterH([]));
  }, []);

  return (
    <div style={{ borderWidth: 1, width: "" }}>
      <Modal show={show} onHide={handleCls}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: "14px" }}>
          {ids.length} item {ids.length > 1 && "(s)"} on this page are selected.
          Do, you want to Delete these items ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCls}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDel()}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {ids.length !== 0 && (
        <div style={{ display: "flex" }}>
          <div
            style={{
              background: "white",
              borderRadius: "5px",
              marginBottom: "2px",
              height: "39px",
              border: "2px solid green",
              padding: "3px",
              width: "285px",
            }}
          >
            <p style={{ fontSize: "12px", color: "black", margin: "5px" }}>
              <span
                style={{ cursor: "pointer" }}
                className="delete-btn"
                onClick={() => handleDelete()}
              >
                <RiDeleteBin6Line style={{ fontSize: "18px" }} />
                <span style={{ marginLeft: "5px", fontWeight: "500" }}>
                  Delete
                </span>
              </span>
              <span>
                <span style={{ marginLeft: "15px", fontSize: "12px" }}>
                  {ids.length} Selected{" "}
                  <BsXLg
                    style={{
                      fontSize: "12px",
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "35px",
                    }}
                    onClick={() => handleClose()}
                  />
                </span>
              </span>
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "2px",
              background: "#DCEDFC",
              borderRadius: "5px",
              marginBottom: "2px",
              
              height: "39px",
              border: "1px solid #cde3f7",
              padding: "11px",
              width: "100%",
            }}
          >
            <p style={{ fontSize: "12px", color: "black", fontWeight: "500" }}>
              <span>
                {ids.length} item {ids.length > 1 && "(s)"} on this page are
                selected.
              </span>
              {/* <span style={{ color: "#2BB69B", marginLeft: "5px" }}>
                Select all {total_data} items
              </span> */}
            </p>
          </div>
        </div>
      )}

      <div
        className="fixTableHead"
        style={{ overflowY: "auto", maxHeight: "58.2vh", width: "" }}
      >
        <table
          className="topheader table-light"
          style={{ borderCollapse: "collapse", width: "100%", borderWidth: 1 }}
        >
          <thead
            style={{
              position: "sticky",
              top: "0",
            }}
          >
            <tr style={{ lineHeight: 2, borderWidth: 1 }}>
              {checkbox === "" &&
                (can_delete === true || user.is_superuser) && (
                  <th
                    style={{ position: "relative", textAlign: "center" }}
                    onClick={() => settogAll(!togAll)}
                  >
                    <div onClick={() => handleClk()}>
                      {toggle_name === "check" ? (
                        <FiCheckSquare size={14} />
                      ) : toggle_name === "notcheck" ? (
                        <FiSquare size={14} />
                      ) : toggle_name === "minus" ? (
                        <FiMinusSquare size={14} />
                      ) : (
                        <FiSquare size={14} />
                      )}
                    </div>
                  </th>
                )}
              {myArr.map((item, index) => {
                return (
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      textAlign: "center",
                      fontSize: "12.5px",
                    }}
                    key={index}
                  >
                    {/* {item[12] && <MdAdd/>} */}
                    {item}{" "}
                    {checkbox === "" && (
                      <RiArrowUpDownLine
                        className="arrow"
                        onClick={() => sortFunc(index)}
                      />
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody style={{ fontSize: "12px", textAlign:"left" }}>
            <Data_Format
              data={data}
              datab={datab}
              val_data={value}
              data1={data1}
              order_id={order_id}
              can_delete={can_delete}
              setstatus_data={setstatus_data}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataList;
