import React, { useState, useEffect, useCallback } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { Link } from "react-router-dom";
import DownloadPDFButtonForSpecialDailryReport from "../../components/report/DownloadPDFButtonForSpecialDailryReport";
import Filter from "../../components/Filter";
import InputTextField from "../../components/inputTextField";
import { SearchDropdown } from "../../components/searchDropdown";
import { useJob } from "../../hooks/jobStore";
import SpecialDailyReportDataTable from "../../components/report/SpecialDailyReportDataTable";

export default function SpecialDailyWagereport({ title }) {
  const { jobDropdown, getJobDropdownAll } = useJob();
  const [isLoading, setIsLoading] = useState(false);
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const [input, setInput] = useState({
    jobFilter: 0,
  });
  const jobNameMock = "FAIRMON ปรับปรุง โรงแรม WINSOR (เก่า) 30 ชั้น ใต้ดิน 3 ชั้น (FAIRMON)"

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await getJobDropdownAll();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [getJobDropdownAll]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  //   ใช้สำหรับ filter
  const handleSelectChange = (name, selected) => {
    setInput((prevData) => ({
      ...prevData,
      [name]: selected ? selected.value : null,
    }));
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">  <i class="bi bi-house-door-fill"></i></Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container p-4 px-1">
        <Filter>
          <div className="d-flex flex-column align-items-start justify-content-start">
            <label className="form-label">หน่วยงาน</label>
            <SearchDropdown
              data={jobDropdown}
              handleSelectChange={(selected) =>
                handleSelectChange("jobFilter", selected)
              }
              placeholder="เลือกหน่วยงาน"
              value={
                jobDropdown.find((i) => i.value === input.jobFilter) || null
              }
            />
          </div>
        </Filter>
      
      </div>

      <div className="container p-4 announcement-box">
        <div
          className="report--banner"
          style={{ borderLeft: "6px solid #ff7a88" }}
        >
          <p className="mt-1" style={{ fontSize: "1.2rem" }}>
            <span className="fw-bold text-primary">
              <h4>โครงการ/หน่วยงาน :</h4>
            </span>{" "}
            {jobNameMock}
          </p>

          <DownloadPDFButtonForSpecialDailryReport jobName={jobNameMock}/>
        </div>
        {/* ตารางที่ใช้ */}
        <center>
          <SpecialDailyReportDataTable/>
        </center>
      </div>
    </div>
  );
}
