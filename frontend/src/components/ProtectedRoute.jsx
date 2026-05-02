import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly }) {
  const { user, token } = useContext(AuthContext);

  // 🔐 Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 👑 Admin check
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}