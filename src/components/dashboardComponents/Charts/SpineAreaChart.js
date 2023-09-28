import React from "react";
import ReactApexChart from "react-apexcharts";

const SpineAreaChart = ({ seriesData, optionsData, chartHeight }) => {
  const series = seriesData || [
    { data: [34, 40, 28, 52, 42, 109, 100] },
    { data: [32, 60, 34, 46, 34, 52, 41] },
  ];

  const options = optionsData || {
    stroke: { curve: "smooth", width: 3 },
    colors: ["red", "#34c38f"],
    tooltip: { x: { format: "dd/MM/yy HH:mm" } },
  };

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={chartHeight || 350}
    />
  );
};

export default SpineAreaChart;
