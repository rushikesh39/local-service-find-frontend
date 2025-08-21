import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { getServiceById } from "../api/auth"; // ✅ correct file

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getServiceById(id);
        setService(data.service);
        console.log(data)
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
      <div className="text-center mt-10 text-red-600 min-h-[90vh]">
        {error}
      </div>
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
    <div className="max-w-5xl min-h-[85vh] mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 mb-10 flex flex-col md:flex-row gap-8">
      {/* Left Section */}
      <div className="md:w-1/2">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-72 object-cover rounded-lg shadow"
        />
        <button
          onClick={handleBookNow}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition text-lg font-medium"
        >
          Book Now
        </button>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 flex flex-col">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{service.name}</h1>
        <p className="text-gray-600 mb-2">
          <strong>Location:</strong> {service.location}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Category:</strong> {service.category}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Price:</strong> ₹{service.price}
        </p>

        {/* Show Ratings if backend sends them */}
        {service.averageRating !== undefined && (
          <p className="text-gray-600 mb-4">
            <strong>Rating:</strong> {service.averageRating} ⭐ (
            {service.totalReviews} reviews)
          </p>
        )}

        <p className="text-gray-700 whitespace-pre-line">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceDetail;
