import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { getServiceById } from "../api/auth";
import {
  MapPin,
  IndianRupee,
  Wrench,
  BadgeCheck,
  Clock,
  Phone,
  ShieldCheck,
  CalendarDays,
  Timer,
  User,
} from "lucide-react";

// ⭐ Star Rating Renderer
const renderStars = (rating) => {
  if (!rating || rating <= 0) {
    return (
      <span className="text-sm text-gray-500 italic">No rating available</span>
    );
  }

  const stars = [];
  const fullStars = Math.floor(rating);
  const decimal = parseFloat((rating - fullStars).toFixed(1));
  const totalStars = 5;

  const getFillPercent = (decimal) => {
    if (decimal >= 0.5) return 100;
    if (decimal >= 0.4) return 80;
    if (decimal >= 0.3) return 60;
    if (decimal >= 0.2) return 40;
    if (decimal >= 0.1) return 20;
    return 0;
  };

  const fillPercent = getFillPercent(decimal);

  for (let i = 1; i <= totalStars; i++) {
    if (i <= fullStars) {
      stars.push(
        <svg
          key={i}
          className="w-6 h-6 text-yellow-500"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21L16.55 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21L12 17.27Z" />
        </svg>
      );
    } else if (i === fullStars + 1 && fillPercent > 0) {
      stars.push(
        <svg key={i} className="w-6 h-6 text-yellow-500" viewBox="0 0 24 24">
          <defs>
            <linearGradient id={`grad-${rating}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${fillPercent}%`} stopColor="#facc15" />
              <stop offset={`${fillPercent}%`} stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#grad-${rating})`}
            d="M12 17.27L18.18 21L16.55 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21L12 17.27Z"
          />
        </svg>
      );
    } else {
      stars.push(
        <svg
          key={i}
          className="w-6 h-6 text-gray-300"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 17.27L18.18 21L16.55 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.45 13.97L5.82 21L12 17.27Z" />
        </svg>
      );
    }
  }

  return (
    <div className="flex items-center gap-2">
      {stars}
      <span className="text-sm text-gray-600 font-medium">
        {rating.toFixed(1)}/5
      </span>
    </div>
  );
};

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getServiceById(id);
        console.log(data)
        setService(data.service);
        setReviews(data.filteredReviews || []);
        setRecommended(data.recommended || []);
      } catch (err) {
        setError(err.message || "Failed to load service.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id]);

  const handleBookNow = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must be logged in to book this service.");
      navigate("/login");
    } else {
      navigate(`/book/${service._id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <HashLoader color="#155dfc" size={60} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600 min-h-[90vh]">{error}</div>
    );
  }

  if (!service) {
    return (
      <div className="text-center mt-10 text-red-600 min-h-[90vh]">
        Service not found.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 mb-16">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-96 object-cover rounded-xl shadow-md"
          />

          {/* Provider Info Card */}
          <div className="bg-gray-50 rounded-xl shadow p-4 space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Provider Information
            </h2>
            <p className="flex items-center gap-2 text-gray-700">
              <BadgeCheck className="w-5 h-5 text-green-600" /> Verified Provider
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Phone className="w-5 h-5 text-blue-500" /> +91 9876543210
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-purple-500" /> Mon - Sat (9 AM - 8 PM)
            </p>
          </div>

          <button
            onClick={handleBookNow}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-xl transition text-lg font-semibold shadow"
          >
            Book Now
          </button>
        </div>

        {/* Right Section */}
        <div className="md:w-1/2 flex flex-col gap-6">
          <h1 className="text-4xl font-bold text-gray-900">{service.name}</h1>

          {/* Category */}
          <p className="text-gray-600 text-lg flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-500" /> {service.category}
          </p>

          {/* Rating */}
          <div className="flex items-center mt-1">
            {renderStars(service.rating || 0)}
            <span className="ml-2 text-gray-500 text-sm">
              ({reviews.length} reviews)
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-700">
            <MapPin className="w-5 h-5 text-red-500" /> {service.location}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 text-2xl font-bold text-green-700">
            <IndianRupee className="w-6 h-6" />
            {service.price}
          </div>

          {/* Service Details */}
          <div className="text-gray-700">
            <h2 className="text-xl font-semibold mb-2">Service Details</h2>
            <p className="leading-relaxed">{service.description}</p>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-xl p-4 shadow">
            <p className="flex items-center gap-2 text-gray-700">
              <Timer className="w-5 h-5 text-orange-500" /> Duration: 2-3 hrs
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <CalendarDays className="w-5 h-5 text-blue-500" /> Available: Mon-Sat
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <ShieldCheck className="w-5 h-5 text-green-500" /> 30-day Warranty
            </p>
            <p className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-purple-500" /> Express Service Available
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10 bg-gray-50 rounded-2xl p-6 shadow">
        <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl shadow-sm">
                <p className="font-semibold">{review.userId?.name || "Anonymous"}</p>
                {renderStars(review.rating || 0)}
                <p className="text-gray-700 mt-1">{review.reviewText}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">No reviews yet.</p>
        )}
      </div>

      {/* Recommended Services */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Recommended Services</h2>
        {recommended.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommended.map((rec) => (
              <div
                key={rec._id}
                onClick={() => navigate(`/service/${rec._id}`)}
                className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition"
              >
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2">{rec.name}</h3>
                <p className="text-gray-600">{rec.category}</p>
                <p className="text-gray-500">{rec.location}</p>
                <div className="flex justify-between items-center mt-2">
                  {renderStars(rec.rating || 0)}
                  <span className="flex items-center gap-1 text-black font-medium">
                    <IndianRupee size={16} /> {rec.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 italic">No recommendations available.</p>
        )}
      </div>
    </div>
  );
};

export default ServiceDetail;
