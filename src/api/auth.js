import axiosInstance from "./axiosInstance";
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/users/register", userData);
  return response.data; // Should contain backend OTP or message
};

export const sendOtp = async (email) => {
  const response = await axiosInstance.post("/users/send-otp", { email });
  console.log(email);
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await axiosInstance.post("/users/verify-otp", { email, otp, });
  return response.data;
};

export const login = async (userData) => {
  const response = await axiosInstance.post("/users/login", userData);
  return response.data;
};
export const addNewServices = async (userData) => {
  const response = await axiosInstance.post("/services/add", userData);
  return response.data;
};
export const getServices = async (providerId) => {
  const response = await axiosInstance.get(`/services/provider/${providerId}`);
  return response.data;
};
export const searchServices = async (query, location) => {
  const response = await axiosInstance.get(`/providers/search`, {
    params: {location, query,},
  });
  return response.data;
};
export const updateStatus = async (serviceId) => {
  const response = await axiosInstance.put(`/services/update-status/`,{serviceId});
  return response.data;
};
export const getServiceById = async (serviceId) => {
  const response = await axiosInstance.get(`services/${serviceId}`);
  return response.data;
};
export const getProviderBookings = async () => {
  const response = await axiosInstance.get(`booking/provider/get-booking/`);
  return response.data;
};
export const todaysBookings = async () => {
  const response = await axiosInstance.get(`booking/provider/todays-booking/`);
  return response.data;
};
export const servicesList = async () => {
  const response = await axiosInstance.get(`services`);
  return response.data;
};

export const createBooking = async ({serviceId, name, mobile, scheduledDate, address, notes,}) => {
  const response = await axiosInstance.post(`booking/book`, {serviceId, name, mobile,scheduledDate,  address,notes});
  return response.data;
};
export const getUserBooking = async () => {
  const response = await axiosInstance.get(`booking/user/get-booking/`);
  return response.data;
};

export const updateBookingStatus = async (id, newStatus) => {
  const response = await axiosInstance.patch(`booking/provider/update-booking-status/`,{id,newStatus});
  return response.data;
};
export const dashboardStats = async () => {
  const response = await axiosInstance.get(`booking/provider/dashboard-starts/`);
  return response.data;
};
export const popularServices = async () => {
  const response = await axiosInstance.get(`services/popular-services`);
  return response.data;
};
export const topRatedServices = async () => {
  const response = await axiosInstance.get(`services/top-rated-services`);
  return response.data;
};
export const contact_us = async (userData) => {
  const response = await axiosInstance.post("/users/contact-us", userData);
  return response.data; // Should contain backend OTP or message
};
export const updateProviderProfile = async (userData) => {
  const response = await axiosInstance.post("/users/update-profile", userData);
  return response.data; // Should contain backend OTP or message
};
export const submitReview = async (formData) => {
  const response = await axiosInstance.post("/reviews/submit", formData);
  return response.data;
};