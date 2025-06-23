import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { verifyOtp } from "../api/auth"; // Adjust path

const VerifyOtp = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enteredOtp, setEnteredOtp] = useState("");
  const [error, setError] = useState("");

  const { data } = state;

  if (!data) {
    return <div className="text-center mt-10 text-red-600">Invalid OTP session. Go back to Sign Up.</div>;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyOtp(data.user.email, enteredOtp);
       localStorage.setItem("token", data.token);
      // OTP matched, user verified
       dispatch(loginUser({ name:data.user.name, email:data.user.name,role:data.user.role,token:data.token }));
      navigate("/services");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <input
          type="text"
          placeholder="Enter OTP"
          value={enteredOtp}
          onChange={(e) => setEnteredOtp(e.target.value)}
          className="w-full mb-4 p-3 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
        >
          Verify & Sign Up
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
