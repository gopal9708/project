import React from "react";
import ReactApexChart from "react-apexcharts";

const DonutChart = ({ series, labels, colors }) => {
  // Truncate label strings if they exceed 10 characters
  const truncatedLabels = labels.map(label =>
    label.length > 8 ? label.slice(0, 8) + "..." : label
  );

  const options = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            formatter: function (val, opts) {
              return val;
            },
            total: {
              show: true,
              showAlways: true,
              fontSize: 22,
              color: "#333333",
              fontFamily: "Helvetica",
            },
            // Add a hover effect to display full label
            // text when mouse is over the label
            onMouseEnter: function (event, label, opts) {
              const chart = opts.chart;
              const labelEl = chart.getDOMElement(opts.seriesIndex, opts.dataPointIndex, "text", "dataLabel");
              labelEl.textContent = label;
            },
            onMouseLeave: function (event, label, opts) {
              const chart = opts.chart;
              const labelEl = chart.getDOMElement(opts.seriesIndex, opts.dataPointIndex, "text", "dataLabel");
              labelEl.textContent = truncatedLabels[opts.dataPointIndex];
            }
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
    },

    colors: colors,
    labels: truncatedLabels,
    legend: {
      position: "left",
      horizontalAlign: "center",
      offsetY: 10,
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="donut"
        height="350"
      />
    </div>
  );
};

export default DonutChart;