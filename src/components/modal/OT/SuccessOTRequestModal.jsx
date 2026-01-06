import React, { useCallback, useEffect } from "react";
import {
  getDateAndTime,
  getDateAndTime2,
  getOnlyDateCE,
  shortDateFormate,
} from "../../../util/inputFormat";
import { handleCancel } from "../../../util/handleCloseModal";
import { OTapproveStatusBadge } from "../../../util/isActiveBadge.jsx";
import { useJob } from "../../../hooks/jobStore.jsx";
import { useOTType } from "../../../hooks/otTypeStore.jsx";

export default function SuccessOTRequestModal({ otData }) {
  const { getOtTypeDropdown, otTypeDropdown } = useOTType();
  const { getJobDropdown, jobDropdown } = useJob();

  const fetchDataTable = useCallback(async () => {
    try {
      await getOtTypeDropdown();
      await getJobDropdown();
    } catch (error) {
      setIsLoading(false);
      return;
    }
  }, [getOtTypeDropdown, getJobDropdown]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);
  return (
    <>
      <div
        className="modal fade"
        id="RequestOTDescription"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content bg-primary d-flex flex-column">
            <div className="modal-header bg-danger text-danger border-3 border-bottom border-danger">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <i className="bi bi-calendar-check fs-4 me-2"></i>
                รายละเอียดการขอโอที
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCancel}
              ></button>
            </div>
            <div className="modal-body d-flex flex-column align-items-start">
              <div className="d-flex align-items-center gap-1 bg-white w-100 mb-2 border-0 rounded-3">
                <OTapproveStatusBadge status={otData.status} />
                <i class="bi bi-dot"></i>
                <p style={{ fontSize: "18px", color: "#000" }} className="mt-2">
                    {otTypeDropdown.find(
                  (item) => item.value === Number(otData.otTypeId)
                )?.label ?? "ไม่พบข้อมูล"}
                  {/* {otData.otTypeId} */}
                </p>
              </div>

              <div className="d-flex gap-3 mb-3 w-100">
                <div
                  className="item-card border"
                  style={{ backgroundColor: "#F6F8D5" }}
                >
                  <p className="label">วันที่เริ่มทำโอที</p>
                  <hr />
                  <p
                    className="value fw-bold"
                    style={{ textWrap: "wrap", fontSize: "1.2rem" }}
                  >
                    {shortDateFormate(getOnlyDateCE(otData.startDate))}
                  </p>
                </div>

                <div
                  className="item-card border"
                  style={{ backgroundColor: "#DCF2F1" }}
                >
                  <p className="label">วันที่สิ้นสุดโอที</p>
                  <hr />
                  <p
                    className="value fw-bold "
                    style={{ textWrap: "wrap", fontSize: "1.2rem" }}
                  >
                    {shortDateFormate(getOnlyDateCE(otData.endDate))}
                  </p>
                </div>
              </div>
              <div className="d-flex gap-3 w-100">
                <div
                  className="item-card border"
                  style={{ backgroundColor: "#FFEBEB" }}
                >
                  <p className="label">ระยะเวลา</p>
                  <hr />
                  <p className="value fw-bold">
                    {otData.startTime ?? ""} - {otData.endTime ?? ""}
                  </p>
                </div>

                <div
                  className="item-card border"
                  style={{ backgroundColor: "#E7F6DA" }}
                >
                  <p className="label">รวม</p>
                  <hr />
                  <h4 className="value"> {otData.totalMinutes ?? "-"} นาที</h4>
                </div>
              </div>

              <div className="mt-3 bg-white w-100 mb-2 border-0 rounded-3 p-4">
                <p className="OT-description-label">
                  หน่วยงาน :{" "}
                  <span className="OT-description-value ">
                    {jobDropdown.find(
                  (item) => item.value === Number(otData.jobId)
                )?.label ?? "ไม่พบข้อมูล"}
                    {/* {otData.jobId ?? ""} */}
                  </span>
                </p>
                <p
                  className="OT-description-label"
                  style={{ textWrap: "balance", lineHeight: "1.5" }}
                >
                  หมายเหตุ :{" "}
                  <span
                    className="OT-description-value OT-approver lh-base lh-sm lh-lg"
                    style={{ textWrap: "wrap" }}
                  >
                    {otData.reason ?? "-"}
                  </span>
                </p>
                <p
                  className="OT-description-label"
                  style={{ textWrap: "balance" }}
                >
                  ดำเนินการขอเมื่อ :{" "}
                  <span className="OT-description-value OT-approver lh-base lh-sm lh-lg">
                    {getDateAndTime2(otData?.requestedAt) ?? "ไม่มีการบันทึก"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
