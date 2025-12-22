import { OTapproveStatusBadge } from "../../util/isActiveBadge.jsx";
import { OTApproveEnum } from "../../enum/otApproveEnum.js";
import { getDateAndTime, shortDateFormate } from "../../util/inputFormat.js";
import { useAuth } from "../../auth/AuthContext.jsx"
import { PermissionEnum } from "../../enum/permissionAndRole.js";

export default function OTcard({ otData, handleDelete }) {
  const { authdata } = useAuth();
  const rolePermissionRequire = authdata?.permissions ?? [];

  return (
    <div>
      <div className="OT-card-container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-1">
            <OTapproveStatusBadge status={otData.status} />
            <i class="bi bi-dot"></i>
            <p style={{ fontSize: "18px", color: "#000" }} className="mt-2">
              {otData.otType}
            </p>
          </div>

          {otData.status != OTApproveEnum.APPROVE &&
            rolePermissionRequire.some((p) =>
              [PermissionEnum.OT_DELETE].includes(p)
            ) && (
              <a
                style={{ cursor: "pointer", marginTop: 0 }}
                onClick={handleDelete}
              >
                <span className="icon-action">
                  <i
                    className="bi bi-trash-fill text-center fs-4"
                    title="ลบ"
                  ></i>
                </span>
              </a>
            )}
        </div>
        <div className="border-top border-danger mb-4"></div>

         <div className="row g-2 justify-content-center">
                <div className="col-6 col-md-6 col-lg-3">
                  <div className="item-card" style={{ backgroundColor: "#F6F8D5" }}>
                    <p className="label">วันที่เริ่มทำโอที</p>
                    <hr />
                    <p className="value fw-bold" style={{textWrap:"wrap",fontSize:"1.2rem"}}>
                       {shortDateFormate(otData.startDate)}
                    </p>
                  </div>
                </div>
                <div className="col-6 col-md-6 col-lg-3">
                  <div className="item-card" style={{ backgroundColor: "#DCF2F1" }}>
                    <p className="label">วันที่สิ้นสุดโอที</p>
                    <hr />
                    <p className="value fw-bold " style={{textWrap:"wrap",fontSize:"1.2rem"}}>
                   {shortDateFormate(otData.endDate)}
                    </p>
                  </div>
                </div>
                <div className="col-6 col-md-6 col-lg-3">
                  <div className="item-card" style={{ backgroundColor: "#FFEBEB" }}>
                    <p className="label">ระยะเวลา</p>
                    <hr />
                    <h5 className="value">
                       {otData.startTime ?? ""} - {otData.endTime ?? "" }
                    </h5>
                  </div>
                </div>
                <div className="col-6 col-md-6 col-lg-3">
                  <div className="item-card" style={{ backgroundColor: "#E7F6DA" }}>
                    <p className="label">รวม</p>
                    <hr />
                    <h5 className="value"> {otData.totalMinutes ?? "-"} นาที</h5>
                  </div>
                </div>
              </div>
               <div className="col-md-12 col-lg-12 ms-3 mt-4">
                      <p className="OT-description-label">
                        หน่วยงาน :{" "}
                        <span className="OT-description-value ">{otData.jobNo ?? ""}</span>
                      </p>
                      <p
                        className="OT-description-label"
                        style={{ textWrap: "balance", lineHeight: "1.5" }}
                      >
                        หมายเหตุ :{" "}
                        <span className="OT-description-value OT-approver lh-base lh-sm lh-lg" style={{textWrap:"wrap"}}>
                         {otData.reason ?? "-"}
                        </span>
                      </p>
                      <p className="OT-description-label" style={{ textWrap: "balance"}}>
                        ดำเนินการขอเมื่อ :{" "}
                        <span className="OT-description-value OT-approver lh-base lh-sm lh-lg">
                          {getDateAndTime(otData?.requestedAt) ?? "ไม่มีการบันทึก"}
                        </span>
                      </p>
                    </div>

        {/* <div className="row g-3">
          <div className="col-md-12 col-lg-6 mb-4">
            <p className="OT-description-label mb-4">
              วันที่เริ่มขอโอที :{" "}
              <span className="OT-description-value">
                {shortDateFormate(otData.startDate)}
              </span>
            </p>
            <p className="OT-description-label mb-4">
              วันที่สิ้นสุดโอที :{" "}
              <span className="OT-description-value">
                {shortDateFormate(otData.endDate)}
              </span>
            </p>
            <p className="OT-description-label mb-4">
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
              หมายเหตุ :{" "}
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
          <p className="OT-description-label" id="menter">
            ดำเนินการขอเมื่อ :{" "}
            <span className="OT-description-value">
              {getDateAndTime(otData?.requestedAt)}
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
}
