// src/features/dashboard/components/ServiceBookingsDonut.jsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const serviceData = [
  { name: "AC Repair", value: 28, count: 1370, color: "#00897B" },
  { name: "Plumbing", value: 20, count: 978, color: "#047857" },
  { name: "Electrical", value: 16, count: 783, color: "#06B6D4" },
  { name: "Cleaning", value: 14, count: 685, color: "#3B82F6" },
  { name: "Painting", value: 10, count: 489, color: "#8B5CF6" },
  { name: "Carpentry", value: 8, count: 391, color: "#F59E0B" },
  { name: "Others", value: 4, count: 196, color: "#94A3B8" },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-semibold">{data.name}</p>
        <p className="text-teal-300 font-medium">
          {data.value}% ({data.count.toLocaleString()} bookings)
        </p>
      </div>
    );
  }
  return null;
};

const ServiceBookingsDonut = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-slate-800 text-base">Service Bookings</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
        {/* Donut Chart with Centered Metric */}
        <div className="sm:col-span-6 relative h-52 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Centered Total Numbers */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-slate-900 leading-tight">
              4,892
            </span>
            <span className="text-[11px] font-medium text-slate-400">
              Bookings
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="sm:col-span-6 space-y-1.5 pl-2">
          {serviceData.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs py-0.5"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 font-medium truncate max-w-[90px]">
                  {item.name}
                </span>
              </div>
              <span className="font-semibold text-slate-800">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingsDonut;
