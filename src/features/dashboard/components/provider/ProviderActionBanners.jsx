// src/features/dashboard/components/provider/ProviderActionBanners.jsx
import React from "react";
import { Link } from "react-router-dom";
import { BarChart3, Trophy, ArrowRight, ChevronRight } from "lucide-react";

const ProviderActionBanners = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Banner 1: Increase Your Bookings (Left, 8 cols) */}
      <div className="lg:col-span-8 bg-gradient-to-r from-[#E6F4F1] via-[#E8F8F5] to-emerald-50/70 border border-[#00897B]/20 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-[#00897B]/15 text-[#00897B] flex items-center justify-center shrink-0 border border-[#00897B]/25">
            <BarChart3 className="w-5 h-5 stroke-[2.3]" />
          </div>

          <div>
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
              Increase Your Bookings!
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5 leading-snug">
              Add more services, update your availability and maintain a high rating.
            </p>
          </div>
        </div>

        <Link
          to="/provider/services"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all shrink-0 cursor-pointer"
        >
          <span>Manage Services</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>

      {/* Banner 2: Top Rated Provider (Right, 4 cols) */}
      <div className="lg:col-span-4 bg-gradient-to-r from-amber-50/90 via-orange-50/60 to-amber-100/40 border border-amber-200/70 rounded-2xl p-5 flex items-center justify-between gap-3 shadow-xs hover:shadow-md transition-all cursor-pointer group">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/25">
            <Trophy className="w-5 h-5 stroke-[2.3]" />
          </div>

          <div>
            <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
              Top Rated Provider
            </h4>
            <p className="text-xs text-slate-500 font-medium mt-0.5 leading-snug">
              You are among top 10% providers in Pune. Keep it up!
            </p>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all shrink-0" />
      </div>
    </div>
  );
};

export default ProviderActionBanners;
