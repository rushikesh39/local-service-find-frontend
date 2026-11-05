// src/features/dashboard/components/provider/ProviderBookingsStatusDonut.jsx
import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Completed", value: 68, percentage: "55%", color: "#10B981" },
  { name: "Confirmed", value: 22, percentage: "18%", color: "#06B6D4" },
  { name: "Pending", value: 18, percentage: "15%", color: "#F59E0B" },
  { name: "Cancelled", value: 8, percentage: "6%", color: "#EF4444" },
  { name: "Rescheduled", value: 8, percentage: "6%", color: "#64748B" },
];

const totalBookings = data.reduce((acc, curr) => acc + curr.value, 0);

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs shadow-lg">
        <p className="font-bold flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full inline-block"
            style={{ backgroundColor: item.color }}
          />
          {item.name}: {item.value} ({item.percentage})
        </p>
      </div>
    );
  }
  return null;
};

const ProviderBookingsStatusDonut = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <h3 className="font-bold text-slate-800 text-base mb-2">Bookings Status</h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Donut Chart with Center Text */}
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 shrink-0 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<CustomTooltip />} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center Callout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-black text-slate-900 leading-none">
              {totalBookings}
            </span>
            <span className="text-xs font-semibold text-slate-400 mt-0.5">
              Total
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="w-full space-y-2.5">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-600">{item.name}</span>
              </div>

              <div className="font-semibold text-slate-800">
                <span>{item.value}</span>
                <span className="text-slate-400 font-normal ml-1">
                  ({item.percentage})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProviderBookingsStatusDonut;
