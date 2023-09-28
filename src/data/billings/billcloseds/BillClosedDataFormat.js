import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiSquare, FiCheckSquare } from "react-icons/fi";
// import { setMain_checkbox } from "../../../store/Components/ListDisplay/Main_Checkbox/action";
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

const BillClosedDataFormat = ({ data, data1 }) => {
  

  const dispatch = useDispatch();
  
  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);
  
  //Multi Delete function
  const close = useSelector((state) => state.datalist.close);
  const select_all = useSelector((state) => state.datalist.select_all);
  
  const delete_id = useSelector((state) => state.datalist.delete_id);

  const [selected, setselected] = useState([]);

  const ids = useSelector((state) => state.datalist.ids);
  

  const [click, setclick] = useState(true);

  const deleteCharge = (id) => {
    axios
      .post(
        ServerAddress + "master/delete_charge/",
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
      deleteCharge(ids);
    }
  }, [delete_id]);

  //For Shorting
  const index = useSelector((state) => state.datalist.index);

  useEffect(() => {
    if (index === 0) {
      dispatch(setIndexValue("primary_charge"));
    } else if (index === 1) {
      dispatch(setIndexValue("secondary_charge"));
    }
  }, [index]);

  return (
    <>
      {data.length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        data.map((b_order, index) => {
          let freight_charge = b_order.ordertocost.filter(
            (v) => v.cost_name.toUpperCase() === "FREIGHT"
          );
          let oda_charge = b_order.ordertocost.filter(
            (v) => v.cost_name.toUpperCase() === "ODA"
          );
          let warai_charge = b_order.ordertocost.filter(
            (v) => v.cost_name.toUpperCase() === "WARAI"
          );

          let other_charge = b_order.ordertocost.filter(
            (v) =>
              v.cost_name.toUpperCase() !== "WARAI" &&
              v.cost_name.toUpperCase() !== "ODA" &&
              v.cost_name.toUpperCase() !== "FREIGHT"
          );

          let frg =
            freight_charge.length > 0
              ? Math.round(freight_charge[0]["cost_value"])
              : "-";

          let od =
            oda_charge.length > 0
              ? Math.round(oda_charge[0]["cost_value"])
              : "-";
          let wra =
            warai_charge.length > 0
              ? Math.round(warai_charge[0]["cost_value"])
              : "-";
          let oth = 0;
          if (other_charge.length > 0) {
            oth = Math.round(
              other_charge.map((v) => v.cost_value).reduce((a, b) => a + b)
            );
          } else {
            oth = "-";
          }

          let bill_closed = false;
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
                  handlefunn(b_order.id);
                  dispatch(setSelect(true));
                  dispatch(setDeleteId(false));
                  dispatch(setClose(false));
                }}
              >
                {selected.includes(b_order.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
              <td>
                <Link
                  to="/billing/billclosed/addbillclosed"
                  state={{ b_order: b_order }}
                >
                  {toTitleCase(b_order.docket_no)}
                </Link>
              </td>
              <td>{toTitleCase(b_order.client_name)}</td>
              <td>-</td>
              <td>{b_order.total_quantity}</td>
              <td>{frg}</td>
              <td>{wra}</td>
              <td>{od}</td>
              <td>{oth}</td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default BillClosedDataFormat;
