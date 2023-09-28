import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import { setDeleteId,setIds,setIndexValue,setSelect } from "../../../store/dataList/DataList";
import { setIsDeleted,setToggle } from "../../../store/pagination/Pagination";
import { setAlertType,setDataExist,setShowAlert } from "../../../store/alert/Alert";
import toTitleCase from "../../../lib/titleCase/TitleCase";
import { ServerAddress } from "../../../constants/ServerAddress";

const SalaryComponentFormate = ({ data, data1, can_delete }) => {
    const total_data = useSelector((state) => state.pagination.total_data);

    const accessToken = useSelector((state) => state.authentication.access_token);
  
    const [refresh, setrefresh] = useState(false);
    // const [entry_type_btn, setentry_type_btn] = useState("");
    const delete_salary_row = (id) => {
      axios
        .post(
          ServerAddress + "ems/delete_salarycomponent/",
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
        userpermission.some((e) => e.sub_model === "Salary Component" && e.update === true)
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
          (list_toggle === true ? data1 : data).map((salary_type, index) => {
            // let salary_type_n;
            // if (salary.salary_type == "OWN salary") {
            //   salary_type_n = "Own salary";
            // } else {
            //   salary_type_n = "Vendor";
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
                    handlefunn(salary_type.id);
                    dispatch(setSelect(true));
                  }}
                  disabled
                >
                  {selected.includes(salary_type.id) ? (
                    <FiCheckSquare size={14} />
                  ) : (
                    <FiSquare size={14} />
                  )}
                </td>
          )} 
  
                <td>
                  {(can_update || user.is_superuser ? (
                  <Link
                    to="/screens/organisation/salaryParameter/SalaryComponent.js"
                    state={{ salary_type: salary_type }}
                  >
                    {toTitleCase(salary_type.salary_type)}
                  </Link>
                  ) : (
                    toTitleCase(salary_type.salary_type)
                  ))}
                </td>
                <td>{toTitleCase(salary_type.name)}</td>
              </tr>
            );
          })
        )}
      </>
    );
  };

export default SalaryComponentFormate