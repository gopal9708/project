/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { IconContext } from "react-icons";
import pdf from "../../../assets/images/Pdf/printer.png";
import {
  setDeleteId,
  setIds,
  setIndexValue,
  setSelect,
} from "../../../store/dataList/DataList";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
// import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";

const HighRackDataFormat = ({ data }) => {
  console.log("WAREHOUSE DATA FORMATE====",data)
  const high_rack = data.high_rack;
  console.log("high_rackdata=====",high_rack)

  const navigate = useNavigate();
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const delete_branch_row = (id) => {
    axios
      .post(
        ServerAddress + "/",
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
          dispatch(setIsDeleted(false));
          dispatch(setShowAlert(true));
          dispatch(setDataExist(`Data Deleted Sucessfully`));
          dispatch(setAlertType("danger"));
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
        }
      })
      .catch((err) => {
        alert(`Error While delete branch ${err}`);
      });
  };

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
      dispatch(setIndexValue("id"));
    } else if (index === 1) {
      dispatch(setIndexValue("name"));
    } else if (index === 2) {
      dispatch(setIndexValue("type"));
    } else if (index === 3) {
      dispatch(setIndexValue("company_name"));
    } else if (index === 4) {
      dispatch(setIndexValue("city_name"));
    } else if (index === 5) {
      dispatch(setIndexValue("email"));
    } else if (index === 6) {
      dispatch(setIndexValue("head"));
    } else if (index === 7) {
      dispatch(setIndexValue("office_contact_number"));
    }
  }, [index]);

  //Multi Delete function
  const ids = useSelector((state) => state.datalist.ids);
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
  // useEffect(() => {
  //   if (ids !== [] && select_all === true) {
  //     setselected(ids);
  //   }
  // }, [ids]);
  useEffect(() => {
    if (select_all === false) {
      setselected([]);
    }
  }, [select_all]);
  // useEffect(() => {
  //   if (delete_id === true) {
  //     delete_branch_row(ids);
  //   }
  // }, [delete_id]);
  const high_rack_data = data.high_rack && data.high_rack.length > 0;
  console.log("hasHighRack=====",high_rack_data)
  return (
    <>
      {data.length === 0 ? (
        <span>No data found</span>
      ) : (
        <>
          {data.map((item, index) => {
            console.log("return WAREHOUSE DATA FORMATE is==", item)

            console.log("BBBBBBBB",item.bulk_storage.length )
            const datetimeStr = item.created_at;
            const datetime = new Date(datetimeStr);
            const dateStr = datetime.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
            const timeStr = datetime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            const createdAt = `${dateStr} :: ${timeStr}`;
            console.log("createdAt", createdAt)

            if (item.modified_at !== null) {
              const datetimeStr1 = item.modified_at;
              const datetime1 = new Date(datetimeStr1);
              const dateStr1 = datetime1.toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
              const timeStr1 = datetime1.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
              var modifiedAt = (`${dateStr1} :: ${timeStr1}`)

            }
            console.log("modifiedAt", modifiedAt)

            return (
              <>
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
                  {/* <Link to="/wms/warehouse/AddWarehouse" */}
                    {/* // state={{ item: item }}> */}
                    <td>{item.name}</td>
                  {/* </Link> */}
                  <td>{item.city_nm}</td>
                  <td>{item.address}</td>
                  <td>{item.contact}</td>
                  <td>{item.manager}</td>
                </tr>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default HighRackDataFormat;
