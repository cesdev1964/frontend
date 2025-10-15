import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [loading, setLoading] = useState(false);

  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      const res = await fetch(`${baseURL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();

      localStorage.setItem("access_token", data.access_token);
      setToken(data.access_token);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "เข้าสู่ระบบสำเร็จ",
      });
      return true;
    } finally {
      setLoading(false);
    }
  };

  

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
  };

  useEffect(() => {
    // คุณอาจเรียก /api/auth/me เพื่อตรวจสอบ token ที่ยังใช้ได้
    // ข้ามรายละเอียดเพื่อความสั้น
  }, []);

  return (
    <AuthContext.Provider
      value={{ token, isAuth: !!token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
