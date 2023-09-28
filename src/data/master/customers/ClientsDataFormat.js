import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { setIsDeleted, setToggle } from "../../../store/pagination/Pagination";
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

const ClientsDataFormat = ({ data, data1, can_delete }) => {

console.log("data-------", data)
  
  const dispatch = useDispatch();
  const cust_user_permissions = useSelector(
    (state) => state.permissions.cust_user_permissions
  );

  const commidity_checker_maker_row = cust_user_permissions.find(
    (v) => v[0] === "Commodity"
  );
  let commidity_checker_maker = "Maker";

  const searchData = useSelector((state) => state.searchbar.search_item);
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);

  const ids = useSelector((state) => state.datalist.ids);
  
  const [click, setclick] = useState(true);
  const delete_client_row = (id) => {
    axios
      .post(
        ServerAddress + "master/delete_client/",
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
            `Customer Already Exists Some Where`
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setDeleteId(false));
        dispatch(setIds([]));
        dispatch(setSelect(false));
        setselected([]);
      });
  };


  const list_toggle = useSelector((state) => state.datalist.list_toggle);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  const select = useSelector((state) => state.datalist.select);
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
      // delete_commidity_row(ids);
    }
  }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("name"));
    } else if (index === 1) {
      dispatch(setIndexValue("commodity_type"));
    } else if (index === 2) {
      dispatch(setIndexValue("current_status"));
    }
  }, [index]);

  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Client" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);

  useEffect(() => {
    if (delete_id === true) {
      delete_client_row(ids);
    }
  }, [delete_id]);
  
  useEffect(() => {
    dispatch(setIsDeleted("No"))
  }, [total_data])
  
  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((customer, index) => {
          let cu_status_list = [];

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
                    handlefunn(customer.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(customer.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
              )}
              <td>{toTitleCase(customer.billto_name)}</td>
              <td>
                {can_update || user.is_superuser ? (
                  <Link
                    to="/master/clients/addclient"
                    state={{ customer: customer, type:"update" }}
                  >
                    {toTitleCase(customer.name)}
                  </Link>
                ) : (
                  toTitleCase(customer.name)
                )}
              </td>

              <td>
                {toTitleCase(customer.locality_name) +
                  ", " +
                  toTitleCase(customer.city_name) +
                  ", " +
                  toTitleCase(customer.state_name)}
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default ClientsDataFormat;
