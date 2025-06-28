// src/pages/SocialAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import Swal from "sweetalert2";

const SocialAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const role = params.get("role");

    if (token && email) {
      dispatch(loginUser({ name, email, token, role }));
      localStorage.setItem("token", token);

      Swal.fire({
        title: "Login Successful",
        text: `Welcome back, ${name || "user"}!`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continue",
      }).then(() => {
        navigate("/services");
      });
    } else {
      Swal.fire({
        title: "Login Failed",
        text: "Could not log in with social account. Please try again.",
        icon: "error",
        confirmButtonText: "Go to Login",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [location, dispatch, navigate]);

  return (
    <div className="text-center mt-10 text-gray-600 text-lg">
      Logging you in via social account...
    </div>
  );
};

export default SocialAuthSuccess;
