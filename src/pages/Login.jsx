import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login, sendOtp } from "../api/auth";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", mobile: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginMode, setLoginMode] = useState("email"); // "email" | "mobile"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const tempErrors = {};

    if (loginMode === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^.{6,}$/;

      if (!form.email) tempErrors.email = "Email is required";
      else if (!emailRegex.test(form.email)) tempErrors.email = "Invalid email address";

      if (!form.password) tempErrors.password = "Password is required";
      else if (!passwordRegex.test(form.password))
        tempErrors.password = "Password must be at least 6 characters";
    }

    if (loginMode === "mobile") {
      const mobileRegex = /^[6-9]\d{9}$/;
      if (!form.mobile) tempErrors.mobile = "Mobile number is required";
      else if (!mobileRegex.test(form.mobile))
        tempErrors.mobile = "Invalid mobile number";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // ✅ Handle Email/Password login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await login({ email: form.email, password: form.password });
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

  // ✅ Handle Mobile Login (send OTP)
  const handleMobileLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await sendOtp(undefined, form.mobile); // first param skipped using undefined

      Swal.fire({
        title: "OTP Sent",
        text: "We’ve sent an OTP to your mobile number.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/verify-otp", { state: { mobile: form.mobile } });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text:
          err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to send OTP.",
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

        {/* Toggle Login Mode */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            onClick={() => setLoginMode("email")}
            className={`px-4 py-2 rounded-md ${
              loginMode === "email"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Email Login
          </button>
          <button
            type="button"
            onClick={() => setLoginMode("mobile")}
            className={`px-4 py-2 rounded-md ${
              loginMode === "mobile"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Mobile Login
          </button>
        </div>

        {/* Email Login Form */}
        {loginMode === "email" && (
          <form onSubmit={handleEmailLogin} className="space-y-6">
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

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md transition hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        )}

        {/* Mobile Login Form */}
        {loginMode === "mobile" && (
          <form onSubmit={handleMobileLogin} className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.mobile ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your mobile number"
              />
              {errors.mobile && (
                <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

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
