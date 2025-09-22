import AppNavbar from "../components/AppNavbar";
import AppSidebar from "../components/AppSidebar";
import { Outlet } from "react-router-dom";



function MainLayout() {
  return (
    <div className="app">
      <AppSidebar />
      <div className="main">
        <AppNavbar />
        <div className="content">
            <Outlet />
           
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
