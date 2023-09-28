import React from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ seriesData, categories, color, chartDirection }) => {
  const order = [{ data: seriesData }];
  const options = {
    chart: {
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: chartDirection,
      },
    },
    dataLabels: {
      enabled: true,
    },
    colors: [color],
    grid: {
      borderColor: "#f1f1f1",
    },
    fill:{
colors: [ "#1F8A70",
]
    },
    xaxis: {
      categories: categories,
    },
  };

  return (
    <ReactApexChart options={options} series={order}  type="bar" height="350" />
  );
};

export default BarChart;
