import axios from 'axios';
const baseURL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem("token"); 
console.log("token in axios intance",token)

const axiosInstance = axios.create({
  baseURL: baseURL, // Set in .env file
  headers: {
    Authorization: `Bearer ${token}`,
  },
  timeout: 10000,
});

export default axiosInstance;
