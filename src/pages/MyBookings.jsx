import { useEffect, useState } from "react";
import { getUserBooking, submitReview } from "../api/auth";
import {
  Calendar,
  MapPin,
  ClipboardList,
  Clock,
  CheckCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import ReviewPopup from "./ReviewPopup";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [form, setForm] = useState({ rating: 0, comment: "", image: null });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await getUserBooking();
        const data = Array.isArray(response) ? response : response?.bookings;
        console.log("data", data);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch bookings", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const openReviewForm = (booking) => {
    setSelectedBooking(booking);
    setForm({ rating: 0, comment: "", image: null });
    setShowReviewForm(true);
  };

  const handleRatingChange = (value) => {
    setForm((prev) => ({ ...prev, rating: Number(value) }));
  };

  const handleCommentChange = (e) => {
    setForm((prev) => ({ ...prev, comment: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, image: file }));
  };

  const handleReviewSubmit = async () => {
    const formData = new FormData();
    formData.append("rating", Number(form.rating));
    formData.append("reviewText", form.comment);
    formData.append("providerId", selectedBooking?.providerId?._id);
    formData.append("serviceId", selectedBooking?.serviceId?._id);
    formData.append("bookingId", selectedBooking?._id);
    if (form.image) {
      formData.append("image", form.image);
    }

    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      setSubmitting(true);
      await submitReview(formData);
      setShowReviewForm(false);

      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your review has been submitted successfully.",
        confirmButtonColor: "#2563eb", // Tailwind blue-600
      });
    } catch (err) {
      console.error("Failed to submit review", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while submitting your review.",
        confirmButtonColor: "#ef4444", // Tailwind red-500
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-100 py-10 px-4 min-h-[85vh]">
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
                  <span className="text-sm text-gray-500">
                    ({booking?.serviceId?.category})
                  </span>
                </h2>

                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-blue-500" />
                    <span>Status:</span>{" "}
                    <span className="capitalize font-medium">
                      {booking.status}
                    </span>
                  </p>

                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-500" />
                    <span>Date:</span> {scheduled.toLocaleDateString()}
                  </p>

                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-orange-500" />
                    <span>Time:</span>{" "}
                    {scheduled.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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

                {booking.status === "confirmed" && (
                  <button
                    onClick={() => openReviewForm(booking)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow"
                  >
                    Confirm Completion & Review
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {showReviewForm && (
        <ReviewPopup
          selectedBooking={selectedBooking}
          form={form}
          submitting={submitting}
          setShowReviewForm={setShowReviewForm}
          handleRatingChange={handleRatingChange}
          handleCommentChange={handleCommentChange}
          handleImageChange={handleImageChange}
          handleReviewSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
};

export default MyBookings;
