import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapPin, Wrench } from "lucide-react";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { popularServices, topRatedServices } from "../api/auth";
import ServiceCard from "./ServiceCard";

const Home = () => {
  const navigate = useNavigate();
  const [serviceQuery, setServiceQuery] = useState("");
  const [location, setLocation] = useState("");
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(true);
  const [loadingTopRated, setLoadingTopRated] = useState(true);

  const loadPopularServices = async () => {
    try {
      const data = await popularServices();
      setPopular(data);
    } catch (err) {
      console.error("Error fetching popular services", err);
    } finally {
      setLoadingPopular(false);
    }
  };
  const loadTopRatedServices = async () => {
    try {
      const data = await topRatedServices();
      setTopRated(data);
    } catch (err) {
      console.error("Error fetching popular services", err);
    } finally {
      setLoadingTopRated(false);
    }
  };

  useEffect(() => {
    loadPopularServices();
    loadTopRatedServices();
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

    navigate(
      `/search-results?location=${encodeURIComponent(
        location
      )}&query=${encodeURIComponent(serviceQuery)}`
    );
  };

  const handleBookNow = (service) => {
    navigate(`/book/${service._id}`);
  };

  const handleCardClick = (service) => {
    navigate(`/service/${service._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
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

      {/* Popular Services Section */}
      <section className="max-w-7xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Popular Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {loadingPopular
            ? Array(4)
                .fill()
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl shadow p-5 flex flex-col space-y-3 w-full"
                  >
                    <div className="w-full h-40">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="w-3/4 h-5">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="w-1/2 h-4">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="w-1/3 h-3">
                      <Skeleton width="100%" height="100%" />
                    </div>
                    <div className="w-full h-10">
                      <Skeleton width="100%" height="100%" />
                    </div>
                  </div>
                ))
            : popular.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onBookNow={handleBookNow}
                  onServiceNow={handleCardClick}
                />
              ))}
        </div>
      </section>

      {/* Top Rated Professionals Section */}
      <section className=" py-12 px-6">
        <div className="max-w-7xl mx-auto ">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Top Rated Professionals
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto ">
            {loadingPopular
              ? Array(4)
                  .fill()
                  .map((_, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl shadow p-5 flex flex-col space-y-3 w-full"
                    >
                      <div className="w-full h-40">
                        <Skeleton width="100%" height="100%" />
                      </div>
                      <div className="w-3/4 h-5">
                        <Skeleton width="100%" height="100%" />
                      </div>
                      <div className="w-1/2 h-4">
                        <Skeleton width="100%" height="100%" />
                      </div>
                      <div className="w-1/3 h-3">
                        <Skeleton width="100%" height="100%" />
                      </div>
                      <div className="w-full h-10">
                        <Skeleton width="100%" height="100%" />
                      </div>
                    </div>
                  ))
              : topRated.map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                    onBookNow={handleBookNow}
                    onServiceNow={handleCardClick}
                  />
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
