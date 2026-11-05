// src/features/dashboard/components/AdminHeader.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Bell,
  Menu,
  ChevronDown,
  Shield,
  ShieldAlert,
  LogOut,
  Settings,
  User,
  CheckCircle2,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import logoutService from "@/features/auth/services/logoutService";
import { clearUser } from "@/store/userSlice";

const notifications = [
  {
    id: 1,
    title: "New Provider Application",
    desc: "Sunil Joshi registered as AC Technician",
    time: "5 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "Booking Completed",
    desc: "Sneha Patil's booking #12891 marked completed",
    time: "20 mins ago",
    unread: true,
  },
  {
    id: 3,
    title: "Payment Received",
    desc: "₹1,200 received via UPI for booking #12891",
    time: "1 hour ago",
    unread: true,
  },
];

const Header = ({ setMobileOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.user);

  const isProvider = location.pathname.startsWith("/provider");

  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutService();
      dispatch(clearUser());
      navigate("/login");
    } catch {
      dispatch(clearUser());
      navigate("/login");
    }
  };

  const meta = { label: "Admin", badgeClass: "bg-emerald-100 text-emerald-800" };

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder={
                isProvider
                  ? "Search bookings, customers, services..."
                  : "Search users, providers, bookings..."
              }
              className="w-full bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm text-slate-800 placeholder-slate-400 rounded-full pl-9 pr-4 py-2 border border-transparent focus:border-[#00897B]/40 focus:ring-2 focus:ring-[#00897B]/10 outline-none transition-all"
            />
          </div>
        </div>

        {/* Right Section: RBAC pill, Notifications, Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* RBAC Role Switcher Pill */}
          <button
            onClick={() => setShowRoleModal(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E6F4F1] hover:bg-[#d5eee7] text-[#00897B] border border-[#00897B]/20 transition-all cursor-pointer"
            title="Click to switch/inspect RBAC role"
          >
            <Shield className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">Role:</span>
            <span className="capitalize">{meta.label}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center border-2 border-white">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50 animate-fade-in-down">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <h4 className="font-bold text-xs text-slate-800">
                    Notifications (3)
                  </h4>
                  <button className="text-[11px] text-[#00897B] hover:underline font-medium">
                    Mark all read
                  </button>
                </div>

                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2 rounded-xl bg-slate-50 hover:bg-teal-50/50 transition-colors cursor-pointer text-xs"
                    >
                      <p className="font-semibold text-slate-800">{n.title}</p>
                      <p className="text-[11px] text-slate-500">{n.desc}</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Card / Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-50 cursor-pointer select-none transition-colors"
            >
              <img
                src={
                  isProvider
                    ? "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
                    : (reduxUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80")
                }
                alt={isProvider ? "Provider" : "Admin"}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border border-slate-200"
              />

              <div className="hidden md:block text-left pr-1">
                <span className="block text-xs font-bold text-slate-800 leading-tight">
                  {isProvider
                    ? (reduxUser?.role === "provider" && reduxUser?.name ? reduxUser.name : "Ramesh Kumar")
                    : (reduxUser?.name || "Admin")}
                </span>
                <span className="block text-[10px] text-slate-400 font-medium">
                  {isProvider ? "AC Technician" : meta.label}
                </span>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-fade-in-down text-xs">
                <div className="p-2 border-b border-slate-100 mb-1">
                  <p className="font-bold text-slate-800">
                    {reduxUser?.name || "Admin User"}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {reduxUser?.email || "admin@locafy.com"}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E6F4F1] text-[#00897B]">
                    {meta.label}
                  </span>
                </div>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowRoleModal(true);
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-[#E6F4F1] hover:text-[#00897B] rounded-xl font-medium transition-colors text-left"
                >
                  <Shield className="w-4 h-4 text-slate-400" />
                  <span>Switch Role (RBAC)</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate("/admin/settings");
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-700 hover:bg-[#E6F4F1] hover:text-[#00897B] rounded-xl font-medium transition-colors text-left"
                >
                  <Settings className="w-4 h-4 text-slate-400" />
                  <span>Admin Settings</span>
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-xl font-semibold transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

    </>
  );
};

export default Header;
