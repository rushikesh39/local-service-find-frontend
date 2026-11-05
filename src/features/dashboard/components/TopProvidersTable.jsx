// src/features/dashboard/components/TopProvidersTable.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const topProviders = [
  {
    rank: 1,
    name: "Ramesh Kumar",
    trade: "AC Technician",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
    bookings: 245,
    rating: 4.8,
  },
  {
    rank: 2,
    name: "Suresh Patil",
    trade: "Plumber",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    bookings: 198,
    rating: 4.7,
  },
  {
    rank: 3,
    name: "Meena Sharma",
    trade: "Cleaner",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    bookings: 176,
    rating: 4.6,
  },
  {
    rank: 4,
    name: "Ajay More",
    trade: "Electrician",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    bookings: 162,
    rating: 4.5,
  },
  {
    rank: 5,
    name: "Vikram Jadhav",
    trade: "Painter",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    bookings: 140,
    rating: 4.4,
  },
];

const TopProvidersTable = () => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 text-base">Top Providers</h3>
        <Link
          to="/admin/providers"
          className="text-xs font-semibold text-[#00897B] hover:text-[#00796B] hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-medium">
              <th className="pb-3 font-semibold w-8">#</th>
              <th className="pb-3 font-semibold">Provider</th>
              <th className="pb-3 font-semibold text-center">Bookings</th>
              <th className="pb-3 font-semibold text-right">Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {topProviders.map((provider) => (
              <tr
                key={provider.rank}
                className="hover:bg-slate-50/70 transition-colors"
              >
                <td className="py-3 font-bold text-slate-400">
                  {provider.rank}
                </td>

                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <span className="font-semibold text-slate-800 block text-xs">
                        {provider.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        ({provider.trade})
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3 text-center font-semibold text-slate-700">
                  {provider.bookings}
                </td>

                <td className="py-3 text-right">
                  <div className="inline-flex items-center gap-1 font-bold text-slate-800 bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-200/50">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{provider.rating}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProvidersTable;
