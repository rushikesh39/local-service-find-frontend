// src/features/dashboard/components/AdminSidebar.jsx
import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Wrench,
  Calendar,
  CreditCard,
  Star,
  Tag,
  LayoutTemplate,
  BarChart3,
  Settings,
  LogOut,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import logoutService from "@/features/auth/services/logoutService";
import { clearUser } from "@/store/userSlice";
import Swal from "sweetalert2";

const navItems = [
  { name: "Dashboard", path: "/provider", permission: "dashboard:provider", icon: LayoutDashboard, exact: true },
  { name: "Admin Dashboard", path: "/admin", permission: "dashboard:admin", icon: LayoutDashboard, exact: true },
  { name: "Dashboard", path: "/super-admin", permission: "dashboard:super_admin", icon: LayoutDashboard, exact: true },
  { name: "Users", path: "/admin/users", icon: Users },
  { name: "Providers", path: "/admin/providers", icon: UserCheck },
  { name: "Services", path: "/admin/services", icon: Wrench },
  { name: "Bookings", path: "/admin/bookings", icon: Calendar },
  { name: "Payments", path: "/admin/payments", icon: CreditCard },
  { name: "Reviews", path: "/admin/reviews", icon: Star },
  { name: "Offers & Deals", path: "/admin/offers", icon: Tag },
  { name: "CMS", path: "/admin/cms", icon: LayoutTemplate },
  { name: "Reports", path: "/admin/reports", icon: BarChart3 },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector(state => state.auth)
  const permissions = user?.permissions || []

  const handleLogout = async () => {
    try {
      await logoutService();
      dispatch(clearUser());
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/login");
    } catch {
      dispatch(clearUser());
      navigate("/login");
    }
  };

  const isActiveRoute = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  const visibleNavItems = navItems.filter((item) =>
    permissions.includes(item.permission)
  );

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col justify-between p-5 select-none shrink-0 shadow-[2px_0_12px_-4px_rgba(0,0,0,0.02)]">
      <div>
        {/* Logo and Admin Badge Header */}
        <div className="flex items-center gap-2.5 pb-6 mb-2 border-b border-slate-100/80">
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-full bg-[#00897B] text-white flex items-center justify-center shadow-sm shadow-[#00897B]/30 group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4 text-white fill-white/20 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0F172A] group-hover:text-[#00897B] transition-colors">
              Locafy
            </span>
          </div>

          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#E6F4F1] text-[#00897B] border border-[#00897B]/20">
            Admin
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const active = isActiveRoute(item);

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.exact}
                onClick={() => setMobileOpen && setMobileOpen(false)}
                className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${active
                  ? "bg-[#E6F4F1] text-[#00897B] font-bold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                {/* Active Indicator Bar on Left */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#00897B] rounded-r-full" />
                )}

                <Icon
                  className={`w-4 h-4 transition-colors ${active ? "text-[#00897B] stroke-[2.4]" : "text-slate-400 group-hover:text-slate-600 stroke-[2]"
                    }`}
                />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Promo Card & Logout */}
      <div className="pt-6 space-y-4">
        {/* Keep Services Everywhere Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E6F4F1] via-[#e2f3ef] to-teal-100/60 p-4 border border-[#00897B]/15">
          <div className="flex items-start justify-between">
            <div className="max-w-[130px]">
              <h5 className="text-xs font-bold text-slate-900 leading-tight">
                Keep Services Everywhere
              </h5>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                More people.
                <br />
                More opportunities.
              </p>
            </div>

            {/* Technician Illustration / Avatar */}
            <div className="w-12 h-12 rounded-xl bg-[#00897B]/10 flex items-center justify-center shrink-0 border border-[#00897B]/20">
              <span className="text-2xl">👷‍♂️</span>
            </div>
          </div>
        </div>

        {/* View Public Website */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-between px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-[#00897B] hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-slate-400" />
            <span>Customer View</span>
          </div>
        </button>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-600 stroke-[2]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
