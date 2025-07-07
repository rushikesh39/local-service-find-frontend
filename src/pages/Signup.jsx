import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, sendOtp } from "../api/auth";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!form.name.trim()) tempErrors.name = "Full name is required.";
    if (!form.email.trim()) tempErrors.email = "Email or mobile is required.";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!emailRegex.test(form.email) && !mobileRegex.test(form.email)) {
      tempErrors.email = "Enter a valid email or mobile number.";
    }

    if (!form.password) {
      tempErrors.password = "Password is required.";
    } else if (!/^(?=.*[A-Za-z])(?=.*[\d\W]).{6,}$/.test(form.password)) {
      tempErrors.password =
        "Password must be at least 6 characters and include letters and numbers or special characters.";
    }

    if (!form.confirmPassword) {
      tempErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const data = await registerUser(form);
      if (data?.user) {
        await sendOtp(form.email);
        Swal.fire("Success", "OTP sent to your email.", "success");
        navigate("/verify-otp", { state: { data } });
      }
    } catch (err) {
      const res = err?.response;
      if (res?.status === 403 && res.data?.unverified) {
        await sendOtp(form.email);
        Swal.fire("Note", "Account already registered but not verified. OTP resent.", "info");
        navigate("/verify-otp", {
          state: { data: { user: res.data.user, token: "" } },
        });
      } else {
        Swal.fire("Error", res?.data?.message || "Registration failed.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Full Name */}
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            type="text"
            name="email"
            placeholder="Email or Mobile"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border rounded pr-12"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Role Selection */}
        <div className="mb-4">
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          >
            <option value="user">Customer</option>
            <option value="provider">Service Provider</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
