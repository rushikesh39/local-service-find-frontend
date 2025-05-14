import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    password: "",
    role: "user",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateContact = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    return emailRegex.test(form.contact) || mobileRegex.test(form.contact);
  };

  const validatePassword = () => {
    // At least 6 characters, includes one letter and one number/special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[\d\W]).{6,}$/;
    return passwordRegex.test(form.password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.contact || !form.password) {
      return setError("All fields are required.");
    }

    if (!validateContact()) {
      return setError("Enter valid email or 10-digit mobile number.");
    }

    if (!validatePassword()) {
      return setError(
        "Password must be at least 6 characters and include letters and numbers or special characters."
      );
    }

    const fakeOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", fakeOtp);

    navigate("/verify-otp", { state: { form, otp: fakeOtp } });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

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
          name="contact"
          placeholder="Email or Mobile"
          value={form.contact}
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
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
        >
          Send OTP
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
