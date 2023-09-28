import React, { useState, useLayoutEffect } from 'react';
import { Col, Card, CardTitle, CardBody } from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css";

const OrganizationCreatedHistory = ({ page_data }) => {
  // console.log("page  ===>", page_data)
  const [org_data, setorg_data] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

      let data = p_data.change_message;
      let n_data = JSON.parse(data)
      setorg_data(n_data);
    }
  }, [page_data])

  // console.log("Organization  data >>>>>", org_data);


  let time = new Date(org_data.created_at).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });

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
                <h5>Organization Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Organization Name </span> <span>{org_data.name}</span>
                </div>
                <div className="container_element">
                  <span>Email</span> <span>{org_data.email}</span>
                </div>
                <div className="container_element">
                  <span>Toll Free Number</span> <span>{org_data.tollfree_no}</span>
                </div>
                <div className="container_element">
                  <span>Registration/Incorporation No</span> <span>{org_data.regd_no}</span>
                </div>
                <div className="container_element">
                  <span>PAN Number</span> <span>{org_data.pan_no}</span>
                </div>
                <div className="container_element">
                  <span>Primary Mobile No </span> <span>{org_data.mobile_nop}</span>
                </div>
                {org_data.mobile_nos === true &&
                  <div className="container_element">
                    <span>Secondary Mobile No  </span> <span>{org_data.mobile_nos}</span>
                  </div>
                }
                <div className="container_element">
                  <span>Website Address  </span> <span>{org_data.website}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
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
                <h5>GST Address</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>GST No </span> <span>20AS33727282ABC  </span>
                </div>
                <div className="container_element">
                  <span>City </span> <span> Jamshedpur </span>
                </div>
                <div className="container_element">
                  <span>PinCode </span> <span> 840021 </span>
                </div>
                <div className="container_element">
                  <span> Locality </span> <span>Govindpur  </span>
                </div>
                <div className="container_element">
                  <span> Address</span> <span> Chhota Govindpur </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
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
                <h5>Head Office Address</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Address Line 1 </span> <span> Govindpur</span>
                </div>
                <div className="container_element">
                  <span>Address Line 2</span> <span>Chhota Govindpur </span>
                </div>
                <div className="container_element">
                  <span>State </span> <span>Jharkhand</span>
                </div>
                <div className="container_element">
                  <span>City</span> <span>Jamshedpur</span>
                </div>
                <div className="container_element">
                  <span>PinCode</span> <span> 840021</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
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
                <h5>Billing Address</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Address Line 1 </span> <span> Govindpur</span>
                </div>
                <div className="container_element">
                  <span>Address Line 2</span> <span>Chhota Govindpur </span>
                </div>
                <div className="container_element">
                  <span>State </span> <span>Jharkhand</span>
                </div>
                <div className="container_element">
                  <span>City</span> <span>Jamshedpur</span>
                </div>
                <div className="container_element">
                  <span>PinCode</span> <span> 840021</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
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
                <h5>Contact Person Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Contact Person  </span> <span>{org_data.contact_person}</span>
                </div>
                <div className="container_element">
                  <span>Contact Person Email </span> <span> {org_data.contact_person_email} </span>
                </div>
                <div className="container_element">
                  <span>Contact Person Phone Number </span> <span> {org_data.contact_person_mobile} </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
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
                <h5>Description</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                <span>Description </span> <span>{org_data.description}</span>
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

export default OrganizationCreatedHistory