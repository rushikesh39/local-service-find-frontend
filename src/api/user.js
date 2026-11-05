import axiosInstance from "../lib/axiosInstance";

export const getUserDetails = async () => {
    const response = await axiosInstance.get("/get-user-details");
    return response.data;
};