// // src/features/dashboard/pages/BookingsManagement.jsx
// import React, { useState } from "react";
// import { Calendar, Search, Filter, Eye, CheckCircle2, Clock, XCircle } from "lucide-react";
// import RoleGate from "../rbac/RoleGate";
// import { PERMISSIONS } from "../rbac/roles";

// const allBookings = [
//   { id: "#12891", customer: "Sneha Patil", service: "AC Repair", provider: "Ramesh K.", date: "Sep 30, 10:30 AM", status: "Confirmed", amount: "₹1,200", city: "Hinjawadi" },
//   { id: "#12890", customer: "Amit Sharma", service: "Plumbing", provider: "Suresh P.", date: "Sep 30, 09:15 AM", status: "In Progress", amount: "₹800", city: "Aundh" },
//   { id: "#12889", customer: "Priya Desai", service: "Home Cleaning", provider: "Meena S.", date: "Sep 29, 06:00 PM", status: "Completed", amount: "₹1,500", city: "Kothrud" },
//   { id: "#12888", customer: "Rohit Kulkarni", service: "Electrical", provider: "Ajay M.", date: "Sep 29, 11:45 AM", status: "Confirmed", amount: "₹950", city: "Wagholi" },
//   { id: "#12887", customer: "Pooja Salunke", service: "Painting", provider: "Vikram J.", date: "Sep 28, 04:30 PM", status: "Completed", amount: "₹2,200", city: "Pune Central" },
//   { id: "#12886", customer: "Gaurav Mehta", service: "Carpentry", provider: "Santosh D.", date: "Sep 27, 02:00 PM", status: "Cancelled", amount: "₹450", city: "Hadapsar" },
// ];

// const BookingsManagement = () => {
//   const [filter, setFilter] = useState("all");

//   const filtered = allBookings.filter((b) => {
//     if (filter === "all") return true;
//     return b.status.toLowerCase() === filter.toLowerCase();
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">All Platform Bookings</h1>
//           <p className="text-xs text-slate-500 mt-0.5">
//             Monitor real-time customer bookings, provider assignments, and completion states.
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           {["all", "Confirmed", "In Progress", "Completed", "Cancelled"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setFilter(f)}
//               className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize cursor-pointer transition-colors ${
//                 filter === f
//                   ? "bg-[#00897B] text-white"
//                   : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
//               }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
//         <table className="w-full text-left text-xs">
//           <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
//             <tr>
//               <th className="py-3.5 px-4">Booking ID</th>
//               <th className="py-3.5 px-4">Customer</th>
//               <th className="py-3.5 px-4">Service</th>
//               <th className="py-3.5 px-4">Provider</th>
//               <th className="py-3.5 px-4">Date & Time</th>
//               <th className="py-3.5 px-4">Status</th>
//               <th className="py-3.5 px-4 text-right">Amount</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {filtered.map((b) => (
//               <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
//                 <td className="py-3.5 px-4 font-bold text-slate-800">{b.id}</td>
//                 <td className="py-3.5 px-4 font-semibold text-slate-900">{b.customer}</td>
//                 <td className="py-3.5 px-4 text-slate-600">{b.service}</td>
//                 <td className="py-3.5 px-4 text-slate-600">{b.provider}</td>
//                 <td className="py-3.5 px-4 text-slate-500">{b.date}</td>
//                 <td className="py-3.5 px-4">
//                   <span
//                     className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
//                       b.status === "Confirmed"
//                         ? "bg-emerald-50 text-emerald-700"
//                         : b.status === "In Progress"
//                         ? "bg-amber-50 text-amber-700"
//                         : b.status === "Completed"
//                         ? "bg-teal-50 text-teal-700"
//                         : "bg-rose-50 text-rose-700"
//                     }`}
//                   >
//                     {b.status}
//                   </span>
//                 </td>
//                 <td className="py-3.5 px-4 text-right font-bold text-slate-900">{b.amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BookingsManagement;
