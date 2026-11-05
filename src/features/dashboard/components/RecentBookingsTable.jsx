// src/features/dashboard/components/RecentBookingsTable.jsx
import React from "react";
import { Link } from "react-router-dom";

const bookings = [
  {
    id: "#12891",
    customer: "Sneha Patil",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    service: "AC Repair",
    provider: "Ramesh K.",
    dateTime: "Sep 30, 10:30 AM",
    status: "Confirmed",
    amount: "₹1,200",
  },
  {
    id: "#12890",
    customer: "Amit Sharma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    service: "Plumbing",
    provider: "Suresh P.",
    dateTime: "Sep 30, 09:15 AM",
    status: "In Progress",
    amount: "₹800",
  },
  {
    id: "#12889",
    customer: "Priya Desai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    service: "Home Cleaning",
    provider: "Meena S.",
    dateTime: "Sep 29, 06:00 PM",
    status: "Completed",
    amount: "₹1,500",
  },
  {
    id: "#12888",
    customer: "Rohit Kulkarni",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    service: "Electrical",
    provider: "Ajay M.",
    dateTime: "Sep 29, 11:45 AM",
    status: "Confirmed",
    amount: "₹950",
  },
  {
    id: "#12887",
    customer: "Pooja Salunke",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    service: "Painting",
    provider: "Vikram J.",
    dateTime: "Sep 28, 04:30 PM",
    status: "Completed",
    amount: "₹2,200",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/60";
    case "In Progress":
      return "bg-amber-50 text-amber-700 border-amber-200/60";
    case "Completed":
      return "bg-teal-50 text-teal-700 border-teal-200/60";
    default:
      return "bg-slate-50 text-slate-700 border-slate-200";
  }
};

const RecentBookingsTable = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-base">Recent Bookings</h3>
        <Link
          to="/admin/bookings"
          className="text-xs font-semibold text-[#00897B] hover:text-[#00796B] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-medium">
              <th className="pb-3 font-semibold w-16">#</th>
              <th className="pb-3 font-semibold">Customer</th>
              <th className="pb-3 font-semibold">Service</th>
              <th className="pb-3 font-semibold">Provider</th>
              <th className="pb-3 font-semibold">Date & Time</th>
              <th className="pb-3 font-semibold text-center">Status</th>
              <th className="pb-3 font-semibold text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="hover:bg-slate-50/70 transition-colors"
              >
                <td className="py-3 font-semibold text-slate-700">
                  {booking.id}
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={booking.avatar}
                      alt={booking.customer}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <span className="font-semibold text-slate-800">
                      {booking.customer}
                    </span>
                  </div>
                </td>

                <td className="py-3 text-slate-600 font-medium">
                  {booking.service}
                </td>

                <td className="py-3 text-slate-600 font-medium">
                  {booking.provider}
                </td>

                <td className="py-3 text-slate-500">{booking.dateTime}</td>

                <td className="py-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="py-3 text-right font-bold text-slate-800">
                  {booking.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentBookingsTable;
