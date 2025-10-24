import React, { useState } from "react";
import "flatpickr/dist/themes/material_red.css";
import Flatpickr from "react-flatpickr";
export function DateInput({ value, placeholder, onChange, error }) {
  // ตรวจสอบว่าค่าที่ input เข้ามาใช้ เวลาไหม
   const [tempValue,setTempValue] = useState(value);
    
  return (
    <>
      <Flatpickr
        value={value || ""}
        onChange={(dates)=>{
          setTempValue(dates[0]);
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
