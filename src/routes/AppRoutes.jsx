// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ContactUs from "../pages/ContactUs";
import SearchResults from "../pages/SearchResults";
import ErrorPage from "../pages/ErrorPage";

// Auth Pages
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import SocialAuthSuccess from "../pages/SocialAuthSuccess";

// User Pages
import ServiceList from "../pages/ServiceList";
import ServiceDetail from "../pages/ServiceDetails";
import BookingModal from "../pages/BookingModal";
import MyBookings from "../pages/MyBookings";

// Provider Dashboard
// import PrivateRoute from "../components/PrivateRoutes";
import DashboardLayout from "../features/dashboard/layout/DashboardLayout";
import ProviderDashboard from "../features/dashboard/pages/ProviderDashboard";
import Profile from "../pages/Profile";

import AdminLayout from "../features/dashboard/layout/DashboardLayout";
import AdminDashboard from "../features/dashboard/pages/AdminDashboard";
// import UsersManagement from "../features/dashboard/pages/UsersManagement";
// import ProvidersManagement from "../features/dashboard/pages/ProvidersManagement";
// import ServicesManagement from "../features/dashboard/pages/ServicesManagement";
// import BookingsManagement from "../features/dashboard/pages/BookingsManagement";
// import PaymentsManagement from "../features/dashboard/pages/PaymentsManagement";
// import SettingsManagement from "../features/dashboard/pages/SettingsManagement";
// import Unauthorized from "../pages/Unauthorized";


import PermissionRoute from "@/components/comman/PermissionRoute";
import PublicLayout from "@/components/layout/PublicLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/search-results" element={<SearchResults />} />
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/api/social-auth-success" element={<SocialAuthSuccess />} />

        {/* User Routes */}
        <Route path="/services" element={<ServiceList />} />
        <Route path="/service/:id" element={<ServiceDetail />} />
        <Route path="/book/:serviceId" element={<BookingModal />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />
      </Route>



      {/* RBAC Routes */}

      {/* <Route
        path="/super-admin"
        element={
          <PermissionRoute permission="super_admin:dashboard">
            <DashboardLayout />
          </PermissionRoute>
        }
      >
        <Route index element={<SuperAdminDashboard />} />

        <Route
          path="users"
          element={
            <PermissionRoute permission="users:read">
              <UsersList />
            </PermissionRoute>
          }
        />
      </Route> */}

      <Route

        path="/admin"
        element={
          <PermissionRoute permission="dashboard:admin">
            <DashboardLayout />
          </PermissionRoute>
        }
      >
        <Route index element={<AdminDashboard />} />

        <Route
          path="users"
          element={
            <PermissionRoute permission="users:read">
              {/* <UsersList /> */}
            </PermissionRoute>
          }
        />
      </Route>
      <Route
        path="/provider"
        element={
          <PermissionRoute permission="dashboard:provider">
            <DashboardLayout />
          </PermissionRoute>
        }
      >
        <Route index element={<ProviderDashboard />} />

        <Route
          path="dashboard"
          element={
            <PermissionRoute permission="users:read">
              {/* <UsersList /> */}
            </PermissionRoute>
          }
        />
      </Route>

      {/* 404 Catch All */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
