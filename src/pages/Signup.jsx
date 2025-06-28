import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, sendOtp } from "../api/auth";
import Swal from "sweetalert2";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    return emailRegex.test(form.email) || mobileRegex.test(form.email);
  };

  const validatePassword = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[\d\W]).{6,}$/;
    return passwordRegex.test(form.password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      Swal.fire("Error", "All fields are required.", "error");
      return;
    }

    if (!validateEmail()) {
      Swal.fire("Error", "Enter a valid email or mobile number.", "error");
      return;
    }

    if (!validatePassword()) {
      Swal.fire(
        "Error",
        "Password must be at least 6 characters and include letters and numbers or special characters.",
        "error"
      );
      return;
    }

    setLoading(true);

    try {
      const data = await registerUser(form);

      // ✅ New registration
      if (data?.user) {
        await sendOtp(form.email);
        Swal.fire("Success", "OTP sent to your email.", "success");
        navigate("/verify-otp", { state: { data } });
      }
    } catch (err) {
      const response = err?.response;
      const backendMessage = response?.data?.message;

      // ⚠️ Unverified user, allow re-verification
      if (
        response?.status === 403 &&
        response.data?.unverified &&
        response.data?.user
      ) {
        await sendOtp(form.email);
        Swal.fire("Note", "Account already registered but not verified. OTP resent.", "info");
        navigate("/verify-otp", {
          state: { data: { user: response.data.user, token: "" } },
        });
      } else {
        Swal.fire("Error", backendMessage || "Registration failed.", "error");
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

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email or Mobile"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded"
        >
          <option value="user">Customer</option>
          <option value="provider">Service Provider</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
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
