import axiosInstance from "../../../lib/axiosInstance";


export const registerUserApi = async (payload) => {
    const response = await axiosInstance.post("/auth/register", payload);
    return response.data;
};

export const sendOtpApi = async (payload) => {
    const response = await axiosInstance.post("/auth/send-otp", payload);
    return response.data;
};

export const verifyOtpApi = async (payload) => {
    const response = await axiosInstance.post("/auth/verify-otp", payload);
    return response.data;
};

export const loginApi = async (payload) => {
    const response = await axiosInstance.post("/auth/login", payload);
    return response.data;
};