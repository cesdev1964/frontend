import { OTapproveStatusBadge } from "../../util/isActiveBadge.jsx";
import { OTApproveEnum } from "../../enum/otApproveEnum.js";
import { getDateAndTime, shortDateFormate } from "../../util/inputFormat.js";

export default function OTcard({ otData, handleDelete }) {


  return (
    <div>
      <div className="OT-card-container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-1">
            <OTapproveStatusBadge status={otData.status} />
            <i class="bi bi-dot"></i>
            <h5 className="">{otData.otType}</h5>
          </div>

          {otData.status != OTApproveEnum.APPROVE && (
            <a
              style={{ cursor: "pointer", marginTop: 0 }}
              onClick={handleDelete}
            >
              <span className="icon-action">
                <i className="bi bi-trash-fill text-center fs-4" title="ลบ"></i>
              </span>
            </a>
          )}
        </div>
        <div className="border-top border-danger mb-4"></div>
        <div className="row g-3">
          <div className="col-md-12 col-lg-6 mb-4">
            <p className="OT-description-label">
              วันที่เริ่มขอโอที :{" "}
              <span className="OT-description-value">{shortDateFormate(otData.startDate)}</span>
            </p>
            <p className="OT-description-label">
              วันที่สิ้นสุดโอที :{" "}
              <span className="OT-description-value">{shortDateFormate(otData.endDate)}</span>
            </p>
            <p className="OT-description-label">
              ระยะเวลา :{" "}
              <span className="OT-description-value">
                {otData.startTime} - {otData.endTime}
              </span>
            </p>
            <p className="OT-description-label">
              รวมระยะเวลา :{" "}
              <span className="OT-description-value">
                {otData.totalMinutes} นาที
              </span>
            </p>
          </div>
          <div className="col-md-12 col-lg-6">
            <p className="OT-description-label">
              หน่วยงาน :{" "}
              <span className="OT-description-value">
                {otData.jobNo ?? "-"}
              </span>
            </p>
            <p className="OT-description-label" style={{ textWrap: "balance" }}>
              เหตุผล :{" "}
              <span
                className="OT-description-value"
                style={{
                  wordBreak: "break-all",
                  lineHeight: "1.5",
                }}
              >
                {otData.reason ?? "-"}
              </span>
            </p>
          </div>
        </div>
        <div className="border-top border-danger my-3"></div>
        <div className="OT-footer mb-1">
          {/* <p className="OT-description-label">
              วันที่เริ่มขอโอที :{" "}
              <span className="OT-description-value">xx/xx/xxxx</span>
            </p> */}
          {/* <p className="OT-description-label">
            ผู้อนุมัติ :{" "}
            <span className="OT-description-value">
              กมลฉันท์ออออออออออออ วงศ์วัฒนxxxxxxxxxxxxxxxxx
            </span>
          </p> */}
          <p className="OT-description-label" id="menter">
            วัน และ เวลาที่ดำเนินการขอ :{" "}
            <span className="OT-description-value">
              {getDateAndTime(otData?.requestedAt)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
