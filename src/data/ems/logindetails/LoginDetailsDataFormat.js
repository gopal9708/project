import React, { useState, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
// import { setMain_checkbox } from "../../../store/Components/ListDisplay/Main_Checkbox/action";
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

const LoginDetailsDataFormat = ({ data, data1 }) => {

  const dispatch = useDispatch();
  const cust_user_permissions = useSelector(
    (state) => state.permissions.cust_user_permissions
  );

  const commidity_checker_maker_row = cust_user_permissions.find(
    (v) => v[0] === "Commodity"
  );
  let commidity_checker_maker = "Maker";

  
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user_id = useSelector((state) => state.authentication.userdetails.id);
  const [cu_status_com_id, setcu_status_com_id] = useState(null);
  const [cu_status, setcu_status] = useState("");

  // const delete_commidity_row = (id, name) => {
  //   axios
  //     .delete(ServerAddress + "masters/api/delete_commodity/" + id, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then(function (response) {
  //       if (response.statusText === "OK") {
  //         dispatch(showAlert(true));
  //         dispatch(dataExist(`Commidity  ${name} deleted sucessfully`));
  //         dispatch(alertType("danger"));
  //         dispatch(setIsDeleted("Yes"))
  //         dispatch(setToggle(true));
  //       }
  //     })
  //     .catch(err => {
  //       alert(`Error While delete Commidity ${err}`);
  //     });
  // };

  const ids = useSelector((state) => state.datalist.ids);
  

  const [click, setclick] = useState(true);
  const delete_commidity_row = (id) => {
    axios
      .post(
        ServerAddress + "masters/api/delete_commodity/",
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
        alert(`Error While delete Commidity ${err}`);
      });
  };

  const changed_commodity_status = () => {
    axios
      .put(
        ServerAddress +
          "masters/api/update_commodity_status/" +
          cu_status_com_id,
        {
          user_id: user_id,
          cu_status: cu_status,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(function (response) {})
      .catch(function () {
        alert("Error Error While  Updateing commidity");
      });
  };

  useEffect(() => {
    dispatch(setToggle(false));
  }, []);

  useEffect(() => {
    dispatch(setIsDeleted("No"));
  }, [total_data]);

  useEffect(() => {
    if (cu_status !== "") {
      changed_commodity_status();
    }
  }, [cu_status]);

  useLayoutEffect(() => {
    if (commidity_checker_maker_row) {
      commidity_checker_maker = commidity_checker_maker_row[1];
    }
  }, []);

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
      delete_commidity_row(ids);
    }
  }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("user_name"));
    } else if (index === 1) {
      dispatch(setIndexValue("ip_address"));
    } else if (index === 2) {
      dispatch(setIndexValue("longitude"));
    } else if (index === 3) {
      dispatch(setIndexValue("platform"));
    } else if (index === 4) {
      dispatch(setIndexValue("is_mob"));
    } else if (index === 5) {
      dispatch(setIndexValue("logintime"));
    } else if (index === 6) {
      dispatch(setIndexValue("logouttime"));
    }
  }, [index, data]);

  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((logindetail, index) => {
          let f_date_f = logindetail.logintime.split("T");
          let f_date = f_date_f[0];
          let f_time_r = String(f_date_f[1]).substring(0, 8);
          let l_fdate = f_date + " " + f_time_r;
          let l_fdate_lg = "";

          if (logindetail.logouttime) {
            let f_date_lg = logindetail.logouttime.split("T");
            let f_datelg = f_date_lg[0];
            let f_time_rlg = String(f_date_lg[1]).substring(0, 8);
            l_fdate_lg = f_datelg + " " + f_time_rlg;
          }

          // let cu_status_list = [];
          // if (commodity.current_status == "Not Approved") {
          //   cu_status_list = [
          //     "Not Approved",
          //     "Rejected",
          //     "On Hold",
          //     "Approved",
          //   ];
          // } else if (
          //   commodity.current_status == "Rejected" ||
          //   commodity.current_status == "On Hold"
          // ) {
          //   cu_status_list = ["Rejected", "On Hold", "Approved"];
          // }

          return (
            <tr
              key={index}
              style={{
                borderWidth: 1,
              }}
            >
              <td className="selection-cell">
                {false ? <FiCheckSquare /> : <FiSquare />}
              </td>
              <td>{logindetail.user_name}</td>
              <td>{logindetail.ip_address}</td>
              <td>
                {logindetail.longitude}, {logindetail.latitude}
              </td>
              <td>{toTitleCase(logindetail.platform)}</td>
              <td>{logindetail.is_mob ? "Yes" : "No"}</td>
              <td>{l_fdate}</td>
              <td>{logindetail.logouttime ? l_fdate_lg : "-"}</td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default LoginDetailsDataFormat;
