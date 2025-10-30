import { useTitle } from "../hooks/useTitle";
import HeaderPage from "../components/HeaderPage";
import { Link } from "react-router-dom";
import ImageComponent from "../components/Image";
import DetailItem from "../components/home/DetailItem.jsx";
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
import { useFlow } from "../hooks/flowStore.jsx";
import FlowIcon from "../assets/icon/FlowIcon.jsx";

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
  const { getFlowById, flowById, flowIsLoading } = useFlow();
  const [isLoading, setIsLoading] = useState(false);

  const fetchDataTable = useCallback(async () => {
    setIsLoading(true);
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
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
    getFlowById,
    publicEmployeeId,
  ]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  // น่าจะต้องนำค่าใส่ในนี้ เพราะค่าไม่อัปเดตเลย ทำเหมือนการ edit
  useEffect(() => {
    if (employeeById) {
      setEmpData(employeeById);
    } else {
      setEmpData({});
    }
    // console.log("EmpData",empData);
  }, [employeeById]);

  useEffect(() => {
    // console.log("โหลด flow:", employeeById.employee.flowId);
    const fetchFlowData = async () => {
      if (employeeById.employee?.flowId) {
        await getFlowById(employeeById.employee?.flowId);
      }
    };

    if (!flowIsLoading) {
      fetchFlowData();
    }
  }, [employeeById, getFlowById]);

  const avatarUrl =
    //  employeeById.files?employeeById.files[0].photoPath[0]:
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
        {!isLoading ? (
          <>
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
                                รหัสพนักงาน : {empData?.employee?.employeeCode}
                              </p>
                              <h5 className="mb-2">
                                {empData?.employee?.firstname}
                                {"  "}
                                {empData?.employee?.lastname}
                              </h5>
                              <p className="my-3">
                                <i className="bi bi-telephone-fill"></i> :{" "}
                                {telephoneFormat(
                                  empData?.employee?.telephoneNo
                                )}{" "}
                                {
                                  telephoneFormat(
                                    empData?.employee?.telephoneNo
                                  ).length
                                }
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
                                    educationDropdown.find(
                                      (item) =>
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
                                  value={
                                    positionDropdown.find(
                                      (item) =>
                                        item.value ===
                                        Number(empData?.employee?.positionId)
                                    )?.label ?? "ไม่พบข้อมูล"
                                  }
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 ">
                                <DetailItem
                                  icon="fa-solid fa-users"
                                  title="หน่วยงาน"
                                  value={
                                    jobDropdown.find(
                                      (item) =>
                                        item.value ===
                                        Number(empData?.employee?.jobId)
                                    )?.label ?? "ไม่พบข้อมูล"
                                  }
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 ">
                                <DetailItem
                                  icon="fa-solid fa-stairs"
                                  title="ระดับ"
                                  value={
                                    levelDropdown.find(
                                      (item) =>
                                        item.value ===
                                        Number(empData?.employee?.levelId)
                                    )?.label ?? "ไม่พบข้อมูล"
                                  }
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 ">
                                <DetailItem
                                  icon="fa-solid fa-sitemap"
                                  title="ประเภท"
                                  value={
                                    employeeTypeDropdown.find(
                                      (item) =>
                                        item.value ===
                                        Number(empData?.employee?.typeId)
                                    )?.label ?? "ไม่พบข้อมูล"
                                  }
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
                                  value={
                                    contratorDropdown.find(
                                      (item) =>
                                        item.value ===
                                        Number(empData?.employee?.contractorId)
                                    )?.label ?? "ไม่พบข้อมูล"
                                  }
                                />
                              </div>
                              <div className="col-sm-6 col-md-4 ">
                                <DetailItem
                                  icon="fa-regular fa-calendar-days"
                                  title="วันเริ่มการทำงาน"
                                  value={
                                    empData?.employee?.startDate ??
                                    "ไม่พบข้อมูล"
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
                        <div className="w-100 bg-danger p-2 border-n rounded-3 mb-3">
                          <p className="mt-2 text-center fw-bold">
                            รายการการหักเงิน
                          </p>
                          <div className="d-flex justify-content-center px-5 py-3">
                            
                              <table
                                className="table table-bordered"
                                // style={{ width: "100%" }}
                              >
                                <thead>
                                  <tr className="text-white">
                                    <th
                                      style={{
                                        background: "#ff7a88",
                                        fontWeight: "600",
                                        padding: "12px 8px",
                                        width: "200px",
                                      }}
                                      className="text-center"
                                    >
                                      ชื่อประเภทการหัก
                                    </th>
                                    <th
                                      style={{
                                        background: "#ff7a88",
                                        fontWeight: "600",
                                        padding: "12px 8px",
                                        width: "200px",
                                      }}
                                      className="text-center"
                                    >
                                      จำนวนเงิน
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-white">
                                    <td>John</td>
                                    <td>Doe</td>
                                  </tr>
                                  <tr className="bg-white">
                                    <td>John</td>
                                    <td>Doe</td>
                                  </tr>
                                </tbody>
                              </table>
                        
                          </div>
                        </div>
                        <div>
                          <div className="w-100 bg-danger p-2 border-n rounded-3">
                            <p className="my-2 text-center fw-bold">
                              สายอนุมัติ
                            </p>
                            <div className="d-flex flex-wrap justify-content-center gap-4 my-3">
                              {flowById.approvalSteps ? (
                                <>
                                  {flowById.approvalSteps?.map(
                                    (item, index) => (
                                      <>
                                        <div
                                          className="d-flex flex-column align-items-center"
                                          key={index}
                                        >
                                          <div
                                            className="mb-2"
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              backgroundColor: "#ffffffff",
                                              borderRadius: "50%",
                                              position: "relative",
                                            }}
                                          >
                                            <p
                                              style={{
                                                position: "absolute",
                                                left: "15px",
                                                top: "9px",
                                              }}
                                            >
                                              {item.stepNumber}
                                            </p>
                                          </div>
                                          <p style={{ fontWeight: "bold" }}>
                                            {item.stepName}
                                          </p>
                                          <p
                                            style={{
                                              fontSize: "0.9rem",
                                              lineHeight: "0.1rem",
                                            }}
                                          >
                                            {item.fullName}
                                          </p>
                                        </div>
                                      </>
                                    )
                                  )}
                                </>
                              ) : (
                                <>
                                  <div className="d-flex flex-column align-items-center justify-content-center p-4">
                                    <FlowIcon width="60" colorFill="#f19999" />
                                    <h5 className="text-danger mt-4">
                                      ไม่พบสายอนุมัติ
                                    </h5>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="spinner-border text-danger"
                role="status"
                style={{ width: "3rem", height: "3rem", marginTop: "300px" }}
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
