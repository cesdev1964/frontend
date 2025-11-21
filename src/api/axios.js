import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;


const api = axios.create({
  baseURL,
});

//ทำการตรวจสอบ token  (expires_in)+7hr และเงื่อนไข currentDate < (expires_in)+7hr 
// เมื่อหมดอายุให้ทำการ redirect ไปที่ login

// แนบ Bearer token ทุกครั้งที่ยิง API ยืนยันตัวตน
api.interceptors.request.use((config) => {
  // localStorage.removeItem("access_token");
  const token = localStorage.getItem("access_token");
  
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

//วันที่ปัจจุบัน และ วันที่หมดอายุใน token ()
// const date1 = Date.now();  เช่น 1762244655208
// ถ้าตัวที่ดึงได้ > เวลาหมดอายุของtoken === หมดอายุ 