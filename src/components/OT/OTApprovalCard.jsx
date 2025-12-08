import { OTapproveStatusBadge } from "../../util/isActiveBadge.jsx";
import { OTApproveEnum } from "../../enum/otApproveEnum.js";
import { getDateAndTime, shortDateFormate } from "../../util/inputFormat.js";
import { useState } from "react";
import { useOTApprove } from "../../hooks/otApproveStore.jsx";
import Swal from "sweetalert2";
import OTApprovelDataInMobile from "./OTApprovelDataInMobile.jsx";
import useScreenSize from "../../hooks/screenSizeStore.jsx";
import OTApproveDataInPC from "./OTApproveDataInPC.jsx";

export default function OTApproveCard({ data, fetchData }) {
  const [isOpenApproveArea, setIsOpenApproveArea] = useState(false);
  const [input, setInput] = useState({
    comment: "",
  });
  const { approveOT, rejectOT } = useOTApprove();
  const screenWidth = useScreenSize();

  const handleChangeApproveArea = () => {
    setIsOpenApproveArea((prev) => !prev);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const hadleSubMitApproval = async (isApproveStatus) => {
    // e.preventDefault();

    const reqDataAprrove = {
      otRequestId: data.otRequestId,
      comment: input.comment ?? "",
    };

    const reqDataReject = {
      otRequestId: data.otRequestId,
      reason: input.comment ?? "",
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success custom-width-btn-alert",
        cancelButton: "btn btn-danger custom-width-btn-alert",
      },
      buttonsStyling: "w-100",
    });
    swalWithBootstrapButtons
      .fire({
        title: `<p>คุณต้องการ
        <span class='text-primary fs-4 lh-lg'>${
          isApproveStatus ? "อนุมัติ" : "ไม่อนุมัติ"
        }</span>
        โอทีของคุณ <span class='text-danger'>${
          data.employee.fullName
        }</span> ใช่หรือไม่</p>`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: isApproveStatus
          ? "ยื่นยันการอนุมัติ"
          : "ยืนยันการไม่อนุมัติ",
        cancelButtonText: isApproveStatus
          ? "ยกเลิกการอนุมัติ"
          : "ยกเลิกการไม่อนุมัติ",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (isApproveStatus === false && input.comment === "") {
          Swal.fire({
            title: "ดำเนินรายการไม่สำเร็จ",
            text: "กรุณาระบุเหตุผล เมื่อดำเนินการไม่อนุมัติโอที",
            icon: "error",
          });
          return;
        }

        if (result.isConfirmed) {
          const { otApproveErrorMessage, success } = isApproveStatus
            ? await approveOT(reqDataAprrove)
            : await rejectOT(reqDataReject);
          if (success) {
            swalWithBootstrapButtons.fire({
              title: `ดำเนินรายการของคุณ  ${data.employee.fullName} สำเร็จ!`,
              // text: ,
              icon: "success",
            });
            fetchData();
          } else {
            Swal.fire({
              title: "ดำเนินรายการไม่สำเร็จ",
              text: otApproveErrorMessage,
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "ยกเลิก",
            text: "คุณทำการยกเลิกอนุมัติรายการเรียบร้อยแล้ว",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <div className="OT-card-container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center gap-1">
            <OTapproveStatusBadge status={OTApproveEnum.PENDING} />
            <i class="bi bi-dot"></i>
            <h5 className="">{data.otType.otTypeName}</h5>
          </div>
        </div>
        <div className="border-top border-danger mb-4"></div>
        <p className="mb-4 ms-2">
          <i class="bi bi-person-circle me-2"></i>
          ชื่อผู้ขอโอที :{" "}
          <span className="text-primary" style={{ fontSize: "0.9rem" }}>
            ({data.employee.employeeCode ?? "-"}){" "}
            {data.employee.titleName ?? "-"} {data.employee.fullName ?? "-"}
          </span>
        </p>

        {/* {screenWidth <= 768?( 
          <OTApprovelDataInMobile/>
        ):(
          <OTApproveDataInPC/>
        )} */}
        <OTApprovelDataInMobile data={data}/>

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
                  {data?.currentStep.approverName ?? "-"}(
                  {data?.currentStep.stepName ?? "-"})
                </span>
              </p>

              <textarea
                style={{ resize: "none" }}
                maxLength="100"
                name="comment"
                type="text"
                rows="4"
                cols="30"
                placeholder="ความคิดเห็นของผู้อนุมัติ"
                value={input.comment}
                onChange={handleChangeInput}
                className={`form-control`}
              ></textarea>
            </div>
            <p className="approveOT-btn">
              <button
                className={`btn btn-outline-danger approval-btn text-danger`}
                onClick={() => {
                  hadleSubMitApproval(false);
                }}
              >
                ไม่อนุมัติ
              </button>
              <button
                className="btn  btn-success approval-btn"
                onClick={() => {
                  hadleSubMitApproval(true);
                }}
              >
                อนุมัติ
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
