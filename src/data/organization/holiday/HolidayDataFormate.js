import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDownloadDone, MdClear } from "react-icons/md";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { setDeleteId,setIds,setIndexValue,setSelect,} from "../../../store/dataList/DataList";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
import { setAlertType,setDataExist,setShowAlert } from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";

const HolidayDataFormate = ({data,data1}) => {
    console.log("data", data);
 
    const dispatch = useDispatch();
    const cust_user_permissions = useSelector(
      (state) => state.permissions.cust_user_permissions
    );
  
    const searchData = useSelector((state) => state.searchbar.search_item);
    const total_data = useSelector((state) => state.pagination.total_data);
    const accessToken = useSelector((state) => state.authentication.access_token);
    const user_id = useSelector((state) => state.authentication.userdetails.id);
    const list_toggle = useSelector((state) => state.datalist.list_toggle);
  
    //Multi Delete function
    const close = useSelector((state) => state.datalist.close);
    const select_all = useSelector((state) => state.datalist.select_all);
    const select = useSelector((state) => state.datalist.select);
    const delete_id = useSelector((state) => state.datalist.delete_id);
  
    const [selected, setselected] = useState([]);
  
    const ids = useSelector((state) => state.datalist.ids);
    let is_superuser = useSelector(
      (state) => state.authentication.userdetails.is_superuser
    );
  
    const [click, setclick] = useState(true);
  
    const [refresh, setrefresh] = useState(false);
    const deleteCharge = (id) => {
      axios
        .post(
          ServerAddress + "organization/delete-holiday/",
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
            setrefresh(!refresh);
            dispatch(setIsDeleted("Yes"));
            dispatch(setToggle(true));
          }
        })
        .catch((err) => {
          alert(`Error While delete Commidity ${err}`);
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
      if (ids !== [] && select_all === true) {
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
      if (delete_id == true) {
        deleteCharge(ids);
      }
    }, [delete_id]);
  
    //For Shorting
    const index = useSelector((state) => state.datalist.index);
  
    useEffect(() => {
      if (index == 0) {
        dispatch(setIndexValue("Holiday Name"));
      } else if (index == 1) {
        dispatch(setIndexValue("From Date"));
      }
    }, [index]);
  return (
    <>
      {(list_toggle === true ? data1 : data) === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((item, index) => {
          console.log("Item Value is", item);
          console.log("Item Index is", index);
          console.log("item id is", item.id);

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
                <Link to="/organisation/holidays/AddHoliday" state={{ item: item }}>
                  {toTitleCase(item.name)}
                </Link>
              </td>
              <td>{item.from_date}</td>
              <td>{item.end_date}</td>
            </tr>
          );
        })
      )}
    </>
  )
}

export default HolidayDataFormate