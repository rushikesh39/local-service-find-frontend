import { HashLoader } from "react-spinners";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ServiceCard from "./ServiceCard";
import { servicesList } from "../api/auth"; // API to get all services
import { setServices } from "../redux/servicesSlice";

const ServicesList = () => {
  const [loading, setLoading] = useState(true);

  const { category } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const services = useSelector((state) => state.services.services);
  console.log("services", services);
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await servicesList();
      dispatch(setServices(res.services));
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(false);
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
    <div className="py-10 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center capitalize">
        {category} Services
      </h1>

      {loading ? (
      <div className="flex justify-center items-center min-h-[50vh]">
        <HashLoader color="#2563EB"  size={60} />
      </div>
    ) : services.length === 0 ? (
      <p className="text-center text-gray-500">
        No services available for this category.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto ">
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
