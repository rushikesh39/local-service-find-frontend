// // src/features/dashboard/pages/PaymentsManagement.jsx
// import React from "react";
// import { CreditCard, IndianRupee, Download, TrendingUp, CheckCircle, ArrowUpRight } from "lucide-react";
// import RoleGate from "../rbac/RoleGate";
// import { PERMISSIONS } from "../rbac/roles";

// const transactions = [
//   { id: "TXN-98211", customer: "Sneha Patil", method: "UPI (Google Pay)", date: "Sep 30, 2025", amount: "₹1,200", status: "Settled" },
//   { id: "TXN-98210", customer: "Amit Sharma", method: "Credit Card (HDFC)", date: "Sep 30, 2025", amount: "₹800", status: "Settled" },
//   { id: "TXN-98209", customer: "Priya Desai", method: "UPI (PhonePe)", date: "Sep 29, 2025", amount: "₹1,500", status: "Settled" },
//   { id: "TXN-98208", customer: "Rohit Kulkarni", method: "Net Banking (SBI)", date: "Sep 29, 2025", amount: "₹950", status: "Settled" },
//   { id: "TXN-98207", customer: "Pooja Salunke", method: "UPI (Paytm)", date: "Sep 28, 2025", amount: "₹2,200", status: "Settled" },
// ];

// const PaymentsManagement = () => {
//   return (
//     <div className="space-y-6">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Payments & Financials</h1>
//           <p className="text-xs text-slate-500 mt-0.5">
//             Audit payment settlements, transaction ledger, and commission disbursements.
//           </p>
//         </div>

//         <RoleGate permission={PERMISSIONS.EXPORT_REPORTS}>
//           <button className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer">
//             <Download className="w-4 h-4 text-slate-500" />
//             <span>Export Statement</span>
//           </button>
//         </RoleGate>
//       </div>

//       {/* Financial Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
//           <span className="text-xs text-slate-500 font-medium">Total Gross Volume</span>
//           <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹12,48,560</h3>
//           <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
//             +22% from last month
//           </span>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
//           <span className="text-xs text-slate-500 font-medium">Platform Commissions (15%)</span>
//           <h3 className="text-2xl font-extrabold text-[#00897B] mt-1">₹1,87,284</h3>
//           <span className="text-[11px] text-slate-400 mt-1 inline-block">
//             Disbursed to bank account
//           </span>
//         </div>

//         <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs">
//           <span className="text-xs text-slate-500 font-medium">Provider Payouts (85%)</span>
//           <h3 className="text-2xl font-extrabold text-slate-800 mt-1">₹10,61,276</h3>
//           <span className="text-[11px] text-emerald-600 font-semibold mt-1 inline-block">
//             100% On-time settlements
//           </span>
//         </div>
//       </div>

//       {/* Transactions Table */}
//       <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
//         <table className="w-full text-left text-xs">
//           <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
//             <tr>
//               <th className="py-3.5 px-4">Transaction ID</th>
//               <th className="py-3.5 px-4">Customer</th>
//               <th className="py-3.5 px-4">Payment Method</th>
//               <th className="py-3.5 px-4">Date</th>
//               <th className="py-3.5 px-4">Status</th>
//               <th className="py-3.5 px-4 text-right">Amount</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-slate-100">
//             {transactions.map((tx) => (
//               <tr key={tx.id} className="hover:bg-slate-50/70">
//                 <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{tx.id}</td>
//                 <td className="py-3.5 px-4 font-semibold text-slate-900">{tx.customer}</td>
//                 <td className="py-3.5 px-4 text-slate-600">{tx.method}</td>
//                 <td className="py-3.5 px-4 text-slate-500">{tx.date}</td>
//                 <td className="py-3.5 px-4">
//                   <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">
//                     {tx.status}
//                   </span>
//                 </td>
//                 <td className="py-3.5 px-4 text-right font-bold text-slate-900">{tx.amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default PaymentsManagement;
