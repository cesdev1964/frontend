import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import RouterPage from "../src/route";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouterPage/>
      </BrowserRouter>
    </AuthProvider>
  );
}

{/* <Routes>
  <Route
    path="/"
    element={
      <RequireAuth>
        <MainLayout />
      </RequireAuth>
    }
  >
 
    <Route index element={<Home title="หน้าหลัก" />} />
    <Route path="working" element={<Working title="ข้อมูลการทำงาน" />} /> 
      <Route path="working/summary" element={<WorkingSummary title="สรุปการทำงาน" />} />
    <Route path="changePassword" element={<ChangePassword title="เปลี่ยนรหัสผ่าน" />} /> 
    <Route path="settings" element={<Settings title="ตั้งค่า" />} />
  </Route>
  

  <Route
    path="/login"
    element={
      <RequireGuest>
        <Login />
      </RequireGuest>
    }
  />


  <Route path="*" element={<Login />} />
</Routes> */}