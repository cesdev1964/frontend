// src/auth/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function RequireAuth({ children }) {
  const { isAuth, loginData } = useAuth();
  const location = useLocation();
  if (!isAuth) {
    // จดจำ path เดิมไว้ เผื่อ login เสร็จค่อยพากลับ
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

