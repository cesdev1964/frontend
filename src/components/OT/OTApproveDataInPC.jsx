import React from 'react'

export default function OTApproveDataInPC() {
  return (
    <>
      <div className="d-flex justify-content-center px-2">
                 <table className="table table-bordered">
                   <thead>
                     <tr className="text-white">
                       <th
                         style={{
                           background: "#ff7a88",
                           fontWeight: "600",
                           padding: "12px 8px",
                         }}
                         className="text-center"
                       >
                         วันที่เริ่มขอโอที
                       </th>
                       <th
                         style={{
                           background: "#ff7a88",
                           fontWeight: "600",
                           padding: "12px 8px",
                         }}
                         className="text-center"
                       >
                         วันที่สิ้นสุดโอที
                       </th>
                       <th
                         style={{
                           background: "#ff7a88",
                           fontWeight: "600",
                           padding: "12px 8px",
                         }}
                         className="text-center"
                       >
                         ระยะเวลา
                       </th>
                       <th
                         style={{
                           background: "#ff7a88",
                           fontWeight: "600",
                           padding: "12px 8px",
                         }}
                         className="text-center"
                       >
                         รวมระยะเวลา
                       </th>
                       <th
                         style={{
                           background: "#ff7a88",
                           fontWeight: "600",
                           padding: "12px 8px",
                         }}
                         className="text-center"
                       >
                         หน่วยงาน
                       </th>
                       <th
                         style={{
                           background: "#ff7a88",
                           fontWeight: "600",
                           padding: "12px 8px",
                         }}
                         className="text-center"
                       >
                         ดำเนินการขอ
                       </th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td style={{ fontSize: "0.9rem" }}>
                         {/* {shortDateFormate(data.period.startDate) ?? "ไม่ระบุ"} */}
                       </td>
                       <td style={{ fontSize: "0.9rem" }}>
                         {/* {shortDateFormate(data.period.endDate) ?? "ไม่ระบุ"} */}
                       </td>
                       <td style={{ fontSize: "0.9rem" }}>
                         <span className="OT-description-value">
                           {/* {data.period.startTime ?? "00:00"} -{" "}
                           {data.period.endTime ?? "00:00"} */}
                         </span>
                       </td>
                       <td style={{ fontSize: "0.9rem" }}>
                         {/* {data.period.totalMinutes ?? "-"} นาที */}
                       </td>
                       <td style={{ fontSize: "0.9rem" }}>
                         {/* {data.job.jobNo ?? "-"} */}
                       </td>
                       <td style={{ fontSize: "0.9rem" }}>
                         {/* {getDateAndTime(data?.requestedAt) ?? "xx-xx-xxxx / xx:xx"} */}
                       </td>
                     </tr>
                   </tbody>
                 </table>
               </div>
               <p
                 className="OT-description-label ms-3"
                 style={{ textWrap: "balance", lineHeight: "1.5" }}
               >
                 หมายเหตุ :{" "}
                 <span
                   className="OT-description-value"
                   style={{
                     wordBreak: "break-all",
                   }}
                 >
                   {/* {data.reason ?? "-"}  */}
                   Lorem ipsum dolor sit amet consectetur
                   adipisicing elit. Eligendi quibusdam corrupti debitis qui incidunt
                   illo, ducimus sint eius possimus. Blanditiis maxime eligendi
                   sapiente corporis ullam repellendus, dicta magni ea nobis?
                 </span>
               </p>
    </>
  )
}
