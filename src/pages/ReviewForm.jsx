// components/ReviewForm.jsx
import { useState } from "react";
import { UploadCloud, Star } from "lucide-react";
import { submitReview } from "../api/auth";

const ReviewForm = ({ bookingId, providerId, onClose, onSubmitted }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!rating) return alert("Please give a rating.");

    const formData = new FormData();
    formData.append("rating", rating);
    formData.append("reviewText", comment);
    formData.append("providerId", providerId);
    if (image) formData.append("image", image);

    setSubmitting(true);
    try {
      await submitReview(bookingId, formData);
      alert("Review submitted successfully!");
      onSubmitted();
      onClose();
    } catch (err) {
      console.error("Failed to submit review", err);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative py-10 px-4 bg-gray-100 min-h-screen overflow-hidden">
      {/* Decorative SVG background */}
      <svg
        className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        viewBox="0 0 1024 1024"
      >
        <g stroke="url(#paint0_linear)" strokeWidth="2">
          <path d="M0 0L1024 1024" />
          <path d="M1024 0L0 1024" />
          <circle cx="512" cy="512" r="400" />
          <circle cx="512" cy="512" r="300" />
        </g>
        <defs>
          <linearGradient id="paint0_linear" x1="0" y1="0" x2="1024" y2="1024" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3b82f6" />
            <stop offset="1" stopColor="#0ea5e9" />
          </linearGradient>
        </defs>
      </svg>

      <div className="relative max-w-xl mx-auto bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-200">
        <h3 className="text-2xl font-semibold text-blue-600 mb-6 text-center">
          Leave a Review
        </h3>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Rating
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                className={`cursor-pointer transition-transform duration-150 ${
                  rating >= star ? "text-yellow-400 scale-110" : "text-gray-300"
                }`}
                fill={rating >= star ? "#facc15" : "none"}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Share your experience..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none shadow-sm"
          ></textarea>
        </div>

        {/* Upload Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image (optional)
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <label className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-medium shadow-sm cursor-pointer hover:bg-blue-100">
              <UploadCloud size={18} /> Upload File
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </label>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-12 h-12 rounded-lg border object-cover shadow-sm"
              />
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium shadow-md transition-all duration-200"
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewForm;
