// // src/features/dashboard/pages/ProvidersManagement.jsx
// import React, { useState } from "react";
// import { UserCheck, Search, CheckCircle, XCircle, Star, Phone, Mail, MapPin } from "lucide-react";
// import RoleGate from "../rbac/RoleGate";
// import { PERMISSIONS } from "../rbac/roles";
// import Swal from "sweetalert2";

// const initialProviders = [
//   { id: 1, name: "Ramesh Kumar", trade: "AC Technician", phone: "+91 98220 12345", email: "ramesh.k@gmail.com", rating: 4.8, status: "Approved", location: "Hinjawadi, Pune" },
//   { id: 2, name: "Suresh Patil", trade: "Plumber", phone: "+91 98220 54321", email: "suresh.p@gmail.com", rating: 4.7, status: "Approved", location: "Aundh, Pune" },
//   { id: 3, name: "Meena Sharma", trade: "Cleaner", phone: "+91 98220 67890", email: "meena.s@gmail.com", rating: 4.6, status: "Approved", location: "Kothrud, Pune" },
//   { id: 4, name: "Ajay More", trade: "Electrician", phone: "+91 98220 99887", email: "ajay.m@gmail.com", rating: 4.5, status: "Approved", location: "Wagholi, Pune" },
//   { id: 5, name: "Santosh Deshmukh", trade: "Carpentry", phone: "+91 98220 44332", email: "santosh.d@gmail.com", rating: 0, status: "Pending", location: "Hadapsar, Pune" },
// ];

// const ProvidersManagement = () => {
//   const [providers, setProviders] = useState(initialProviders);
//   const [filter, setFilter] = useState("all");

//   const handleApprove = (id) => {
//     setProviders((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, status: "Approved" } : p))
//     );
//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon: "success",
//       title: "Provider Approved",
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   };

//   const handleReject = (id) => {
//     setProviders((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, status: "Rejected" } : p))
//     );
//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon: "info",
//       title: "Provider Rejected",
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   };

//   const filtered = providers.filter((p) => {
//     if (filter === "approved") return p.status === "Approved";
//     if (filter === "pending") return p.status === "Pending";
//     return true;
//   });

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Providers Directory & Approvals</h1>
//           <p className="text-xs text-slate-500 mt-0.5">
//             Review service provider registrations, licenses, and approval requests.
//           </p>
//         </div>

//         <div className="flex items-center gap-2">
//           {["all", "approved", "pending"].map((f) => (
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

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filtered.map((provider) => (
//           <div
//             key={provider.id}
//             className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs flex flex-col justify-between"
//           >
//             <div>
//               <div className="flex items-start justify-between mb-3">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center">
//                     {provider.name.charAt(0)}
//                   </div>
//                   <div>
//                     <h4 className="font-bold text-sm text-slate-900">{provider.name}</h4>
//                     <span className="text-xs text-[#00897B] font-semibold">{provider.trade}</span>
//                   </div>
//                 </div>

//                 <span
//                   className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
//                     provider.status === "Approved"
//                       ? "bg-emerald-50 text-emerald-700"
//                       : provider.status === "Pending"
//                       ? "bg-amber-50 text-amber-700"
//                       : "bg-rose-50 text-rose-700"
//                   }`}
//                 >
//                   {provider.status}
//                 </span>
//               </div>

//               <div className="space-y-1.5 text-xs text-slate-500 mb-4">
//                 <div className="flex items-center gap-2">
//                   <Phone className="w-3.5 h-3.5 text-slate-400" />
//                   <span>{provider.phone}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Mail className="w-3.5 h-3.5 text-slate-400" />
//                   <span>{provider.email}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPin className="w-3.5 h-3.5 text-slate-400" />
//                   <span>{provider.location}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Approvals Action - Guarded with RBAC Permission Gate */}
//             {provider.status === "Pending" && (
//               <RoleGate
//                 permission={PERMISSIONS.APPROVE_PROVIDERS}
//                 fallback={<p className="text-[11px] text-slate-400">Approval requires Super Admin / Admin role</p>}
//               >
//                 <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
//                   <button
//                     onClick={() => handleApprove(provider.id)}
//                     className="flex-1 flex items-center justify-center gap-1.5 bg-[#00897B] hover:bg-[#00796B] text-white py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
//                   >
//                     <CheckCircle className="w-3.5 h-3.5" />
//                     Approve
//                   </button>
//                   <button
//                     onClick={() => handleReject(provider.id)}
//                     className="flex-1 flex items-center justify-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 py-1.5 px-3 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
//                   >
//                     <XCircle className="w-3.5 h-3.5" />
//                     Reject
//                   </button>
//                 </div>
//               </RoleGate>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProvidersManagement;
