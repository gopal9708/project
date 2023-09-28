import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ServerAddress } from "../../../constants/ServerAddress";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import correct from "../../../assets/images/bookings/check-mark.png";
import cross from "../../../assets/images/bookings/remove.png";
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

const UsersDataFormat = ({ data, data1, can_delete }) => {
  const close = useSelector((state) => state.datalist.close);
  const [selected, setselected] = useState([]);
  const dispatch = useDispatch();
  const [click, setclick] = useState(true);
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  const list_toggle = useSelector((state) => state.datalist.list_toggle);
  const delete_id = useSelector((state) => state.datalist.delete_id);
  const select_all = useSelector((state) => state.datalist.select_all);
  const ids = useSelector((state) => state.datalist.ids);
  const users = useSelector((state) => state.authentication.userdetails);

  const deleteUser = (id) => {
    axios
      .post(
        ServerAddress + "ems/delete_user/",
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
            `User Already Exists Some Where`
          )
        );
        dispatch(setAlertType("warning"));
        dispatch(setDeleteId(false));
        dispatch(setIds([]));
        dispatch(setSelect(false));
        setselected([]);
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
      dispatch(setIndexValue("username"));
    } else if (index === 1) {
      dispatch(setIndexValue("email"));
    } else if (index === 2) {
      dispatch(setIndexValue("first_name"));
    } else if (index === 3) {
      dispatch(setIndexValue("mobilenumber"));
    } else if (index === 4) {
      dispatch(setIndexValue("branch_nm"));
    } else if (index === 5) {
      dispatch(setIndexValue("channel_access"));
    } else if (index === 6) {
      dispatch(setIndexValue("user_type"));
    }
  }, [index]);


  //Permission
  const userpermission = useSelector(
    (state) => state.authentication.userpermission
  );
  const [can_update, setcan_update] = useState(false);

  useEffect(() => {
    if (
      userpermission.some((e) => e.sub_model === "Users" && e.update === true)
    ) {
      setcan_update(true);
    } else {
      setcan_update(false);
    }
  }, [userpermission]);


  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0
        ? (
          <tr>
            <td>
            No Data Found
            </td>
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
              {(can_delete || users.is_superuser) && (
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
              )}
              <td>
                {can_update || users.is_superuser ? (
                  <Link to="/ems/users/UserInfo" state={{ user: user }}>
                    {user.username}
                  </Link>
                ) : (user.username)
                }
              </td>
              <td>{user.email}</td>
              <td>{toTitleCase(user.first_name)}</td>
              <td>{user.mobilenumber}</td>
              <td>{user.organization_name ? toTitleCase(user.organization_name) : "-"}</td>
              <td>{toTitleCase(user.branch_nm)}</td>
              <td>{toTitleCase(user.channel_access)}</td>
              <td>
                {user.is_active ? (
                  <div>
                    <img src={correct} alt="correct" width="20" height="20" />
                  </div>
                ) : (
                  <div>
                    <img src={cross} alt="cross" width="20" height="20" />
                  </div>
                )}
              </td>
              <td>{user.user_department_name ? toTitleCase(user.user_department_name) : "Super User"}</td>
              <td>{toTitleCase(user.user_type)}</td>
            </tr>
          );
        })}
    </>
  );
};

export default UsersDataFormat;
