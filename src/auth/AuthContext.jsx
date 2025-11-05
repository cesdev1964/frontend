import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [loading, setLoading] = useState(false);
  const [authdata, setAuthData] = useState({});
  const [loginData,setLoginData] = useState({});
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
      // console.log("data form login", data);
      setLoginData(data);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("expires_in", data.expiredAtUtc);
      localStorage.setItem("User",JSON.stringify(data.user));
      // เพราะ localStrorage เก็บได้แค่ string 
      // การเก็บข้อมูลใน local strorage เป็นการเก็บข้อมูลได้นาน แต่ไม่ควรเก็บข้อมูลสำคัญ
      
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

  const loadUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${baseURL}/api/users/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
         }
      });
      if (!res.ok) throw new Error("Invalid credentials");
      const data = await res.json();
      setAuthData(data.user);
      setLoading(false);

      // console.log("aute data",authdata);
    } catch (error) {}
  };

  const logout = () => {
    localStorage.clear();
    setAuthData({});
    setToken(null);
  };

  useEffect(() => {
    // คุณอาจเรียก /api/auth/me เพื่อตรวจสอบ token ที่ยังใช้ได้
    // ข้ามรายละเอียดเพื่อความสั้น
    
    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        isAuth: !!token,
        login,
        logout,
        loading,
        authdata,
        loadUser,
        loginData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
