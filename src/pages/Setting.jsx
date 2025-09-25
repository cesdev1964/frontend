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
      path: "/settings/employees",
      icon: "bi bi-people-fill",
      color: cardColor[0],
      title: "ข้อมูลพนักงาน",
      subtitle: "จัดการข้อมูลพนักงานในระบบ",
    },
    {
      page: "12",
      path: "/settings/nametitle",
      icon: "bi bi-file-earmark-person-fill",
      color: cardColor[1],
      title: "คำนำหน้า",
      subtitle: "จัดการคำนำหน้าชื่อ",
    },
    {
      page: "5",
      path: "#",
      icon: "bi bi-mortarboard-fill",
      color: cardColor[2],
      title: "การศึกษา",
      subtitle: "จัดการข้อมูลการศึกษา",
    },
    {
      page: "6",
      path: "#",
      icon: "bi bi-journal-bookmark-fill",
      color: cardColor[3],
      title: "หน่วยงาน",
      subtitle: "จัดการข้อมูลหน่วยงาน",
    },
    {
      page: "6",
      path: "#",
      icon: "bi bi-clipboard-data-fill",
      color: cardColor[4],
      title: "ระดับ",
      subtitle: "จัดการข้อมูลระดับในองค์กร",
    },
    {
      page: "6",
      path: "#",
      icon: "fa-solid fa-address-book",
      color: cardColor[5],
      title: "ตำแหน่ง",
      subtitle: "จัดการข้อมูลตำแหน่ง",
    },
    {
      page: "6",
      path: "#",
      icon: "bi bi-people-fill",
      color: cardColor[5],
      title: "ผู้รับเหมา",
      subtitle: "จัดการข้อมูลผู้รับเหมา",
    },
    {
      page: "6",
      path: "#",
      icon: "fa-solid fa-address-book",
      color: cardColor[5],
      title: "ประเภทพนักงาน",
      subtitle: "จัดการข้อมูลประเภทพนักงาน",
    },
      {
      page: "6",
      path: "#",
      icon: "bi bi-clipboard-data-fill",
      color: cardColor[5],
      title: "ประเภทการหักเงิน",
      subtitle: "จัดการข้อมูลประเภทการหักเงิน",
    },
     {
      page: "6",
      path: "#",
      icon: "fa-solid fa-address-book",
      color: cardColor[5],
      title: "บทบาท",
      subtitle: "จัดการข้อมูลบทบาทการเข้าใช้งาน",
    },
    {
      page: "6",
      path: "#",
      icon: "fas fa-umbrella-beach",
      color: cardColor[5],
      title: "วันหยุดบริษัท",
      subtitle: "จัดการข้อมูลวันหยุด",
    },
    {
      page: "6",
      path: "#",
      icon: "fa-solid fa-file-invoice",
      color: cardColor[5],
      title: "โอที",
      subtitle: "จัดการข้อมูลโอที",
    },
      {
      page: "6",
      path: "#",
      icon: "bi bi-journal-bookmark-fill",
      color: cardColor[5],
      title: "หมวดงาน",
      subtitle: "จัดการข้อมูลหมวดงาน",
    },
  ];

  const handleChagePage = (path)=>{
    navigate(path);
  }
  return (
    <div className="container py-4 min-vh-100 d-flex flex-column">
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
                    className="col "
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={()=>handleChagePage(item.path)}
                  >
                    <div className="card h-100 shadow-sm card--soft settingCard card-item">
                      <div
                        className="card-body text-center d-flex flex-column"
                        //  onclick="handleClickToPage('${value.path}')"
                      >
                        <div className="setting-icon pt-3">
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
