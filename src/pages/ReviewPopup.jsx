// components/ReviewPopup.jsx
import { Star, UploadCloud, X } from "lucide-react";

const ReviewPopup = ({
  selectedBooking,
  form,
  submitting,
  setShowReviewForm,
  handleRatingChange,
  handleCommentChange,
  handleImageChange,
  handleReviewSubmit,
}) => {
  if (!selectedBooking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/70 flex justify-center items-center ">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setShowReviewForm(false)}
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Review for {selectedBooking.serviceId.name}
        </h2>

        <div className="mb-4 flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <Star
              key={value}
              onClick={() => handleRatingChange(value)}
              className={`cursor-pointer w-6 h-6 transition ${
                form.rating >= value ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
              fill={form.rating >= value ? "currentColor" : "none"}
            />
          ))}
        </div>

        <textarea
          className="w-full p-2 border rounded mb-4"
          rows="4"
          placeholder="Write your review..."
          value={form.comment}
          onChange={handleCommentChange}
        ></textarea>

        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer text-blue-600">
            <UploadCloud />
            <span>Upload image (optional)</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {form.image && (
            <p className="text-sm text-gray-500 mt-2">
              Selected: {form.image.name}
            </p>
          )}
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
          onClick={handleReviewSubmit}
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;
