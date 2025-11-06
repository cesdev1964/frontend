import { OTapproveStatusBadge } from "../../util/isActiveBadge.jsx";
import { OTApproveEnum } from "../../enum/otApproveEnum.js";
import { shortDateFormate } from "../../util/inputFormat.js";
import { useState } from "react";

export default function OTApproveCard({ otData, handleDelete }) {
  const [isOpenApproveArea, setIsOpenApproveArea] = useState(false);

  const handleChangeApproveArea = () => {
    setIsOpenApproveArea((prev) => !prev);
  };

  return (
    <div>
      <div className="OT-card-container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-1">
            <OTapproveStatusBadge status={OTApproveEnum.PENDING}/>
            <i class="bi bi-dot"></i>
            <h5 className="">ประเภทโอที</h5>
          </div>

          {/* {otData.status != OTApproveEnum.APPROVE && (
            <a
              style={{ cursor: "pointer", marginTop: 0 }}
              //   onClick={handleDelete}
            >
              <span className="icon-action">
                <i className="bi bi-trash-fill text-center fs-4" title="ลบ"></i>
              </span>
            </a>
          )} */}
          <a
            style={{ cursor: "pointer", marginTop: 0 }}
            //   onClick={handleDelete}
          >
            <span className="icon-action">
              <i className="bi bi-trash-fill text-center fs-4" title="ลบ"></i>
            </span>
          </a>
        </div>
        <div className="border-top border-danger mb-4"></div>
        <div className="row g-3">
          <div className="col-md-12 col-lg-6 mb-4">
               <p className=""><i class="bi bi-person-circle me-2"></i>
              ชื่อผู้ขอโอที :{" "}
              <span className="text-primary" style={{fontSize:"0.9rem"}}>
                (employeeID) xx-xx-xxxx
              </span>
            </p>
            <p className="OT-description-label">
              วันที่เริ่มขอโอที :{" "}
              <span className="OT-description-value">xx-xx-xxxx</span>
            </p>
            <p className="OT-description-label">
              วันที่สิ้นสุดโอที :{" "}
              <span className="OT-description-value">xx-xx-xxxx</span>
            </p>
            <p className="OT-description-label">
              ระยะเวลา :{" "}
              <span className="OT-description-value">xx:xx - xx:xx</span>
            </p>
            <p className="OT-description-label">
              รวมระยะเวลา :{" "}
              <span className="OT-description-value">xxx นาที</span>
            </p>
          </div>
          <div className="col-md-12 col-lg-6">
            <p className="OT-description-label">
              หน่วยงาน :{" "}
              <span className="OT-description-value">หน่วยงานที่รับผิดชอบ</span>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
                blanditiis eaque debitis et, repudiandae sit culpa iste modi ad
                rerum labore obcaecati cumque suscipit veritatis unde saepe
                aperiam corrupti iure.
              </span>
            </p>
            <p className="OT-description-label">
                  ดำเนินการขอเมื่อ :{" "}
                  <span className="OT-description-value">
                    xx-xx-xxxx / xx:xx
                  </span>
                </p>
          </div>
        </div>
        <div className="border-top border-danger my-3"></div>
        <div className="OT-footer mb-1">
          <button
            className={`btn ${
              isOpenApproveArea ? " btn-primary" : " btn-info"
            }`}
            onClick={handleChangeApproveArea}
          >
            {isOpenApproveArea ? "ปิด" : "ส่วนของผู้อนุมัติ"}
          </button>
          <div
            className={`collapse ${isOpenApproveArea ? "show" : ""} w-100`}
            id="approvalDetail"
          >
            <div className="d-flex flex-column gap-3 mt-3">
                 <p className="OT-description-label">
                  ผู้ทำการอนุมัติ :{" "}
                  <span className="OT-description-value">
                   xxxxxxx (อันดับการอนุมัติ)
                  </span>
                </p>
              
                <textarea
                  style={{ resize: "none" }}
                  maxLength="100"
                  name="reason"
                  type="text"
                  rows="4"
                  cols="30"
                  placeholder="ความคิดเห็นของผู้อนุมัติ"
                  // value={input.reason}
                  // onChange={handleChangeInput}
                  // className={`form-control ${
                  //   error.employeeCode ? "border border-danger" : ""
                  // }`}
                  className="form-control mb-4"
                  id="reason"
                ></textarea>
              
            </div>
            <p className="d-inline-flex justify-content-end gap-3 w-100 pe-3">
              <button
                className="btn  btn-success approval-btn"
                // onClick={handleChangeApproveArea}
              >
                อนุมัติ
              </button>
              <button
                className={`btn btn-secondary approval-btn`}
                // onClick={handleChangeApproveArea}
              >
                ไม่อนุมัติ
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
