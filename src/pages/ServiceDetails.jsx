// src/pages/ServiceDetails.jsx

import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams(); // Service ID from URL

  // Dummy Service Data (later connect from API/Redux)
  const service = {
    id: id,
    title: "Plumbing Service",
    description:
      "Get professional plumbing services for your home or office. From leaking taps to full installations.",
    price: "Starts at ₹499",
    rating: 4.5,
    provider: "Amit Plumbing Solutions",
    location: "Pune, Maharashtra",
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8">
        
        {/* Title and Info */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{service.title}</h1>
        <p className="text-gray-600 mb-6">{service.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Info */}
          <div>
            <p className="text-xl font-semibold text-gray-700 mb-2">Provided by:</p>
            <p className="text-gray-800 mb-4">{service.provider}</p>

            <p className="text-xl font-semibold text-gray-700 mb-2">Location:</p>
            <p className="text-gray-800 mb-4">{service.location}</p>

            <p className="text-xl font-semibold text-gray-700 mb-2">Starting Price:</p>
            <p className="text-gray-800 mb-4">{service.price}</p>

            <p className="text-xl font-semibold text-gray-700 mb-2">Rating:</p>
            <p className="text-yellow-500 text-lg">⭐ {service.rating} / 5</p>
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center items-center">
            <img
              src="/assets/plumber-service.jpg"
              alt="Service"
              className="w-full h-64 object-cover rounded-md"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition">
            Book Service
          </button>
        </div>

      </div>
    </div>
  );
};

export default ServiceDetails;
