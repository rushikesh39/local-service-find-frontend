import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RequestTable from "./RequestTable";
import MetricCard from "./MetricCard";
import { dashboardStats } from "../../api/auth";

const ProviderDashboard = () => {
  const { user } = useSelector((state) => state.user);

  const [stats, setStats] = useState({
    today: {
      sales: 0,
      bookings: 0,
      pending: 0,
      completed: 0,
    },
    total: {
      sales: 0,
      bookings: 0,
      pending: 0,
      completed: 0,
    },
    topServices: [],
  });

  const loadStats = async () => {
    try {
      const res = await dashboardStats();
      setStats(res);
    } catch (err) {
      console.error("Error loading dashboard stats", err);
    }
  };

  useEffect(() => {
    if (user) loadStats();
  }, [user]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome back, {user?.name} 👋
      </h1>

      {/* ===== Today's Stats ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Today's Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Today's Sales"
            value={`₹${stats.today.sales}`}
            icon="DollarSign"
            color="bg-blue-100"
          />
          <MetricCard
            title="Today's Bookings"
            value={stats.today.bookings}
            icon="CalendarCheck"
            color="bg-green-100"
          />
          <MetricCard
            title="Today's Pending"
            value={stats.today.pending}
            icon="Clock"
            color="bg-yellow-100"
          />
          <MetricCard
            title="Today's Completed"
            value={stats.today.completed}
            icon="CheckCircle2"
            color="bg-emerald-100"
          />
        </div>
      </div>

      {/* ===== Total Stats ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overall Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Sales"
            value={`₹${stats.total.sales}`}
            icon="DollarSign"
            color="bg-blue-200"
          />
          <MetricCard
            title="Total Bookings"
            value={stats.total.bookings}
            icon="ListChecks"
            color="bg-purple-100"
          />
          <MetricCard
            title="Total Pending"
            value={stats.total.pending}
            icon="Clock"
            color="bg-yellow-200"
          />
          <MetricCard
            title="Total Completed"
            value={stats.total.completed}
            icon="CheckCircle2"
            color="bg-green-200"
          />
        </div>
      </div>

      {/* ===== Top Services Section ===== */}
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

      {/* ===== Recent Requests Table Section ===== */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recent Requests</h2>
        <RequestTable />
      </div>
    </div>
  );
};

export default ProviderDashboard;
