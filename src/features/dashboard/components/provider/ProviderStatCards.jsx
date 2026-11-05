// src/features/dashboard/components/provider/ProviderStatCards.jsx
import React from "react";
import { Calendar, IndianRupee, Users, Star } from "lucide-react";

const stats = [
  {
    id: "today-bookings",
    title: "Today's Bookings",
    value: "4",
    change: "33%",
    isPositive: true,
    subtitle: "2 completed, 2 upcoming",
    icon: Calendar,
    iconBg: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "today-earnings",
    title: "Today's Earnings",
    value: "₹2,800",
    change: "20%",
    isPositive: true,
    subtitle: "From 4 bookings",
    icon: IndianRupee,
    iconBg: "bg-purple-50 text-purple-600",
  },
  {
    id: "total-bookings",
    title: "Total Bookings",
    value: "124",
    change: "12%",
    isPositive: true,
    subtitle: "This month",
    icon: Users,
    iconBg: "bg-blue-50 text-blue-600",
  },
  {
    id: "average-rating",
    title: "Average Rating",
    value: "4.8",
    subtitle: "Based on 48 reviews",
    icon: Star,
    iconBg: "bg-amber-50 text-amber-500",
  },
];

const ProviderStatCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow relative overflow-hidden"
          >
            {/* Header: Icon + Category Title */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>

              <span className="text-xs font-semibold text-slate-500">
                {stat.title}
              </span>
            </div>

            {/* Value & Change Tag */}
            <div className="flex items-baseline gap-2.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {stat.value}
              </span>

              {stat.change && (
                <span className="inline-flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ↑ {stat.change}
                </span>
              )}
            </div>

            {/* Subtitle */}
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              {stat.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ProviderStatCards;
