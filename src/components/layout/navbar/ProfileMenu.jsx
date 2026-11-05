import {
  ChevronDown,
  Calendar,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logoutService from "@/features/auth/services/logoutService";
import { clearUser } from "@/store/userSlice";
import Swal from "sweetalert2";


function ProfileMenu() {
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await logoutService()
      dispatch(clearUser())
      setIsProfileOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message;

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: errorMessage,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };
  if (loading) {
    console.log("inside loading")
    return (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-slate-200 animate-pulse" />
        <div className="hidden sm:block w-20 h-4 rounded bg-slate-200 animate-pulse" />
      </div>
    );
  }

  return (
    <>
      {user?.name ?
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-slate-200 hover:border-[#00897B]/40 hover:bg-slate-50 transition-all select-none cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00897B] to-[#00a884] text-white flex items-center justify-center font-bold text-xs shadow-xs overflow-hidden">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs lg:text-sm font-semibold text-slate-800 max-w-[100px] truncate">
              {user?.name.split(" ")[0]}
            </span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""
                }`}
            />
          </button>

          {/* Logged In Profile Menu Card (Design Spec #9) */}
          {isProfileOpen && (
            <div className="absolute right-0 top-full mt-3 w-64 rounded-2xl bg-white p-3 shadow-xl border border-slate-100 z-50 animate-fade-in-down">
              {/* User Info Header */}
              <div className="flex items-center gap-3 p-2.5 bg-slate-50 rounded-xl mb-2">
                <div className="w-10 h-10 rounded-full bg-[#00897B] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs lg:text-sm text-slate-900 truncate">
                    {user?.name}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/profile");
                    }}
                    className="text-[11px] text-[#00897B] hover:underline font-medium block cursor-pointer"
                  >
                    View Profile
                  </button>
                </div>
              </div>

              <div className="my-1 border-t border-slate-100"></div>

              {/* Admin Dashboard Link for Admins */}
              {user?.permissions?.includes("dashboard:super_admin") && (
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/super-admin");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs lg:text-sm font-semibold text-[#00897B] hover:bg-[#E6F4F1] rounded-lg transition-colors text-left cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00897B]" />
                  <span>Super Admin Dashboard</span>
                </button>
              )}

              {user?.permissions?.includes("dashboard:admin") && (
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/admin");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs lg:text-sm font-semibold text-[#00897B] hover:bg-[#E6F4F1] rounded-lg transition-colors text-left cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00897B]" />
                  <span>Admin Dashboard</span>
                </button>
              )}

              {user?.permissions?.includes("dashboard:provider") && (
                <button
                  type="button"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/provider");
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 text-xs lg:text-sm font-semibold text-[#00897B] hover:bg-[#E6F4F1] rounded-lg transition-colors text-left cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00897B]" />
                  <span>Provider Dashboard</span>
                </button>
              )}

              {/* Menu links */}
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/my-bookings");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>My Bookings</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/wishlist");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <Heart className="w-4 h-4 text-slate-500" />
                <span>Wishlist</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/addresses");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>Addresses</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/payments");
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-slate-500" />
                <span>Payments</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/notifications");
                }}
                className="w-full flex items-center justify-between px-3 py-2 text-xs lg:text-sm font-medium text-slate-700 hover:bg-[#E6F4F1]/60 hover:text-[#00897B] rounded-lg transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-4 h-4 text-slate-500" />
                  <span>Notifications</span>
                </div>
                <span className="w-5 h-5 rounded-full bg-[#00897B] text-white text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </button>

              <div className="my-1 border-t border-slate-100"></div>

              {/* Logout Option */}
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs lg:text-sm font-semibold text-red-500 hover:bg-red-50 rounded-lg transition-colors text-left cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
        :
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-xs lg:text-sm font-semibold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50 hover:text-[#00897B] hover:border-[#00897B]/40 transition-all select-none cursor-pointer"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="px-4 py-2 text-xs lg:text-sm font-semibold text-white bg-[#00897B] hover:bg-[#00796B] active:scale-95 rounded-xl shadow-xs transition-all select-none cursor-pointer"
          >
            Register
          </button>
        </div>
      }
    </>
  );

};

export default ProfileMenu;
