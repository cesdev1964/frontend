import { Link, useNavigate } from "react-router-dom";
import HeaderPage from "../components/HeaderPage";
import { useTitle } from "../hooks/useTitle";
import { useState } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SearchBox from "../components/SearchBox";
import SessionExpiryModal from "../components/modal/SessionExpiryModal";

const Settings = ({ title }) => {
  // const token = localStorage.getItem("access_token");
  // if (!token) {
  //   return <SessionExpiryModal/>
  // }
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
  const [search, setSearch] = useState("");

  const settingCard = [
    {
      page: "4",
      path: "/settings/employees",
      icon: "fa-solid fa-user-tie",
      color: cardColor[0],
      title: "ข้อมูลพนักงาน",
      subtitle: "จัดการข้อมูลพนักงานในระบบ",
    },
    {
      page: "4",
      path: "/settings/users",
      icon: "fa-solid fa-users",
      color: cardColor[0],
      title: "ข้อมูลผู้ใช้งาน",
      subtitle: "จัดการข้อมูลผู้ใช้งานในระบบ",
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
      path: "/settings/education",
      icon: "bi bi-mortarboard-fill",
      color: cardColor[2],
      title: "การศึกษา",
      subtitle: "จัดการข้อมูลการศึกษา",
    },
    {
      page: "6",
      path: "/settings/job",
      icon: "bi bi-journal-bookmark-fill",
      color: cardColor[3],
      title: "หน่วยงาน",
      subtitle: "จัดการข้อมูลหน่วยงาน",
    },
    {
      page: "6",
      path: "/settings/jobcategory",
      icon: "bi bi-journal-bookmark-fill",
      color: cardColor[5],
      title: "ประเภทงาน",
      subtitle: "จัดการข้อมูลประเภทงาน",
    },
    {
      page: "6",
      path: "/settings/level",
      icon: "bi bi-clipboard-data-fill",
      color: cardColor[4],
      title: "ระดับ",
      subtitle: "จัดการข้อมูลระดับในองค์กร",
    },
    {
      page: "6",
      path: "/settings/position",
      icon: "fa-solid fa-address-book",
      color: cardColor[5],
      title: "ตำแหน่ง",
      subtitle: "จัดการข้อมูลตำแหน่ง",
    },
    {
      page: "6",
      path: "/settings/contractor",
      icon: "bi bi-people-fill",
      color: cardColor[5],
      title: "ผู้รับเหมา",
      subtitle: "จัดการข้อมูลผู้รับเหมา",
    },
    {
      page: "6",
      path: "/settings/employeetype",
      icon: "fa-solid fa-address-book",
      color: cardColor[5],
      title: "ประเภทพนักงาน",
      subtitle: "จัดการข้อมูลประเภทพนักงาน",
    },
    {
      page: "6",
      path: "/settings/deductiontype",
      icon: "bi bi-clipboard-data-fill",
      color: cardColor[5],
      title: "ประเภทการหักเงิน",
      subtitle: "จัดการข้อมูลประเภทการหักเงิน",
    },
    {
      page: "6",
      path: "/settings/role",
      icon: "fa-solid fa-address-book",
      color: cardColor[5],
      title: "บทบาท",
      subtitle: "จัดการข้อมูลบทบาทการเข้าใช้งาน",
    },
    {
      page: "6",
      path: "/settings/permission",
      icon: "bi bi-person-fill-lock",
      color: cardColor[5],
      title: "Permission",
      subtitle: "จัดการข้อมูล permission",
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
      path: "/settings/OTcategory",
      icon: "fa-solid fa-file-invoice",
      color: cardColor[5],
      title: "ประเภทโอที",
      subtitle: "จัดการข้อมูลประเภทโอที",
    },
    {
      page: "6",
      path: "/settings/announcement",
      icon: "fa-solid fa-newspaper",
      color: cardColor[5],
      title: "ข่าวสาร",
      subtitle: "จัดการข้อมูลข่าวสาร",
    },
    {
      page: "6",
      path: "/settings/flow",
      icon: "bi bi-diagram-2-fill",
      color: cardColor[5],
      title: "สายอนุมัติ",
      subtitle: "จัดการข้อมูลสายอนุมัติ",
    },
     {
      page: "6",
      path: "/settings/userjobs",
      icon: "fa-solid fa-people-roof",
      color: cardColor[5],
      title: "หน่วยงานที่ดูแล",
      subtitle: "จัดการข้อมูลหน่วยงานที่ดูแล",
    },
  ];

  const handleChagePage = (path) => {
    navigate(path);
  };

  //search function
  const filterItemSetting = settingCard.filter((item) => {
    if (
      item.title.toLocaleLowerCase().includes(search) ||
      item.subtitle.toLocaleLowerCase().includes(search)
    ) {
      return item;
    }
  });

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">  <i className="bi bi-house-door-fill"></i></Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <SearchBox
        onChange={(e) => setSearch(e.target.value)}
        search={search}
        placeholder="ค้นหาเมนูตั้งค่า"
      />
      <div className="content-box mt-4 ">
        <div className="container text-center setting-container row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 announcement-box">
          {filterItemSetting.length > 0 ? (
            <>
              {filterItemSetting.map((item, index) => {
                return (
                  <div
                    className="col"
                    style={{ cursor: "pointer" }}
                    key={index}
                    onClick={() => handleChagePage(item.path)}
                  >
                    <div className="card h-100 shadow-sm card--soft settingCard card-item">
                      <div className="card-body text-center d-flex flex-column">
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
              <div className="container">
                <div className="d-flex flex-column align-items-center justify-content-center  w-100 p-3 mt-4">
                  <i
                    className="bi bi-gear text-danger"
                    style={{ fontSize: "60px" }}
                  ></i>
                  <h5 className="text-danger">ไม่พบรายการตั้งค่า</h5>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
