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
import NameTitle from "./pages/setting/NameTitle";
import TestComponent from "./pages/TestComponent";
import Users from "./pages/setting/Users";
import Educations from "./pages/setting/Educations";
import Jobs from "./pages/setting/Jobs";
import Levels from "./pages/setting/Levels";
import Positions from "./pages/setting/Positions";
import Contrators from "./pages/setting/Contractors";
import JobCategories from "./pages/setting/JobCategories";
import OTCategories from "./pages/setting/OTcategories";
import Roles from "./pages/setting/Roles";
import EmployeeTypes from "./pages/setting/EmployeeTypes";
import DeductionTypes from "./pages/setting/DeductionTypes";
import Permissions from "./pages/setting/Permissions";
import RolePermission from "./pages/setting/role/RolePermission";
import Flows from "./pages/setting/Flows";
import Profile from "./pages/Profile";
import EmployeeForm from "./pages/setting/EmployeeForm";
import EmployeesTest from "./pages/setting/EmployeeTest";
import CheckChangePassword from "./auth/CheckChangePassword";
import OTRequest from "./pages/OTRequest";

export default function RouterPage() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <RequireAuth>
          <CheckChangePassword>
            <MainLayout />
          </CheckChangePassword>
        </RequireAuth>
      ),
      children: [
        // หน้าแรกหลง login
        { index: true, element: <Home title="หน้าหลัก" /> },
        {
          path: "profile/:publicEmployeeId",
          element: <Profile title="ข้อมูลของคุณ" />,
        },
        { path: "working", element: <Working title="ข้อมูลการทำงาน" /> },
        {
          path: "working/summary",
          element: <WorkingSummary title="สรุปการทำงาน" />,
        },
        {
          path: "working/OT",
          element: <OTRequest title="บันทึกโอที" />,
        },
        {
          path: "forchChangePassword",
          element: <ChangePassword title="เปลี่ยนรหัสผ่าน" isForce = {true}/>, //ลงทะเบียนครั้งแรกให้ไปที่หน้า เปลี่ยนรหัสผ่าน
        },
         {
          path: "changePassword",
          element: <ChangePassword title="เปลี่ยนรหัสผ่าน" />, //ใช้เมื่อ user อยากเปลี่ยนรหัสผ่าน
        },
        { path: "settings", element: <Settings title="ตั้งค่า" /> },
        // {
        //   path: "settings/employees",
        //   element: <Employees title="จัดการข้อมูลพนักงาน" />,
        // },
        {
          path: "settings/employees",
          element: <EmployeesTest title="จัดการข้อมูลพนักงาน" />,
        },
        {
          path: "settings/employees/form",
          element: <EmployeeForm title="บันทึกข้อมูลพนักงาน" isEdit={false} />,
        },
        {
          path: "settings/employees/form/:publicEmployeeId",
          element: <EmployeeForm title="แก้ไขข้อมูลพนักงาน" isEdit={true} />,
        },
        {
          path: "settings/users",
          element: <Users title="จัดการข้อมูลผู้ใช้งาน" />,
        },
        {
          path: "settings/nametitle",
          element: <NameTitle title="จัดการข้อมูลคำนำหน้า" />,
        },
        {
          path: "settings/education",
          element: <Educations title="จัดการข้อมูลการศึกษา" />,
        },
        {
          path: "settings/job",
          element: <Jobs title="จัดการข้อมูลหน่วยงาน" />,
        },
        {
          path: "settings/level",
          element: <Levels title="จัดการข้อมูลระดับ" />,
        },
        {
          path: "settings/position",
          element: <Positions title="จัดการข้อมูลตำแหน่ง" />,
        },
        {
          path: "settings/contractor",
          element: <Contrators title="จัดการข้อมูลผู้รับเหมา" />,
        },
        {
          path: "settings/jobcategory",
          element: <JobCategories title="จัดการข้อมูลหมวดงาน" />,
        },
        {
          path: "settings/OTcategory",
          element: <OTCategories title="จัดการข้อมูลประเภทโอที" />,
        },
        { path: "settings/role", element: <Roles title="จัดการข้อมูลบทบาท" /> },
        {
          path: "settings/rolepermission/:roleid",
          element: <RolePermission title="แก้ไขสิทธิ์การเข้าใช้งาน" />,
        },
        {
          path: "settings/employeetype",
          element: <EmployeeTypes title="จัดการข้อมูลประเภทของพนักงาน" />,
        },
        {
          path: "settings/deductiontype",
          element: <DeductionTypes title="จัดการข้อมูลประเภทการหักเงิน" />,
        },
        {
          path: "settings/permission",
          element: <Permissions title="จัดการข้อมูล Permission" />,
        },
        {
          path: "settings/flow",
          element: <Flows title="จัดการข้อมูลสายอนุมัติ" />,
        },

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
