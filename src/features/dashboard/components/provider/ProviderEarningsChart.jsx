// src/features/dashboard/components/provider/ProviderEarningsChart.jsx
import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import { ChevronDown } from "lucide-react";

const data = [
  { day: "Mon", earnings: 2600, date: "Mon, Sep 22" },
  { day: "Tue", earnings: 3000, date: "Tue, Sep 23" },
  { day: "Wed", earnings: 4200, date: "Wed, Sep 24" },
  { day: "Thu", earnings: 4800, date: "Thu, Sep 25" },
  { day: "Fri", earnings: 5600, date: "Fri, Sep 26" },
  { day: "Sat", earnings: 4700, date: "Sat, Sep 27" },
  { day: "Sun", earnings: 5800, date: "Sun, Sep 28" },
];

// Custom Label on top of Friday bar to replicate the exact floating tooltip in the picture
const renderCustomizedLabel = (props) => {
  const { x, y, width, index } = props;
  // Friday is index 4
  if (index !== 4) return null;

  return (
    <g>
      {/* Tooltip bubble */}
      <rect
        x={x + width / 2 - 34}
        y={y - 48}
        width={68}
        height={38}
        rx={8}
        fill="#1E293B"
        className="filter drop-shadow-md"
      />
      {/* Tooltip caret / arrow */}
      <polygon
        points={`${x + width / 2 - 5},${y - 10} ${x + width / 2 + 5},${y - 10} ${x + width / 2},${y - 4}`}
        fill="#1E293B"
      />
      {/* Tooltip Text: Value */}
      <text
        x={x + width / 2}
        y={y - 32}
        fill="#FFFFFF"
        textAnchor="middle"
        fontSize="11"
        fontWeight="800"
      >
        ₹5,600
      </text>
      {/* Tooltip Text: Date */}
      <text
        x={x + width / 2}
        y={y - 18}
        fill="#94A3B8"
        textAnchor="middle"
        fontSize="9"
        fontWeight="500"
      >
        Fri, Sep 26
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs shadow-lg">
        <p className="font-extrabold text-teal-400">₹{item.earnings.toLocaleString()}</p>
        <p className="text-[10px] text-slate-300">{item.date}</p>
      </div>
    );
  }
  return null;
};

const ProviderEarningsChart = () => {
  const [range, setRange] = useState("This Week");

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-slate-800 text-base">Earnings Overview</h3>

        {/* Dropdown Filter */}
        <div className="relative">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer">
            <span>{range}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 25, right: 10, left: -15, bottom: 0 }}
            barSize={18}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
              dy={6}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 11 }}
              tickFormatter={(val) => (val === 0 ? "0" : `${val / 1000}K`)}
              domain={[0, 8000]}
              ticks={[0, 2000, 4000, 6000, 8000]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="earnings"
              radius={[6, 6, 0, 0]}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#00897B"
                  className="hover:opacity-85 transition-opacity cursor-pointer"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProviderEarningsChart;
