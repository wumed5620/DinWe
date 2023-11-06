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
    name: "大樹先生親子餐廳",
    訂單數量: 0
  },
  {
    name: "大家書房",
    訂單數量: 5
  },
  {
    name: "小島3.5度",
    訂單數量: 26
  },
  {
    name: "山豬別館",
    訂單數量: 30
  },
  {
    name: "公老坪Dream kitchen",
    訂單數量: 50
  },
  {
    name: "北屯丹水滾鍋物",
    訂單數量: 20
  },
  {
    name: "赤腳丫生態農莊",
    訂單數量: 10
  },
  {
    name: "咱們小時候",
    訂單數量: 13
  },
  {
    name: "威爾森的農場",
    訂單數量: 22
  }
];

export default function ResAllEarn() {
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
          <Bar dataKey="訂單數量" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </div>

  );
}