import React from 'react'

const RunsheetCreatedHistory = () => {
  return (
    <>
    <Col lg={12} md={12} sm={12}>
      <div>
        <Card className="h_card">
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
              <h5>Booking Info</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span>Docket No.</span>{" "}
                <span>{order_data.docket_no}</span>
              </div>

              <div className="container_element">
                <span>Entry Type</span>
                <span>{order_data.entry_type}</span>
              </div>

              <div className="container_element">
                <span>Delivery Type</span>{" "}
                <span>{order_data.delivery_type}</span>
              </div>
              <div className="container_element">
                <span>Cold Chain</span>{" "}
                <span>
                  {order_data.cold_chain === false ? (
                    <spn>NO</spn>
                  ) : (
                    <span>Yes</span>
                  )}
                </span>
              </div>
              <div className="container_element">
                <span> Booking Date & Time</span>{" "}
                <span>{booking_time}</span>
              </div>
              <div className="container_element">
                <span> Type Of Booking</span>{" "}
                <span>{order_data.booking_type}</span>
              </div>

              <div className="container_element">
                <span> Delivery Mode</span>{" "}
                <span>{order_data.delivery_mode}</span>
              </div>

              <div className="container_element">
                <span> Client Type</span>{" "}
                <span>{order_data.Client_type}</span>
              </div>

              <div className="container_element">
                <span> Bill To</span>{" "}
                <span>{order_data.billto_name}</span>
              </div>

              <div className="container_element">
                <span> Client</span> <span>{order_data.client_name}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>

    <Col lg={6} md={12} sm={12}>
      <div>
        <Card className="h_card">
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
              <h5>Shipper Info</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span>Shipper Name</span>{" "}
                <span>{order_data.shipper_name}</span>
              </div>

              <div className="container_element">
                <span>Address</span>{" "}
                <span>{order_data.shipper_address_line}</span>
              </div>

              <div className="container_element">
                <span>State</span> <span>{order_data.shipper_state}</span>
              </div>
              <div className="container_element">
                <span>City</span> <span>{order_data.shipper_city}</span>
              </div>
              <div className="container_element">
                <span> Pincode</span>{" "}
                <span>{order_data.shipper_pincode}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>

    <Col lg={6} md={12} sm={12}>
      <div>
        <Card className="h_card">
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
              <h5>Consignee Info</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span>Consignee Name</span>{" "}
                <span>{order_data.consignee_name}</span>
              </div>

              <div className="container_element">
                <span>Address</span>{" "}
                <span>{order_data.consignee_address_line}</span>
              </div>
              <div className="container_element">
                <span>State</span>{" "}
                <span>{order_data.consignee_state}</span>
              </div>
              <div className="container_element">
                <span>City</span> <span>{order_data.consignee_city}</span>
              </div>
              <div className="container_element">
                <span>Pincode</span>{" "}
                <span>{order_data.consignee_pincode}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>

    <Col lg={6} md={12} sm={12}>
      <div>
        <Card className="h_card">
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
              <h5>Tariff Info</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span>Commodity </span>{" "}
                <span>{order_data.commodity_name}</span>
              </div>
              <div className="container_element">
                <span>Local Delivery Type </span>{" "}
                <span>{order_data.local_delivery_type}</span>
              </div>
              <div className="container_element">
                <span>COD</span> <span>{order_data.cod}</span>
              </div>
              <div className="container_element">
                <span> Chargeable Weight </span>{" "}
                <span>{order_data.chargeable_weight}</span>
              </div>

              <div className="container_element">
                <span> Total Quantity </span>{" "}
                <span>{order_data.total_quantity}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>

    <Col lg={6} md={12} sm={12}>
      <div>
        <Card className="h_card">
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
              <h5>Order Deatls</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span> Order Channel </span>{" "}
                <span>{order_data.order_channel}</span>
              </div>

              <div className="container_element">
                <span>Order Created By </span>{" "}
                <span>{order_data.order_created_by}</span>
              </div>
              <div className="container_element">
                <span>Order Created Date </span>{" "}
                <span>{order_created_date}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>
  </>
  
  )
}

export default RunsheetCreatedHistory