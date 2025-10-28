import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";


export default function CheckChangePassword ({children}){
  const {loginData} = useAuth();
  const location = useLocation();
  



  const isChangePassword = loginData?.user?.mustchangePassword;

   if (isChangePassword === true && location.pathname !== "/forchChangePassword") {
      // navigate("/changePassword", { replace: true });
    return <Navigate to="/forchChangePassword" state={{ from: location }} replace />;

    }
    // มีปัญหากรณีมีหน้าที่มีการใช้ path เดี
    else if (isChangePassword === false && location.pathname === "/forchChangePassword") {
      // navigate("/", { replace: true });
    return <Navigate to="/" state={{ from: location }} replace />;

    }
  return children;
}