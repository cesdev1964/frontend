import React from "react";
import { getDateAndTime, shortDateFormate } from "../../util/inputFormat";

export default function OTApprovelDataInMobile({ data }) {
  return (
    <div>
      <div className="row g-2 justify-content-center">
        <div className="col-6 col-md-6 col-lg-3" >
          <div className="item-card" style={{ backgroundColor: "#F6F8D5" }}>
            <p className="label">วันที่เริ่มทำโอที</p>
            <hr />
            <h5 className="value">
              {shortDateFormate(data.period.startDate) ?? "ไม่ระบุ"}
            </h5>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3" >
          <div className="item-card" style={{ backgroundColor: "#DCF2F1" }}>
            <p className="label">วันที่สิ้นสุดโอที</p>
            <hr />
            <h5 className="value">
              {shortDateFormate(data.period.endDate) ?? "ไม่ระบุ"}
            </h5>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="item-card" style={{ backgroundColor: "#FFEBEB" }}>
            <p className="label">ระยะเวลา</p>
            <hr />
            <h5 className="value">
              {data.period.startTime ?? "00:00"} -{" "}
              {data.period.endTime ?? "00:00"}
            </h5>
          </div>
        </div>
        <div className="col-6 col-md-6 col-lg-3">
          <div className="item-card" style={{ backgroundColor: "#E7F6DA" }}>
            <p className="label">รวม</p>
            <hr />
            <h5 className="value">{data.period.totalMinutes ?? "-"} นาที</h5>
          </div>
        </div>
      </div>
      <div className="col-md-12 col-lg-12 ms-3 mt-4">
        <p className="OT-description-label">
          หน่วยงาน :{" "}
          <span className="OT-description-value ">{data.job.jobNo ?? "-"}</span>
        </p>
        <p
          className="OT-description-label"
          style={{ textWrap: "balance", lineHeight: "1.5" }}
        >
          หมายเหตุ :{" "}
          <span
            className="OT-description-value"
            style={{
              wordBreak: "break-all",
            }}
          >
            {data.reason ?? "-"}
          </span>
        </p>
        <p className="OT-description-label">
          ดำเนินการขอเมื่อ :{" "}
          <span className="OT-description-value">
            {getDateAndTime(data?.requestedAt) ?? "xx-xx-xxxx / xx:xx"}
          </span>
        </p>
      </div>
    </div>
  );
}
