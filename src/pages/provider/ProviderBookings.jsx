import React, { useEffect, useState } from "react";
import { getProviderBookings } from "../../api/auth";

const ProviderBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await getProviderBookings();
      console.log("result",res)
      setBookings(res);
      console.log("booking",bookings)
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>
      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border">User</th>
                <th className="px-4 py-2 border">Service</th>
                <th className="px-4 py-2 border">Scheduled Date</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="px-4 py-2 border">{booking.userId?.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{booking.serviceId?.name || "N/A"}</td>
                  <td className="px-4 py-2 border">{new Date(booking.scheduledDate).toLocaleString()}</td>
                  <td className="px-4 py-2 border">{booking.address}</td>
                  <td className="px-4 py-2 border capitalize">{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProviderBookings;
