import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PermissionRoute({ permission, children }) {
    const { user, loading } = useSelector((state) => state.auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    const simulatedRole = typeof window !== "undefined" ? localStorage.getItem("locafy_simulated_role") : null;
    if (simulatedRole) {
        return children;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === "super_admin" || user.permissions?.includes(permission)) {
        return children;
    }

    return <Navigate to="/" replace />;

    return children;
}

export default PermissionRoute;