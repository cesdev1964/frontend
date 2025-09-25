import RequireAuth from "../src/auth/RequireAuth";
import RequireGuest from "../src/auth/RequireGuest";
import MainLayout from "../src/layouts/MainLayout";
import Login from "../src/pages/Login";
import Home from "../src/pages/Home";
import Working from "../src/pages/Working";
import WorkingSummary from "../src/pages/WorkingSummary";
import ChangePassword from "../src/pages/ChangePassword";
import Settings from "../src/pages/Setting";
import { useRoutes } from "react-router-dom";
import Employee from "./pages/setting/Employee";
import NameTitle from "./pages/setting/NameTitle";
import TestComponent from "./pages/TestComponent";
import OT from "./pages/OT";

export default function RouterPage() {
  const routes = useRoutes([
    {
      // ต้อง login ก่อน
      path: "/",
      element: (
        <RequireAuth>
          <MainLayout />
        </RequireAuth>
      ),
      children: [
        // หน้าแรกหลง login
        { index: true, element: <Home title="หน้าหลัก" /> },
        { path: "working", element: <Working title="ข้อมูลการทำงาน" /> },
        {
          path: "working/summary",
          element: <WorkingSummary title="สรุปการทำงาน" />,
        },
          {
          path: "working/OT",
          element: <OT title="บันทึกโอที" />,
        },
        {
          path: "changePassword",
          element: <ChangePassword title="เปลี่ยนรหัสผ่าน" />,
        },
        { path: "settings", element: <Settings title="ตั้งค่า" /> },
        { path: "settings/employees", element: <Employee title="บันทึกข้อมูลพนักงาน" /> },
        { path: "settings/nametitle", element: <NameTitle title="บันทึกข้อมูลคำนำหน้า" /> },
        { path: "test", element: <TestComponent title="หน้าสำหรับทดสอบ" /> },

      ],
    },
    {
      // ถ้ายังไม่ล็อกอินถึงจะเข้าได้
      path: "/login",
      element: (
        <RequireGuest>
          <Login />
        </RequireGuest>
      ),
    },
    {
      // fallback
      path: "*",
      element: <Login />,
    },
  ]);
  return routes;
}
