import React from "react";

export default function Filter({ children }) {
  return (
    <div className="announcement-box pt-3 mb-3">
      <h5><i class="bi bi-filter me-2"></i>กรองข้อมูล</h5>
      <div className="bg-white mb-1 p-3 filter-display">
        <div className="row g-3">{children}</div>
      </div>
    </div>
  );
}
