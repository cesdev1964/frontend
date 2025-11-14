import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../auth/AuthContext";
import Login from "../pages/Login";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const asideRef = useRef(null);

  const { loading, authdata, loginData, loadUser } = useAuth();

  const dateNow = Date.now();
  const expiryDate = localStorage.getItem("expires_in");
  const token = localStorage.getItem("access_token");
  // console.log("date now numbere ",dateNow)
  const checkExpiry = dateNow < expiryDate;

  // console.log("authdata",authdata);
  // console.log(checkExpiry);
  // console.log("Now "+dateNow+"expiry "+expiryDate);
  // console.log("login data",loginData);

  // console

  const handleClickOutsideToCloseSidebar = (e) => {
    if (asideRef.current && !asideRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  // การสร้าง action even เมื่อทำการปิดในส่วนของ sidebar ด้วยการคลิกที่ข้างนอก component โดยทำการ useRef ไปยัง component ที่เราทำการผูก event ที่เราต้องการใช้งาน
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideToCloseSidebar);

    return () => {
      document.addEventListener("mousedown", handleClickOutsideToCloseSidebar);
    };
  }, [isOpen]);

  return (
    <>
      {/* ผู้ใช้เดิม */}

      {(authdata && checkExpiry) || token ? (
        <>
          <div className="app">
            <AppSidebar
              isOpen={isOpen}
              toggleSidebar={toggleSidebar}
              asideRef={asideRef}
            />
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
          <Login />
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
