import React, { useState, useLayoutEffect } from 'react';
import { Col, Card, CardTitle, CardBody } from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css";

const OrderOriginsHistoryCreatedPage = ({ page_data }) => {
  // console.log("page", page_data)
  const [order_data, setorder_data] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

      let data = p_data.change_message;
      let n_data = JSON.parse(data)
      setorder_data(n_data);
    }
  }, [page_data])

  // console.log("OrderOrigins data >>>>>", order_data);


  let time = new Date(order_data.created_at).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
  return (
    <>
      <Col lg={12} md={12} sm={12}>
        <div>
          <Card
            className="h_card"
          >
            <CardTitle>
              <div
                style={{
                  display: "flex",
                  paddingLeft: "16px",
                  paddingTop: "8px",
                  paddingBottom: "2px",
                  color: "Black",
                  fontSize: "18px",
                  fontFamily: "arial, sans-serif",
                }}
              >
                <h5>Shipper/Consignee Details</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Shipper/Consignee</span> <span>{order_data.name}</span>
                </div>
                <div className="container_element">
                  <span>Bill To</span> <span>{order_data.billto_name}</span>
                </div>
                <div className="container_element">
                  <span>Client</span><span>{order_data.client_name}</span>
                </div>
                <div className="container_element">
                  <span>City</span><span>{order_data.city_name}</span>
                </div>
                <div className="container_element">
                  <span>PinCode</span><span>{order_data.pincode_name}</span>
                </div>
                <div className="container_element">
                  <span>Locality</span><span>{order_data.locality_name}</span>
                </div>
                <div className="container_element">
                  <span>State</span><span>{order_data.state_name}</span>
                </div>
                <div className="container_element">
                  <span>Email</span><span>{order_data.email}</span>
                </div>
                <div className="container_element">
                  <span>Phone NO</span><span>{order_data.phone_number}</span>
                </div>
                <div className="container_element">
                  <span>Address</span><span>{order_data.address_line1}</span>
                </div>
                <div className="container_element">
                  <span>Created By</span> <span>{user_name}</span>
                </div>
                <div className="container_element">
                  <span>Created At</span> <span>{time}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
    </>
  )
}

export default OrderOriginsHistoryCreatedPage