// src/features/dashboard/components/provider/ProviderProfileCard.jsx
import React from "react";
import { Star, ShieldCheck, Edit3 } from "lucide-react";
import { Link } from "react-router-dom";

const ProviderProfileCard = () => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.04)] text-center relative">
      {/* Avatar Container with Online Indicator */}
      <div className="relative inline-block mx-auto mb-3">
        <div className="w-20 h-20 rounded-full bg-[#00897B]/10 p-1 border-2 border-emerald-500/30">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80"
            alt="Ramesh Kumar"
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        {/* Online Status Dot */}
        <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
      </div>

      {/* Name & Edit Icon */}
      <div className="flex items-center justify-center gap-1.5">
        <h3 className="font-extrabold text-slate-900 text-base">
          Ramesh Kumar
        </h3>
        <Link
          to="/provider/profile"
          className="text-slate-400 hover:text-[#00897B] transition-colors p-0.5 cursor-pointer"
          title="Edit Profile"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Trade / Title */}
      <p className="text-xs font-semibold text-slate-500 mt-0.5">
        AC Technician
      </p>

      {/* Star Rating & Review Count */}
      <div className="flex items-center justify-center gap-1.5 mt-2 text-xs font-bold text-slate-800">
        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span>4.8</span>
        <span className="text-slate-400 font-medium">(48 reviews)</span>
      </div>

      {/* Verified Provider Badge */}
      <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E6F4F1] text-[#00897B] text-[11px] font-bold border border-[#00897B]/20">
        <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
        <span>Verified Provider</span>
      </div>
    </div>
  );
};

export default ProviderProfileCard;
