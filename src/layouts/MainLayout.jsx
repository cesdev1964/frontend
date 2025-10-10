import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";


function MainLayout() {

  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);
  


  return (
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
    </div>
  );
}

export default MainLayout;
