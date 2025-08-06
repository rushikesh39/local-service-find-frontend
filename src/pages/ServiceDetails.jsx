import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const services = useSelector((state) => state.services.services);
  const user = useSelector((state) => state.user.user);

  console.log(services)
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const found = services.find((s) => s._id === id);
    setService(found || null);
    setLoading(false);
  }, [id, services]);

  const handleBookNow = () => {
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

  if (!service) {
    return (
      <div className="text-center mt-10 text-red-600 min-h-[90vh]">
        Service not found.
      </div>
    );
  }

  return (
    <div className="max-w-5xl min-h-[85vh] mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10 mb-10 flex flex-col md:flex-row gap-8">
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

      <div className="md:w-1/2 flex flex-col ">
        <div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{service.name}</h1>
          <p className="text-gray-600 mb-2">
            <strong>Location:</strong> {service.location}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Category:</strong> {service.category}
          </p>
          <p className="text-gray-600 mb-4">
            <strong>Price:</strong> ₹{service.price}
          </p>
          <p className="text-gray-700 whitespace-pre-line">{service.description}</p>
        </div>

        
      </div>
    </div>
  );
};

export default ServiceDetail;
