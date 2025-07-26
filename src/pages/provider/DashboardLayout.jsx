// src/pages/provider/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Hide Sidebar on screens smaller than lg (i.e., <1024px) */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 bg-gray-100">
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
