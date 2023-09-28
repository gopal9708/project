/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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

const ModelPerformanceDataFormat = ({ data }) => {

  console.log("Model Performance Data Formate Data is==", data);

  const navigate = useNavigate();
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const delete_branch_row = (id) => {
    axios
      .post(
        ServerAddress + "vms/delete_vehicle-details/",
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
          dispatch(setIsDeleted("Yes"));
          dispatch(setToggle(true));
        }
      })
      .catch((err) => {
        alert(`Error While delete branch ${err}`);
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
      dispatch(setIndexValue("id"));
    } else if (index === 1) {
      dispatch(setIndexValue("name"));
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
      delete_branch_row(ids);
    }
  }, [delete_id]);

  return (
    <>
      {data.length == 0 ? (
        <span>No data found</span>
      ) : (
        <>
          {data.map((item, index) => {
            console.log("return Model Performance Data Formate Data is==", item);
            return (
              <>
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
                  <Link to="/VehicleModelPerformance/AddModelPerformance"
                    state={{ item: item }}>
                    <td>{toTitleCase(item.vehicle_model_nm)}</td>
                  </Link>
                  <td>{item.towing_capacity}</td>
                  <td>{item.max_payload}</td>
                </tr>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default ModelPerformanceDataFormat;
