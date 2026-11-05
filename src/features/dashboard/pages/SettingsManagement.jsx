// // src/features/dashboard/pages/SettingsManagement.jsx
// import React, { useState } from "react";
// import { ShieldCheck, Check, X, Shield, Lock, Sliders, Users, RefreshCw } from "lucide-react";
// import useRBAC from "../rbac/useRBAC";
// import { ROLES, PERMISSIONS, ROLE_PERMISSIONS, ROLE_METADATA } from "../rbac/roles";

// const SettingsManagement = () => {
//   const { role, switchRole, permissions } = useRBAC();
//   const [selectedRole, setSelectedRole] = useState(role);

//   const permissionsList = Object.entries(PERMISSIONS);

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">
//           RBAC Roles & Permissions Matrix
//         </h1>
//         <p className="text-xs text-slate-500 mt-0.5">
//           Review, simulate, and inspect Role-Based Access Control architecture across the frontend and backend.
//         </p>
//       </div>

//       {/* Role Selector Card */}
//       <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
//         <h3 className="font-bold text-slate-800 text-sm mb-3">
//           Select Active Role for Simulation
//         </h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//           {Object.values(ROLES).map((r) => {
//             const meta = ROLE_METADATA[r] || { label: r };
//             const isActive = role === r;

//             return (
//               <div
//                 key={r}
//                 onClick={() => {
//                   setSelectedRole(r);
//                   switchRole(r);
//                 }}
//                 className={`p-4 rounded-xl border cursor-pointer transition-all ${
//                   isActive
//                     ? "border-[#00897B] bg-[#E6F4F1]/30 ring-2 ring-[#00897B]/20"
//                     : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
//                 }`}
//               >
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="font-bold text-xs uppercase text-slate-900">
//                     {meta.label}
//                   </span>
//                   {isActive && (
//                     <span className="w-2.5 h-2.5 rounded-full bg-[#00897B]" />
//                   )}
//                 </div>
//                 <p className="text-[11px] text-slate-500 leading-snug">
//                   {meta.description}
//                 </p>
//                 <span className="inline-block mt-3 text-[10px] font-semibold text-[#00897B]">
//                   {ROLE_PERMISSIONS[r]?.length || 0} Permissions
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* RBAC Matrix Table */}
//       <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
//         <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <Sliders className="w-4 h-4 text-[#00897B]" />
//             <h4 className="font-bold text-xs text-slate-800">
//               System Permissions Matrix
//             </h4>
//           </div>
//           <span className="text-[11px] text-slate-400">
//             Total permissions: {permissionsList.length}
//           </span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left text-xs">
//             <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
//               <tr>
//                 <th className="py-3 px-4 w-1/3">Permission Key</th>
//                 {Object.values(ROLES).map((r) => (
//                   <th key={r} className="py-3 px-4 text-center capitalize">
//                     {r.replace("_", " ")}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100">
//               {permissionsList.map(([key, permValue]) => (
//                 <tr key={key} className="hover:bg-slate-50/60">
//                   <td className="py-2.5 px-4 font-mono text-[11px] text-slate-700">
//                     {permValue}
//                   </td>
//                   {Object.values(ROLES).map((r) => {
//                     const hasPerm =
//                       r === ROLES.SUPER_ADMIN ||
//                       ROLE_PERMISSIONS[r]?.includes(permValue);

//                     return (
//                       <td key={r} className="py-2.5 px-4 text-center">
//                         {hasPerm ? (
//                           <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700">
//                             <Check className="w-3.5 h-3.5 stroke-[3]" />
//                           </span>
//                         ) : (
//                           <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-300">
//                             <X className="w-3.5 h-3.5" />
//                           </span>
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsManagement;
