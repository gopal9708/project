import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Col, Card, CardTitle, CardBody } from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css";

const CommodityCreatedHistory = ({ page_data }) => {
  // console.log("page",page_data)
  const [commodity_data, setcommodity_data] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

      let data = p_data.change_message;
      let n_data = JSON.parse(data)
      setcommodity_data(n_data);
    }
  }, [page_data])

  // console.log("COmmodity  History data",commodity_data);
  // console.log("COmmodity data",user_name);
  let time = new Date(commodity_data.created_at).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });


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
                <h5>Commodity Details</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Commodity Type</span> <span>{commodity_data.type}</span>
                </div>
                <div className="container_element">
                  <span>Commodity Name</span> <span>{commodity_data.commodity_name}</span>
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

export default CommodityCreatedHistory