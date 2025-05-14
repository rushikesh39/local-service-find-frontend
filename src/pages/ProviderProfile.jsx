// src/pages/ProviderProfile.jsx

import { useParams } from "react-router-dom";

const ProviderProfile = () => {
  const { id } = useParams(); // Provider ID from URL

  // Dummy Provider Data (Later fetch from API/Redux)
  const provider = {
    id: id,
    name: "Amit Plumbing Solutions",
    bio: "We provide top-notch plumbing services with 10+ years of experience.",
    location: "Pune, Maharashtra",
    services: [
      { id: 1, title: "Tap Installation", price: "₹299" },
      { id: 2, title: "Pipe Repair", price: "₹499" },
      { id: 3, title: "Bathroom Renovation", price: "₹1499" },
    ],
    rating: 4.7,
    reviews: 56,
    photo: "/assets/provider-photo.jpg", // Replace with real images later
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="bg-white shadow-lg rounded-lg p-8">

        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          
          {/* Profile Image */}
          <img
            src={provider.photo}
            alt="Provider"
            className="w-40 h-40 rounded-full object-cover"
          />

          {/* Profile Info */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{provider.name}</h1>
            <p className="text-gray-600 mt-2">{provider.bio}</p>
            <p className="text-gray-700 mt-4">
              📍 {provider.location}
            </p>
            <p className="text-yellow-500 mt-2 text-lg">
              ⭐ {provider.rating} / 5 ({provider.reviews} reviews)
            </p>
          </div>

        </div>

        {/* Services Offered */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Services Offered</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {provider.services.map((service) => (
              <div key={service.id} className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">{service.title}</h3>
                <p className="text-gray-800">{service.price}</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
                  Book Now
                </button>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProviderProfile;
