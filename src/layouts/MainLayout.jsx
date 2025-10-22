import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import SessionExpired from "../components/modal/SessionExpiredModal";
import ChangePassword from "../pages/ChangePassword.jsx";
import Login from "../pages/Login.jsx";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { loading, token, authdata, loginData } = useAuth();

  const nevigateToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    if (loading === false) {
      console.log("Auth data", authdata);
      if (!authdata) {
        nevigateToLogin();
      }
    }
  }, [authdata]);
  return (
    <>
      {/* ผู้ใช้เดิม */}

      {/* {authdata ? (
        <>
          {loginData?.user?.mustchangePassword === true ? (
            <div className="app">
              <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              <div className="main">
                <AppNavbar toggleSidebar={toggleSidebar} />
                <div className="content">
                  <div className="container-fluid py-4 min-vh-90 d-flex flex-column">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <ChangePassword title="เปลี่ยนรหัสผ่าน" />
            </>
          )}
        </>
      ) : (
        <>
          <SessionExpired onSubmit={nevigateToLogin} />
        </>
      )} */}

      <div className="app">
        <>
          <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
          <div className="main">
            <AppNavbar toggleSidebar={toggleSidebar} />
            <div className="content">
              <div className="container-fluid py-4 min-vh-90 d-flex flex-column">
                {authdata ? (
                  <Outlet />
                ) : (
                  // <SessionExpired onSubmit={nevigateToLogin} />
                  <>
                    <LoadingSpin />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
}

export default MainLayout;
