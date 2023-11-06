import "../../css/chart.css";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";


const data = [
  {
    name: "1-5 人",
    訂單比數: 66
  },
  {
    name: "5-10 人",
    訂單比數: 125
  },
  {
    name: "11-15 人",
    訂單比數: 156
  },
  {
    name: "15-20 人",
    訂單比數: 45
  },
  {
    name: "20 人以上",
    訂單比數: 20
  }
];

export default function ConDis() {
  return (
    <div style={{ width: '80%', height: 400 }} className="mx-auto mt-3">
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
          <Bar dataKey="訂單比數" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>

  );
}