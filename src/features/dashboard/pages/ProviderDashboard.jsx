// src/pages/provider/ProviderDashboard.jsx
import React from "react";

// Provider Dashboard Subcomponents
import ProviderHeroBanner from "@/features/dashboard/components/provider/ProviderHeroBanner";
import ProviderStatCards from "@/features/dashboard/components/provider/ProviderStatCards";
import ProviderEarningsChart from "@/features/dashboard/components/provider/ProviderEarningsChart";
import ProviderBookingsStatusDonut from "@/features/dashboard/components/provider/ProviderBookingsStatusDonut";
import ProviderRecentBookingsTable from "@/features/dashboard/components/provider/ProviderRecentBookingsTable";
import ProviderUpcomingBookings from "@/features/dashboard/components/provider/ProviderUpcomingBookings";
import ProviderActionBanners from "@/features/dashboard/components/provider/ProviderActionBanners";
import ProviderProfileCard from "@/features/dashboard/components/provider/ProviderProfileCard";
import ProviderOnlineToggleCard from "@/features/dashboard/components/provider/ProviderOnlineToggleCard";
import ProviderTodaySchedule from "@/features/dashboard/components/provider/ProviderTodaySchedule";
import ProviderQuickActions from "@/features/dashboard/components/provider/ProviderQuickActions";

const ProviderDashboard = () => {
  return (
    <div className="space-y-6">
      {/* 2-Column Responsive Layout: Main 70% Left + Widgets 30% Right */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left / Main Dashboard Area */}
        <div className="xl:col-span-9 space-y-6">
          {/* Hero Welcome Banner */}
          <ProviderHeroBanner />

          {/* 4 Stat Metric Cards Grid */}
          <ProviderStatCards />

          {/* Charts Row: Earnings Overview (Bar) + Bookings Status (Donut) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ProviderEarningsChart />
            <ProviderBookingsStatusDonut />
          </div>

          {/* Tables Row: Recent Bookings + Upcoming Bookings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <ProviderRecentBookingsTable />
            <ProviderUpcomingBookings />
          </div>

          {/* Bottom Action / Upsell Banners */}
          <ProviderActionBanners />
        </div>

        {/* Right Column: Profile & Quick Controls */}
        <div className="xl:col-span-3 space-y-4 xl:sticky xl:top-20">
          {/* Profile Card with Rating & Verification Badge */}
          <ProviderProfileCard />

          {/* Online / Offline Status Toggle */}
          <ProviderOnlineToggleCard />

          {/* Today's Schedule Timeline */}
          <ProviderTodaySchedule />

          {/* Quick Actions 2x2 Grid */}
          <ProviderQuickActions />
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
