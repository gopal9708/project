import React, { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import BranchStatusCard from "../../../components/dashboardComponents/branchStatusCard/BranchStatusCard";
// import useWindowDimensions from "./ScreenSize";
import { ServerAddress } from "../../../constants/ServerAddress";
import axios from "axios";

const BranchDailyDetails = () => {
  const [branchStatus, setbranchStatus] = useState([]);
  // const [total_count, setTotal_count] = useState([]);
  // const getData1 = async () => {
  //   try {
  //     const resp = await axios.get(
  //       ServerAddress + "analytic/get_dailystatusdashboardview/",
  //       {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       }
  //     );
  //     setbranchStatus(resp.data.total_order_dist);
  //     // console.log("d-----", resp.data.total_order_dist);

  //     console.log("value is",branchStatus)

  //   } catch (err) {
  //     alert(`Error Occur in , ${err}`);
  //   }
  // };
  // console.log("MSg")

  const getData1 = () => {
    axios
      .get(ServerAddress + `analytic/get_dailystatusdashboardview/`)
      .then((response) => {
        console.log("my res", response);
        setbranchStatus(response.data.total_order_dist);
      })
      .catch((err) => {
        alert(`Error Occur in Get , ${err}`);
      });
  };

  console.log("Data is ===", branchStatus);
  useEffect(() => {
    getData1();
  }, []);

  return (
    <div style={{ margin: "10px" }}>
      <div style={{ display: "", justifyContent: "space-between", margin: "" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontFamily: "Georgia",
          }}
        >
          {" "}
          <h3>Daily Status(Last 24 hours)</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "5px 0px 5px 0px",
            fontFamily: " Gill Sans Extrabold, sans-serif",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          }}
        >
          <div
            style={{
              background: "#D0C9C0",

              color: "white",
              fontWeight: "bold",
              fontSize: "16px",
              flex: "2.5",
              padding: "10px",
              textAlign: "center",
              fontFamily: " Gill Sans Extrabold, sans-serif",
              width: "50px",
              marginRight: "4px",
            }}
          >
            Total Order
          </div>
          <div
            style={{
              background: "#E14D2A",

              color: "white",
              flex: "2.5",
              padding: "10px",
              textAlign: "center",
              fontFamily: " Gill Sans Extrabold, sans-serif",
              width: "50px",
              marginRight: "4px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Pending Order
          </div>
          <div
            style={{
              background: "#769bff",
              opacity: "0.8",
              color: "white",
              flex: "2.5",
              padding: "8px",
              textAlign: "center",
              fontFamily: " Gill Sans Extrabold, sans-serif",
              width: "50px",
              marginRight: "4px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Cold Chain
          </div>
          <div
            style={{
              background: "#73777B",

              color: "white",
              flex: "2.5",
              padding: "8px",
              textAlign: "center",
              fontFamily: " Gill Sans Extrabold, sans-serif",
              width: "50px",
              marginRight: "4px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            Manifest Order
          </div>
        </div>
        <div
          style={{
            // alignItems: "center",

            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Col lg={12} md={12} sm={12}>
            <Row>
              {branchStatus.length > 0 && (
                <>
                  {" "}
                  {branchStatus.map((item, index) => {
                    return (
                      <Col
                        lg={3}
                        md={6}
                        sm={6}
                        // key={index}
                      >
                        <BranchStatusCard
                          Upper={item.branch_name}
                          Cold_chain={12}
                          Manifest_order={12}
                          Pending_order={12}
                          Total_count={item.total_count}
                        />
                      </Col>
                    );
                  })}{" "}
                </>
              )}{" "}
            </Row>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default BranchDailyDetails;
