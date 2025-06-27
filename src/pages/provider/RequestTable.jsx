const RequestTable = () => {
  const requests = [
    { name: "John Doe", service: "Plumbing", date: "May 18", status: "Pending" },
    { name: "Jane Smith", service: "Cleaning", date: "May 17", status: "Completed" },
  ];

  return (
    <div className="bg-white shadow rounded-2xl p-4">
      <h2 className="text-lg font-semibold mb-4">Recent Service Requests</h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-600 border-b">
            <th className="py-2">Customer</th>
            <th>Service</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req, index) => (
            <tr key={index} className="border-b hover:bg-gray-50">
              <td className="py-2">{req.name}</td>
              <td>{req.service}</td>
              <td>{req.date}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    req.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {req.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
