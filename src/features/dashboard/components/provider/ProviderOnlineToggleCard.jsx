// src/features/dashboard/components/provider/ProviderOnlineToggleCard.jsx
import React, { useState } from "react";

const ProviderOnlineToggleCard = () => {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="bg-[#E6F4F1]/70 border border-[#00897B]/20 rounded-2xl p-4 flex items-center justify-between gap-3 shadow-2xs">
      <div>
        <h4 className="text-xs font-bold text-slate-900 leading-tight">
          {isOnline ? "You are Online" : "You are Offline"}
        </h4>
        <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
          {isOnline
            ? "Receive new booking requests"
            : "No requests will be assigned"}
        </p>
      </div>

      {/* Interactive Toggle Switch */}
      <button
        type="button"
        role="switch"
        aria-checked={isOnline}
        onClick={() => setIsOnline(!isOnline)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          isOnline ? "bg-[#00897B]" : "bg-slate-300"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
            isOnline ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default ProviderOnlineToggleCard;
