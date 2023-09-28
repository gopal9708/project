import React from "react";
import {
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
const VerticalBarChart = ({ chart_heading, data }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h5>{chart_heading}</h5>
      <div className="App">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884D8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
};
export default VerticalBarChart;
