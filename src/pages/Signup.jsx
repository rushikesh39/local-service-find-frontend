import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import Swal from "sweetalert2";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    emailOrMobile: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  const isMobile = (value) => /^[6-9]\d{9}$/.test(value);

  const validateForm = () => {
    let temp = {};

    if (!form.name.trim()) temp.name = "Full name is required.";
    if (!form.emailOrMobile.trim())
      temp.emailOrMobile = "Email or mobile number is required.";

    const input = form.emailOrMobile.trim();
    const isEmailValid = isEmail(input);
    const isMobileValid = isMobile(input);

    if (!isEmailValid && !isMobileValid)
      temp.emailOrMobile = "Enter a valid email or 10-digit mobile number.";

    if (isEmailValid) {
      if (!form.password)
        temp.password = "Password is required for email registration.";
      else if (!/^(?=.*[A-Za-z])(?=.*[\d\W]).{6,}$/.test(form.password))
        temp.password =
          "Password must be at least 6 characters and include letters and numbers.";
      if (!form.confirmPassword)
        temp.confirmPassword = "Please confirm your password.";
      else if (form.password !== form.confirmPassword)
        temp.confirmPassword = "Passwords do not match.";
    }

    setErrors(temp);
    return Object.keys(temp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const input = form.emailOrMobile.trim();
    const isEmailValid = isEmail(input);
    const isMobileValid = isMobile(input);

    const payload = {
      name: form.name,
      role: form.role,
      ...(isEmailValid
        ? { email: input, password: form.password }
        : { mobile: input }),
    };

    setLoading(true);
    console.log("payload",payload)
    try {
      const data = await registerUser(payload);
      console.log("Register response:", data);

      // ✅ NEW USER SUCCESS
      if (data?.userId || data?.success) {
        await Swal.fire("Success", "OTP sent successfully!", "success");
        navigate("/verify-otp", {
          state: {
            email: payload.email || null,
            mobile: payload.mobile || null,
          },
        });
      }
    } catch (err) {
      const res = err?.response;
      console.log("Error response:", res);

      // ⚠️ ALREADY REGISTERED BUT NOT VERIFIED
      if (res?.status === 409 && res.data?.unverified) {
        await Swal.fire(
          "Note",
          "Account already registered but not verified. OTP resent.",
          "info"
        );
        navigate("/verify-otp", {
          state: {
            email: payload.email || null,
            mobile: payload.mobile || null,
          },
        });
      }
      // ✅ ALREADY VERIFIED
      else if (res?.status === 409 && res.data?.isVerified) {
        await Swal.fire("Note", "Account already registered.", "info");
        navigate("/login");
      }
      // ❌ OTHER ERRORS
      else {
        await Swal.fire(
          "Error",
          res?.data?.message || "Registration failed. Please try again.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const input = form.emailOrMobile.trim();
  const isEmailValid = isEmail(input);
  const isMobileValid = isMobile(input);

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
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email or Mobile */}
        <div className="mb-4">
          <div className="flex">
            {isMobileValid && (
              <span className="px-3 py-3 bg-gray-200 border border-r-0 rounded-l">
                +91
              </span>
            )}
            <input
              type="text"
              name="emailOrMobile"
              placeholder="Email or Mobile Number"
              value={form.emailOrMobile}
              onChange={handleChange}
              className={`w-full p-3 border rounded ${
                isMobileValid ? "rounded-l-none" : ""
              }`}
            />
          </div>
          {errors.emailOrMobile && (
            <p className="text-red-500 text-sm mt-1">{errors.emailOrMobile}</p>
          )}
        </div>

        {/* Password Fields (Only if Email) */}
        {isEmailValid && (
          <>
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
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

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
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </>
        )}

        {/* Role */}
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
