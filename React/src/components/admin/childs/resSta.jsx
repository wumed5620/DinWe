import "../../css/chart.css";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: " 5 ★", value: 35 },
  { name: " 4 ★", value: 66 },
  { name: " 3 ★", value: 23 },
  { name: " 2 ★", value: 10 },
  { name: " 1 ★", value: 2 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", ""];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ResSta() {
  return (
    <div style={{ width: '100%', height: "40vh" }}>
      <ResponsiveContainer>
        <PieChart >
          <Pie
            data={data}
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="top" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>

  );
}
