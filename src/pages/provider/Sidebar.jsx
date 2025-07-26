// src/components/provider/Sidebar.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { Home, Briefcase, CalendarCheck2, User } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/provider", icon: <Home size={18} /> },
    { name: "My Services", path: "/provider/services", icon: <Briefcase size={18} /> },
    { name: "Bookings", path: "/provider/bookings", icon: <CalendarCheck2 size={18} /> },
    { name: "Profile", path: "/provider/profile", icon: <User size={18} /> },
  ];

  return (
    <aside className="w-64 min-h-screen bg-gradient-to-b from-slate-900 to-gray-800 text-white shadow-lg p-6">
      <ul className="space-y-4">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition duration-300
                ${isActive ? "bg-yellow-500 text-black" : "hover:bg-yellow-400 hover:text-black"}
              `}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
