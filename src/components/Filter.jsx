import React from "react";

export default function Filter({ children }) {
  return (
    <div className="announcement-box pt-3  border border-primary ">
      <div className="text-danger"><h5><i class="bi bi-filter me-2"></i>กรองข้อมูล</h5></div>
      <hr className="text-danger"/>
      <div className="bg-white  p-2 filter-display">
        <div className="row g-3">{children}</div>
      </div>
    </div>
  );
}
