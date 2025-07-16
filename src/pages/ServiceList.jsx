import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { servicesList } from "../api/auth";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import { setServices } from "../redux/servicesSlice";

const ServicesList = () => {
  const [loadingServices, setLoadingServices] = useState(true);

  const { category } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services.services);

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const res = await servicesList();
      dispatch(setServices(res.services));
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoadingServices(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [category]);

  const handleBookNow = (service) => {
    if (!user) {
      alert("You must be logged in to book a service!");
      navigate("/login");
      return;
    }

    navigate(`/book/${service._id}`);
  };

  const handleCardClick = (service) => {
    navigate(`/service/${service._id}`);
  };

  return (
    <div className="py-10 px-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center capitalize">
        {category} Services
      </h1>

      {loadingServices ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {Array(6)
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
            ))}
        </div>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">No services available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service) => (
            <ServiceCard
              key={service._id}
              service={service}
              onBookNow={handleBookNow}
              onServiceNow={handleCardClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesList;
