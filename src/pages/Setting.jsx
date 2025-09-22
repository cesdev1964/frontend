import { useNavigate } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import { useTitle } from "../hooks/useTitle";

const Settings = ({ title }) => {
  useTitle(title);
  const navigate = useNavigate();
  const cardColor = [
    "primary",
    "success",
    "info",
    "warning",
    "danger",
    "secondary",
  ];

  const settingCard = [
    {
      page: "4",
      path: "/setting/employees",
      icon: "bi bi-people-fill",
      color: cardColor[0],
      title: "ข้อมูลพนักงาน",
      subtitle: "จัดการข้อมูลพนักงานในระบบ",
    },
    {
      page: "12",
      path: "#",
      icon: "bi bi-file-earmark-person-fill",
      color: cardColor[1],
      title: "คำนำหน้า",
      subtitle: "จัดการคำนำหน้าชื่อ",
    },
    {
      page: "5",
      path: "#",
      icon: "bi bi-file-earmark-person-fill",
      color: cardColor[2],
      title: "ชุดผู้รับเหมา",
      subtitle: "จัดการข้อมูลชุดผู้รับเหมา",
    },
    {
      page: "6",
      path: "#",
      icon: "bi bi-clipboard-data-fill",
      color: cardColor[3],
      title: "ชื่อเบิกผลงาน",
      subtitle: "จัดการชื่อเบิกผลงาน",
    },
    {
      page: "6",
      path: "#",
      icon: "bi bi-clipboard-data-fill",
      color: cardColor[4],
      title: "ชื่อเบิกผลงาน",
      subtitle: "จัดการชื่อเบิกผลงาน",
    },
    {
      page: "6",
      path: "#",
      icon: "bi bi-clipboard-data-fill",
      color: cardColor[5],
      title: "ชื่อเบิกผลงาน",
      subtitle: "จัดการชื่อเบิกผลงาน",
    },
  ];

  const handleChagePage = (path)=>{
    navigate(path);
  }
  return (
    <div>
      <HeaderPage pageName={title} />
      <div className="search-box">
        <div className="input-group mb-4">
          <input
            type="text"
            autoComplete="current-password"
            placeholder="ค้นหาเมนูตั้งค่า"
            className="form-control"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-outline-primary bg-light"
            // onClick={() => setShowPassword((s) => !s)}
          >
            {/* ใส่ icon */}
            <i className="bi bi-search text-muted"></i>
          </button>
        </div>
      </div>
      <div className="content-box">
        <div className="container text-center setting-container row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {settingCard.length > 0 ? (
            <>
              {settingCard.map((item, index) => {
                return (
                  <div
                    className="col card-item"
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={()=>handleChagePage(item.path)}
                  >
                    <div className="card h-100 shadow-sm card-hover card--soft settingCard">
                      <div
                        className="card-body text-center d-flex flex-column"
                        //  onclick="handleClickToPage('${value.path}')"
                      >
                        <div className="setting-icon">
                          <i
                            className={`${item.icon} text-danger`}
                            style={{ fontSize: "50px" }}
                          ></i>
                        </div>
                        <h4 className="card-title">{item.title}</h4>
                        <p className="card-text text-danger flex-grow-1">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <p>ไม่มีรายการ</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
