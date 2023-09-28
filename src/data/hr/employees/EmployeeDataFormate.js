import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import {
  setIsDeleted,
  setToggle,
} from "../../../store/pagination/Pagination";
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

const EmployeeDataFormate = ({ data, data1, can_delete }) => {
  const dispatch = useDispatch();

  // const searchData = useSelector((state) => state.searchbar.search_item);
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  // const user_id = useSelector((state) => state.authentication.userdetails.id);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);

  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  // const select = useSelector((state) => state.datalist.select);
  const delete_id = useSelector((state) => state.datalist.delete_id);

  const [selected, setselected] = useState([]);

  const ids = useSelector((state) => state.datalist.ids);
  

  const [click, setclick] = useState(true);

  const [refresh, setrefresh] = useState(false);
  const deleteCharge = (id) => {
    axios
      .post(
        ServerAddress + "master/delete-Charges/",
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
  });

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
    if (delete_id === true) {
      deleteCharge(ids);
    }
  }, [delete_id, ids]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("primary_charge"));
    } else if (index === 1) {
      dispatch(setIndexValue("secondary_charge"));
    }
  }, [index]);




  // const Update_onborading_status = (id) => {
  //   axios
  //     .put(
  //       ServerAddress + "ems/update_onboardingstatus/" + id,
  //       {
  //           onboarding_status : "complete",
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       }
  //     )
  //     .then(function (resp) {
  //       alert("Done");
  //     })
  //     .catch((err) => {
  //       alert(`error occur while Posting Employee Basic Details ${err}`);
  //     });
  // };

  //Permissions
  const userpermission = useSelector((state) => state.authentication.userpermission);
  const user = useSelector((state) => state.authentication.userdetails);
  const [can_update, setcan_update] = useState(false);

  useEffect(()=> {
    if (
      userpermission.some((e) => e.sub_model === "Employees" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission])


  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((employee, index) => {
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
                  handlefunn(employee.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false));
                }}
              >
                {selected.includes(employee.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
              )}
              <td>{index + 1}</td>
              <td>{employee.employee_id}</td>
              <td>
                {(can_update || user.is_superuser ? (
                <Link
                  to="/ems/employee/EmployeeTab"
                  state={{ employee: employee }}
                >
                  {toTitleCase(employee.user_username)}
                </Link>
                ) : (
                  toTitleCase(employee.user_username)
                ))}
              </td>
              <td>{toTitleCase(employee.user_firstname)}</td>
              <td>{toTitleCase(employee.user_middlename ? employee.user_middlename : "-")}</td>
              <td>{toTitleCase(employee.user_lastname)}</td>
              <td>{employee.gender}</td>
              <td>{employee.user_email}</td>
              <td>{employee.user_mobile}</td>
              <td>{employee.user_branchname}</td>
              <td>{employee.user_designation}</td>
              <td>{employee.user_role}</td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default EmployeeDataFormate;