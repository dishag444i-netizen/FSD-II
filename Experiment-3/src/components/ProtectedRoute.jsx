import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utils/auth";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // No token or expired token
  if (!token || isTokenExpired(token)) {
    localStorage.clear();
    return <Navigate to="/" replace />;
  }

  // Role check
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default ProtectedRoute;