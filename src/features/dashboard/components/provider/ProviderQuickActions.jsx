// src/features/dashboard/components/provider/ProviderQuickActions.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Plus, Settings, Calendar, User } from "lucide-react";

const actions = [
  {
    title: "Add Service",
    path: "/provider/services/add",
    icon: Plus,
    iconBg: "bg-emerald-500 text-white",
  },
  {
    title: "Manage Services",
    path: "/provider/services",
    icon: Settings,
    iconBg: "bg-slate-100 text-slate-700",
  },
  {
    title: "View Calendar",
    path: "/provider/bookings",
    icon: Calendar,
    iconBg: "bg-slate-100 text-slate-700",
  },
  {
    title: "Edit Profile",
    path: "/provider/profile",
    icon: User,
    iconBg: "bg-slate-100 text-slate-700",
  },
];

const ProviderQuickActions = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)]">
      <h3 className="font-bold text-slate-800 text-sm mb-3">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;

          return (
            <Link
              key={act.title}
              to={act.path}
              className="p-3.5 rounded-xl border border-slate-100 hover:border-teal-200/60 hover:bg-teal-50/20 flex flex-col items-center justify-center text-center transition-all cursor-pointer group"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 shadow-2xs group-hover:scale-105 transition-transform ${act.iconBg}`}
              >
                <Icon className="w-4 h-4 stroke-[2.4]" />
              </div>

              <span className="text-xs font-bold text-slate-700 group-hover:text-[#00897B] transition-colors leading-tight">
                {act.title}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProviderQuickActions;
