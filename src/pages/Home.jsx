// src/pages/Home.jsx

import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Find Local Services Near You!
          </h1>
          <p className="text-lg mb-8">
            Connect with trusted professionals for your home, office, and personal needs.
          </p>

          {/* Search Bar */}
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search for plumber, electrician, tutor..."
              className="w-full max-w-md px-4 py-3 rounded-l-md focus:outline-none text-gray-800"
            />
            <button className="bg-yellow-400 text-gray-800 px-6 py-3 rounded-r-md hover:bg-yellow-500">
              Search
            </button>
          </div>

          {/* Call to Action */}
          <div className="mt-8">
            <Link
              to="/services"
              className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-100 transition"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {/* Example Category Cards */}
          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <img src="/assets/plumber.png" alt="Plumber" className="h-16 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Plumber</h3>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <img src="/assets/electrician.png" alt="Electrician" className="h-16 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Electrician</h3>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <img src="/assets/tutor.png" alt="Tutor" className="h-16 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Tutor</h3>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center hover:shadow-lg transition">
            <img src="/assets/cleaning.png" alt="Cleaning" className="h-16 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700">Cleaning</h3>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
