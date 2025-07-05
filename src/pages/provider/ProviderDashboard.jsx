// src/pages/ProviderDashboard.jsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RequestTable from "./RequestTable";
import MetricCard from "./MetricCard";
import { dashboardStats } from "../../api/auth"; 

const ProviderDashboard = () => {
  const { user } = useSelector((state) => state.user);
  const [stats, setStats] = useState({
    todaySales: 0,
    todayBookings: 0,
    totalBookings: 0,
    pendingRequests: 0,
    completedJobs: 0,
    topServices: [],
  });

  const loadStats = async () => {
  try {
    const res = await dashboardStats();
    console.log(res)
    setStats(res);
  } catch (err) {
    console.error("Error loading dashboard stats", err);
  }
};


  useEffect(() => {
    
      loadStats();
    
  }, [user]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome back, {user?.name} 👋
        </h1>
      {/* Welcome & Metric Cards Section */}
      <div className="bg-white rounded-xl shadow p-6">
        

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Today's Sales"
            value={`₹${stats.todaySales}`}
            icon="DollarSign"
            color="bg-blue-100"
          />
          <MetricCard
            title="Today's Bookings"
            value={stats.todayBookings}
            icon="CalendarCheck"
            color="bg-green-100"
          />
          <MetricCard
            title="Total Bookings"
            value={stats.totalBookings}
            icon="ListChecks"
            color="bg-purple-100"
          />
          <MetricCard
            title="Pending Requests"
            value={stats.pendingRequests}
            icon="Clock"
            color="bg-yellow-100"
          />
          <MetricCard
            title="Completed Jobs"
            value={stats.completedJobs}
            icon="CheckCircle2"
            color="bg-emerald-100"
          />
        </div>
      </div>

      {/* Top Services Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Top Services</h2>
        {stats.topServices.length > 0 ? (
          <ul className="space-y-2 list-disc pl-5 text-gray-600">
            {stats.topServices.map((service, index) => (
              <li key={index}>
                <span className="font-medium text-gray-800">{service.name}</span> – {service.count} bookings
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No top services data available.</p>
        )}
      </div>

      {/* Recent Requests Table Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recent Requests</h2>
        <RequestTable />
      </div>
    </div>
  );
};

export default ProviderDashboard;
