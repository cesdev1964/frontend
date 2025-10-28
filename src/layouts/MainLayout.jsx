import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import SessionExpired from "../components/modal/SessionExpiredModal";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const navigate = useNavigate();
  const { loading, token, authdata, loginData,loadUser } = useAuth();

  const nevigateToLogin = () => {
    navigate("/login");
  };
  const isChangePassword = loginData?.user?.mustchangePassword;

  // useEffect(() => {
  //   if (!loginData || typeof isChangePassword === undefined) return; // ถ้ายังไม่มีข้อมูล อย่า navigate
    
  //   // await loadUser();

  //   if (isChangePassword === true && location.pathname !== "/changePassword") {
  //     navigate("/changePassword", { replace: true });
  //   }
  //   // มีปัญหากรณีถ้าไม่ได้
  //   else if (isChangePassword === false && location.pathname !== "/") {
  //     navigate("/", { replace: true });
  //   }
  // }, [loginData, isChangePassword, location.pathname]);

  return (
    <>
      {/* ผู้ใช้เดิม */}

      {authdata ? (
        <>
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
        </>
      ) : (
        <>
          <SessionExpired onSubmit={nevigateToLogin} />
        </>
      )}

      {/* <div className="app">
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
      </div> */}
    </>
  );
}

export default MainLayout;
