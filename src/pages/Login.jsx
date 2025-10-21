import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTitle } from "../hooks/useTitle";
import logo from "../assets/ces-icon.png";
import CES_background from "../assets/ces_background.jpg";
import CookieConsents from "../components/modal/CookieConsents";
export default function Login() {
  useTitle("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname ?? "/";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const ok = await login({ username, password });
      if (ok) navigate(from, { replace: true });
    } catch (err) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ backgroundImage: `url(${CES_background})`,
                  backgroundRepeat:"no-repeat" ,
                  objectFit: "contain", 
                  width: "100%" ,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  // filter: "blur(5px)",
                  }}
                  >
        {/* <div>
          
        </div> */}
      <div
        className="card card--soft card-primary p-4 shadow"
        style={{ minWidth: 360 }}
      >
        <div className="text-center">
          <img
            src={logo}
            width={56}
            height={56}
            style={{ objectFit: "contain" }}
          />

          <h1 className="h4 mb-1 text-primary-emphasis">เข้าสู่ระบบ</h1>
          <p className="text-muted small m-0">ยินดีต้อนรับสู่ ระบบฝากเบิก</p>
        </div>
        <hr />
        {error && <div
          className="alert alert-danger alert-dismissible text-wrap fade show"
          role="alert"
        >
          <strong>ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setError("")}
          ></button>
        </div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>ชื่อผู้ใช้ (Username)</strong>
            </label>
            <input
              className="form-control"
              placeholder="กรอกชื่อผู้ใช้หรือรหัสพนักงาน"
              value={username ?? ""}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>รหัสผ่าน (Password)</strong>
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="กรอกรหัสผ่าน"
                className="form-control"
                value={password ?? ""}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-primary bg-light"
                aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                onClick={() => setShowPassword((s) => !s)}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash"></i>
                ) : (
                  <i className="bi bi-eye"></i>
                )}
              </button>
            </div>
          </div>
          <button className="btn btn-primary w-100" disabled={loading}>
            <i className="bi bi-box-arrow-in-right"></i>
            {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>
        <div className="card-footer border-0 text-center pb-0 pt-4">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} C.E.S. Co., Ltd. All rights reserved.
          </small>
        </div>
      </div>
      <CookieConsents/>
    </div>
  );
}
