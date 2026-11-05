// src/features/dashboard/pages/AdminDashboard.jsx
import React, { useState } from "react";
import {
  Users,
  UserCheck,
  Calendar,
  IndianRupee,
  Star,
  CheckCircle2,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

// Components
import StatCard from "../components/StatCard";
import BookingsOverviewChart from "../components/BookingsOverviewChart";
import RevenueOverviewChart from "../components/RevenueOverviewChart";
import ServiceBookingsDonut from "../components/ServiceBookingsDonut";
import RecentBookingsTable from "../components/RecentBookingsTable";
import TopProvidersTable from "../components/TopProvidersTable";
import UsersByLocationMap from "../components/UsersByLocationMap";
import MilestoneBanner from "../components/MilestoneBanner";

const AdminDashboard = () => {
  const [selectedDateRange, setSelectedDateRange] = useState("Sep 1, 2025 - Sep 30, 2025");

  return (
    <div className="space-y-6">
      {/* Page Title & Date Range Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Welcome back! Here's what's happening with Locafy today.
          </p>
        </div>

        {/* Date Filter Pill Button */}
        <div>
          <button className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-semibold text-slate-700 shadow-xs transition-colors cursor-pointer">
            <CalendarDays className="w-4 h-4 text-slate-500" />
            <span>{selectedDateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>
        </div>
      </div>

      {/* 6 Metric Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Users */}
        <StatCard
          icon={Users}
          iconBg="bg-teal-50 text-teal-600"
          value="12,345"
          change="+12%"
          isPositive={true}
          title="Total Users"
          subtitle="+1,320 this month"
        />

        {/* Total Providers */}
        <StatCard
          icon={UserCheck}
          iconBg="bg-blue-50 text-blue-600"
          value="1,542"
          change="+8%"
          isPositive={true}
          title="Total Providers"
          subtitle="+114 this month"
        />

        {/* Total Bookings */}
        <StatCard
          icon={Calendar}
          iconBg="bg-amber-50 text-amber-600"
          value="4,892"
          change="+18%"
          isPositive={true}
          title="Total Bookings"
          subtitle="+742 this month"
        />

        {/* Total Revenue */}
        <StatCard
          icon={IndianRupee}
          iconBg="bg-purple-50 text-purple-600"
          value="₹12,48,560"
          change="+22%"
          isPositive={true}
          title="Total Revenue"
          subtitle="+2,24,000 this month"
        />

        {/* Average Rating */}
        <StatCard
          icon={Star}
          iconBg="bg-rose-50 text-rose-500"
          value="4.6"
          change="+0.2"
          isPositive={true}
          title="Average Rating"
          subtitle="Based on 2,480 reviews"
        />

        {/* Provider Approval */}
        <StatCard
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-600"
          value="98%"
          change="+4%"
          isPositive={true}
          title="Provider Approval"
          subtitle="1,512 of 1,542"
        />
      </div>

      {/* Analytics & Charts Section (3 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <BookingsOverviewChart />
        <RevenueOverviewChart />
        <ServiceBookingsDonut />
      </div>

      {/* Tables & Geographical Distribution Section (3 Columns on Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5">
          <RecentBookingsTable />
        </div>
        <div className="lg:col-span-4">
          <TopProvidersTable />
        </div>
        <div className="lg:col-span-3">
          <UsersByLocationMap />
        </div>
      </div>

      {/* Bottom Milestone Banner */}
      <MilestoneBanner />
    </div>
  );
};

export default AdminDashboard;
