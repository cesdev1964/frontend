import { useTitle } from "../hooks/useTitle";
import HeaderPage from "../components/HeaderPage";
import { Link } from "react-router-dom";
import ImageComponent from "../components/Image";
import DetailItem from "../components/home/detailItem";
import { useState, useEffect, useCallback } from "react";
import { useEmployee } from "../hooks/employeeStore";
import { useParams } from "react-router-dom";
import { IDcardFormat, telephoneFormat } from "../util/inputFormat";
import IsEmployeeStatusBadgeReact from "../util/isActiveBadge.jsx";
import LoadingSpin from "../components/loadingSpin.jsx";
import { useEducation } from "../hooks/educationStore.jsx";
import { usePosition } from "../hooks/positionStore.jsx";
import { useJob } from "../hooks/jobStore.jsx";
import { useEmployeeType } from "../hooks/employeeTypeStore.jsx";
import { useContrator } from "../hooks/contratorStore.jsx";
import { useLevel } from "../hooks/levelStore.jsx";

export default function Profile({ title }) {
  const { publicEmployeeId } = useParams();
  const [empData, setEmpData] = useState({});
  useTitle(title);
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const { getEmployeeById, employeeById, employeeIsLoading } = useEmployee();
  const { levelDropdown, getLevelDropdown } = useLevel();
  const { positionDropdown, getPositionDropdown } = usePosition();
  const { contratorDropdown, getContratorDropdown } = useContrator();
  const { jobDropdown, getJobDropdown } = useJob();
  const { employeeTypeDropdown, getEmployeeTypeDropdown } = useEmployeeType();
  const { getEducationDropdown, educationDropdown } = useEducation();

  const fetchDataTable = useCallback(async () => {
    try {
      if (publicEmployeeId) {
        await getEmployeeById(publicEmployeeId);
      } else alert("ไม่พบข้อมูลของพนักงานคนนี้ในระบบ");

      await getEducationDropdown();
      await getLevelDropdown();
      await getPositionDropdown();
      await getContratorDropdown();
      await getJobDropdown();
      await getEmployeeTypeDropdown();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [
    getEmployeeById,
    getEducationDropdown,
    getLevelDropdown,
    getLevelDropdown,
    getContratorDropdown,
    getJobDropdown,
    getEmployeeTypeDropdown,
  ]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  // น่าจะต้องนำค่าใส่ในนี้ เพราะค่าไม่อัปเดตเลย ทำเหมือนการ edit
  useEffect(() => {
    if (employeeById !== undefined) {
      setEmpData(employeeById);
    } else {
      setEmpData({});
    }
    // console.log("EmpData",empData);
  }, [employeeById]);

  const avatarUrl =
    "https://www.beartai.com/wp-content/uploads/2025/01/Sakamoto-Days.jpg";

  const handleChangeCheckbox = () => {
    setOnClickAccordian((prev) => !prev);
  };

  // console.log(empData?.employee?.status);
  return (
    <div className="container-fluid py-4 min-vh-100 d-flex flex-column">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">หน้าหลัก</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container profile-box">
        <div className="accordion">
          <div className="accordion-item">
            <input
              id="accordion-trigger-1"
              className="accordion-trigger-input"
              type="checkbox"
              checked={onClickAccordian === true}
              onChange={handleChangeCheckbox}
            ></input>
            <label
              className="accordion-trigger accordion-label"
              htmlFor="accordion-trigger-1"
            >
              <i className="bi bi-person-check me-2 mb-1"></i>
              <strong>ข้อมูลของคุณ</strong>
            </label>
            <section className="accordion-animation-wrapper">
              <div className="accordion-animation">
                <div className="accordion-transform-wrapper">
                  <div className="accordion-content position-relative">
                    {employeeIsLoading === true && (
                      <div className="position-absolute top-50 start-50 translate-middle">
                        <LoadingSpin />
                      </div>
                    )}
                    <div className="d-flex align-items-start justify-content-between">
                      <div className="d-flex gap-4 align-items-center">
                        <div className="d-flex flex-column align-items-start">
                          <ImageComponent
                            imageSRC={avatarUrl}
                            height="140px"
                            width="140px"
                            borderRadius="10px"
                            alt="profile-avatar"
                            objectfit="cover"
                          />
                        </div>
                        <div>
                          <p className="my-3 fw-bold">
                            รหัสพนักงาน :{" "}
                            {empData?.employee?.employeeCode ?? "ไม่พบข้อมูล"}
                          </p>
                          <h5 className="mb-2">
                            {empData?.employee?.firstname ?? "ไม่พบข้อมูล"}
                            {"  "}
                            {empData?.employee?.lastname ?? "ไม่พบข้อมูล"}
                          </h5>
                          <p className="my-3">
                            <i className="bi bi-telephone-fill"></i> :{" "}
                            {telephoneFormat(
                              empData?.employee?.telephoneNo ?? "ไม่พบข้อมูล"
                            )}
                          </p>
                        </div>
                      </div>
                      {/* <div className="badge-style badge-stillWork">{isEmployeeStatusBadgeReact(empData?.employee?.status ?? "ไม่พบข้อมูล")}</div> */}
                      {empData?.employee?.status != undefined ? (
                        <IsEmployeeStatusBadgeReact
                          status={empData?.employee?.status}
                          // status={parseInt(empData?.employee?.status)}
                        />
                      ) : (
                        <>
                          <span className="badge-style badge-unknown">
                            กำลังโหลด ...
                          </span>
                        </>
                      )}
                    </div>
                    <div className="border-top border-danger my-3"></div>

                    <div className="mb-3">
                      <div className="w-100 bg-danger p-2 border-n rounded-3">
                        <p>
                          <strong>ข้อมูลทั่วไป</strong>
                        </p>
                        <div className="row g-2 p-2">
                          <div className="col-sm-6 col-md-4 ">
                            <DetailItem
                              icon="bi bi-person-vcard"
                              title="เลขบัตรประจำตัวประชาชน"
                              value={IDcardFormat(
                                empData?.employee?.cardId ?? "ไม่พบข้อมูล"
                              )}
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 ">
                            <DetailItem
                              icon="fa-solid fa-cake-candles"
                              title="วันเดือนปีเกิด"
                              value={
                                empData?.employee?.birthday ?? "0000-00-00"
                              }
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 ">
                            <DetailItem
                              icon="fa-solid fa-graduation-cap"
                              title="ระดับการศึกษา"
                              value={
                                // empData?.employee?.employeeCode ?? "ไม่พบข้อมูล"
                                educationDropdown.find(
                                  item =>
                                    item.value ===
                                    Number(empData?.employee?.educationId)
                                )?.label ?? "ไม่พบข้อมูล"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="w-100 bg-danger p-2 border-n rounded-3">
                        <p>
                          <strong>ข้อมูลทำงาน</strong>
                        </p>
                        <div className="row g-2 p-2">
                          <div className="col-sm-6 col-md-4 ">
                            <DetailItem
                              icon="fa-solid fa-user-tie"
                              title="ตำแหน่ง"
                              value="เจ้าหน้าที่พัฒนาซอฟแวร์"
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 ">
                            <DetailItem
                              icon="fa-solid fa-users"
                              title="หน่วยงาน"
                              value="เทคโนโลยีสารสนเทศ"
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 ">
                            <DetailItem
                              icon="fa-solid fa-stairs"
                              title="ระดับ"
                              value="PC-4"
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 ">
                            <DetailItem
                              icon="fa-solid fa-sitemap"
                              title="ประเภท"
                              value="xxxxxxxxxxxxx"
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 ">
                            <DetailItem
                              icon="bi bi-cash"
                              title="อัตราค่าจ้าง"
                              value={empData?.employee?.rate ?? "0.00"}
                            />
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <DetailItem
                              icon="fa-solid fa-user-tie"
                              title="ผู้รับเหมา"
                              value="xxxxxxxxxxxxx"
                            />
                          </div>
                          <div className="col-sm-6 col-md-4 ">
                            <DetailItem
                              icon="fa-regular fa-calendar-days"
                              title="วันเริ่มการทำงาน"
                              value={
                                empData?.employee?.startDate ?? "ไม่พบข้อมูล"
                              }
                            />
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <DetailItem
                              icon="fa-regular fa-calendar-days"
                              title="วันที่ลาออก"
                              value={
                                empData?.employee?.endDate ?? "ไม่พบข้อมูล"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="w-100 bg-danger p-2 border-n rounded-3">
                        <p className="my-2 text-center fw-bold">สายอนุมัติ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
