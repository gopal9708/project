/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
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
const AirportOrderDataFormat = ({ data, data1 }) => {

// console.log("Airport Data====",data);


  // Permissions
  // const user_permissions = useSelector(state => state.permissions.user_permissions)

  const total_data = useSelector((state) => state.pagination.total_data);
  const accessToken = useSelector((state) => state.authentication.access_token);

  const delete_airport_order = (id) => {
    axios
      .post(
        ServerAddress + "booking/",
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
      delete_airport_order(ids);
    }
  }, [delete_id]);

  return (
    <>
      {(list_toggle === true ? data1 : data).length === 0 ? (
        <tr>
          <td>No Data Found</td>
        </tr>
      ) : (
        (list_toggle === true ? data1 : data).map((airport, index) => {

          let f_date_f = airport.booking_at.split("T");
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
                  handlefunn(airport.id);
                  dispatch(setSelect(true));
                }}
              >
                {selected.includes(airport.id) ? (
                  <FiCheckSquare size={14} />
                ) : (
                  <FiSquare size={14} />
                )}
              </td>
              <td>
                <Link to="/booking/orders/AddAirportOrder" state={{ airport: airport }}>
                  {airport.awb_no}
                </Link>
              </td>
              <td>{l_fdate}</td>
              <td>{toTitleCase(airport.billto_name)}</td>
              <td>{toTitleCase(airport.client_name)}</td>
              <td>{toTitleCase(airport.coloader)}</td>
              {/* <td>
                {toTitleCase(airport.shipper_city) +
                  ", " +
                  toTitleCase(airport.shipper_state) +
                  ", " +
                  toTitleCase(airport.shipper_locality)}
              </td>
              <td>
                {toTitleCase(airport.consignee_city) +
                  ", " +
                  toTitleCase(airport.consignee_state) +
                  ", " +
                  toTitleCase(airport.consignee_locality)}
              </td>
              <td>{toTitleCase(airport.shipper_name)}</td>
              <td>{toTitleCase(airport.consignee_name)}</td> */}
              {/* <td>
                <div>
                  <Link
                    to="/booking/orders/OrderInvoicePdf"
                    state={{ airport: airport }}
                  >
                    <img src={pdf} width="18" height="18" />
                  </Link>
                </div>
              </td> */}
              {/* <td>
                {order.manifest_no == null ? (
                  "-"
                ) : (
                  <Link
                    to="/manifests/manifest-pdf"
                    state={{ manifest_no: order.manifest_no }}
                  >
                    {order.manifest_no}
                  </Link>
                )}
              </td> */}
              {/* <td>
                {order.runsheet_no == null ? (
                  <div>-</div>
                ) : (
                  <Link
                    to="/runsheet/runsheet-pdf"
                    state={{ rn_no: order.runsheet_no }}
                  >
                    {order.runsheet_no}
                  </Link>
                )}
              </td> */}
              <td>{toTitleCase(airport.airport_order_created_by)}</td>
              {/* <td>
                {order.is_completed ? (
                  <div>
                    <img src={correct} width="18" height="18" />
                  </div>
                ) : (
                  <div>
                    <img src={cross} width="18" height="18" />
                  </div>
                )}
              </td> */}
              {/* <td>
                {order.cold_chain ? (
                  <div>
                    <img src={correct} width="18" height="18" />
                  </div>
                ) : (
                  <div>
                    <img src={cross} width="18" height="18" />
                  </div>
                )}
              </td> */}
              {/* <td>
                {airport.is_delivered ? (
                  <div>
                    <img src={correct} width="18" height="18" />
                    <br />
                    <HashLink
                      to="/bookings/orders/addorders#order_delivery_info"
                      state={{ order: order, hash: "order_delivery_info" }}
                    >
                      Delivered Info
                    </HashLink> 
                  </div>
                ) : (
                  <div>
                    <img src={cross} width="18" height="18" />
                  </div>
                )}
              </td> */}
              {/* <td>{airport.total_quantity}</td>
              <td>{toTitleCase(airport.branch_name)}</td>
              <td>{toTitleCase(airport.entry_type)}</td>
              <td>
                {airport.is_manifested ? (
                  <div>
                    <img src={correct} width="18" height="18" />
                  </div>
                ) : (
                  <div>
                    <img src={cross} width="18" height="18" />
                  </div>
                )}
              </td>
              <td>{toTitleCase(airport.delivery_type)}</td> */}
            </tr>
          );
        })
      )}
    </>
  );
};

export default AirportOrderDataFormat;
