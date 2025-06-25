import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { createBooking } from "../api/auth";

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const services = useSelector((state) => state.services.services);
  const service = services.find((s) => s._id === serviceId);

  useEffect(() => {
    if (!service) {
      navigate("/services");
    }
  }, [service, navigate]);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    address: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(serviceId, formData, 'booking')
    try {
      await createBooking({
        serviceId,
        name: formData.name,
        mobile: formData.mobile,
        scheduledDate: `${formData.date}T${formData.time}`,
        address: formData.address,
        notes: formData.notes,
      });

      alert(`Booking confirmed for ${service?.name}`);
      navigate("/my-bookings");
    } catch (err) {
      console.error("Booking failed:", err);
      alert("Booking failed.");
    }
  };

  if (!service) return null; // while useEffect navigates, render nothing

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Book {service.name}</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            readOnly
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <textarea
            placeholder="Notes"
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded"
          />
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;
