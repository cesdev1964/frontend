import React from 'react'

export default function SpecialDailyReportDataTable() {
  return (
    <div className="table-responsive report-daily-wage">
            <table className="table table-bordered  w-100 detail-table">
              <thead>
                <tr className="text-white">
                  <th rowSpan={2}>No.</th>
                  <th style={{ minWidth: "180px" }} rowSpan={2}>
                    ชื่อ
                  </th>
                  <th style={{ minWidth: "100px" }} rowSpan={2}>
                    ตำแหน่ง
                  </th>
                  <th style={{ minWidth: "100px" }} rowSpan={2}>
                    เวลาทำงาน
                  </th>
                  <th style={{ minWidth: "100px" }} rowSpan={2}>
                    ค่าใช้จ่าย
                  </th>
                  <th style={{ minWidth: "80px" }} rowSpan={2}>
                    รวม (ชม.)
                  </th>
                  <th style={{ minWidth: "100px" }} rowSpan={2}>
                    อัตราค่าจ้าง
                  </th>
                  <th style={{ minWidth: "100px" }} rowSpan={2}>
                    ค่าจ้าง (บาท)
                  </th>
                  <th style={{ minWidth: "100px" }} rowSpan={2}>
                    ประกันสังคม 5%
                  </th>
                  <th style={{ minWidth: "100px" }} rowSpan={2}>
                    ค่าจ้าง (บาท)
                  </th>
                  <th style={{ minWidth: "100px" }} colSpan={3}>
                    ค่าดำเนินการ
                  </th>
                  <th style={{ minWidth: "100px" }} rowSpan={2}>
                    ค่าสุทธิ (บาท)
                  </th>
                </tr>
                <tr className="text-white  ">
                  <th>ประกันสังคม 10%</th>
                  <th>กองทุนทดแทน 0.5%</th>
                  <th>ดำเนินการ 12%</th>
                </tr>
              </thead>
              <tbody>
                {/* ข้อมูลเป็น list */}
                <tr className="text-dark  bg-danger">
                  <td>1</td>
                  <td>นาง xxxx xxxx</td>
                  <td>แม่บ้าน</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr className="text-dark bg-white ">
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>วันทำงาน (วัน)</td>
                  <td>-</td>
                  <td>10.00</td>
                  <td>372.00</td>
                  <td>3,720.00</td>
                  <td>(186.00)</td>
                  <td>3,534.00</td>
                  <td>372.00</td>
                  <td>18.60</td>
                  <td>446.40</td>
                  <td className="fw-bold">4,371.00</td>
                </tr>
                <tr className="text-dark bg-white ">
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>ล่วงเวลา - วันทำงาน (วัน)</td>
                  <td>-</td>
                  <td>10.00</td>
                  <td>372.00</td>
                  <td>3,720.00</td>
                  <td>(186.00)</td>
                  <td>3,534.00</td>
                  <td>372.00</td>
                  <td>18.60</td>
                  <td>446.40</td>
                  <td className="fw-bold">4,371.00</td>
                </tr>
                <tr className="text-dark bg-white ">
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>ค่าเช่าห้อง</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
                <tr className="border-4 border-bottom border-top">
                  <th colSpan="9" className="text-center bg-white" style={{fontSize:"0.8rem"}}>
                    จำนวนเงินรวม
                  </th>
                  <th colSpan="1" className="text-center bg-white fw-bold" style={{fontSize:"0.8rem"}}>
                    3,720.00
                  </th>

                  {/* ในส่วนนี้ทำเป็น list เมื่อมีชื่อหลายหลายการ */}
                  <th colSpan="3" className="text-center bg-white"></th>
                  <th
                    colSpan="1"
                    className="text-center bg-white fw-bold text-decoration-underline"
                    style={{fontSize:"0.8rem"}}
                  >
                    4,371.00
                  </th>
                </tr>

                <tr className="text-dark  bg-danger">
                  <td>2</td>
                  <td>นาย xxxx xxxx</td>
                  <td>ช่างไฟ</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="text-dark bg-white ">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>วันทำงาน (วัน)</td>
                  <td></td>
                  <td>10.00</td>
                  <td>372.00</td>
                  <td>3,720.00</td>
                  <td>(186.00)</td>
                  <td>3,534.00</td>
                  <td>372.00</td>
                  <td>18.60</td>
                  <td>446.40</td>
                  <td className="fw-bold">4,371.00</td>
                </tr>
                <tr className="text-dark bg-white ">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>ล่วงเวลา - วันทำงาน (วัน)</td>
                  <td></td>
                  <td>10.00</td>
                  <td>372.00</td>
                  <td>3,720.00</td>
                  <td>(186.00)</td>
                  <td>3,534.00</td>
                  <td>372.00</td>
                  <td>18.60</td>
                  <td>446.40</td>
                  <td className="fw-bold">4,371.00</td>
                </tr>
                <tr className="text-dark bg-white ">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>ค่าเช่าห้อง</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr className="border-4 border-bottom border-top">
                  <th colSpan="9" className="text-center bg-white " style={{fontSize:"0.8rem"}}>
                    จำนวนเงินรวม
                  </th>
                  <th colSpan="1" className="text-center bg-white fw-bold" style={{fontSize:"0.8rem"}}>
                    3,720.00
                  </th>

                  {/* ในส่วนนี้ทำเป็น list เมื่อมีชื่อหลายหลายการ */}
                  <th colSpan="3" className="text-center bg-white"></th>
                  <th
                    colSpan="1"
                    className="text-center bg-white fw-bold text-decoration-underline"
                    style={{fontSize:"0.8rem"}}
                  >
                    4,371.00
                  </th>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan="13" className="text-end bg-white" style={{fontSize:"0.8rem"}}>
                    ค่าแรง
                  </th>
                  <th colSpan="1" className="text-center bg-white fw-bold" style={{fontSize:"0.8rem"}}>
                    3,720.00
                  </th>
                </tr>
                <tr>
                  <th colSpan="13" className="text-end bg-white" style={{fontSize:"0.8rem"}}>
                    โอที
                  </th>
                  <th colSpan="1" className="text-center bg-white fw-bold " style={{fontSize:"0.8rem"}}>
                    3,720.00
                  </th>
                </tr>
                <tr className="text-danger" >
                  <th colSpan="13" className="bg-white text-end " >
                    รวมเป็นเงินทั้งสิ้น
                  </th>
                  <th
                    colSpan="1"
                    className="text-center bg-white fw-bold text-decoration-underline"
                  >
                    3,720.00
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
  )
}
