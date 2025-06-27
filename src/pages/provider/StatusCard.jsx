const StatusCards = () => {
  const stats = [
    { label: "Total Requests", value: 12 },
    { label: "Active Services", value: 4 },
    { label: "Completed Jobs", value: 27 },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((item, index) => (
        <div key={index} className="bg-white shadow rounded-2xl p-4 text-center">
          <div className="text-xl font-bold text-blue-600">{item.value}</div>
          <div className="text-gray-600">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatusCards;
