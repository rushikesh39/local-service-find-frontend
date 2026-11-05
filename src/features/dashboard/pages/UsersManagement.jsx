// // src/features/dashboard/pages/UsersManagement.jsx
// import React, { useState } from "react";
// import { Users, Search, UserPlus, Trash2, Edit2, Shield, MoreVertical } from "lucide-react";
// import RoleGate from "../rbac/RoleGate";
// import { PERMISSIONS, ROLES } from "../rbac/roles";

// const initialUsers = [
//   { id: 1, name: "Sneha Patil", email: "sneha.p@gmail.com", role: "user", status: "Active", joined: "12 Aug 2025" },
//   { id: 2, name: "Amit Sharma", email: "amit.sharma@yahoo.com", role: "user", status: "Active", joined: "18 Aug 2025" },
//   { id: 3, name: "Ramesh Kumar", email: "ramesh.k@locafy.com", role: "provider", status: "Verified", joined: "01 Jul 2025" },
//   { id: 4, name: "Suresh Patil", email: "suresh.plumber@locafy.com", role: "provider", status: "Verified", joined: "15 Jul 2025" },
//   { id: 5, name: "Admin Officer", email: "admin@locafy.com", role: "admin", status: "Active", joined: "01 Jan 2025" },
//   { id: 6, name: "Pooja Salunke", email: "pooja.s@gmail.com", role: "user", status: "Inactive", joined: "05 Sep 2025" },
// ];

// const UsersManagement = () => {
//   const [users, setUsers] = useState(initialUsers);
//   const [filterRole, setFilterRole] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");

//   const filteredUsers = users.filter((u) => {
//     const matchesRole = filterRole === "all" || u.role === filterRole;
//     const matchesSearch =
//       u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       u.email.toLowerCase().includes(searchTerm.toLowerCase());
//     return matchesRole && matchesSearch;
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Users Management</h1>
//           <p className="text-xs text-slate-500 mt-0.5">
//             Manage customer accounts, provider credentials, and administrative roles.
//           </p>
//         </div>

//         {/* RBAC Protected Action Button */}
//         <RoleGate permission={PERMISSIONS.CREATE_USERS}>
//           <button className="inline-flex items-center gap-2 bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-colors cursor-pointer">
//             <UserPlus className="w-4 h-4" />
//             <span>Add New User</span>
//           </button>
//         </RoleGate>
//       </div>

//       {/* Filter and Search Bar */}
//       <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//         <div className="relative flex-1 max-w-sm">
//           <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by name or email..."
//             className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200/80 rounded-xl focus:bg-white focus:border-[#00897B] outline-none"
//           />
//         </div>

//         <div className="flex items-center gap-2">
//           {["all", "user", "provider", "admin"].map((r) => (
//             <button
//               key={r}
//               onClick={() => setFilterRole(r)}
//               className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
//                 filterRole === r
//                   ? "bg-[#00897B] text-white"
//                   : "bg-slate-100 text-slate-600 hover:bg-slate-200"
//               }`}
//             >
//               {r}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
//         <table className="w-full text-left text-xs">
//           <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
//             <tr>
//               <th className="py-3.5 px-4">User</th>
//               <th className="py-3.5 px-4">Role</th>
//               <th className="py-3.5 px-4">Status</th>
//               <th className="py-3.5 px-4">Joined Date</th>
//               <th className="py-3.5 px-4 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {filteredUsers.map((user) => (
//               <tr key={user.id} className="hover:bg-slate-50/70 transition-colors">
//                 <td className="py-3.5 px-4">
//                   <div className="flex items-center gap-3">
//                     <div className="w-8 h-8 rounded-full bg-[#00897B]/10 text-[#00897B] font-bold flex items-center justify-center">
//                       {user.name.charAt(0)}
//                     </div>
//                     <div>
//                       <p className="font-semibold text-slate-900">{user.name}</p>
//                       <p className="text-[11px] text-slate-400">{user.email}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="py-3.5 px-4">
//                   <span
//                     className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
//                       user.role === "admin"
//                         ? "bg-purple-50 text-purple-700 border border-purple-200"
//                         : user.role === "provider"
//                         ? "bg-blue-50 text-blue-700 border border-blue-200"
//                         : "bg-slate-100 text-slate-700"
//                     }`}
//                   >
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="py-3.5 px-4">
//                   <span
//                     className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold ${
//                       user.status === "Active" || user.status === "Verified"
//                         ? "bg-emerald-50 text-emerald-700"
//                         : "bg-slate-100 text-slate-500"
//                     }`}
//                   >
//                     {user.status}
//                   </span>
//                 </td>
//                 <td className="py-3.5 px-4 text-slate-500">{user.joined}</td>
//                 <td className="py-3.5 px-4 text-right">
//                   <div className="flex items-center justify-end gap-1">
//                     <RoleGate permission={PERMISSIONS.EDIT_USERS}>
//                       <button className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 hover:text-slate-800 transition-colors">
//                         <Edit2 className="w-3.5 h-3.5" />
//                       </button>
//                     </RoleGate>
//                     <RoleGate permission={PERMISSIONS.DELETE_USERS}>
//                       <button className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors">
//                         <Trash2 className="w-3.5 h-3.5" />
//                       </button>
//                     </RoleGate>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UsersManagement;
