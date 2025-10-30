import React from "react";
import { OTapproveStatusBadge } from "../../util/isActiveBadge.jsx";

export default function OTcard({ status }) {
  return (
    <div>
      <div className="OT-card-container">
        <div className="d-flex align-items-center justify-content-between">
          <a style={{cursor:"pointer"}} data-bs-toggle="tooltip" title="คลิกดูสายอนุมัติ">
            <div className="d-flex align-items-center gap-1">
              <OTapproveStatusBadge status={status} />
              <i class="bi bi-dot"></i>
              <h5 className="">ประเภทโอทีที่ขอ</h5>
            </div>
          </a>
        </div>
        <div className="border-top border-danger mb-4"></div>
        <div className="row g-3">
          <div className="col-md-12 col-lg-6 mb-4">
            <p className="OT-description-label">
              วันที่เริ่มขอโอที :{" "}
              <span className="OT-description-value">xx/xx/xxxx</span>
            </p>
            <p className="OT-description-label">
              วันที่สิ้นสุดโอที :{" "}
              <span className="OT-description-value">xx/xx/xxxx</span>
            </p>
            <p className="OT-description-label">
              ระยะเวลา :{" "}
              <span className="OT-description-value">xx:xx - xx:xx</span>
            </p>
            <p className="OT-description-label">
              รวมระยะเวลา : <span className="OT-description-value">xx:xx</span>
            </p>
          </div>
          <div className="col-md-12 col-lg-6">
            <p className="OT-description-label">
              หน่วยงาน :{" "}
              <span className="OT-description-value">xxxxxxxxxxxx</span>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Recusandae consectetur expedita aliquid id, facilis quis
                molestias ab necessitatibus, cum, sequi voluptatem inventore
                consequuntur numquam hic? Voluptas possimus similique nulla
                quis.
              </span>
            </p>
          </div>
        </div>
        <div className="border-top border-danger my-3"></div>
        <div className="d-flex justify-content-end gap-3">
          {/* <p className="OT-description-label">
              วันที่เริ่มขอโอที :{" "}
              <span className="OT-description-value">xx/xx/xxxx</span>
            </p> */}
          <p className="OT-description-label">
            วันที่ดำเนินการขอ :{" "}
            <span className="OT-description-value">xx/xx/xxxx</span>
          </p>
        </div>
      </div>
    </div>
  );
}
