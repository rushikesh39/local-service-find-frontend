// src/routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Booking from "../Pages/Booking";
import PrivateRoute from "../components/PrivateRoutes";
import ServiceList from "../pages/ServiceList";
import MyBookings from "../pages/MyBookings";
import VerifyOtp from "../pages/VerifyOtp";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/services" element={<ServiceList />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/booking"
        element={
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
