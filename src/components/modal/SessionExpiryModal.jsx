import Swal from "sweetalert2";
import { useAuth } from "../../auth/AuthContext";

export default function SessionExpiryModal() {
  const {logout} = useAuth();

  Swal.fire({
    title: "Session หมดอายุ",
    text: "กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
    icon: "error",
  }).then((result)=>{
    if(result.isConfirmed){
        logout();
    }
  });

  return <div></div>;
}
