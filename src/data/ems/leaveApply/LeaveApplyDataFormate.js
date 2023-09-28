import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Table, Tooltip } from "reactstrap";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { useDispatch } from "react-redux";
import Modal from 'react-bootstrap/Modal';
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import { setIds, setSelect,setIndexValue } from "../../../store/dataList/DataList";
const LeaveApplyDataFormate = ({ data, data1 }) => {
  console.log("the data =====", data);
  console.log("the data1====", data1);
  const total_data = useSelector((state) => state.pagination.total_data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToggle(false));
  }, []);
  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);
  //For Sorting
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("leave_category"));
    } else if (index === 1) {
      dispatch(setIndexValue("date"));
    } else if (index === 2) {
      dispatch(setIndexValue("from_date"));
    } else if (index === 3) {
      dispatch(setIndexValue("to_date"));
    } else if (index === 4) {
      dispatch(setIndexValue("remarks"));
    }
    
  }, [index]); 
  //Multi Delete function
  const ids = useSelector((state) => state.datalist.ids);
  const select_all = useSelector((state) => state.datalist.select_all);
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
    if (ids !== [] && select_all === true) {
      setselected(ids);
    }
  }, [ids]);
  useEffect(() => {
    if (select_all === false) {
      setselected([]);
    }
  }, [select_all]);
  // Image Modal
  const [openModal, setopenModal] = useState(false);
  const handleCloseMod = () => {
    setopenModal(false);
  }
  const [img, setimg] = useState("");
  const handle_img = (a) => {
    setimg(a)
  }
  return (
    <>
     
      {(list_toggle === true ? data1 : data) === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((item, index) => {
          console.log(" leave  Value is", item);
          console.log("Leave Index is", index);
          console.log("Leave id is", item.id);
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
                  handlefunn(item.id);
                  dispatch(setSelect(true));
                }}
              >
                {selected.includes(item.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
              <td>
                <Link to="/ems/leave/AddLeave" state={{ item: item }}>
                  {toTitleCase(item.leave_category)}
                </Link>
              </td>
              <td>{item.date}</td>
              <td>{item.from_date}</td>
              <td>{item.to_date}</td>
              {/* <td>
      {item.remarks.length > 25 ? (
        <div onClick={() => handleOpenModal(item.remarks)}>
          <Modal show={openModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Remarks</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {item.remarks}
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        item.remarks
      )}
      {item.remarks.length > 25 && (
        <span id={`remarks-${index}`}>
          {item.remarks.substring(0, 25)}...
        </span>
      )}
    </td> */}
              {/* <td>
                {item.remarks.length > 25 ? (
                  <Tooltip placement="top" target={`remarks-${index}`}>
                    {item.remarks}
                  </Tooltip>
                ) : (
                  item.remarks
                )}
                {item.remarks.length > 25 && (
                  <span id={`remarks-${index}`}>
                    {item.remarks.substring(0, 25)}...
                  </span>
                )}
              </td> */}
              {/* <td>
                <div onClick={() => {
                  handle_img(item.remarks);
                  setopenModal(true)
                }}>
                   
                </div>
                <Modal show={openModal} onHide={handleCloseMod}>
        <Modal.Header closeButton>
          <Modal.Title>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {item.remarks}
        </Modal.Body>

      </Modal>
              </td> */}

            </tr>
          );
        })
      )}
    </>
  );
};
export default LeaveApplyDataFormate;
