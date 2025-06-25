// src/pages/SocialAuthSuccess.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";

const SocialAuthSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log("params",params.getAll)
    const token = params.get("token");
    const name = params.get("name");
    const email = params.get("email");
    const role = params.get("role");
    // console.log("data",token,name,email,role)

    if (token && email) {
      dispatch(loginUser({ name, email,token,role }));
      navigate("/services");
    } else {
      navigate("/login");
    }
  }, [location, dispatch, navigate]);

  return <div className="text-center mt-10">Logging you in via social account...</div>;
};

export default SocialAuthSuccess;
