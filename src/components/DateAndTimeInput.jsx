import React from "react";
import "flatpickr/dist/themes/material_red.css";
import Flatpickr from "react-flatpickr";
export function DateInput({ value, placeholder, onChange, error }) {
  // ตรวจสอบว่าค่าที่ input เข้ามาใช้ เวลาไหม
  const normalizedValue =
    value instanceof Date ? value : value ? new Date() : null;

  return (
    <>
      <Flatpickr
        value={value}
        onChange={(dates)=>{
          const selected = dates && dates.length > 0? dates[0]:null;
          onChange(selected?[selected]:[null])
        }}
        className={`form-control bg-white ${
          error ? "border border-danger" : ""
        }`}
        placeholder={placeholder}
      />
      {error ? <p className="text-danger">{error}</p> : null}
    </>
  );
}

export function TimeInput({ value, placeholder, onChange, error }) {
  return (
    <>
      <Flatpickr
        value={value}
        onClose={onChange}
        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
        }}
        className={`form-control bg-white ${
          error ? "border border-danger" : ""
        }`}
        placeholder={placeholder}
      />
      {error ? <p className="text-danger">{error}</p> : null}
    </>
  );
}
