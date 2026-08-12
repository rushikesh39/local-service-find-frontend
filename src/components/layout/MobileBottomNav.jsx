import { NavLink, useLocation } from "react-router-dom";
import { Home, Calendar, Search, MessageSquare, User } from "lucide-react";

const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "Bookings", path: "/my-bookings", icon: Calendar },
    { label: "Search", path: "/services", icon: Search },
    { label: "Messages", path: "/messages", icon: MessageSquare },
    { label: "Profile", path: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/80 md:hidden shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around h-14 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.label}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full text-[11px] font-medium transition-colors ${
                isActive ? "text-[#00897B] font-semibold" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <div className="relative mb-0.5">
                <Icon className={`w-5 h-5 ${isActive ? "text-[#00897B] stroke-[2.5]" : "text-slate-500 stroke-[1.8]"}`} />
              </div>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileBottomNav;
