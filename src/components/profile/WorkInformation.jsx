import React from "react";
import DetailItem from "../home/detailItem";
import { shortDateFormate } from "../../util/inputFormat";

export default function WorkInformation({
  empData,
  employeeTypeDropdown,
  positionDropdown,
  jobDropdown,
  levelDropdown,
  contratorDropdown,
}) {
  return (
    <div className="mb-3">
      <div className="w-100 bg-danger p-2 border-n rounded-3">
        <p className="mt-2 text-center fw-bold">ข้อมูลการทำงาน</p>
        <div className="row g-2 p-2">
          <div className="col-sm-6 col-md-4 ">
            <DetailItem
              icon="fa-solid fa-user-tie"
              title="ตำแหน่ง"
              value={
                positionDropdown.find(
                  (item) => item.value === Number(empData?.employee?.positionId)
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
                  (item) => item.value === Number(empData?.employee?.jobId)
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
                  (item) => item.value === Number(empData?.employee?.levelId)
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
                  (item) => item.value === Number(empData?.employee?.typeId)
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
                    item.value === Number(empData?.employee?.contractorId)
                )?.label ?? "ไม่พบข้อมูล"
              }
            />
          </div>
          <div className="col-sm-6 col-md-4 ">
            <DetailItem
              icon="fa-regular fa-calendar-days"
              title="วันเริ่มการทำงาน"
              value={shortDateFormate(
                empData?.employee?.startDate ?? "ไม่พบข้อมูล"
              )}
            />
          </div>
          {/* <div className="col-sm-6 col-md-4">
                                    <DetailItem
                                      icon="fa-regular fa-calendar-days"
                                      title="วันที่ลาออก"
                                      value={
                                        empData?.employee?.endDate ?? "ไม่พบข้อมูล"
                                      }
                                    />
                                  </div> */}
        </div>
      </div>
    </div>
  );
}
