import React from "react";
import useWindowDimensions from "../ScreenSize";
import { MdDashboard } from "react-icons/md";
// import "bootstrap/dist/css/bootstrap.css";
import "./Client.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import BarChart from "../../../components/dashboardComponents/Charts/BarChart";
import DonutChart from "../../../components/dashboardComponents/Charts/DonutChart";
import PieChart from "../../../components/dashboardComponents/Charts/PieChart";
// import { Card } from "react-bootstrap";
import LineColumnArea from "../../../components/dashboardComponents/Charts/LineColumnArea";
import SpineAreaChart from "../../../components/dashboardComponents/Charts/SpineAreaChart";
import { CardBody, Col, Row, Card } from "reactstrap";

const ClientDashboard = () => {
  // To get Screen Size
  const { height, width } = useWindowDimensions();

  // FOr Donut Chart
  const series = [20, 30, 30, 10, 10];
  const labels = ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"];
  const colors = ["#34c38f", "#556ee6", "#f46a6a", "#50a5f1", "#f1b44c"];

  // used for bar chart
  const seriesData = [380, 430, 450, 475, 550, 584, 780, 1100, 1220, 1365, 100];
  const categories = [
    "South Korea",
    "Canada",
    "United Kingdom",
    "Netherlands",
    "Italy",
    "France",
    "Japan",
    "United States",
    "China",
    "Germany",
    "USA",
  ];
  const color = " rgb(136 , 132,216)";

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
        {" "}
        <Col xs={12} md={3}
        // lg={3}
        >
          <Card style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}>
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h4 className="text-muted mb-2">Client</h4>
                </div>

                <div className="avatar-sm ms-auto">
                  <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                    <i>
                      <MdDashboard />{" "}
                    </i>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col >
        <Col xs={12} md={3}>
          <Card
            className="mini-stats-wid"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h4 className="text-muted mb-2">Bill TO</h4>
                </div>

                <div className="avatar-sm ms-auto">
                  <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                    <i>
                      <MdDashboard />{" "}
                    </i>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card
            className="mini-stats-wid"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h4 className="text-muted mb-0.5">15Day's</h4>
                </div>

                <div className="avatar-sm ms-auto">
                  <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                    <i>
                      <MdDashboard />{" "}
                    </i>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xs={12} md={3}>
          <Card
            className="mini-stats-wid"
            style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
          >
            <CardBody>
              <div className="d-flex flex-wrap">
                <div className="me-3">
                  <h4 className="text-muted mb-2">Expired</h4>
                </div>

                <div className="avatar-sm ms-auto">
                  <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                    <i>
                      <MdDashboard />{" "}
                    </i>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>{" "}
      </Row>

      
      {/* For table*/}{" "}
      <div class="wrapper">
        <div class="table1">
          <div class="row1 header green">
            <div class="cell">Client</div>
            <div class="cell">Bill To</div>
            <div class="cell">15 day's To Expired</div>
            <div class="cell">Expired</div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              Rahul Transporter
            </div>
            <div class="cell" data-title="Unit Price">
              800Rs
            </div>
            <div class="cell" data-title="Quantity">
              10
            </div>
            <div class="cell" data-title="Date Sold">
              03/15/2014
            </div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              Karan Transporter
            </div>
            <div class="cell" data-title="Unit Price">
              45Rs
            </div>
            <div class="cell" data-title="Quantity">
              120
            </div>
            <div class="cell" data-title="Date Sold">
              02/28/2014
            </div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              Logistic Cube
            </div>
            <div class="cell" data-title="Unit Price">
              1000Rs
            </div>
            <div class="cell" data-title="Quantity">
              25
            </div>
            <div class="cell" data-title="Date Sold">
              02/10/2014
            </div>
          </div>

          <div class="row1">
            <div class="cell" data-title="Product">
              Quick India
            </div>
            <div class="cell" data-title="Unit Price">
              60Rs
            </div>
            <div class="cell" data-title="Quantity">
              90
            </div>
            <div class="cell" data-title="Date Sold">
              01/14/2014
            </div>
          </div>
        </div>
      </div>
      {/* For table */}
      {/* <div>
        <DashboardTable title={DashboardDataTitle} data={list1} />
      </div> */}
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
      {/* Vertical Bar chart */}
    
      {/* Pie Chart */}
      <Card className="shadow bg-white rounded">
        <CardBody>
          <PieChart series={series} labels={labels} colors={colors} />
        </CardBody>
      </Card>
      {/* Horizontal Chart */}
      <div style={{ background: "white", margin: "2px" }}>
        <BarChart
          seriesData={seriesData}
          categories={categories}
          color={color}
          chartDirection={true}
        />
      </div>
      {/* Vertical Chart */}
      <div style={{ background: "white", margin: "2px" }}>
        <BarChart
          seriesData={seriesData}
          categories={categories}
          color={color}
          chartDirection={false}
        />

        <LineColumnArea />
      </div>
      {/* Spine Area Chart */}
      <div style={{ background: "white", margin: "2px" }}>
        <SpineAreaChart
          seriesData={seriesData1}
          optionsData={optionsData}
          chartHeight={400}
        />
      </div>
    </>
  );
};

export default ClientDashboard;
