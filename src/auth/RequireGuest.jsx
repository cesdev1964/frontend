// src/auth/RequireGuest.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function RequireGuest({ children }) {
  const { isAuth } = useAuth();
  if (isAuth) return <Navigate to="/" replace />;
  return children;
}
