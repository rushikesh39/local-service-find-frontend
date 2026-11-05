// src/pages/Unauthorized.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldAlert, ArrowLeft, RefreshCw, Home, ShieldCheck } from "lucide-react";
import useRBAC from "@/features/dashboard/rbac/useRBAC";
import { ROLES, ROLE_METADATA } from "@/features/dashboard/rbac/roles";

const Unauthorized = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role, switchRole } = useRBAC();

  const handleSwitchToAdmin = () => {
    switchRole(ROLES.SUPER_ADMIN);
    navigate("/admin", { replace: true });
  };

  const currentRoleMeta = ROLE_METADATA[role] || { label: role };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl shadow-slate-200/50 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-red-100">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-red-100 text-red-700 mb-3">
          403 Access Forbidden
        </span>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          RBAC Access Denied
        </h1>

        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          Your current active role is{" "}
          <span className="font-semibold text-slate-800">
            {currentRoleMeta.label}
          </span>
          . You do not have the required permissions to view this section.
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left mb-6 text-xs text-slate-600 space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-400">Current Role:</span>
            <span className="font-medium text-slate-700 uppercase">{role}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Required Role:</span>
            <span className="font-semibold text-emerald-600">ADMIN / SUPER_ADMIN</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Attempted Route:</span>
            <span className="font-mono text-slate-700">{location.state?.from?.pathname || "/admin"}</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSwitchToAdmin}
            className="w-full flex items-center justify-center gap-2 bg-[#00897B] hover:bg-[#00796B] text-white font-medium py-3 px-4 rounded-xl shadow-md shadow-[#00897B]/20 transition-all cursor-pointer text-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            Switch to Super Admin (Demo Mode)
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-xl transition-all cursor-pointer text-sm"
          >
            <Home className="w-4 h-4 text-slate-500" />
            Return to Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
