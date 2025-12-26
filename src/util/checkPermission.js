//return เป็น true/false
import { useAuth } from "../auth/AuthContext";
import { RoleEnum } from "../enum/permissionAndRole";
//ทำการตรวจสอบว่า เจ้าของ account มี permission ตรงกับ ที่กำหนดไหม หรทอเป็น super ไหม
export function CheckPermission(permissionReq = []) {
  const { authdata } = useAuth();
  const rolePermissionRequire = authdata?.permissions ?? [];
  const roleRequire = authdata?.roles ?? [];
  try {

    //เขียนแยกเงื่อนไขเป็นตัวแปรย่อยๆ แล้วค่อยตรวจสอบ bool
    //พยายามฝึกแตกออกมาเป็น ตัวแปรย่อยๆ เพื่อให้โค้ดดูอ่านง่าย ดีกว่าการมานั่งทำ 1 line code
    const isSuper = roleRequire.includes(RoleEnum.SUPER);

    const hasPermission =
      permissionReq.length === 0 ||
      permissionReq.some((p) => rolePermissionRequire.includes(p));

    return isSuper || hasPermission;
  } catch (error) {
    return false;
  }
}
