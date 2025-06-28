import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { verifyOtp, sendOtp } from "../api/auth";
import Swal from "sweetalert2";

const VerifyOtp = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(30); // cooldown

  const inputRefs = useRef([]);
  const { data } = state || {};

  if (!data) {
    return (
      <div className="text-center mt-10 text-red-600">
        Invalid OTP session. Go back to Sign Up.
      </div>
    );
  }

  // Countdown timer for resend
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (!value && index > 0) inputRefs.current[index - 1]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return setError("Please enter full 6-digit OTP");

    setLoading(true);
    setError("");
    try {
      await verifyOtp(data.user.email, fullOtp);

      // Store token
      localStorage.setItem("token", data.token);
      dispatch(
        loginUser({
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          token: data.token,
        })
      );

      await Swal.fire({
        icon: "success",
        title: "Email Verified",
        text: "Your account has been successfully verified.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/services");
    } catch (err) {
      const msg = err.response?.data?.message || "OTP verification failed.";
      Swal.fire("Verification Failed", msg, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResending(true);
    setError("");
    setMessage("");
    try {
      await sendOtp(data.user.email);
      setMessage("OTP has been resent to your email.");
      setOtp(["", "", "", "", "", ""]);
      setTimer(30);
      inputRefs.current[0].focus();
    } catch (err) {
      Swal.fire("Error", "Failed to resend OTP. Try again.", "error");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-[70vh] m-2 flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-blue-600 text-sm mb-4">{message}</p>}

        <div className="flex justify-between mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-10 h-12 text-center text-lg border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Verifying..." : "Verify & Sign Up"}
        </button>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resending || timer > 0}
            className="text-blue-600 hover:underline text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resending
              ? "Resending OTP..."
              : timer > 0
              ? `Resend OTP in ${timer}s`
              : "Resend OTP"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
