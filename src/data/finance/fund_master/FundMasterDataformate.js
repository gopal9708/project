import React, { useEffect, useState } from "react";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteId,
  setIds,
  setSelect,
  setClose,
} from "../../../store/dataList/DataList";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setIndexValue } from "../../../store/dataList/DataList";
import { setIsDeleted } from "../../../store/pagination/Pagination";
import {
  setAlertType,
  setShowAlert,
  setDataExist,
} from "../../../store/alert/Alert";
const FundMasterDataformate = ({ data, data1, can_delete, }) => {
  const [refresh, setrefresh] = useState(false);
  const AccessToken = useSelector((state) => state.authentication.access_token);
  const total_data = useSelector((state) => state.pagination.total_data);
  const select_all = useSelector((state) => state.datalist.select_all);
  const delete_id = useSelector((state) => state.datalist.delete_id);
  const close = useSelector((state) => state.datalist.close);
  const ids = useSelector((state) => state.datalist.ids);
  const index = useSelector((state) => state.datalist.index);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const dispatch = useDispatch();
  const delete_select_item = (id) => {
    axios
      .post(
        ServerAddress + "finance/delete-FundMasterEntry/",
        {
          data: id,
        },
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.statusText === "OK") {
          dispatch(setDeleteId(false));
          dispatch(setIds([]));
          dispatch(setAlertType("danger"));
          dispatch(setShowAlert(true));
          dispatch(
            setDataExist(`Selected ${ids.length} Item Deleted Successfully`)
          );
          setrefresh(!refresh);
        }
      })
      .catch((err) => alert(`Getting error while delete${err}`));
  };
  ///--------------
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
      delete_select_item(ids);
    }
  }, [delete_id, ids]);
  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);
  //For Sorting
  // const index = useSelector(state => state.data_list.index);
  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("arrival_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("challan_no"));
    } else if (index === 2) {
      dispatch(setIndexValue("arrival_lry_no"));
    } else if (index === 3) {
      dispatch(setIndexValue("net_balance"));
    } else if (index === 4) {
      dispatch(setIndexValue("total_weight_short"));
    } else if (index === 5) {
      dispatch(setIndexValue("total_package_short"));
    } else if (index === 6) {
      dispatch(setIndexValue("balance_payable"));
    } else if (index === 7) {
      dispatch(setIndexValue("payable_hamali"));
    }
    // else if (index == 8) {
    //   dispatch(setIndexValue("office_contact_number"))
    // }
  }, [index]);

  // Permission
  const userpermission = useSelector((state) => state.authentication.userpermission);
  const user = useSelector((state) => state.authentication.userdetails);
  const [can_update, setcan_update] = useState(false);

  useEffect(()=> {
    if (
      userpermission.some((e) => e.sub_model === "Fund Master Entry" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission])
  return (
    <>
      {(list_toggle === true ? data1 : data) === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        <>
          {(list_toggle === true ? data1 : data).map((item, index) => {
            return (
              <tr key={index} style={{ borderWidth: 1 }}>
                {(can_delete || user.is_superuser) && (
                <td
                  onClick={() => {
                    handlefunn(item.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(item.id) ? (
                    <FiCheckSquare size={15} />
                  ) : (
                    <FiSquare size={15} />
                  )}
                </td>
                )}
                <td>
                  {(can_update || user.is_superuser ? (
                  <Link
                    state={{ data: item }}
                    to="/master/fundmaster/addfundmaster"
                  >
                    {item.branch_name}
                  </Link>
                  ) : (
                    item.branch_name
                  ))}
                </td>
                <td>{item.account_type}</td>
                <td>{item.ifsc_code}</td>
                <td>{item.account_no}</td>
              </tr>
            );
          })}
        </>
      )}
      ;
    </>
  );
};
export default FundMasterDataformate;
