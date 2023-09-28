/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import pdf from "../../../assets/images/Pdf/printer.png";
import correct from "../../../assets/images/bookings/check-mark.png";
import cross from "../../../assets/images/bookings/remove.png";
import { Link } from "react-router-dom";
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
import { HashLink } from "react-router-hash-link";
const OrderCheckingPageFormate = ({ data, data1 }) => {
  // Permissions
  // const user_permissions = useSelector(state => state.permissions.user_permissions)

  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const delete_order = (id) => {
    axios
      .post(
        ServerAddress + "booking/delete_order/",
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
      dispatch(setIndexValue("docket_no"));
    } else if (index === 1) {
      dispatch(setIndexValue("booking_at"));
    } else if (index === 2) {
      dispatch(setIndexValue("client_name"));
    } else if (index === 4) {
      dispatch(setIndexValue("shipper_city"));
    } else if (index === 5) {
      dispatch(setIndexValue("consignee_city"));
    } else if (index === 6) {
      dispatch(setIndexValue("shipper_name"));
    } else if (index === 7) {
      dispatch(setIndexValue("consignee_name"));
    } else if (index === 9) {
      dispatch(setIndexValue("manifest_no"));
    } else if (index === 10) {
      dispatch(setIndexValue("runsheet_no"));
    } else if (index === 11) {
      dispatch(setIndexValue("order_created_by"));
    } else if (index === 12) {
      dispatch(setIndexValue("is_completed"));
    } else if (index === 13) {
      dispatch(setIndexValue("cold_chain"));
    } else if (index === 14) {
      dispatch(setIndexValue("is_delivered"));
    } else if (index === 15) {
      dispatch(setIndexValue("total_quantity"));
    } else if (index === 16) {
      dispatch(setIndexValue("branch_name"));
    } else if (index === 17) {
      dispatch(setIndexValue("entry_type"));
    } else if (index === 18) {
      dispatch(setIndexValue("is_manifested"));
    } else if (index === 19) {
      dispatch(setIndexValue("delivery_type"));
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
      delete_order(ids);
    }
  }, [delete_id]);

  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((order, index) => {
          let f_date_f = order.booking_at.split("T");
          let f_date = f_date_f[0];
          let f_time_r = String(f_date_f[1]).substring(0, 5);
          let l_fdate = f_date + " " + f_time_r;

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
                  handlefunn(order.id);
                  dispatch(setSelect(true));
                }}
              >
                {selected.includes(order.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
              <td>
                {/* {
                  user_permissions.includes('Can change Create Order') ? */}
                <Link
                  to="/orderCheckingPage/OrderCheckingPage"
                  state={{ CheckingOrder: order }}
                >
                  {order.docket_no}
                </Link>
                {/* :
                    order.awb_no
                } */}
              </td>
            </tr>
          );
        })
      )}
    </>
  );
};

export default OrderCheckingPageFormate;
