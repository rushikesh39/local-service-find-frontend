import { useSelector } from "react-redux";

const MyBookings = () => {
  const bookings = useSelector((state) => state.booking.bookings);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {bookings.map((booking, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-semibold mb-2">{booking.service}</h2>
              <p><span className="font-medium">Name:</span> {booking.name}</p>
              <p><span className="font-medium">Date:</span> {booking.date}</p>
              <p><span className="font-medium">Time:</span> {booking.time}</p>
              {booking.notes && (
                <p><span className="font-medium">Notes:</span> {booking.notes}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Booked on: {new Date(booking.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
