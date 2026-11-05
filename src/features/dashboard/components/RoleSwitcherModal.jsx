// src/features/dashboard/components/RoleSwitcherModal.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Check, X, ShieldAlert, User, Briefcase, UserCheck } from "lucide-react";
import useRBAC from "../rbac/useRBAC";
import { ROLES, ROLE_METADATA } from "../rbac/roles";

const rolesList = [
  {
    id: ROLES.SUPER_ADMIN,
    name: "Super Admin",
    icon: Shield,
    badge: "Full Access",
    desc: "Unrestricted master access to all platform records, financial exports, settings, and role management.",
  },
  {
    id: ROLES.ADMIN,
    name: "Admin",
    icon: ShieldAlert,
    badge: "Operational Admin",
    desc: "Manage users, verify service providers, moderate reviews, manage bookings, and view platform analytics.",
  },
  {
    id: ROLES.PROVIDER,
    name: "Service Provider",
    icon: Briefcase,
    badge: "Provider View",
    desc: "Restricted to provider dashboard (/provider), managing assigned services, and handling booking requests.",
  },
  {
    id: ROLES.USER,
    name: "Customer / User",
    icon: User,
    badge: "Standard User",
    desc: "Restricted to customer booking history, searching services, and profile. Blocked from admin console.",
  },
];

const RoleSwitcherModal = ({ isOpen, onClose }) => {
  const { role, switchRole, permissions } = useRBAC();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fade-in-down">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-[#00897B] flex items-center justify-center">
              <Shield className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                RBAC Role Switcher & Inspector
              </h3>
              <p className="text-xs text-slate-500">
                Simulate different platform roles to test access control
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Roles List */}
        <div className="space-y-2.5 py-4">
          {rolesList.map((item) => {
            const isSelected = role === item.id;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                onClick={() => {
                  switchRole(item.id);
                  if (item.id === ROLES.PROVIDER) {
                    navigate("/provider");
                  } else if (item.id === ROLES.ADMIN || item.id === ROLES.SUPER_ADMIN) {
                    navigate("/admin");
                  }
                  onClose();
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                  isSelected
                    ? "border-[#00897B] bg-[#E6F4F1]/30 ring-2 ring-[#00897B]/20"
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? "bg-[#00897B] text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    <Icon className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-sm text-slate-900">
                        {item.name}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-1">
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#00897B] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active permissions summary */}
        <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1.5">
            <span className="font-semibold text-slate-700">
              Active Permissions Count:
            </span>
            <span className="font-bold text-[#00897B]">
              {permissions.length} Granted
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Backend will always enforce API-level protection; this frontend simulation verifies UI permission gates and protected route guards.
          </p>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSwitcherModal;
