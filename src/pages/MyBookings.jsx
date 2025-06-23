import { useEffect, useState } from "react";
import { getUserBooking } from "../api/auth"; // adjust path as needed
import { Calendar, MapPin, ClipboardList, Clock, CheckCircle } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getUserBooking();
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className=" bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        My Bookings
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings yet.</p>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const scheduled = new Date(booking.scheduledDate);
            const bookedOn = new Date(booking.createdAt);

            return (
              <div
                key={booking._id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {booking?.serviceId?.name}{" "}
                  <span className="text-sm text-gray-500">({booking?.serviceId?.category})</span>
                </h2>

                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-blue-500" />
                    <span>Status:</span> <span className="capitalize font-medium">{booking.status}</span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-500" />
                    <span>Date:</span> {scheduled.toLocaleDateString()}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-orange-500" />
                    <span>Time:</span> {scheduled.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>

                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-400" />
                    <span>Address:</span> {booking.address}
                  </p>

                  {booking.notes && (
                    <p className="flex items-center gap-2">
                      <ClipboardList size={16} className="text-yellow-500" />
                      <span>Notes:</span> {booking.notes}
                    </p>
                  )}
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  Booked on: {bookedOn.toLocaleString()}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
