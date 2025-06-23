import axiosInstance from "./axiosInstance";
// Sends signup data and receives backend-generated OTP or confirmation
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
  const response = await axiosInstance.post("/users/verify-otp", {
    email,
    otp,
  });
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
export const updateServices = async (serviceId, userData) => {
  const response = await axiosInstance.put(
    `/services/update/${serviceId}`,
    userData
  );
  return response.data;
};
export const deleteServices = async (serviceId) => {
  const response = await axiosInstance.delete(`/services/delete/${serviceId}`);
  return response.data;
};
export const getServiceById = async (serviceId) => {
  const response = await axiosInstance.get(
    `services/provider/service/${serviceId}`
  );
  return response.data;
};
export const getProviderBookings = async () => {
  const response = await axiosInstance.get(`booking/provider/get-booking/`);
  return response.data;
};
export const servicesList = async () => {
  const response = await axiosInstance.get(`services`);
  return response.data;
};
export const createBooking = async ({
  serviceId,
  name,
  mobile,
  scheduledDate,
  address,
  notes,
}) => {
  const response = await axiosInstance.post(`booking/book`, {
    serviceId,
    name,
    mobile,
    scheduledDate,
    address,
    notes,
  });
  return response.data;
};
export const getUserBooking = async () => {
  const response = await axiosInstance.get(`booking/user/get-booking/`);
  return response.data;
};