import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;

    if (!form.email) {
      tempErrors.email = "Email is required";
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = "Invalid email address";
    }

    if (!form.password) {
      tempErrors.password = "Password is required";
    } else if (!passwordRegex.test(form.password)) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await login(form);
      const decoded = jwtDecode(data.token);

      dispatch(
        loginUser({
          id: decoded.userId,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
          token: data.token,
        })
      );

      Swal.fire({
        title: "Login Successful",
        text: `Welcome back, ${decoded.name}!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/services");
    } catch (err) {
      Swal.fire({
        title: "Login Failed",
        text:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "An error occurred.",
        icon: "error",
      });
    } finally {
      setLoading(false);
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
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 bottom-[14px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot */}
          <div className="text-right text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Social login */}
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
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
