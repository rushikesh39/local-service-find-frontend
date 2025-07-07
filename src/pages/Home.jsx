import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapPin, Wrench } from "lucide-react";
import Swal from "sweetalert2";
import { popularServices } from "../api/auth";

const Home = () => {
  const navigate = useNavigate();
  const [serviceQuery, setServiceQuery] = useState("");
  const [location, setLocation] = useState("");
  const [popular, setPopular] = useState([]);

  const loadPopularServices = async () => {
    try {
      const data = await popularServices();
      console.log(data);
      setPopular(data);
    } catch (err) {
      console.error("Error fetching popular services", err);
    } finally {
      // setLoadingPopular(false);
    }
  };

  useEffect(() => {
    loadPopularServices();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!serviceQuery.trim() || !location.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Missing Input",
        text: "Please enter both service and location to search.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    // ✅ FIX: used correct variable `serviceQuery`
    navigate(
      `/search-results?location=${encodeURIComponent(
        location
      )}&query=${encodeURIComponent(serviceQuery)}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
            Find Local Services Near You!
          </h1>
          <p className="text-lg sm:text-xl mb-10 text-white/90">
            Connect with trusted professionals for your home, office, and
            personal needs.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center justify-center max-w-3xl mx-auto mt-8 gap-y-3 sm:gap-x-3"
          >
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Service (e.g. plumber, electrician)"
                value={serviceQuery}
                onChange={(e) => setServiceQuery(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full text-gray-800 shadow focus:outline-none focus:ring-1 focus:ring-blue-800 bg-white"
              />
              <Wrench className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Location (e.g. Pune)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-full text-gray-800 shadow focus:outline-none focus:ring-1 focus:ring-blue-800 bg-white"
              />
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold shadow"
            >
              Search
            </button>
          </form>

          <div className="mt-8">
            <Link
              to="/services"
              className="inline-block mt-4 sm:mt-6 bg-white text-blue-600 font-medium px-6 py-3 rounded-md shadow-md hover:bg-gray-100 transition"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="max-w-7xl mx-auto py-12 px-4 ">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Popular Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {popular.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1 p-5 flex flex-col items-center text-center"
            >
              <div className="">
                <img src={service.image} alt={service.name} className="h-30 " />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">
                {service.name}
              </h3>
              {service.category && (
                <p className="text-sm text-gray-500 mt-1">{service.category}</p>
              )}
              <span className="mt-3 inline-block text-xs text-blue-500 font-medium uppercase tracking-wide">
                {service.count || 0} Bookings
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Services Section */}
      <section className="bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Top Rated Professionals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((provider) => (
              <div
                key={provider}
                className="bg-gray-200 p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src="#"
                  alt="Top Provider"
                  className="h-24 w-24 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold text-center text-gray-700">
                  John Doe {provider}
                </h3>
                <p className="text-center text-sm text-gray-500">Electrician</p>
                <div className="flex justify-center mt-2 text-yellow-500">
                  ★★★★★
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
