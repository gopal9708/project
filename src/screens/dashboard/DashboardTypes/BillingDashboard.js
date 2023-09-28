import React from "react";
import useWindowDimensions from "../ScreenSize";
import "bootstrap/dist/css/bootstrap.css";
import "./Client.scss";
import DonutChart from "../../../components/dashboardComponents/Charts/DonutChart";
// import SimpleBarChart from "../../../components/dashboardComponents/Charts/SimpleBarChart";
// import SimplePieChart from "../../../components/dashboardComponents/Charts/SimplePieChart";
import { Card } from "react-bootstrap";
import SpineAreaChart from "../../../components/dashboardComponents/Charts/SpineAreaChart";
import { CardBody, Col, Row } from "reactstrap";

const BillingDashboard = () => {
  // To get Screen Size
  const { height, width } = useWindowDimensions();

  // FOr Donut Chart
  const series = [20, 30, 30, 10, 10];
  const labels = ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"];
  const colors = ["#34c38f", "#556ee6", "#f46a6a", "#50a5f1", "#f1b44c"];

  // used for bar chart
  // const seriesData = [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365, 100];
  // const categories = [
  //   "South Korea",
  //   "Canada",
  //   "United Kingdom",
  //   "Netherlands",
  //   "Italy",
  //   "France",
  //   "Japan",
  //   "United States",
  //   "China",
  //   "Germany",
  //   "USA",
  // ];
  // const color = " rgb(136 , 132,216)";

  //  Spine Area Chart
  const seriesData1 = [
    { data: [30, 40, 35, 50, 49, 60, 70] },
    { data: [20, 35, 40, 60, 58, 70, 80] },
  ];

  const optionsData = {
    stroke: { curve: "smooth", width: 3 },
    colors: ["#556ee6", "#34c38f"],
    tooltip: { x: { format: "dd/MM/yy HH:mm" } },
  };

  // let list1 = ["1", "2", "3", "4", "5", "6"];

  return (
    <>
      {/* For HeaderCard */}
      <Row style={{ display: "flex" }}>
        <Col>
          <Card
            className="mini-stats-wid"
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              backgroundColor: "#A9C52F",
            }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-1">
                  <h5
                    className
                    style={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontSize: "21px",
                    }}
                  >
                    {" "}
                    Generated
                  </h5>
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
              backgroundColor: "#007580",
            }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h5
                    className
                    style={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontSize: "21px",
                    }}
                  >
                    Not Paid
                  </h5>
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
            }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h5
                    className
                    style={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontSize: "21px",
                    }}
                  >
                    In review
                  </h5>
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
              backgroundColor: "#D32626",
            }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h5
                    className
                    style={{
                      color: "white",
                      fontFamily: "sans-serif",
                      fontSize: "21px",
                    }}
                  >
                    Disputed
                  </h5>
                </div>

                <div className="avatar-sm ms-auto"></div>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
      </Row>
      {/* For table */}{" "}
      <div className="wrapper">
        <div className="table1">
          <div class="row1 header green">
            <div class="cell">Bill To Name</div>
            <div class="cell">Associated Order</div>
            <div class="cell">Invoice Number</div>
            <div class="cell">Status</div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              Rahul Transporter
            </div>
            <div class="cell" data-title="Unit Price">
              800
            </div>
            <div class="cell" data-title="Quantity">
              10
            </div>
            <div class="cell" s data-title="Date Sold">
              Pending
            </div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              Karan Transporter
            </div>
            <div class="cell" data-title="Unit Price">
              45
            </div>
            <div class="cell" data-title="Quantity">
              120
            </div>
            <div class="cell" data-title="Date Sold">
              Fullfilled
            </div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              Logistic Cube
            </div>
            <div class="cell" data-title="Unit Price">
              1000
            </div>
            <div class="cell" data-title="Quantity">
              25
            </div>
            <div class="cell" data-title="Date Sold">
              Active
            </div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              Quick India
            </div>
            <div class="cell" data-title="Unit Price">
              60
            </div>
            <div class="cell" data-title="Quantity">
              90
            </div>
            <div class="cell" data-title="Date Sold">
              Pending
            </div>
          </div>
        </div>
      </div>
      {/* for Charts */}
      <Col lg={12} md={6} sm={6}>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            // background: "white",
            margin: "2px",
            // boxShadow: "0px 2px 3px ",
            flexDirection: width > 800 ? "row" : "column",
          }}
        >
          <Col lg={6}>
            <Card className="shadow bg-white rounded" style={{ margin: "5px" }}>
              <CardBody>
                <DonutChart series={series} labels={labels} colors={colors} />
              </CardBody>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="shadow bg-white rounded" style={{ margin: "5px" }}>
              <CardBody>
                <DonutChart series={series} labels={labels} colors={colors} />
              </CardBody>
            </Card>
          </Col>
        </div>
      </Col>
      <Col lg={12} md={6} sm={6}>
        <div
          style={{
            display: "flex",
            // justifyContent: "space-between",
            // background: "white",
            margin: "2px",
            // boxShadow: "0px 2px 3px ",
            flexDirection: width > 800 ? "row" : "column",
          }}
        >
          <Col lg={6}>
            <Card className="shadow bg-white rounded" style={{ margin: "5px" }}>
              <CardBody>
                <SpineAreaChart
                  seriesData={seriesData1}
                  optionsData={optionsData}
                  chartHeight={400}
                />
              </CardBody>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="shadow bg-white rounded" style={{ margin: "5px" }}>
              <CardBody>
                <SpineAreaChart
                  seriesData={seriesData1}
                  optionsData={optionsData}
                  chartHeight={400}
                />
              </CardBody>
            </Card>
          </Col>
        </div>
      </Col>
      {/* Vertical Bar chart */}
      {/* Pie Chart
      <Card className="shadow bg-white rounded">
        <CardBody>
          <PieChart series={series} labels={labels} colors={colors} />
        </CardBody>
      </Card> */}
      {/* Horizontal Chart */}
      {/* <div style={{ background: "white", margin: "2px" }}>
        <BarChart
          seriesData={seriesData}
          categories={categories}
          color={color}
          chartDirection={true}
        />
      </div> */}
      {/* Vertical Chart */}
      {/* <div style={{ background: "white", margin: "2px" }}>
        <BarChart
          seriesData={seriesData}
          categories={categories}
          color={color}
          chartDirection={false}
        />
      </div> */}
      {/* Spine Area Chart */}
      {/* <div style={{ background: "white", margin: "2px" }}>
        <SpineAreaChart
          seriesData={seriesData1}
          optionsData={optionsData}
          chartHeight={400}
        />
      </div> */}
    </>
  );
};

export default BillingDashboard;
