import React from "react";
import DetailItem from "../home/detailItem";
import { IDcardFormat, shortDateFormate } from "../../util/inputFormat";

export default function PersonalInformation({empData,educationDropdown}) {
  return (
    <div className="mb-3">
      <div className="w-100 bg-danger p-2 border-n rounded-3">
        <p className="mt-2 text-center fw-bold">ข้อมูลทั่วไป</p>
        <div className="row g-2 p-2">
          <div className="col-sm-6 col-md-4 ">
            <DetailItem
              icon="bi bi-person-vcard"
              title="เลขบัตรประจำตัวประชาชน"
              value={IDcardFormat(empData?.employee?.cardId ?? "ไม่พบข้อมูล")}
            />
          </div>
          <div className="col-sm-6 col-md-4 ">
            <DetailItem
              icon="fa-solid fa-cake-candles"
              title="วันเดือนปีเกิด"
              value={shortDateFormate(
                empData?.employee?.birthday ?? "00-00-0000"
              )}
            />
          </div>
          <div className="col-sm-6 col-md-4 ">
            <DetailItem
              icon="fa-solid fa-graduation-cap"
              title="ระดับการศึกษา"
              value={
                educationDropdown.find(
                  (item) =>
                    item.value === Number(empData?.employee?.educationId)
                )?.label ?? "ไม่พบข้อมูล"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
