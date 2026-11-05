// src/features/dashboard/components/provider/ProviderHeroBanner.jsx
import React from "react";
import { Star, CheckCircle } from "lucide-react";

const ProviderHeroBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#F0FDF9] via-[#ECFDF5] to-[#F0F9FF] border border-teal-100/70 p-6 sm:p-7 shadow-xs">
      {/* Background Decorative Circles & Leaves */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-100/30 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute right-40 -top-12 w-48 h-48 bg-emerald-100/25 rounded-full blur-xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        {/* Left Welcome Copy */}
        <div className="max-w-lg">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight flex items-center gap-2">
            <span>Good Morning, Ramesh!</span>
            <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5 leading-relaxed">
            Here's what's happening with your services today.
          </p>
        </div>

        {/* Right Illustration with Floating Badges */}
        <div className="relative flex items-end justify-center md:justify-end shrink-0 self-center md:self-auto pr-2">
          {/* Floating Badge 1: Rating */}
          <div className="absolute -top-3 left-4 sm:-left-6 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-md border border-slate-100 flex items-center gap-1.5 z-20 transition-transform hover:scale-105">
            <div className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center">
              <CheckCircle className="w-2.5 h-2.5 stroke-[3]" />
            </div>
            <span className="text-xs font-extrabold text-slate-800">4.8</span>
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>

          {/* Floating Badge 2: Happy Customers */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-4 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-2xl shadow-md border border-slate-100 text-right z-20 transition-transform hover:scale-105">
            <span className="block text-xs font-black text-slate-900 leading-tight">125+</span>
            <span className="block text-[10px] font-semibold text-slate-400 leading-tight">Happy Customers</span>
          </div>

          {/* AC Unit & Leaves SVG Scene */}
          <div className="relative flex items-center justify-center">
            {/* Wall AC Unit Graphic */}
            <div className="hidden sm:block absolute -top-4 right-14 w-28 bg-white/90 border border-slate-200/90 rounded-md p-1.5 shadow-sm z-0">
              <div className="flex items-center justify-between pb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-slate-300" />
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full" />
              <div className="w-full h-0.5 bg-slate-200 mt-0.5 rounded-full" />
            </div>

            {/* Illustrated Technician Character SVG */}
            <svg
              className="w-36 h-28 sm:w-44 sm:h-32 object-contain"
              viewBox="0 0 200 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Plant leaves in background */}
              <path
                d="M170 120 C180 80, 160 50, 145 40 C145 65, 155 95, 170 120 Z"
                fill="#86EFAC"
                opacity="0.8"
              />
              <path
                d="M185 130 C195 95, 180 70, 165 55 C165 80, 172 105, 185 130 Z"
                fill="#4ADE80"
                opacity="0.7"
              />
              <path
                d="M150 140 C165 110, 150 85, 135 75 C135 98, 140 120, 150 140 Z"
                fill="#22C55E"
                opacity="0.6"
              />

              {/* Technician Body / Polo Shirt */}
              <ellipse cx="100" cy="165" rx="42" ry="32" fill="#00897B" />
              {/* Polo Collar */}
              <path d="M85 130 L100 144 L115 130 L108 126 L100 134 L92 126 Z" fill="#00695C" />
              {/* Placket */}
              <rect x="98" y="142" width="4" height="15" fill="#004D40" />

              {/* Neck */}
              <rect x="94" y="115" width="12" height="15" fill="#F8B195" rx="3" />

              {/* Head / Face */}
              <circle cx="100" cy="100" r="18" fill="#F8B195" />

              {/* Smile & Eyes */}
              <circle cx="95" cy="98" r="1.5" fill="#1E293B" />
              <circle cx="105" cy="98" r="1.5" fill="#1E293B" />
              <path
                d="M96 106 Q100 110 104 106"
                stroke="#1E293B"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Ears */}
              <circle cx="82" cy="100" r="3.5" fill="#F8B195" />
              <circle cx="118" cy="100" r="3.5" fill="#F8B195" />

              {/* Technician Cap (Emerald/Teal) */}
              <path
                d="M82 96 C82 82, 118 82, 118 96 Z"
                fill="#00897B"
              />
              {/* Cap Visor / Brim */}
              <path
                d="M80 96 C80 94, 116 94, 126 97 C122 100, 90 99, 80 96 Z"
                fill="#00695C"
              />

              {/* Wrench held by hand */}
              <g transform="translate(68, 92) rotate(-25)">
                {/* Wrench Handle */}
                <rect x="0" y="10" width="6" height="35" rx="3" fill="#64748B" />
                {/* Wrench Head */}
                <path
                  d="M -3 10 C -3 2, 9 2, 9 10 L 6 12 L 4 7 L 2 7 L 0 12 Z"
                  fill="#94A3B8"
                />
                {/* Hand gripping wrench */}
                <circle cx="3" cy="24" r="7" fill="#F8B195" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderHeroBanner;
