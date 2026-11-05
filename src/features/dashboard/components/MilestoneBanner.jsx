// src/features/dashboard/components/MilestoneBanner.jsx
import React from "react";
import { Crown, ShieldCheck, Lock, Star, Globe2 } from "lucide-react";

const MilestoneBanner = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-white rounded-2xl p-4 sm:p-5 border border-emerald-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Left Message */}
      <div className="flex items-center gap-3.5 w-full lg:w-auto">
        <div className="w-11 h-11 rounded-xl bg-[#00897B] text-white flex items-center justify-center shadow-md shadow-[#00897B]/20 shrink-0">
          <Crown className="w-6 h-6 stroke-[2]" />
        </div>
        <div>
          <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
            Locafy is growing!
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            More users. More services. A better community.
          </p>
        </div>
      </div>

      {/* Right Value Proposition Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full lg:w-auto">
        {/* Item 1 */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-800 leading-tight">
              Trusted Professionals
            </span>
            <span className="text-[11px] text-slate-500">
              1,542 verified providers
            </span>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-100/70 text-teal-700 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-800 leading-tight">
              Secure Payments
            </span>
            <span className="text-[11px] text-slate-500">
              100% safe & encrypted
            </span>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-700 flex items-center justify-center shrink-0">
            <Star className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-800 leading-tight">
              Happy Customers
            </span>
            <span className="text-[11px] text-slate-500">
              4.6 average rating
            </span>
          </div>
        </div>

        {/* Item 4 */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-100/70 text-cyan-700 flex items-center justify-center shrink-0">
            <Globe2 className="w-4 h-4 stroke-[2.2]" />
          </div>
          <div>
            <span className="block text-xs font-bold text-slate-800 leading-tight">
              Pan India Expansion
            </span>
            <span className="text-[11px] text-slate-500">
              Growing every day
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneBanner;
