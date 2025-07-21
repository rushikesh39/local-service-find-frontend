// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import SearchResults from "../pages/SearchResults";
import ErrorPage from "../pages/ErrorPage";

// Auth Pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyOtp from "../pages/VerifyOtp";
import SocialAuthSuccess from "../pages/SocialAuthSuccess";

// User Pages
import ServiceList from "../pages/ServiceList";
import ServiceDetail from "../pages/ServiceDetails";
import BookingModal from "../pages/BookingModal";
import MyBookings from "../pages/MyBookings";

// Provider Dashboard
import PrivateRoute from "../components/PrivateRoutes";
import DashboardLayout from "../pages/provider/DashboardLayout";
import ProviderDashboard from "../pages/provider/ProviderDashboard";
import Services from "../pages/provider/Services";
import AddNewService from "../pages/provider/AddNewService";
import UpdateServiceForm from "../pages/provider/UpdateService";
import ProviderBookings from "../pages/provider/ProviderBookings";
import ProviderNotFound from "../pages/provider/ProviderNotFound";
import Profile from "../pages/Profile";
import ProviderProfile from "../pages/provider/ProviderProfile";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/search-results" element={<SearchResults />} />
      <Route path="*" element={<ErrorPage/>} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/api/social-auth-success" element={<SocialAuthSuccess />} />

      {/* User Routes */}
      <Route path="/services" element={<ServiceList />} />
      <Route path="/service/:id" element={<ServiceDetail />} />
      <Route path="/book/:serviceId" element={<BookingModal />} />
      <Route path="/my-bookings" element={<MyBookings />} />      
       <Route path="/profile" element={<Profile/>} />

      {/* Provider Dashboard - Protected Routes */}
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
         <Route path="profile" element={<ProviderProfile />} />
        <Route path="*" element={<ProviderNotFound />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
