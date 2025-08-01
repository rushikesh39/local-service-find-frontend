import { useEffect, useState } from "react";
import { getUserBooking, submitReview,updateBookingStatus } from "../api/auth";
import {
  Calendar,
  MapPin,
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import ReviewPopup from "./ReviewPopup";

const SkeletonCard = () => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 animate-pulse">
    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="space-y-2 mt-4">
      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      <div className="h-3 bg-gray-200 rounded w-4/5"></div>
    </div>
    <div className="h-8 bg-gray-200 rounded mt-5 w-24"></div>
  </div>
);

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [form, setForm] = useState({ rating: 0, comment: "", image: null });
  const [submitting, setSubmitting] = useState(false);

  const fetchBookings = async () => {
    try {
      const response = await getUserBooking();
      const data = Array.isArray(response) ? response : response?.bookings;
      setBookings(data || []);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

    try {
      setSubmitting(true);
      await submitReview(formData);
      setShowReviewForm(false);
      Swal.fire({
        icon: "success",
        title: "Thank you!",
        text: "Your review has been submitted successfully.",
        confirmButtonColor: "#2563eb",
      });
      fetchBookings();
    } catch (err) {
      console.error("Failed to submit review", err);
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong while submitting your review.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelBooking = (bookingId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const newStatus="cancelled";
          await updateBookingStatus(bookingId,newStatus);
          Swal.fire({
            icon: "success",
            title: "Booking Cancelled",
            text: "Your booking has been cancelled successfully.",
            confirmButtonColor: "#2563eb",
          });
          fetchBookings();
        } catch (err) {
          console.error("Failed to cancel booking", err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to cancel your booking. Please try again.",
            confirmButtonColor: "#ef4444",
          });
        }
      }
    });
  };

  return (
    <div className="bg-gray-100 py-10 px-4 min-h-[85vh]">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        My Bookings
      </h1>

      {loading ? (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center text-center mt-12">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
            alt="No bookings"
            className="w-28 mb-4 opacity-80"
          />
          <p className="text-gray-500 text-lg">No bookings yet.</p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {bookings.map((booking) => {
            const scheduled = new Date(booking.scheduledDate);
            const bookedOn = new Date(booking.createdAt);

            return (
              <div
                key={booking._id}
                className={`relative bg-white rounded-xl shadow-md border-l-4 p-5 transition-all hover:shadow-lg hover:translate-y-[-2px] ${
                  booking.status === "confirmed"
                    ? "border-green-500"
                    : booking.status === "pending"
                    ? "border-yellow-500"
                    : "border-gray-400"
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 leading-snug">
                      {booking?.serviceId?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {booking?.serviceId?.category}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* Booking Info */}
                <div className="space-y-3 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-500" />
                    {scheduled.toLocaleDateString()}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock size={16} className="text-blue-500" />
                    {scheduled.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-400" />
                    {booking.address}
                  </p>
                  {booking.notes && (
                    <p className="flex items-center gap-2">
                      <ClipboardList size={16} className="text-yellow-500" />
                      {booking.notes}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-gray-400">
                    Booked on: {bookedOn.toLocaleString()}
                  </p>

                  <div className="flex gap-2">
                    {booking.status === "confirmed" && (
                      <button
                        onClick={() => openReviewForm(booking)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
                      >
                        <CheckCircle size={16} /> Completed
                      </button>
                    )}
                    {booking.status !== "cancelled" &&
                      booking.status !== "completed" && (
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm"
                        >
                          <XCircle size={16} /> Cancel
                        </button>
                      )}
                  </div>
                </div>
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