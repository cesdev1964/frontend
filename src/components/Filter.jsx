import React from "react";

export default function Filter({ children }) {
  return (
    <div>
      <div className="bg-white mb-3 p-3 border rounded-3 border-danger filter-display">
        <div className="row g-3">{children}</div>
      </div>
    </div>
  );
}
