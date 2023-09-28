import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Card } from "react-bootstrap";
import LineColumnArea from "../../../components/dashboardComponents/Charts/LineColumnArea";
import { CardBody, CardTitle, Col, Row } from "reactstrap";
import axios from "axios";
import { ServerAddress } from "../../../constants/ServerAddress";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CheckerDashboard = () => {
  const accessToken = useSelector((state) => state.authentication.access_token);
  const user = useSelector((state) => state.authentication.userdetails);
  const [totalcount, setTotalcount] = useState("");
  const [pending, setPending] = useState("");
  //---------------------Api For Get User Data------------------------//
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const get_CheckerData = async () => {
    let data = [];
    try {
      const response = await axios.get(
        ServerAddress + "analytic/get_checkermaker_dashboardview/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      data = response;

      // console.log("data========123", data);
      const counts = Object.values(data.data).map((obj) => Object.values(obj));
      // const count = Object.values(data.data);
      // console.log("count=====1", count);
      // console.log("counts=====2", counts);
      const totals = counts.reduce(
        (acc, curr) => {
          // console.log("acc====111", acc);
          acc[0] += curr[0];
          acc[1] += curr[1];
          acc[2] += curr[2];
          return acc;
        },
        [0, 0, 0]
      );
      setTotalcount(totals);
      setPending(data.data);

      console.log(
        `approved: ${totals[0]}, not_approved: ${totals[1]}, rejected: ${totals[2]}`
      );
    } catch (error) {
      alert(`Error Occur in Get , ${error}`);
    }
  };
  useEffect(() => {
    get_CheckerData();
  }, []);
  return (
    <>
      {/* For HeaderCard */}
      <Row style={{ display: "flex" }}>
        <Col>
          <Card
            className="mini-stats-wid"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#54B435",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardBody>
              <Link
                to={{
                  pathname: `/master/commodities/addcommodity`,
                }}
                state={{ commodity: "P 24Hr", type: "Commodity" }}
              >
                <div className="d-flex">
                  <div className="me-2">
                    <h5
                      className
                      style={{
                        color: "white",
                        fontFamily: "sans-serif",
                        fontSize: "21px",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center", // added textAlign property to center the text
                      }}
                    >
                      {" "}
                      Approved
                    </h5>
                    <span className="abd" style={{ color: "white" }}>
                      {totalcount[0]}{" "}
                    </span>
                  </div>
                  <div className="avatar-sm ms-auto"></div>
                </div>
              </Link>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card
            className="mini-stats-wid"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#007580",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-0">
                  <h5
                    className
                    style={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontSize: "21px",
                      margin: "0 auto",
                      textAlign: "center", // added textAlign property to center the text
                      Position: "relative",
                      display: "flex",
                      right: "auto",
                    }}
                  >
                    Pending
                  </h5>
                  <span className="abd" style={{ color: "white" }}>
                    {totalcount[1]}{" "}
                  </span>
                </div>
                <div className="avatar-sm ms-auto"></div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card
            className="mini-stats-wid"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#E28F83",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-2">
                  <h5
                    className
                    style={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontSize: "21px",
                      justifyContent: "center",
                      alignItems: "center",
                      textAlign: "center", // added textAlign property to center the text
                    }}
                  >
                    Rejected
                  </h5>
                  <span className="abd" style={{ color: "white" }}>
                    {totalcount[2]}
                  </span>
                </div>
                <div className="avatar-sm ms-auto"></div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <div className="wrapper">
        <div className="table1">
          <div class="row1 header green">
            <div class="cell">Serial Number</div>
            <div class="cell">Application Name</div>
            <div class="cell">Pending</div>
            <div class="cell">Approved</div>
            <div class="cell">Rejected</div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              1
            </div>
            <div class="cell" data-title="Unit Price">
              Order
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/booking/orders/addorder`,
                    }}
                  // state={{order1: "P", type: "Order" }}
                  >
                    {pending?.order_counts?.not_approved}{" "}
                  </Link>
                  :
                  <>{pending?.order_counts?.not_approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/booking/orders/addorder`,
                    }}
                  // state={{order1: "A", type: "Order" }}
                  >
                    {pending?.order_counts?.approved}
                  </Link>
                  :
                  <>{pending?.order_counts?.approved}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/booking/orders/addorder`,
                    }}
                  // state={{order1: "", type: "Order" }}
                  >
                    {pending?.order_counts?.rejected}
                  </Link>
                  :
                  <>{pending?.order_counts?.rejected}</>
                }
              </span>
            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              2
            </div>
            <div class="cell" data-title="Unit Price">
              Manifest
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {pending?.manifest_counts?.not_approved}{" "}
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {pending?.manifest_counts?.approved}
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {pending?.manifest_counts?.rejected}
              </span>
            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              3
            </div>
            <div class="cell" data-title="Unit Price">
              Runsheet
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/runsheet/changedrunsheet`,
                    }}
                  // state={{runsheetk: "P", type: "Runsheet" }}
                  >
                    {pending?.runsheet_counts?.not_approved}{" "}
                  </Link>
                  :
                  <>{pending?.runsheet_counts?.not_approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/runsheet/changedrunsheet`,
                    }}
                  // state={{runsheetk: "A", type: "Runsheet" }}
                  >
                    {pending?.runsheet_counts?.approved}
                  </Link>
                  :
                  <> {pending?.runsheet_counts?.approved}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/runsheet/changedrunsheet`,
                    }}
                  // state={{runsheetk: "R", type: "Runsheet" }}
                  >
                    {pending?.runsheet_counts?.rejected}
                  </Link>
                  :
                  <>{pending?.runsheet_counts?.rejected}</>
                }
              </span>
            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              4
            </div>
            <div class="cell" data-title="Unit Price">
              Docket Issue
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/booking/docketissue/addorder`,
                    }}
                  // state={{docketr: "P", type: "Docket" }}
                  >
                    {pending?.issue_counts?.not_approved}{" "}
                  </Link>
                  :
                  <>{pending?.issue_counts?.not_approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/booking/docketissue/addorder`,
                    }}
                  // state={{docketr: "A", type: "Docket" }}
                  >
                    {pending?.issue_counts?.approved}{" "}
                  </Link>
                  :
                  <> {pending?.issue_counts?.approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/booking/docketissue/addorder`,
                    }}
                  // state={{docketr: "R", type: "Docket" }}
                  >
                    {pending?.runsheet_counts?.rejected}{" "}
                  </Link>
                  :
                  <> {pending?.runsheet_counts?.rejected}{" "}</>
                }
              </span>
            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              5
            </div>
            <div class="cell" data-title="Unit Price">
              Delivery Info
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/runsheet/changedrunsheet`,
                    }}
                  // state={{runsheetk: "P", type: "Runsheet" }}
                  >
                    {pending?.delivery_counts?.not_approved}{" "}
                  </Link>
                  :
                  <> {pending?.delivery_counts?.not_approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {pending?.delivery_counts?.approved}
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {pending?.delivery_counts?.rejected}
              </span>
            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              6
            </div>
            <div class="cell" data-title="Unit Price">
              Commodities
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >

              {!user.is_superuser ?
                <span
                  className="arrow"
                  style={{ color: "blue", fontSize: "15px" }}
                >
                  <Link
                    to={{
                      pathname: `/master/commodities/addcommodity`,
                    }}
                    state={{ commodity: "P", type: "Commodity" }}
                  >
                    {pending?.commodity_counts?.not_approved}{" "}
                  </Link>
                </span>
                :
                <span>{pending?.commodity_counts?.not_approved}{" "}</span>
              }

            </div>
            <div class="cell" data-title="Date Sold">

              {!user.is_superuser ?
                <span
                  className="arrow"
                  style={{ color: "blue", fontSize: "15px" }}
                >
                  <Link
                    to={{
                      pathname: `/master/commodities/addcommodity`,
                    }}
                    state={{ commodity: "A", type: "Commodity" }}
                  >
                    {pending?.commodity_counts?.approved}{" "}
                  </Link>
                </span>
                :
                <span> {pending?.commodity_counts?.approved}{" "}</span>
              }

            </div>
            <div class="cell" data-title="Date Sold">

              {!user.is_superuser && user.user_department_name === "ADMIN" ?
                <span
                  className="arrow"
                  style={{ color: "blue", fontSize: "15px" }}
                >
                  <Link
                    to={{
                      pathname: `/master/commodities/addcommodity`,
                    }}
                    state={{ commodity: "R", type: "Commodity" }}
                  >
                    {pending?.commodity_counts?.rejected}{" "}
                  </Link>
                </span>
                :
                <span>{pending?.commodity_counts?.rejected}{" "}</span>
              }

            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              7
            </div>
            <div class="cell" data-title="Unit Price">
              Charge
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >

              {!user.is_superuser ?
                <span
                  className="arrow"
                  style={{ color: "blue", fontSize: "15px" }}
                >
                  <Link
                    to={{
                      pathname: `/master/charges/addcharge`,
                    }}
                    state={{ charge: "P", type: "Charges" }}
                  >
                    {pending?.charge_counts?.not_approved}{" "}
                  </Link>
                </span>
                :
                <span>{pending?.charge_counts?.not_approved}{" "}</span>
              }


            </div>
            <div class="cell" data-title="Date Sold">

              {!user.is_superuser ?
                <span
                  className="arrow"
                  style={{ color: "blue", fontSize: "15px" }}
                >
                  <Link
                    to={{
                      pathname: `/master/charges/addcharge`,
                    }}
                    state={{ charge: "A", type: "Charges" }}
                  >
                    {pending?.charge_counts?.approved}{" "}
                  </Link>
                </span>
                :
                <span>{pending?.charge_counts?.approved}{" "}</span>
              }

            </div>
            <div class="cell" data-title="Date Sold">

              {!user.is_superuser && user.user_department_name === "ADMIN" ?
                <span
                  className="arrow"
                  style={{ color: "blue", fontSize: "15px" }}
                >
                  <Link
                    to={{
                      pathname: `/master/charges/addcharge`,
                    }}
                    state={{ charge: "R", type: "Charges" }}
                  >
                    {pending?.charge_counts?.rejected}{" "}
                  </Link>
                </span>
                :
                <span>{pending?.charge_counts?.rejected}{" "}</span>
              }

            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              8
            </div>
            <div class="cell" data-title="Unit Price">
              Bill To
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/billtos/addbillto/`,
                    }}
                  // state={{bill: "P", type: "Bill" }}
                  >
                    {pending?.billto_counts?.not_approved}{" "}
                  </Link>
                  :
                  <>{pending?.billto_counts?.not_approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/billtos/addbillto/`,
                    }}
                  // state={{bill: "A", type: "Bill" }}
                  >
                    {pending?.billto_counts?.approved}{" "}
                  </Link>
                  :
                  <>{pending?.billto_counts?.approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/billtos/addbillto/`,
                    }}
                  // state={{bill: "R", type: "Bill" }}
                  >
                    {pending?.billto_counts?.rejected}{" "}
                  </Link>
                  :
                  <>{pending?.billto_counts?.rejected}{" "}</>
                }
              </span>
            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              9
            </div>
            <div class="cell" data-title="Unit Price">
              Branches
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/branches/addbranch/`,
                    }}
                  // state={{branch: "A", type: "Branches" }}
                  >
                    {pending?.branch_counts?.not_approved}{" "}
                  </Link>
                  :
                  <>{pending?.branch_counts?.not_approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/branches/addbranch/`,
                    }}
                  // state={{branch: "P", type: "Branches" }}
                  >
                    {pending?.branch_counts?.approved}{" "}
                  </Link>
                  :
                  <>{pending?.branch_counts?.approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/branches/addbranch/`,
                    }}
                  // state={{branch: "R", type: "Branches" }}
                  >
                    {pending?.branch_counts?.rejected}{" "}
                  </Link>
                  :
                  <>{pending?.branch_counts?.rejected}{" "}</>
                }
              </span>
            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              10
            </div>
            <div class="cell" data-title="Unit Price">
              Location
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/locations/addlocation/`,
                    }}
                  // state={{location_1: "A", type: "Location" }}
                  >
                    {pending?.location_counts?.not_approved}{" "}
                  </Link>
                  :
                  <>{pending?.location_counts?.not_approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/locations/addlocation/`,
                    }}
                  // state={{location_1: "P", type: "Location" }}
                  >
                    {pending?.location_counts?.approved}{" "}
                  </Link>
                  :
                  <>{pending?.location_counts?.approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/locations/addlocation/`,
                    }}
                  // state={{location_1: "R", type: "Location" }}
                  >
                    {pending?.location_counts?.rejected}{" "}
                  </Link>
                  :
                  <>{pending?.location_counts?.rejected}{" "}</>
                }
              </span>
            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              11
            </div>
            <div class="cell" data-title="Unit Price">
              Vendor
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/vendor/addvendor/`,
                    }}
                  // state={{vendor: "P", type: "Vendor" }}
                  >
                    {pending?.vendor_counts?.not_approved}{" "}
                  </Link>
                  :
                  <>{pending?.vendor_counts?.not_approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/vendor/addvendor/`,
                    }}
                  // state={{vendor: "A", type: "Vendor" }}
                  >
                    {pending?.vendor_counts?.approved}
                  </Link>
                  :
                  <> {pending?.vendor_counts?.approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/vendor/addvendor/`,
                    }}
                  // state={{vendor: "R", type: "Vendor" }}
                  >
                    {pending?.vendor_counts?.rejected}
                  </Link>
                  :
                  <> {pending?.vendor_counts?.rejected}{" "}</>
                }
              </span>
            </div>
          </div>
          <div class="row1">
            <div class="cell" data-title="Product">
              12
            </div>
            <div class="cell" data-title="Unit Price">
              Assets
            </div>
            <div
              class="cell"
              data-title="Quantity"
              style={{ cursor: "pointer" }}
            >
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/add-asset`,
                    }}
                  // state={{assetr: "P", type: "Assets" }}
                  >
                    {pending?.asset_counts?.not_approved}{" "}
                  </Link>
                  :
                  <> {pending?.asset_counts?.not_approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/add-asset`,
                    }}
                  // state={{assetr: "A", type: "Assets" }}
                  >
                    {pending?.asset_counts?.approved}
                  </Link>
                  :
                  <> {pending?.asset_counts?.approved}{" "}</>
                }
              </span>
            </div>
            <div class="cell" data-title="Date Sold">
              <span
                className="arrow"
                style={{ color: "blue", fontSize: "15px" }}
              >
                {!user.is_superuser ?
                  <Link
                    to={{
                      pathname: `/master/add-asset`,
                    }}
                  // state={{assetr: "R", type: "Assets" }}
                  >
                    {pending?.asset_counts?.rejected}
                  </Link>
                  :
                  <> {pending?.asset_counts?.rejected}{" "}</>
                }
              </span>
            </div>
          </div>
        </div>
      </div>
      <Row>
        <Col lg={12}>
          <Card>
            <CardBody>
              <CardTitle className="mb-4"></CardTitle>
              <Row className="justify-content-center">
                <Col sm={4}>
                  <div className="text-center">
                    <h5 className="mb-0 font-size-20">{totalcount[0]} </h5>
                    <p className="text-muted">Approved</p>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="text-center">
                    <h5 className="mb-0 font-size-20"> {totalcount[1]} </h5>
                    <p className="text-muted">Pending</p>
                  </div>
                </Col>
                <Col sm={4}>
                  <div className="text-center">
                    <h5 className="mb-0 font-size-20"> {totalcount[2]}</h5>
                    <p className="text-muted">Rejected</p>
                  </div>
                </Col>
              </Row>
              <LineColumnArea />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default CheckerDashboard;
