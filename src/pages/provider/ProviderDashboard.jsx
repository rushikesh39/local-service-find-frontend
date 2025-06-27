// src/pages/ProviderDashboard.jsx
import React from "react";
import { useSelector } from "react-redux";
import StatusCards from "./StatusCard";
import RequestTable from "./RequestTable";

const ProviderDashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Welcome back, {user?.name} 👋</h1>
      
      <StatusCards />
      <RequestTable />
    </div>
  );
};

export default ProviderDashboard;
