import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import {jwtDecode} from "jwt-decode";
const baseURL = import.meta.env.VITE_API_BASE_URL;


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;

    if (!emailRegex.test(form.email)) {
      setError("Invalid email format");
      return false;
    }
    if (!passwordRegex.test(form.password)) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const data = await login(form); // { token: "..." }
      console.log(data);
      if (data) {
         const decoded = jwtDecode(data.token)
        dispatch(loginUser({ name:decoded.name, email: decoded.email,role:decoded.role,token:data.token }));
        navigate("/services");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${baseURL}/auth/google`;
   
  };

  const handleFacebookLogin = () => {
    window.location.href = `${baseURL}/auth/facebook`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full border border-gray-300 flex items-center justify-center gap-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </button>

          <button
            onClick={handleFacebookLogin}
            className="w-full border border-gray-300 flex items-center justify-center gap-3 py-2 rounded-md hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/448224/facebook.svg"
              alt="Facebook"
              className="w-5 h-5"
            />
            <span>Continue with Facebook</span>
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          I don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
