import React from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { Link } from "react-router-dom";
import { pdf } from "@react-pdf/renderer";
import DownloadPDFButton from "../../components/DownloadPDFButton";
import SpecialDailyWageReportPDF from "./SpecialDailyWageReportPDF";

export default function SpecialDailyWagereport({ title }) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">ตารางหน่วยงาน</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container p-2">
        <div
          className="report--banner"
          style={{ borderLeft: "6px solid #ff7a88" }}
        >
          <h5 className="mt-1">
            <span className="fw-bold text-primary">
              <h4>โครงการ/หน่วยงาน :</h4>
            </span>{" "}
            อาคารโรงงาน 5 บริษัท ไอ.พี.วัน. จำกัด (IPONE66)
          </h5>
          <DownloadPDFButton />
        </div>
        <div className="table-responsive report-daily-wage">
          <table className="table table-bordered  w-100 detail-table ">
            <thead>
              <tr className="text-white">
                <th>No.</th>
                <th style={{ minWidth: "180px" }}>ชื่อ</th>
                <th style={{ minWidth: "100px" }}>ตำแหน่ง</th>
                <th style={{ minWidth: "100px" }}>รวม (ชม.)</th>
                <th style={{ minWidth: "100px" }}>อัตราค่าจ้าง</th>
                <th style={{ minWidth: "100px" }}>ค่าจ้าง (บาท)</th>
                <th style={{ minWidth: "100px" }}>ประกันสังคม 5%</th>
                <th style={{ minWidth: "100px" }}>ค่าจ้าง (บาท)</th>
                <th style={{ minWidth: "100px" }} colSpan={3}>
                  ค่าดำเนินการ
                </th>
                <th style={{ minWidth: "100px" }}>ค่าสุทธิ (บาท)</th>
              </tr>
              <tr className="text-white  ">
                <th></th>
                <th style={{ minWidth: "180px" }}></th>
                <th style={{ minWidth: "100px" }}></th>
                <th style={{ minWidth: "100px" }}></th>
                <th style={{ minWidth: "100px" }}></th>
                <th style={{ minWidth: "100px" }}></th>
                <th style={{ minWidth: "100px" }}></th>
                <th style={{ minWidth: "100px" }}></th>
                <th>ประกันสังคม 10%</th>
                <th>กองทุนทดแทน 0.5%</th>
                <th>ดำเนินการ 12%</th>
                <th style={{ minWidth: "100px" }}></th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-dark  bg-danger">
                <td>1</td>
                <td>นาง xxxx xxxx</td>
                <td>แม่บ้าน</td>
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
            </tbody>
            <tfoot>
              <tr >
                <th colSpan="5" className="text-center bg-white">
                  จำนวนเงินรวม
                </th>
                <th colSpan="1" className="text-center bg-white fw-bold">
                  3,720.00
                </th>
                <th colSpan="5" className="text-center bg-white"></th>
                <th colSpan="1" className="text-center bg-white fw-bold text-decoration-underline">
                  4,371.00
                </th>
              </tr>
              <tr>
                <th colSpan="11" className="text-end bg-white">
                  ค่าแรง
                </th>
                <th colSpan="1" className="text-center bg-white fw-bold">
                  3,720.00
                </th>
              </tr>
              <tr>
                <th colSpan="11" className="text-end bg-white">
                  โอที
                </th>
                <th colSpan="1" className="text-center bg-white fw-bold ">
                  3,720.00
                </th>
              </tr>
              <tr className="text-danger">
                <th colSpan="11" className="bg-white text-end ">
                  รวมเป็นเงินทั้งสิ้น
                </th>
                <th colSpan="1" className="text-center bg-white fw-bold text-decoration-underline">
                  3,720.00
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
