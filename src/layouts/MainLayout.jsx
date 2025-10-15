import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import SessionExpired from "../components/modal/SessionExpiredModal";

function MainLayout() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const token = useAuth();
  const navigate = useNavigate();

  const nevigateToLogin = ()=>{
    navigate("/login")
  }

  return (
    <>
    {token?(
      <div className="app">
        <AppSidebar isOpen={isOpen} toggleSidebar={toggleSidebar}/>
        <div className="main">
          <AppNavbar toggleSidebar={toggleSidebar}/>
          <div className="content">
            <div className="container-fluid py-4 min-vh-90 d-flex flex-column">
              <Outlet />
            </div>
          </div>
        </div>
       <SessionExpired onSubmit={nevigateToLogin}/>
      </div>
    ):(
      <>
       <SessionExpired onSubmit={nevigateToLogin}/>
      </>
    )}
    </>
  );
}

export default MainLayout;
