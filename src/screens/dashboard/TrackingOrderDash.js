import React, { useState, useEffect } from "react";
// import "./Tracking.css";
import "../track/trackingPage/Tracking.css";
import { ImCross } from "react-icons/im";
import { FaBitbucket, FaPeopleCarry } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import axios from "axios";
import { ServerAddress } from "../../constants/ServerAddress";
import toTitleCase from "../../lib/titleCase/TitleCase";
import { useSelector, useDispatch } from "react-redux";


import {
  setDocketNumber,
  setSearchDocket,
} from "../../store/orderTracking/OrderTracking";

const TrackingOrderDash = () => {


  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.authentication.access_token);
  const docket_no = useSelector((state) => state.OrderTracking.docket_number);
  console.log("doc are :", docket_no);
  const [search, setsearch] = useState(false);

  // _________
  const [get_orders, setget_orders] = useState([]);
  const [get_status, setget_status] = useState([]);
  const [refresh, setrefresh] = useState(false);

  const get_order_data = (docket_list) => {
    axios
      .get(
        ServerAddress + "booking/get_order_status/?awb_no=" + docket_list,

      )
      .then((response) => {
        // console.log("Tracking response data", response.data);
        const docket_info = response.data[0];
        const last = docket_info[docket_info.length - 1];
        setget_status(last);
        if (response.data[0].length > 0) {
          dispatch(setSearchDocket(true));
          let last_ele = response.data;
          let last_data_s = last_ele.map((item) => item.push(false));
          setget_orders(response.data);

          setsearch(true);
        } else {
          // dispatch(setSearchDocket(false));
          alert("Docket Not Found");
        }
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  useEffect(() => {
    if (accessToken && docket_no.length > 5) {
      get_order_data(docket_no);
    }
  }, [docket_no]);


  useEffect(() => {
    dispatch(setDocketNumber([]))
    // dispatch(setSearchDocket(false));
  }, [])


  return (
    <>
      <div
      //   className="background"
      >

        <h1 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>Docket Order Status :</h1>
        <div className="main1">
          {/* <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (order_id == "") {
                  alert("Please Enter a valid Docket Number");
                }
                get_order_data();
                return false;
              }}
            >
              <div className="search">
                <input
                  type="text"
                  name="Search"
                  className="input1"
                  placeholder=" Enter Docket Number"
                  onChange={(val) => {
                    setorder_id(val.target.value);
                  }}
                  value={order_id}
                />{" "}
                <button className="search_btn" type="submit">
                  <i>
                    {" "}
                    <ImSearch />
                  </i>
                </button>
              </div>
            </form>
          </div> */}

          <div>
            {get_orders.map((item, index) => {

              const last_ele = item[item.length - 2];
              console.log("222222222222222", last_ele)
              console.log("item", item);

              return (
                <div key={index}>
                  {/* {console.log("------", item)} */}

                  {search ? (
                    <div
                      className="container"
                      style={{ paddingBottom: "20px" }}
                    >
                      {/* <div className="t-card " style={{ borderRadius: "19px" , background:"green"}}> */}
                      <div
                        className="t-card-body t-card"
                        style={{ borderRadius: "10px" }}
                      >
                        <h5
                          style={{
                            fontSize: "21px",
                            // borderRadius: "10px",
                            borderRadius: "10px 10px 0 0",
                            textAlign: "left",
                          }}
                          className="card-title header"
                        >
                          Tracking
                        </h5>
                        <div className="card-text" style={{ margin: "5px" }}>
                          <b style={{ fontSize: "15px" }}>Docket Number:</b>{" "}
                          {last_ele.docket_no}
                        </div>
                        <div
                          // className="row"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "20px",
                          }}
                        >
                          <div className="col">
                            {" "}
                            <strong style={{ fontSize: "19px" }}>
                              Origin:
                            </strong>
                            <br />
                            {toTitleCase(last_ele.orgin_locality ? last_ele.orgin_locality : "-")}{","} {toTitleCase(last_ele.orgin_city ? last_ele.orgin_city : "-")}{","} {toTitleCase(last_ele.orgin_pincode ? last_ele.orgin_pincode : "-")}
                          </div>

                          <div className="col">
                            {" "}
                            <strong style={{ fontSize: "19px" }}>
                              Destination:
                            </strong>{" "}
                            <br />
                            {toTitleCase(last_ele.destination_locality ? last_ele.destination_locality : "-")}{" ,"} {toTitleCase(last_ele.destination_city ? last_ele.destination_city : "-")}{" , "} {toTitleCase(last_ele.destination_pincode ? last_ele.destination_pincode : "-")}
                            {/* {item[0].order_detail[0].consignee_city__city}{" "} */}
                          </div>

                          <div className="col">
                            {" "}
                            <strong style={{ fontSize: "19px" }}>
                              Status:
                            </strong>
                            <br />
                            {toTitleCase(last_ele.status ? last_ele.status : "-")}
                          </div>

                          <div className="col">
                            {" "}
                            <strong style={{ fontSize: "19px" }}>
                              Current Location:
                            </strong>{" "}
                            <br />
                            {
                              toTitleCase(last_ele.current_locality)
                            }
                            {","}
                            {
                              toTitleCase(last_ele.current_city)
                            }{","} {
                              last_ele.current_pincode
                            }
                          </div>
                        </div>
                        <div style={{ padding: "15px" }}>
                          <div className="track">
                            {last_ele.status ===
                              "SHIPMENT ORDER RECEIVED" ? (
                              <>
                                {" "}
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    {/* <i className="fa fa-warehouse"></i>{" "} */}
                                    <i className="fa fa-warehouse"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status ===
                              "SHIPMENT PICKED UP" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-warehouse"></i>{" "}
                                    {/* <FaRoute /> */}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status ===
                              "SHIPMENT ARRIVED AT HUB" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-warehouse">
                                      {" "}
                                      {/* <FaRoute /> */}
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status ===
                              "SHIPMENT IN TRANSIT" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-warehouse"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {last_ele.status === "SHIPMENT ARRIVED AT DESTINATION"
                              ? (
                                <>
                                  <div className="step active">
                                    {" "}
                                    <span className="icon">
                                      {" "}
                                      <i>
                                        {" "}
                                        <FaBitbucket />
                                      </i>{" "}
                                    </span>{" "}
                                    <span className="text">
                                      {" "}
                                      Shipment Order Received
                                    </span>{" "}
                                  </div>
                                  <div className="step active">
                                    {" "}
                                    <span className="icon">
                                      {" "}
                                      <i>
                                        <FaPeopleCarry />
                                      </i>{" "}
                                    </span>{" "}
                                    <span className="text">
                                      {" "}
                                      Shipment Picked up
                                    </span>{" "}
                                  </div>
                                  <div className="step active">
                                    {" "}
                                    <span className="icon">
                                      {" "}
                                      <i className="fa fa-home"></i>{" "}
                                    </span>{" "}
                                    <span className="text">
                                      {" "}
                                      Shipment Arrived at Hub
                                    </span>{" "}
                                  </div>
                                  {last_ele.delivery_type !== "LOCAL" ? (
                                    <>
                                      <div className="step active">
                                        {" "}
                                        <span className="icon">
                                          {" "}
                                          <i className="fa fa-plane"></i>{" "}
                                        </span>{" "}
                                        <span className="text">
                                          Shipment In Transit
                                        </span>{" "}
                                      </div>
                                      <div className="step active">
                                        {" "}
                                        <span className="icon">
                                          {" "}
                                          <i className="fa fa-warehouse"></i>{" "}
                                          {/* <FaRoute />{" "} */}
                                        </span>{" "}
                                        <span className="text">
                                          Shipment Arrived At Destination
                                        </span>
                                      </div>
                                    </>
                                  ) : null}
                                  <div className="step ">
                                    {" "}
                                    <span className="icon">
                                      {" "}
                                      <i className="fa fa-truck"></i>{" "}
                                    </span>{" "}
                                    <span className="text">
                                      {" "}
                                      Shipment Out for Delivery
                                    </span>
                                  </div>
                                  <div className="step ">
                                    {" "}
                                    <span className="icon">
                                      {" "}
                                      <i>
                                        {" "}
                                        <FaBox />
                                      </i>{" "}
                                    </span>{" "}
                                    <span className="text"> Delivered</span>
                                  </div>
                                </>
                              ) : null}

                            {last_ele.status ===
                              "SHIPMENT OUT FOR DELIVERY" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-warehouse"></i>{" "}

                                    {/* <i class="fas fa-route"></i> <FaRoute />{" "} */}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment Arrived At Destination
                                  </span>
                                </div>
                                <div className="step active ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step ">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}

                            {/* {last_ele.status ===
                            "DELIVERED" ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-home"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Arrived at Hub
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-plane"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    Shipment In Transit
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-warehouse"></i>{" "}
                                    <i className="fas fa-route"></i>
                                  </span>{" "}
                                  <span className="text">
                                    Shipment Arrived At Destination
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null} */}


                            {(last_ele.status ===
                              "SHIPMENT DELIVERED" || last_ele.status ===
                              "SHORT DELIVERED") ? (
                              <>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBitbucket />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Order Received
                                  </span>{" "}
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      <FaPeopleCarry />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Picked up
                                  </span>{" "}
                                </div>
                                {last_ele.delivery_type !== "LOCAL" ? (
                                  <>
                                    <div className="step active">
                                      {" "}
                                      <span className="icon">
                                        {" "}
                                        <i className="fa fa-home"></i>{" "}
                                      </span>{" "}
                                      <span className="text">
                                        {" "}
                                        Shipment Arrived at Hub
                                      </span>{" "}
                                    </div>
                                    <div className="step active">
                                      {" "}
                                      <span className="icon">
                                        {" "}
                                        <i className="fa fa-plane"></i>{" "}
                                      </span>{" "}
                                      <span className="text">
                                        Shipment In Transit
                                      </span>{" "}
                                    </div>
                                    <div className="step active">
                                      {" "}
                                      <span className="icon">
                                        {" "}
                                        <i className="fa fa-warehouse"></i>{" "}
                                        {/* <i className="fas fa-route"></i> */}
                                      </span>{" "}
                                      <span className="text">
                                        Shipment Arrived At Destination
                                      </span>{" "}
                                    </div>
                                  </>
                                ) : null}
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i className="fa fa-truck"></i>{" "}
                                  </span>{" "}
                                  <span className="text">
                                    {" "}
                                    Shipment Out for Delivery
                                  </span>
                                </div>
                                <div className="step active">
                                  {" "}
                                  <span className="icon">
                                    {" "}
                                    <i>
                                      {" "}
                                      <FaBox />
                                    </i>{" "}
                                  </span>{" "}
                                  <span className="text"> Delivered</span>
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                        <button
                          className="more_btn"
                          onClick={() => {
                            let last = item[item.length - 1];
                            console.log("last", last);
                            // setnext(true);
                            item[item.length - 1] = true;
                            setrefresh(!refresh);
                          }}
                          type="button"
                        >
                          More Details{" "}
                        </button>
                      </div>
                      {/* </div> */}
                    </div>
                  ) : null}

                  {item[item.length - 1] === true ? (
                    <div
                      className="t-card"
                      style={{ width: "100%", borderRadius: "10px" }}
                    >
                      <div
                        className="t-card-body"
                        style={{ borderRadius: "10px" }}
                      >
                        <h5
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "10px",
                            fontSize: "21px",
                            borderRadius: "10px 10px 0 0",
                          }}
                          className="card-title header"
                        >
                          Tracking / History
                          <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              // setnext(false);
                              item[item.length - 1] = false;
                              setrefresh(!refresh);
                            }}
                            key={index}
                          >
                            {" "}
                            <ImCross style={{ fontSize: "15px" }} />
                          </div>
                        </h5>
                        <div className="card-text" style={{ margin: "5px" }}>
                          <strong>Docket No. :</strong>{" "}
                          {/* {item[0].order_detail[0].awb_no} */}
                          {last_ele.docket_no}
                        </div>
                        <div>
                          <table
                            className="table table-bordered"
                            style={{
                              width: "100%",
                              textAlign: "center",
                              whiteSpace: "nowrap"
                            }}
                          >
                            <thead>
                              <tr>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Location</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.length === 0 ? (
                                <tr>
                                  <td>No Data Found</td>
                                </tr>
                              ) : (
                                item.map((item1, index) => {
                                  console.log(
                                    item.length,
                                    index,
                                    item.length - 1 !== index
                                  );
                                  if (item.length - 1 !== index) {
                                    console.log(
                                      "not last entry",
                                      item1.updated_at
                                    );
                                    let update_date = String(
                                      item1.created_at
                                    ).split("T");
                                    let d_update_date = String(
                                      update_date[0]
                                    ).substring(0, 10);
                                    let update_time = String(
                                      update_date[1]
                                    ).substring(0, 8);

                                    console.log("Date", d_update_date);
                                    // let update_date1  = update_date.
                                    return (
                                      <tr key={index}>
                                        <td>{item1.status ? item1.status : "="}<br /><span style={{ color: "gray", fontSize: "12.5px" }}>{toTitleCase(item1.transit_status ? item1.transit_status : "-")}</span></td>
                                        <td>{d_update_date}</td>
                                        <td>{update_time}</td>
                                        <td>
                                          {`
                                          ${item1.status_current_city ? toTitleCase(item1.status_current_city) : "-"}${","}
                                          ${item1.status_current_locality ? toTitleCase(item1.status_current_locality) : "-"}${","}
                                          ${item1.status_current_pincode ? item1.status_current_pincode : "-"}${"."}
                                          `}
                                        </td>
                                      </tr>
                                    );
                                  }
                                })
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default TrackingOrderDash;