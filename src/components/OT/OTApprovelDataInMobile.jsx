import React from "react";
import { getDateAndTime, shortDateFormate } from "../../util/inputFormat";

export default function OTApprovelDataInMobile({data}) {
  return (
    <div>
      <div className="row">
        <div className="col-md-12 col-lg-6 mb-4">
          <div className="d-flex justify-content-center px-2">
            <table className="table table-bordered">
              <thead>
                <tr className="text-white">
                  <th
                    style={{
                      background: "#ff7a88",
                      fontWeight: "600",
                      padding: "12px 8px",
                      width: "50%",
                    }}
                    className="text-center"
                  >
                    วันที่เริ่มขอโอที
                  </th>
                  <th
                    style={{
                      background: "#ff7a88",
                      fontWeight: "600",
                      padding: "12px 8px",
                      width: "50%",
                    }}
                    className="text-center"
                  >
                    วันที่สิ้นสุดโอที
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td style={{ fontSize: "0.9rem" }}>{shortDateFormate(data.period.startDate) ?? "ไม่ระบุ"}</td>
                    <td style={{ fontSize: "0.9rem" }}>{shortDateFormate(data.period.endDate) ?? "ไม่ระบุ"}</td>
                  </tr>
              </tbody>
              <thead>
                <tr className="text-white">
                  <th
                    style={{
                      background: "#ff7a88",
                      fontWeight: "600",
                      padding: "12px 8px",
                      width: "50%",
                    }}
                    className="text-center"
                  >
                    ระยะเวลา
                  </th>
                  <th
                    style={{
                      background: "#ff7a88",
                      fontWeight: "600",
                      padding: "12px 8px",
                      width: "50%",
                    }}
                    className="text-center"
                  >
                    รวมระยะเวลา
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td style={{ fontSize: "0.9rem" }}>{data.period.startTime ?? "00:00"} -{" "}{data.period.endTime ?? "00:00"}</td>
                    <td style={{ fontSize: "0.9rem" }}>{data.period.totalMinutes ?? "-"} นาที</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-12 col-lg-6">
          <p className="OT-description-label">
            หน่วยงาน : <span className="OT-description-value">{data.job.jobNo ?? "-"}</span>
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
    </div>
  );
}
