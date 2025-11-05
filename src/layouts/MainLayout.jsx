import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";
import { Outlet } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import Login from "../pages/Login";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const { loading, authdata, loginData,loadUser } = useAuth();

  const dateNow = Date.now();
  const expiryDate = localStorage.getItem("expires_in");
   const token = localStorage.getItem("access_token");
  // console.log("date now numbere ",dateNow)
  const checkExpiry = dateNow < expiryDate;

  console.log("authdata",authdata);
  console.log(checkExpiry);
  console.log("Now "+dateNow+"expiry "+expiryDate);
  console.log("login data",loginData);
  
  // console
  return (
    <>
      {/* ผู้ใช้เดิม */}

      {((authdata && checkExpiry || token)) ? (
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
          <Login/>
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
