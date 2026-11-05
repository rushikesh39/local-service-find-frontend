// src/features/dashboard/components/StatCard.jsx
import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const StatCard = ({
  icon: Icon,
  iconBg = "bg-emerald-50 text-emerald-600",
  value,
  change,
  isPositive = true,
  title,
  subtitle,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${iconBg}`}
        >
          {Icon && <Icon className="w-5 h-5 stroke-[2.2]" />}
        </div>

        {change && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            }`}
          >
            {isPositive ? (
              <span className="text-[10px]">▲</span>
            ) : (
              <span className="text-[10px]">▼</span>
            )}
            <span>{change}</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
          {value}
        </h3>
        <p className="text-xs font-medium text-slate-500 mb-0.5">{title}</p>
        <p className="text-[11px] text-slate-400 font-normal">{subtitle}</p>
      </div>
    </div>
  );
};

export default StatCard;
