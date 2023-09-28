import React ,{useState, useLayoutEffect} from 'react';
import {Col,Card,CardTitle,CardBody} from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css";

const BilltoCreatedHistory = ({page_data}) => {
  console.log("page",page_data)
  const [billto_data, setbillto_data] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

let data = p_data.change_message;
let n_data = JSON.parse(data)
setbillto_data(n_data);      
    }
  }, [page_data])

  console.log("BillTo  data ====",billto_data);
  

  let time = new Date(billto_data.created_at).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  
  return (
    <>
    <Col lg={4} md={12} sm={12}>
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
              <h5>Bill To Details</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              {/* <div className="container_element">
                <span>Branch Type</span> <span>Own</span>
              </div> */}
              <div className="container_element">
                <span>PAN Number</span> <span>{billto_data.pan_no}</span>
              </div>
              <div className="container_element">
                <span>Branch Name</span> <span>{billto_data.name}</span>
              </div>
              <div className="container_element">
                <span>Branch Email</span> <span>{billto_data.email}</span>
              </div>
              <div className="container_element">
                <span>Branch Phone Number*</span> <span>{billto_data.phone_number}</span>
              </div>
              <div className="container_element">
                <span>Associated Branch</span> <span>{billto_data.branches}</span>
              </div>
              <div className="container_element">
                <span>Credit Limit Amount</span> <span>{billto_data.credit_amount}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>
    <Col lg={4} md={12} sm={12}>
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
              <h5>GST info</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span>GST Number</span> <span>Data Not Saved In Form</span>
              </div>
              <div className="container_element">
                <span>City </span> <span>Data Not Saved In Form</span>
              </div>
              <div className="container_element">
                <span>Pincode</span> <span>Data Not Saved In Form</span>
              </div>
              <div className="container_element">
                <span>Locality</span> <span>Data Not Saved In Form</span>
              </div>
              <div className="container_element">
                <span>Address</span> <span>Data Not Saved In Form</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>
    <Col lg={4} md={12} sm={12}>
      <div>
        <Card
          // style={{
          //   overflow: "scrollX",
          //   overflowY: "hidden",
          //   boxShadow:
          //     "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
          //   borderRadius: "6px",
          // }}
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
              <h5>Primary Address</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span>Address Line</span> <span>{billto_data.address_line}</span>
              </div>
              <div className="container_element">
                <span>State </span> <span>{billto_data.state_name}</span>
              </div>
              <div className="container_element">
                <span>Pin Code</span> <span>{billto_data.pincode_name}</span>
              </div>
              <div className="container_element">
                <span>Locality</span> <span>{billto_data.locality_name}</span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>
    <Col lg={6} md={12} sm={12}>
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
              <h5>Communication Info Authorised</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span>Authorised Person Name</span> <span>{billto_data.authorised_person_name}</span>
              </div>
              <div className="container_element">
                <span>Authorised Person Email</span> <span>{billto_data.authorised_person_email}</span>
              </div>
              <div className="container_element">
                <span>Authorised Person Number</span> <span>{billto_data.authorised_person_number}</span>
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
  </>  )
}

export default BilltoCreatedHistory