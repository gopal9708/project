import React ,{useState, useLayoutEffect} from 'react';
import {Col,Card,CardTitle,CardBody} from "reactstrap";
import "../../../../components/historyTabComponents/NewHistoryTab.css";

const LocationCreatedHistory = ({page_data}) => {
  // console.log("page",page_data)
  const [location_data, setlocation_data] = useState("");
  const [user_name, setuser_name] = useState("");

  useLayoutEffect(() => {
    const p_data = page_data[0];
    if (p_data) {
      setuser_name(p_data.name_r)

let data = p_data.change_message;
let n_data = JSON.parse(data)  
setlocation_data(n_data);      
    }
  }, [page_data])

  // console.log("Loction data >>>>>",location_data);
  

  let time = new Date(location_data.created_at).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
  
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
                <h5>Location Details</h5>
              </div>
            </CardTitle>
            <CardBody>
              <div className="body_container">
                <div className="container_element">
                  <span>Countary Name</span> <span> Data Not Save </span>
                </div>
                <div className="container_element">
                  <span>State Name</span> <span>Data not Save  </span>
                </div>
                <div className="container_element">
                  <span>City Name</span> <span> Data not Save</span>
                </div>
                <div className="container_element">
                  <span>Pin Code</span> <span> Data not Save </span>
                </div>
                <div className="container_element">
                  <span>Locality</span> <span> Data not Save</span>
                </div>
                <div className="container_element">
                  <span>Created By</span> <span>Data not Save</span>
                </div>
                <div className="container_element">
                  <span>Created At</span> <span>Data not Save</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </Col>
     
    </>
   )
}

export default LocationCreatedHistory