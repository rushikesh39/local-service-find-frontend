// src/routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Booking from "../pages/Booking";
import PrivateRoute from "../components/PrivateRoutes";
import ServiceList from "../pages/ServiceList";
import MyBookings from "../pages/MyBookings";
import VerifyOtp from "../pages/VerifyOtp";
import SocialAuthSuccess from "../pages/SocialAuthSuccess";
import ProviderDashboard from "../pages/provider/ProviderDashboard";
import DashboardLayout from "../pages/provider/DashboardLayout";
import Services from "../pages/provider/Services";
import ProviderNotFound from "../pages/provider/ProviderNotFound";
import AddNewService from "../pages/provider/AddNewService";
import UpdateServiceForm from "../pages/provider/UpdateService";
import ProviderBookings from "../pages/provider/ProviderBookings"
import BookingModal from "../pages/BookingModal";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about-us" element={<AboutUs/>} />
       <Route path="/contact-us" element={<ContactUs/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/book/:serviceId" element={<BookingModal />} />

      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/api/social-auth-success" element={<SocialAuthSuccess />} />
      <Route
        path="/provider"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<ProviderDashboard />} />
        <Route path="services" element={<Services />} />
        <Route path="services/add-new-service" element={<AddNewService />} />
        <Route path="services/update/:id" element={<UpdateServiceForm />} />
        <Route path="bookings" element={<ProviderBookings />} />
        <Route path="*" element={<ProviderNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
