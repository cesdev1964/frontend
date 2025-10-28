import { useTitle } from "../hooks/useTitle";
import HeaderPage from "../components/HeaderPage";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../auth/AuthContext";
import { useUser } from "../hooks/userStore";
import { useNavigate } from "react-router-dom";

const ChangePassword = ({ title ,isForce = false}) => {
  useTitle(title);

  const [inputData, setInputData] = useState({
    userName: "",
    defaultPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { authdata } = useAuth();
  const { changePassword, userError, userIsLoading } = useUser();
  const navigate = useNavigate();

  // console.log("userData", authdata);

  useEffect(() => {
    if (authdata) {
      setInputData({
        userName: authdata?.user?.username ?? "",
      });
    }
  }, [authdata]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const ClearInput = () => {
    setInputData({
      userName: "",
      defaultPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError({});
  };

  const validateForm = () => {
    let errors = {};
    if (!inputData.newPassword) {
      errors.newPassword = "กรุณากรอกรหัสผ่าน";
    } else {
      if (inputData.newPassword.length < 4) {
        errors.newPassword = "กรุณากรอกรหัสผ่าน 4 ตัวอักษรขึ้นไป";
      }
    }
    if (!inputData.defaultPassword) {
      errors.defaultPassword = "กรุณากรอกรหัสผ่าน";
    } else {
      // วัดความ match กับ password ที่เก็บไว้
      if (inputData.defaultPassword.length < 4) {
        errors.defaultPassword = "กรุณากรอกรหัสผ่าน 4 ตัวอักษรขึ้นไป";
      }
    }

    if (!inputData.confirmPassword) {
      errors.confirmPassword = "กรุณากรอกรหัสผ่าน";
    } else {
      if (inputData.confirmPassword !== inputData.newPassword) {
        errors.confirmPassword = "กรอกรหัสผ่านไม่ถูกต้อง";
      } else if (inputData.confirmPassword.length < 4) {
        errors.confirmPassword = "กรุณากรอกรหัสผ่าน 4 ตัวอักษรขึ้นไป";
      }
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqData = {
      currentPassword: inputData.defaultPassword,
      newPassword: inputData.newPassword,
    };
    const errorList = validateForm(inputData) || [];
    setError(errorList);
    //api post

    if (Object.keys(errorList).length === 0) {
      const response = await changePassword(
        reqData,
        authdata?.publicUserId
      );
      
      if (response.success) {
        setIsSubmit(true);
        Swal.fire({
          title: "เปลี่ยนรหัสผ่านสำเร็จ",
          icon: "success",
          draggable: true,
          buttonsStyling: "w-100",
        }).then(()=>{
          // console.log("response",response)
          if(userIsLoading === false){
            // สำหรับคนที่ยังไม่เปลี่ยนรหัสผ่าน
            if(isForce === true){
              navigate("/");
            }else{
              navigate("/changePassword");
            }
          }
        });
        ClearInput();
        {/* สำเร็จแล้ว ให้ทำการ nevigate ไปหน้า home */}
      } else {
        Swal.fire({
          index: "เปลี่ยนรหัสผ่านไม่สำเร็จไม่สำเร็จ",
          text: userError || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
          icon: "error",
        });
      }
    }
  };

  const finishSubmit = () => {
    // console.log("submit data", inputData);
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  return (
    <div className="mt-5 px-4">
      <HeaderPage pageName={title} />
      <div className="content-box">
        <div
          className="card h-100 shadow-sm card-hover card--soft mx-auto w-100 mt-5"
          style={{ maxWidth: 500 }}
        >
          <div className="card-body d-flex flex-column justifyContent-center p-4">
            <div className="d-flex  mx-auto w-100 card-title">
              <i class="bi bi-shield-lock me-2"></i>
              <h5>เปลี่ยนรหัสผ่าน</h5>
            </div>
            <div className="border-top border-danger"></div>
            <div className="changePassword-content">
              <form className="mx-auto w-100" style={{ maxWidth: 480 }}>
                <div className="mb-2">
                  <label
                    className="form-label"
                    style={{ fontWeight: "normal", fontSize: "0.9rem" }}
                  >
                    ชื่อผู้ใช้ (Username)
                  </label>
                  <input
                    className={`form-control`}
                    name="userName"
                    value={inputData.userName ?? ""}
                    onChange={(e) => handleChangeInput(e)}
                    autoFocus
                  />
                </div>
                <div className="mb-2">
                  <label
                    className="form-label"
                    style={{ fontWeight: "normal", fontSize: "0.9rem" }}
                  >
                    รหัสผ่านปัจจุบัน <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      className={`form-control ${
                        error ? "border border-danger" : ""
                      }`}
                      name="defaultPassword"
                      type={showPassword ? "text" : "password"}
                      value={inputData.defaultPassword ?? ""}
                      onChange={(e) => handleChangeInput(e)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary bg-light"
                      aria-label={
                        showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"
                      }
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
                  </div>
                  {error.defaultPassword ? (
                    <p className="text-danger">{error.defaultPassword}</p>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label
                    className="form-label"
                    style={{ fontWeight: "normal", fontSize: "0.9rem" }}
                  >
                    รหัสผ่านใหม่ <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      className={`form-control ${
                        error ? "border border-danger" : ""
                      }`}
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={inputData.newPassword ?? ""}
                      onChange={(e) => handleChangeInput(e)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary bg-light"
                      aria-label={
                        showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"
                      }
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
                  </div>
                  {error.newPassword ? (
                    <p className="text-danger">{error.newPassword}</p>
                  ) : null}
                </div>
                <div className="mb-2">
                  <label
                    className="form-label"
                    style={{ fontWeight: "normal", fontSize: "0.9rem" }}
                  >
                    ยืนยันรหัสผ่านใหม่ <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <input
                      className={`form-control ${
                        error ? "border border-danger" : ""
                      }`}
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={inputData.confirmPassword ?? ""}
                      onChange={(e) => handleChangeInput(e)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary bg-light"
                      aria-label={
                        showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"
                      }
                      onClick={() => setShowPassword((s) => !s)}
                    >
                      {showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
                  </div>
                  {error.confirmPassword ? (
                    <p className="text-danger">{error.confirmPassword}</p>
                  ) : null}
                </div>
                <div className="d-flex flex-row mt-3 justifyContent-end">
                  <button
                    className="btn btn-outline-primary bg-white me-3"
                    onClick={ClearInput}
                  >
                    ยกเลิก
                  </button>
                  
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    {userIsLoading === true
                      ? "...กำลังโหลด"
                      : "ยืนยันการเปลียนรหัสผ่านใหม่"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
