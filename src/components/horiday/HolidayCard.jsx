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

  const [year, month, day] = holidayData.date.split("-").map(Number);

  return (
    <div className="d-flex align-items-start my-3 holiday-card-container justify-content-between gap-3">
      <div className="d-flex flex-grow-1 min-w-0">
        <div className="d-flex flex-column bg-danger py-1 px-4 border-0 rounded-2 justify-content-center align-items-center">
          <h4 className="my-2">{day}</h4>
          <h5>{monthShortName[month - 1] ?? "-"}</h5>
        </div>
        <p className={`mt-2 text-primary ${holidayData.description.length > 15?"fs-6":"fs-5" }text-start ms-3`} style={{textWrap:"wrap"}}>
          {holidayData.description ?? "-"}
        </p>
      </div>

      <p className="flex-shrink-0">
        <i class={`bi bi-circle-fill me-2 text-${holidayData.isHalfDay?"primary":"success"}`} style={{ fontSize: "0.7rem" }}></i>
        {holidayData.isHalfDay?"ครึ่งวัน":"เต็มวัน"}
      </p>
    </div>
  );
}
