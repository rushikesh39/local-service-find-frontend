// src/components/provider/Sidebar.jsx
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Dashboard Home", path: "/provider" },
    { name: "My Services", path: "/provider/services" },
    { name: "Bookings", path: "/provider/bookings" },
    { name: "Profile", path: "/provider/profile" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white p-5">
      <h2 className="text-2xl font-semibold mb-6">Provider Panel</h2>
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.name}
            className="cursor-pointer hover:text-yellow-400"
            onClick={() => navigate(item.path)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
