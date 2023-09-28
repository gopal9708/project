import React from "react";
import HeaderCard from "../../../components/dashboardComponents/card/HeaderCard";
import useWindowDimensions from "../ScreenSize";
import { FaTruck } from "react-icons/fa";
import { IoMdTrain } from "react-icons/io";
import { GiCommercialAirplane } from "react-icons/gi";
import "bootstrap/dist/css/bootstrap.css";

import BarChart from "../../../components/dashboardComponents/Charts/BarChart";
import DonutChart from "../../../components/dashboardComponents/Charts/DonutChart";
import PieChart from "../../../components/dashboardComponents/Charts/PieChart";
import { Card } from "react-bootstrap";
import VerticalBarChart from "../../../components/dashboardComponents/Charts/VerticalBarChart";
import SpineAreaChart from "../../../components/dashboardComponents/Charts/SpineAreaChart";
import { CardBody, Col } from "reactstrap";

const TripDashboard = () => {
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

      <div className="header_card_container">
        <HeaderCard
          Headlogo={<FaTruck />}
          headColor={"#f24b3f"}
          title={"Local"}
          description={"600"}
          naviLink={"/booking/orders"}
          filter_by_value={"Local"}
        />
        <HeaderCard
          Headlogo={<IoMdTrain />}
          headColor={"blue"}
          title={"Domestic"}
          description={"200"}
          naviLink={"/booking/orders"}
        />
        <HeaderCard
          Headlogo={<GiCommercialAirplane />}
          headColor={"green"}
          title={"Air"}
          description={"40"}
          naviLink={"/booking/orders"}
        />
        {/* <HeaderCard
          Headlogo={<GiCommercialAirplane />}
          headColor={"brown"}
          title={"E-Wat Bill"}
          description={"10"}
        /> */}
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
      <Col lg={12} md={12} sm={12}>
        <Card className="shadow bg-white rounded">
          <VerticalBarChart
            chart_heading={"Order Chart"}
            data={[
              { name: "Week1", users: 2043000 },
              { name: "Week2", users: 153000 },
              { name: "Week3", users: 13300 },
              { name: "Week4", users: 503000 },
            ]}
          />
        </Card>
      </Col>

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

export default TripDashboard;
