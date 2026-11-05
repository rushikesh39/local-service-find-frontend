// src/features/dashboard/components/RevenueOverviewChart.jsx
import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ChevronDown } from "lucide-react";

// Revenue growth data matching screenshot progression
const revenueData = [
  { day: "Sep 1", amount: 25000, label: "25k" },
  { day: "Sep 5", amount: 48000, label: "48k" },
  { day: "Sep 10", amount: 62000, label: "62k" },
  { day: "Sep 13", amount: 60000, label: "60k" },
  { day: "Sep 16", amount: 95000, label: "95k" },
  { day: "Sep 19", amount: 92000, label: "92k" },
  { day: "Sep 22", amount: 115000, label: "115k" },
  { day: "Sep 25", amount: 128000, label: "128k" },
  { day: "Sep 28", amount: 145000, label: "145k" },
  { day: "Sep 30", amount: 182000, label: "182k" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        <p className="text-emerald-400 font-bold mt-0.5">
          ₹{payload[0].value.toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
};

const RevenueOverviewChart = () => {
  const [range, setRange] = useState("Last 30 Days");

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-base">Revenue Overview</h3>
        </div>

        <div className="relative">
          <button className="flex items-center gap-1.5 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 border border-slate-200/70 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">
            <span>{range}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00897B" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#00897B" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              domain={[0, 200000]}
              ticks={[0, 50000, 100000, 150000, 200000]}
              tickFormatter={(v) => (v === 0 ? "0" : `${v / 1000}K`)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#00897B"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#revenueGradient)"
              dot={{ r: 4, fill: "#00897B", stroke: "#FFFFFF", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "#00897B", stroke: "#FFFFFF", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueOverviewChart;
