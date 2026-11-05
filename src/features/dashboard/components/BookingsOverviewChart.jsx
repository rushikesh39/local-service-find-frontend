// src/features/dashboard/components/BookingsOverviewChart.jsx
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ChevronDown } from "lucide-react";

// 30 days data matching the visual in the screenshot
const bookingsData = [
  { day: "Sep 1", bookings: 160 },
  { day: "Sep 3", bookings: 130 },
  { day: "Sep 5", bookings: 140 },
  { day: "Sep 7", bookings: 175 },
  { day: "Sep 9", bookings: 180 },
  { day: "Sep 11", bookings: 195 },
  { day: "Sep 13", bookings: 210 },
  { day: "Sep 15", bookings: 220 },
  { day: "Sep 17", bookings: 200 },
  { day: "Sep 19", bookings: 245 },
  { day: "Sep 20", bookings: 290 },
  { day: "Sep 22", bookings: 260 },
  { day: "Sep 24", bookings: 310 },
  { day: "Sep 25", bookings: 330 },
  { day: "Sep 27", bookings: 290 },
  { day: "Sep 28", bookings: 350 },
  { day: "Sep 29", bookings: 320 },
  { day: "Sep 30", bookings: 345 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold">{label}</p>
        <p className="text-teal-300 font-bold mt-0.5">
          {payload[0].value} Bookings
        </p>
      </div>
    );
  }
  return null;
};

const BookingsOverviewChart = () => {
  const [range, setRange] = useState("Last 30 Days");

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-base">Bookings Overview</h3>
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
          <BarChart data={bookingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              interval={3}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94A3B8", fontSize: 10 }}
              domain={[0, 400]}
              ticks={[0, 100, 200, 300, 400]}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F8FAFC" }} />
            <Bar
              dataKey="bookings"
              fill="#2DD4BF"
              radius={[4, 4, 0, 0]}
              className="hover:opacity-85 transition-opacity"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingsOverviewChart;
