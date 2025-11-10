import React from "react";

export default function HolidayCard() {
  return (
    <div className="d-flex align-items-start my-3 holiday-card-container gap-3">
      <div className="d-flex flex-column bg-danger p-3 border-0 rounded-2 justify-content-center align-items-center">
        <h4 className="mb-1">1</h4>
        <h5>ม.ค.</h5>
      </div>

      <div className="d-flex flex-column gap-2 w-100">
        <h5 className="mt-2 text-primary">วันหยุดขึ้นปีใหม่</h5>
        <div className="d-flex justify-content-end">
          <span class="badge-style badge-stillWork">
            <i
              class="bi bi-circle-fill me-2 "
              style={{ fontSize: "0.7rem" }}
            ></i>
            หยุดทั้งวัน
          </span>
        </div>
      </div>
    </div>
  );
}
