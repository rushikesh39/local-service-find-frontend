// // src/components/PrivateRoutes.jsx
// import { useSelector } from "react-redux";
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// const PrivateRoute = ({ children }) => {
//   const { user } = useSelector((state) => state.user);
//   console.log("user data", user)
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user && user.role === "provider") {
//       navigate("/provider");
//     }
//   }, [user, navigate]);

//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   return children;
// };

// export default PrivateRoute;
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Optional: If you want only provider allowed here
  if (location.pathname.startsWith("/provider") && user.role !== "provider") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
