// src/features/dashboard/components/provider/ProviderUpcomingBookings.jsx
import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const upcomingList = [
  {
    id: 1,
    time: "10:00 AM - 12:00 PM",
    status: "Confirmed",
    statusBadge: "bg-emerald-50 text-emerald-700 border-emerald-200/70",
    dotColor: "bg-emerald-500",
    service: "AC Service",
    customer: "Amit Patil",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    location: "Kothrud, Pune",
  },
  {
    id: 2,
    time: "01:00 PM - 03:00 PM",
    status: "In Progress",
    statusBadge: "bg-amber-50 text-amber-700 border-amber-200/70",
    dotColor: "bg-blue-500",
    service: "AC Installation",
    customer: "Priya Desai",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    location: "Hinjewadi, Pune",
  },
  {
    id: 3,
    time: "04:00 PM - 06:00 PM",
    status: "Scheduled",
    statusBadge: "bg-blue-50 text-blue-700 border-blue-200/70",
    dotColor: "bg-teal-500",
    service: "AC Repair",
    customer: "Rohit Kulkarni",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    location: "Wakad, Pune",
  },
];

const ProviderUpcomingBookings = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-base">Upcoming Bookings</h3>
        <Link
          to="/provider/bookings"
          className="text-xs font-semibold text-[#00897B] hover:text-[#00796B] hover:underline cursor-pointer"
        >
          View All
        </Link>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {upcomingList.map((item, index) => (
          <div key={item.id} className="relative flex items-start gap-3">
            {/* Timeline bullet & vertical connector line */}
            <div className="flex flex-col items-center self-stretch">
              <span
                className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${item.dotColor}`}
              />
              {index < upcomingList.length - 1 && (
                <div className="w-[1.5px] bg-slate-100 flex-1 my-1" />
              )}
            </div>

            {/* Content card */}
            <div className="flex-1 pb-1">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="text-xs font-semibold text-slate-700">
                  {item.time}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${item.statusBadge}`}
                >
                  {item.status}
                </span>
              </div>

              <div className="flex items-center gap-3 bg-slate-50/70 rounded-xl p-2.5 border border-slate-100/80">
                <img
                  src={item.avatar}
                  alt={item.customer}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {item.service}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {item.customer}
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProviderUpcomingBookings;
