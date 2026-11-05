// src/features/dashboard/components/UsersByLocationMap.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

const locations = [
  { name: "Hinjawadi", x: 18, y: 35, users: "2,450", providers: "310" },
  { name: "Aundh", x: 40, y: 24, users: "1,820", providers: "220" },
  { name: "Bundh", x: 46, y: 40, users: "1,120", providers: "140" },
  { name: "Kothrud", x: 30, y: 62, users: "2,150", providers: "270" },
  { name: "Pune Central", x: 52, y: 55, users: "3,890", providers: "490", isPrimary: true },
  { name: "Hadapsar", x: 74, y: 68, users: "1,640", providers: "190" },
  { name: "Kharadi", x: 76, y: 42, users: "1,980", providers: "245" },
  { name: "Wagholi", x: 84, y: 28, users: "1,290", providers: "167" },
];

const UsersByLocationMap = () => {
  const [activeLoc, setActiveLoc] = useState(null);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-slate-800 text-base">Users by Location</h3>
        <Link
          to="/admin/users"
          className="text-xs font-semibold text-[#00897B] hover:text-[#00796B] hover:underline"
        >
          View All
        </Link>
      </div>

      {/* Styled Pune Vector Map Visual */}
      <div className="relative w-full h-52 bg-slate-50/80 rounded-xl overflow-hidden border border-slate-100/90 shadow-inner flex items-center justify-center">
        {/* Soft Background Grid & Roads Pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mapGrid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="#CBD5E1"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mapGrid)" />
          {/* Stylized River and Arterial Roads */}
          <path
            d="M 10 90 Q 60 70 120 85 T 220 90 T 320 60"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M 20 20 L 150 110 L 300 130"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="2.5"
          />
          <path
            d="M 80 180 L 180 80 L 280 40"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="2.5"
          />
        </svg>

        {/* City Label Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-3 pointer-events-none">
          <span className="text-xl font-extrabold text-slate-700 tracking-wider uppercase opacity-40">
            Pune
          </span>
        </div>

        {/* Location Markers */}
        {locations.map((loc) => (
          <div
            key={loc.name}
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            onMouseEnter={() => setActiveLoc(loc)}
            onMouseLeave={() => setActiveLoc(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          >
            {/* Ping animation on primary marker */}
            {loc.isPrimary && (
              <span className="absolute -inset-1 rounded-full bg-[#00897B] opacity-50 animate-ping" />
            )}

            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-125 ${
                loc.isPrimary
                  ? "bg-[#00897B] text-white ring-4 ring-[#00897B]/20"
                  : "bg-teal-600 text-white hover:bg-[#00897B]"
              }`}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>

            {/* Label below dot */}
            <span
              className={`absolute top-4 left-1/2 -translate-x-1/2 text-[9px] font-semibold whitespace-nowrap transition-colors ${
                loc.isPrimary
                  ? "text-[#00897B] font-bold"
                  : "text-slate-600 group-hover:text-slate-900"
              }`}
            >
              {loc.name}
            </span>

            {/* Tooltip on Hover */}
            {activeLoc?.name === loc.name && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-slate-900 text-white text-[10px] py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap">
                <p className="font-bold text-teal-300">{loc.name}</p>
                <p>Users: {loc.users}</p>
                <p>Providers: {loc.providers}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Summary Metrics */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 text-center pt-3 mt-1 border-t border-slate-100">
        <div>
          <span className="block text-sm font-bold text-slate-900">12,345</span>
          <span className="text-[10px] text-slate-400 font-medium">Total Users</span>
        </div>
        <div>
          <span className="block text-sm font-bold text-slate-900">1,542</span>
          <span className="text-[10px] text-slate-400 font-medium">Providers</span>
        </div>
        <div>
          <span className="block text-sm font-bold text-slate-900">8,420</span>
          <span className="text-[10px] text-slate-400 font-medium">Active Users</span>
        </div>
      </div>
    </div>
  );
};

export default UsersByLocationMap;
