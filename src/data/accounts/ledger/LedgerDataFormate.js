/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
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
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";

const LedgerDataFormate = ({ data, data1, can_delete }) => {
  // Permissions
  const userpermission = useSelector((state) => state.authentication.userpermission);
  const user = useSelector((state) => state.authentication.userdetails);
  const [can_update, setcan_update] = useState(false);

  useEffect(()=> {
    if (
      userpermission.some((e) => e.sub_model === "Ledgers" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission])

  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const [refresh, setrefresh] = useState(false);
  const delete_item_row = (id) => {
    axios
      .post(
        ServerAddress + "finance/delete-Ledger/",
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
          setrefresh(!refresh);
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
        }
      })
      .catch((err) => {
        alert(`Error While delete Item ${err}`);
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setToggle(false));
  });

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  //For Sorting
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("item_name"));
    } else if (index === 1) {
      dispatch(setIndexValue("item_code"));
    } else if (index === 2) {
      dispatch(setIndexValue("item_mode"));
    } else if (index === 3) {
      dispatch(setIndexValue("item_group"));
    } else if (index === 4) {
      dispatch(setIndexValue("costing_ratio"));
    } else if (index === 5) {
      dispatch(setIndexValue("st_exempt"));
    } else if (index === 6) {
      dispatch(setIndexValue("created_by"));
    } else if (index === 7) {
      dispatch(setIndexValue("created_at"));
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
  useEffect(() => {
    if (delete_id === true) {
      delete_item_row(ids);
    }
  }, [delete_id]);

  return (
    <>
      {(list_toggle === true ? data1 : data) === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        
        (list_toggle === true ? data1 : data).map((item, index) => {
          console.log("data", data)
          console.log("item is", item)
          let date = item.created_at;
          var strings = [item.group_name, item.subgroup_name1, item.subgroup_name2, item.subgroup_name3];
          var group_list = strings.filter(Boolean).join(", ");
          // let group_list = 
          // // let group_list = item.group_names.map(
          // //   (itm, idx) => itm.group__group_name + " " + "," + " "
          // // );

          var new_date = new Date(date).toLocaleString(undefined, {
            timeZone: "Asia/Kolkata",
          });

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
              )}
              <td>{index + 1}</td>
              <td>
                {(can_update || user.is_superuser ? (
                <Link to="/accounts/ledger/AddLedger" state={{ item: item }}>
                  {toTitleCase(item.name)}
                </Link>
                ) : (
                  toTitleCase(item.name)
                ))}
              </td>

              <td>{group_list}</td>
              <td>{item.created_by}</td>
              <td>{new_date}</td> 
            </tr>
          );
        })
      )}
    </>
  );
};

export default LedgerDataFormate;
