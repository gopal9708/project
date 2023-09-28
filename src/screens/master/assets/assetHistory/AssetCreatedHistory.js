import React ,{useState, useLayoutEffect} from 'react';
import {Col,Card,CardTitle,CardBody} from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css";

const AssetCreatedHistory = ({page_data,callibration }) => {
  const [asset_data, setasset_data] = useState("");
  const [user_name, setuser_name] = useState("");
  const [callibration_data, setcallibration_data] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)
   let data = p_data.change_message;
   let n_data = JSON.parse(data)  
   setasset_data(n_data);      
    }
  }, [page_data])

  useLayoutEffect(() => {
    const c_data = callibration[0];
    if (c_data) {
      let data = c_data.change_message;
      let n_data = JSON.parse(data);
      setcallibration_data(n_data);
    }
  }, [callibration]);

  console.log("Asset history  data >>>>>",asset_data);
  console.log("Callibration history data >>>>", callibration_data);
  
  

  let time = new Date(asset_data.created_at).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  
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
                <h5>Asset Info</h5>
              </div>
            </CardTitle>
            <CardBody>
             
              <div className="body_container">
               {asset_data.asset_type === "LOGGER"  && (
                 <>
                <div className="container_element">
                  <span>Asset Type </span> <span> {asset_data.asset_type}</span>
                </div>
                <div className="container_element">
                  <span> Logger Type </span> <span>{asset_data.box_type}</span>
                </div>
                <div className="container_element">
                  <span>Manufacture Name</span> <span>{asset_data.manufacturer_name}</span>
                </div>
                <div className="container_element">
                  <span>Teamperature Type</span> <span> {asset_data.temperature_type} </span>
                </div>
                <div className="container_element">
                  <span>Logger Number</span> <span> {asset_data.product_id}</span>
                </div>
                </>
                )}
                {asset_data.asset_type ===  "TEMPERATURE CONTROL BOX"  && (
                 <>
                 <div className="container_element">
                  <span>Asset Type </span> <span>{asset_data.asset_type} </span>
                </div>
                <div className="container_element">
                  <span>Box Type</span> <span> {asset_data.box_type}</span>
                </div>
                <div className="container_element">
                  <span>Teamperature Type</span> <span> {asset_data.temperature_type} </span>
                </div>
                <div className="container_element">
                  <span>Box Capacities </span> <span>{asset_data.box_capacities}</span>
                </div>
                <div className="container_element">
                  <span>Manufacture Product ID </span> <span> {asset_data.product_id}</span>
                </div>
                <div className="container_element">
                  <span>Old Box No </span> <span>{asset_data.old_box_no}</span>
                </div>
                </>
                )}
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
                <h5>Asset Details</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Initial Assign Branch </span> <span> {asset_data.assigned_branch_n} </span>
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

      {asset_data.asset_type === "LOGGER"  && (
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
                <h5>Asset Callibration Info</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Callibration From </span> <span>{callibration_data.callibration_from}</span>
                </div>
                <div className="container_element">
                  <span>Callibration To</span> <span>{callibration_data.callibration_to}</span>
                </div>
                <div className="container_element">
                  <span>Certificate Issued By</span> <span> {callibration_data.issued_by}</span>
                </div>
                <div className="container_element">
                  <span>Issued Date</span> <span> {callibration_data.issued_date}</span>
                </div>
                <div className="container_element">
                  <span>Certificate</span> <span> Data Not Saved </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
      </>
      )}
    </>
   )
}

export default AssetCreatedHistory