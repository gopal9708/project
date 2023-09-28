/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDownloadDone, MdClear } from "react-icons/md";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import NavBtn from "../../../components/btn/NavBtn";
import { setDeleteId,setIds,setIndexValue,setSelect } from "../../../store/dataList/DataList";
import { setIsDeleted,setToggle } from "../../../store/pagination/Pagination";
import { setAlertType,setDataExist,setShowAlert } from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";

const SalaryParameterFormate = ({ data, data1, can_delete }) => {
  // console.log("data", data);
  // console.log("data1", data1);

  const total_data = useSelector((state) => state.pagination.total_data);

  const accessToken = useSelector((state) => state.authentication.access_token);

  const [refresh, setrefresh] = useState(false);
  const delete_salary_row = (id) => {
    axios
      .post(
        ServerAddress + "",
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
        alert(`Error While delete salary ${err}`);
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
      dispatch(setIndexValue("name"));
    } else if (index === 1) {
      dispatch(setIndexValue("code"));
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

  //Permission
  const userpermission = useSelector((state) => state.authentication.userpermission);
  const user = useSelector((state) => state.authentication.userdetails);
  const [can_update, setcan_update] = useState(false);

  useEffect(()=> {
    if (
      userpermission.some((e) => e.sub_model === "Salary Parameter" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission])

  // Multi Delete function
  const close = useSelector((state) => state.datalist.close);
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
      delete_salary_row(ids);
    }
  }, [delete_id]);

  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((salary_data, index) => {
          // let salary_data_n;
          // console.log("salary", index, salary_data);
          // if (salary.salary_data == "OWN salary") {
          //   salary_data_n = "Own salary";
          // } else {
          //   salary_data_n = "Vendor";
          // }

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
                  handlefunn(salary_data.id);
                  dispatch(setSelect(true));
                }}
                disabled
              >
                {selected.includes(salary_data.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
        )}

              <td>
                {(can_update || user.is_superuser ? (
                <Link
                  to="/screens/organisation/salaryParameter/SalaryParameter.js"
                  state={{ salary_data: salary_data }}
                >
                  {toTitleCase(salary_data.organization_name)}
                </Link>
                ) : (
                  toTitleCase(salary_data.organization_name)
                ))}
              </td>
              <td>{toTitleCase(salary_data.company_pf_code)}</td>
              <td>{toTitleCase(salary_data.pf_rate_employer)}</td>
              <td>{toTitleCase(salary_data.bonus_percent)}</td>
              <td>{toTitleCase(salary_data.monthly_leave_allowable)}</td>
              <td>{toTitleCase(salary_data.esi_limit)}</td>

               </tr>
          );
        })
      )}
    </>
  );
};

export default SalaryParameterFormate;
