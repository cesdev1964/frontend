import React from "react";

export default function HolidayCard({ holidayData }) {
  const monthShortName = [
    "ม.ค",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
  ];

  return (
    <div className="d-flex align-items-start my-3 holiday-card-container gap-3">
      <div className="d-flex flex-column bg-danger py-3 px-5 border-0 rounded-2 justify-content-center align-items-center">
        <h4 className="my-2">{holidayData.holidayDay}</h4>
        <h5>{monthShortName[holidayData.holidayMonth-1]??"-"}</h5>
      </div>

      <div className="d-flex flex-column align-items-center">
        <p className="mt-2 text-primary fs-5 text-start">{holidayData.holidayName ?? "-"}</p>
        {/* <div className="d-flex justify-content-end">
          <span class="badge-style badge-stillWork">
            <i
              class="bi bi-circle-fill me-2 "
              style={{ fontSize: "0.7rem" }}
            ></i>
            หยุดทั้งวัน
          </span>
        </div> */}
      </div>
    </div>
  );
}
