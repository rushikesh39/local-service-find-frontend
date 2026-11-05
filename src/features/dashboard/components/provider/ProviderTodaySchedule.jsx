// src/features/dashboard/components/provider/ProviderTodaySchedule.jsx
import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const scheduleItems = [
  {
    id: 1,
    time: "10:00 AM",
    title: "AC Service",
    location: "Kothrud, Pune",
    dotColor: "bg-emerald-500",
  },
  {
    id: 2,
    time: "01:00 PM",
    title: "AC Installation",
    location: "Hinjewadi, Pune",
    dotColor: "bg-blue-500",
  },
  {
    id: 3,
    time: "04:00 PM",
    title: "AC Repair",
    location: "Wakad, Pune",
    dotColor: "bg-amber-500",
  },
];

const ProviderTodaySchedule = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-sm">Today's Schedule</h3>
        <Link
          to="/provider/bookings"
          className="text-xs font-semibold text-[#00897B] hover:text-[#00796B] hover:underline cursor-pointer"
        >
          View All
        </Link>
      </div>

      {/* Schedule Items with dots */}
      <div className="space-y-3.5">
        {scheduleItems.map((item, index) => (
          <div key={item.id} className="flex items-start gap-3">
            {/* Colored dot with vertical connector */}
            <div className="flex flex-col items-center self-stretch">
              <span
                className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${item.dotColor}`}
              />
              {index < scheduleItems.length - 1 && (
                <div className="w-[1.5px] bg-slate-100 flex-1 my-1" />
              )}
            </div>

            {/* Time & Service info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-bold text-slate-800">
                  {item.time}
                </span>
                <span className="text-xs font-bold text-slate-700 truncate">
                  {item.title}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="truncate">{item.location}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderTodaySchedule;
