import React ,{useState,  useLayoutEffect} from 'react';
import {Col,Card,CardTitle,CardBody} from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css";

const VendorCreatedHistory = ({page_data}) => {
// console.log("Page data is", page_data);
  const [vendor_data, setvendor_data] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

let data = p_data.change_message;
let n_data = JSON.parse(data)  
setvendor_data(n_data);      
    }
  }, [page_data])
  let time = new Date(vendor_data.created_at).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

  // console.log("vendo dta ois ====>>",vendor_data);

  return (
    <>
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
              <h5>Vendor Info</h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
            <div className="container_element">
                <span>PAN Number</span> <span> {vendor_data.pan_no} </span>
              </div>
              <div className="container_element">
                <span>Vendor Name </span> <span> {vendor_data.name} </span>
              </div>
              <div className="container_element">
                <span>Company Type </span> <span> {vendor_data.company_type} </span>
              </div>
              <div className="container_element">
                <span>MSME Registered</span> <span>{vendor_data.is_msme_regitered === true ? "Yes" : "No"}</span>
              </div>
              {vendor_data.is_msme_regitered === true &&(
                <>
               <div className="container_element">
               <span>MSME Registered No.</span> <span>{vendor_data.msme_registration_no}</span>
             </div>
               <div className="container_element">
               <span>MSME Registration Date</span> <span>{vendor_data.registration_date}</span>
             </div>
               <div className="container_element">
               <span>MSME Certificate</span> <span>{vendor_data.msme_certificate}</span>
             </div>
             </>
              )}
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
              <h5>Vendor Registered Office Contact Info </h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
            <div className="container_element">
                <span>Vendor Email</span> <span>{vendor_data.emailp}</span>
              </div>
              <div className="container_element">
                <span>Vendor Ph.No</span> <span>{vendor_data.mobile_numberp}</span>
              </div>
              { vendor_data.emails !== ""   &&(
             <div className="container_element">
                <span>Vendor Email 2</span> <span>{vendor_data.emails}</span>
              </div>
              )}
              { vendor_data.mobile_numbers !== null &&(
              <div className="container_element">
                <span>Vendor Ph.No 2</span> <span>{vendor_data.mobile_numbers}</span>
              </div>
               )} 
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
              <h5>Vendor Servies </h5>
            </div>
          </CardTitle>
          <CardBody>
            <div className="body_container">
              <div className="container_element">
                <span>Line Of Business </span> <span>{vendor_data.lob}</span>
              </div>
              <div className="container_element">
                <span>Service Region</span> <span>{vendor_data.service_region}</span>
              </div>
              <div className="container_element">
                <span>GST No </span> <span>Data Not Found</span>
              </div>
              <div className="container_element">
                <span> City</span> <span>Data not Found</span>
              </div>
              <div className="container_element">
                <span>Pin Code</span> <span>Data Not Found</span>
              </div>
              <div className="container_element">
                <span>Locality</span> <span>Data Not Found </span>
              </div>
              <div className="container_element">
                <span>Address</span> <span>Data Not Found </span>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </Col>

  </>  )
}

export default VendorCreatedHistory