// src/pages/MetricCard.jsx or src/components/MetricCard.jsx
import React from "react";
import {
  DollarSign,
  CalendarCheck,
  ListChecks,
  Clock,
  CheckCircle2,
} from "lucide-react";

const icons = {
  DollarSign: <DollarSign className="w-6 h-6 text-blue-600" />,
  CalendarCheck: <CalendarCheck className="w-6 h-6 text-green-600" />,
  ListChecks: <ListChecks className="w-6 h-6 text-purple-600" />,
  Clock: <Clock className="w-6 h-6 text-yellow-600" />,
  CheckCircle2: <CheckCircle2 className="w-6 h-6 text-emerald-600" />,
};

const MetricCard = ({ title, value, icon, color = "bg-gray-100" }) => {
  return (
    <div className={`rounded-xl p-4 shadow-sm ${color} flex items-center`}>
      <div className="p-3 bg-white rounded-full shadow mr-4">{icons[icon]}</div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default MetricCard;
