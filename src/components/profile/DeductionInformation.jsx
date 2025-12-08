import React from "react";
import { decimalFormat } from "../../util/inputFormat";

export default function DeductionInformation({ empData, deductionData }) {
  return (
    <div className="w-100 bg-danger p-2 border-n rounded-3 mb-3">
      <p className="mt-2 text-center fw-bold">รายการการหักเงิน</p>
      <div className="d-flex justify-content-center px-2 py-3">
        <table className="table table-bordered">
          <thead>
            <tr className="text-white">
              <th
                style={{
                  background: "#ff7a88",
                  fontWeight: "600",
                  padding: "12px 8px",
                  width: "60%",
                }}
                className="text-center"
              >
                ชื่อประเภทการหัก
              </th>
              <th
                style={{
                  background: "#ff7a88",
                  fontWeight: "600",
                  padding: "12px 8px",
                  width: "40%",
                }}
                className="text-center"
              >
                จำนวนเงิน
              </th>
            </tr>
          </thead>
          <tbody>
            {empData?.deductions ? (
              <>
                {empData.deductions.map((item) => {
                  return (
                    <tr className="bg-white" key={item.deductionId}>
                      <td style={{ fontSize: "0.9rem" }}>
                        {deductionData.find(
                          (i) => i.deductionTypeId === item.deductionTypeId
                        )?.deductionTypeName ?? "ไม่พบข้อมูล"}
                      </td>
                      <td className="text-end" style={{ fontSize: "0.9rem" }}>
                        {decimalFormat(item.amount)}
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <></>
            )}
            <tr className="bg-white border-top-3 fw-bold">
              <td style={{ fontSize: "0.9rem" }}>รวมทั้งหมด</td>
              <td className="text-end" style={{ fontSize: "0.9rem" }}>
                {decimalFormat(
                  empData?.deductions?.reduce(
                    (total, row) => total + Number(row.amount),
                    0
                  )
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
