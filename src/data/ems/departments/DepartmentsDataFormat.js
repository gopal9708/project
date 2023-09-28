import React, { useState, useEffect } from "react";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import {
  setAlertType,
  setDataExist,
  setShowAlert,
} from "../../../store/alert/Alert";
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
import toTitleCase from "../../../lib/titleCase/TitleCase";

const DepartmentsDataFormat = ({ data, data1 }) => {
  const close = useSelector((state) => state.datalist.close);
  const [selected, setselected] = useState([]);
  const dispatch = useDispatch();
  const [click, setclick] = useState(true);
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);

  // const getAllUsers = () => {
  //   axios
  //     .get(ServerAddress + "ems/all-users/", {
  //       headers: { Authorization: `Bearer ${accessToken}` },
  //     })
  //     .then((resp) => {
  //       if (resp.status == 200) {
  //         setusers_list(resp.data);
  //       }
  //     })
  //     .catch((err) => {
  //       alert(`Error Occur in User Details Form , ${err}`);
  //     });
  // };

  // useLayoutEffect(() => {
  //   getAllUsers();
  // }, []);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const delete_id = useSelector((state) => state.datalist.delete_id);
  const select_all = useSelector((state) => state.datalist.select_all);
  const ids = useSelector((state) => state.datalist.ids);

  const deleteUser = (id) => {
    axios
      .post(
        ServerAddress + "ems/delete_department/",
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
        alert(`Error While delete User ${err}`);
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
      deleteUser(ids);
    }
  }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("name"));
    } else if (index === 1) {
      dispatch(setIndexValue("user_name"));
    }
  }, [index]);

  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0
        ?(
          <tr>
            <td>No Data Found</td>
          </tr>
        ) 
        : (list_toggle === true ? data1 : data).map((user, index) => {
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
                    handlefunn(user.id);
                    dispatch(setSelect(true));
                    dispatch(setDeleteId(false));
                    dispatch(setClose(false));
                  }}
                >
                  {selected.includes(user.id) ? (
                    <FiCheckSquare />
                  ) : (
                    <FiSquare />
                  )}
                </td>
                <td>
                  <Link
                    to="/ems/department/adddepartment"
                    state={{ user: user }}
                  >
                    {toTitleCase(user.name)}
                  </Link>
                </td>
                <td>{user.organization_name ? toTitleCase(user.organization_name) : "-"}</td>
                {/* <td>{toTitleCase(user.first_name)}</td> */}
                <td>{toTitleCase(user.user_name)}</td>
              </tr>
            );
          })}
    </>
  );
};

export default DepartmentsDataFormat;
