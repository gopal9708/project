import React,{useState,useLayoutEffect} from 'react';
import { Col, Card, CardTitle, CardBody } from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css"

const BranchCreatedHistory = ({ page_data }) => {
  console.log("page",page_data);
  const [branch_data, setbranch_data] = useState("");
  // const [op_city, setop_city] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

let data = p_data.change_message;
let n_data = JSON.parse(data)
setbranch_data(n_data);  
// setop_city(branch_data.operating_city)    
    }
  }, [page_data])

  console.log("branc data====>>",branch_data);
  // console.log("city data====>>",op_city);
  let time = new Date(branch_data.created_date).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});


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
                <h5>Branch Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
              <div className="container_element">
                  <span>Branch Code</span> <span>{branch_data.code}</span>
                </div>

                <div className="container_element">
                  <span>Branch Type</span> <span>{branch_data.type}</span>
                </div>

{branch_data.type === "VB" && 
  <div className="container_element">
  <span>Vendor Name</span> <span>{branch_data.vendor}</span>
</div>
}
              
                <div className="container_element">
                  <span>Branch Name</span> <span>{branch_data.name}</span>
                </div>
                <div className="container_element">
                  <span>Branch Email</span> <span>{branch_data.email}</span>
                </div>
                <div className="container_element">
                  <span>Branch Phone Number</span> <span>{branch_data.contact_number}</span>
                </div>
                <div className="container_element">
                  <span>PAN Number</span> <span>{branch_data.pan_no}</span>
                </div>
                <div className="container_element">
                  <span>GST Number </span> <span>{branch_data.gst_no}</span>
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
                <h5>Location Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Address Line </span> <span>{branch_data.address_line_1}</span>
                </div>
                <div className="container_element">
                  <span>State</span> <span>{branch_data.state_name}</span>
                </div>
                <div className="container_element">
                  <span>City</span> <span>{branch_data.city_name}</span>
                </div>
                <div className="container_element">
                  <span>Pin Code</span> <span>{branch_data.pincode_name}</span>
                </div>
                <div className="container_element">
                  <span>Locality</span> <span>{branch_data.locality_name}</span>
                </div>
                <div className="container_element">
                  <span>Operating City</span> <span>{}</span>
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
                <h5>Employee Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Branch Head</span> <span>{branch_data.head}</span>
                </div>
                <div className="container_element">
                  <span>Branch Head Email</span> <span>{branch_data.head_email}</span>
                </div>
                <div className="container_element">
                  <span>Branch Head Phone</span> <span>{branch_data.head_phone_number}</span>
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
  );
};

export default BranchCreatedHistory;
