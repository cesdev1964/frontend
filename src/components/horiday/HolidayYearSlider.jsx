import React from "react";

export default function HolidayYearSlider({handlePrevYear,handleNextYear,yearDisplay}) {
  return (
    <div className="d-flex justify-content-between align-items-center my-3">
      <a className=" btn btn-icon btn-primary" title="ปีก่อนหน้า" onClick={handlePrevYear}>
        <i class="bi bi-caret-left-fill"></i>
      </a>
      <h4>ปี {yearDisplay}</h4>
      <a className="btn btn-icon btn-primary" title="ปีถัดไป" onClick={handleNextYear}>
        <i class="bi bi-caret-right-fill"></i>
      </a>
    </div>
  );
}
