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

  const avatarUrl = `data:image/jpeg;base64,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`;

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
