import React, { useState, useLayoutEffect } from 'react';
import { Col, Card, CardTitle, CardBody } from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css"


const ChargeCreatedHistory = ({ page_data }) => {

  const [charge_data, setcharge_data] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

      let data = p_data.change_message;
      let n_data = JSON.parse(data)
      setcharge_data(n_data);
    }
  }, [page_data])

  let time = new Date(charge_data.created_at).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

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
                <h5>Charge Details</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Charge Type</span> <span>{charge_data.charge_category}</span>
                </div>
                <div className="container_element">
                  <span>Charge Name</span> <span>{charge_data.charge_name}</span>
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

    </>)
}

export default ChargeCreatedHistory