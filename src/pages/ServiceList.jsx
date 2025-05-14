import { useParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { use, useState } from "react";
import { useDispatch } from "react-redux";
import { addBooking } from "../redux/bookingSlice";
import dummyServices from "../data/services.json";
import ServiceCard from "./ServiceCard";
import BookingModal from "./BookingModal";

const ServicesList = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState({ name: "", date: "", time: "", notes: "" });
  // const [isLoggedIn, setIsLoggedIn] = useState(true); // State to check login status
  const user = useSelector((state) => state.user.user); 
  console.log(user)

  const handleBookNow = (service) => {
    if (!user) {
      alert("You must be logged in to book a service!");
      navigate("/login");
      return;
    }
    setSelectedService(service);
  };

  const handleClose = () => {
    setSelectedService(null);
    setFormData({ name: "", date: "", time: "", notes: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingDetails = {
      ...formData,
      service: selectedService.name,
      timestamp: new Date().toISOString(),
    };
    dispatch(addBooking(bookingDetails));
    alert(`Booking confirmed for ${selectedService.name}`);
    handleClose();
  };

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev); // Toggle login state for testing purposes
  };

  return (
    <div className="py-10 px-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center capitalize">
        {category} Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {dummyServices.map((service) => (
          <ServiceCard key={service.id} service={service} onBookNow={handleBookNow} />
        ))}
      </div>

      {/* Booking Modal */}
      {selectedService && (
        <BookingModal
          selectedService={selectedService}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default ServicesList;
