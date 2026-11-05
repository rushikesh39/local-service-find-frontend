// // src/features/dashboard/pages/ServicesManagement.jsx
// import React, { useState } from "react";
// import { Wrench, Plus, Search, Tag, Check } from "lucide-react";
// import RoleGate from "../rbac/RoleGate";
// import { PERMISSIONS } from "../rbac/roles";

// const servicesList = [
//   { id: 1, name: "AC Service & Repair", category: "Appliance", basePrice: "₹599", duration: "60 mins", activeProviders: 42, status: "Active" },
//   { id: 2, name: "Tap & Pipe Leakage Repair", category: "Plumbing", basePrice: "₹299", duration: "45 mins", activeProviders: 38, status: "Active" },
//   { id: 3, name: "Switchboard & Wiring Repair", category: "Electrical", basePrice: "₹349", duration: "40 mins", activeProviders: 29, status: "Active" },
//   { id: 4, name: "Deep Home Cleaning", category: "Cleaning", basePrice: "₹1,499", duration: "180 mins", activeProviders: 24, status: "Active" },
//   { id: 5, name: "Full Home Painting", category: "Painting", basePrice: "₹4,999", duration: "2 days", activeProviders: 18, status: "Active" },
//   { id: 6, name: "Furniture Assembly & Repair", category: "Carpentry", basePrice: "₹449", duration: "60 mins", activeProviders: 15, status: "Active" },
// ];

// const ServicesManagement = () => {
//   const [services, setServices] = useState(servicesList);

//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Service Catalog</h1>
//           <p className="text-xs text-slate-500 mt-0.5">
//             Configure offered service categories, baseline prices, and provider assignments.
//           </p>
//         </div>

//         <RoleGate permission={PERMISSIONS.CREATE_SERVICES}>
//           <button className="inline-flex items-center gap-2 bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer">
//             <Plus className="w-4 h-4" />
//             <span>Add New Service</span>
//           </button>
//         </RoleGate>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {services.map((svc) => (
//           <div
//             key={svc.id}
//             className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs hover:shadow-md transition-shadow"
//           >
//             <div className="flex items-start justify-between mb-2">
//               <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase tracking-wider">
//                 {svc.category}
//               </span>
//               <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
//                 {svc.status}
//               </span>
//             </div>

//             <h3 className="font-bold text-slate-900 text-sm mb-1">{svc.name}</h3>

//             <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 text-xs">
//               <div>
//                 <span className="text-slate-400 block text-[10px]">Starting at</span>
//                 <span className="font-bold text-slate-900 text-sm">{svc.basePrice}</span>
//               </div>
//               <div className="text-right">
//                 <span className="text-slate-400 block text-[10px]">Active Pros</span>
//                 <span className="font-semibold text-slate-700">{svc.activeProviders} Pros</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ServicesManagement;
