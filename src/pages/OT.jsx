// src/pages/Home.jsx
import { useState, useEffect, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useTitle } from "../hooks/useTitle";
import Swal from "sweetalert2";
import HeaderPage from "../components/HeaderPage";
import { mockNews } from "../MockData";
import MainButton from "../components/MainButton";
import { SubmitOrCancelButton } from "../components/SubmitOrCancelBtnForModal";
import { useJob } from "../hooks/jobStore";
import { SearchDropdown } from "../components/searchDropdown";

export default function OT({ title }) {
  useTitle(title);
  const [newsdata, setNewData] = useState([]);
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const { jobDropdown, getJobDropdown } = useJob();
  const [input, setInput] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    breakOverrideRequested: false,
    breakOverrideMinites: 0,
    totalMinutes: 0,
    otTypeId: null,
    jobId: null,
    reason: "",
  });

  const fetchDataTable = useCallback(async () => {
    try {
      await getJobDropdown();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getJobDropdown]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    setNewData(mockNews);
  }, [newsdata]);

  const handleChangeCheckbox = () => {
    setOnClickAccordian((prev) => !prev);
  };

  const handleSelectChange = (name, selected) => {
    setInput((prevData) => ({
      ...prevData,
      [name]: selected ? selected.value : null,
    }));
  };

  const handleOpenModal = (modalId) => {
    // setEditMode(false);
    // ClearInput();
    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const handleSubmit = () => {
    console.log("กดส่งจร้า");
  };

  const ClearInput = () => {
    setInput({
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      breakOverrideRequested: false,
      breakOverrideMinites: 0,
      totalMinutes: 0,
      otTypeId: null,
      jobId: null,
      reason: "",
    });
  };

  return (
    <div>
      <HeaderPage pageName={title} />
      <div className="container">
        <div className="border-danger  border-1 rounded-3 bg-danger p-4 d-flex mb-3 align-items-center justify-content-between">
          <h5>รายการโอทีที่ผ่านมา</h5>
          <MainButton
            btnName="บันทึกโอที"
            onClick={() => handleOpenModal("addOTModal")}
          />
        </div>

        <div className="filter-container">ส่วนของการกรอง</div>
        {/* <MainButton btnName="บันทึกโอที" /> */}

        <div className="flex-grow-1 d-flex align-items-start justify-content-center">
          <div class="accordion">
            <div class="accordion-item">
              <input
                id="accordion-trigger-1"
                class="accordion-trigger-input"
                type="checkbox"
                checked={onClickAccordian === true}
                onChange={handleChangeCheckbox}
              ></input>
              <label
                class="accordion-trigger accordion-label"
                for="accordion-trigger-1"
              >
                <i class="bi bi-hourglass-split me-2 mb-1"></i>
                <strong>ประวัติโอที</strong>
              </label>
              <section class="accordion-animation-wrapper">
                <div class="accordion-animation">
                  <div class="accordion-transform-wrapper">
                    <div class="accordion-content">
                      <div className="news-container mt-3">
                        {newsdata.length === 0 ? (
                          <div className="d-flex flex-column align-items-center justify-content-center p-4">
                            <i
                              class="bi bi-hourglass-split mb-2 text-danger"
                              style={{ fontSize: "60px" }}
                            ></i>
                            <h4 className="text-danger">ไม่พบการขอโอที</h4>
                            <div className="add-btn mt-3">
                              <a
                                className="power py-2"
                                style={{ maxWidth: "200px" }}
                                data-bs-toggle="modal"
                                data-bs-target="#addOTModal"
                              >
                                <span>
                                  <i class="bi bi-plus-circle fs-4"></i>
                                </span>{" "}
                                <span className="label">ทำการขอโอที</span>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      {/* modal add */}
      <div
        className="modal fade"
        id="addOTModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content bg-primary">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <i className="bi bi-plus-circle fs-4 me-2"></i>
                ทำการขอโอที
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => handleCancel("addOTModal")}
              ></button>
            </div>
            <div className="modal-body d-flex flex-column align-items-center">
              {/* <div class="alert alert-info w-100" role="alert">
                วันที่ 21/09/2568 กะ (นับชั่วโมง) OF3 เวลาเข้า 08:00 ออก 00:00
                วันหยุด พัก 60 นาที
              </div> */}

              <div className="row form-spacing g-2">
                <div className="col-6">
                  <label className="form-label">
                    วันที่เริ่มขอโอที
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="employeeCode"
                    type="text"
                    // className={`form-control ${
                    //   error.employeeCode ? "border border-danger" : ""
                    // }`}
                    className="form-control"
                    id="employeeCode"
                    placeholder="กรอกรหัสพนักงาน"
                    // value={input.employeeCode ?? ""}
                    // onChange={handleChangeInput}
                  />
                  {/* {error.employeeCode ? (
                          <p className="text-danger">{error.employeeCode}</p>
                        ) : null} */}
                </div>
                <div className="col-6">
                  <label className="form-label">
                    วันที่สิ้นสุดโอที
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="employeeCode"
                    type="text"
                    // className={`form-control ${
                    //   error.employeeCode ? "border border-danger" : ""
                    // }`}
                    className="form-control"
                    id="employeeCode"
                    placeholder="กรอกรหัสพนักงาน"
                    // value={input.employeeCode ?? ""}
                    // onChange={handleChangeInput}
                  />
                  {/* {error.employeeCode ? (
                          <p className="text-danger">{error.employeeCode}</p>
                        ) : null} */}
                </div>
              </div>
              <div className="row form-spacing g-2 w-100">
                <div className="col-6">
                  <label className="form-label">
                    เลือกชนิดโอที
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="employeeCode"
                    type="text"
                    // className={`form-control ${
                    //   error.employeeCode ? "border border-danger" : ""
                    // }`}
                    className="form-control"
                    id="employeeCode"
                    placeholder="กรอกรหัสพนักงาน"
                    // value={input.employeeCode ?? ""}
                    // onChange={handleChangeInput}
                  />
                  {/* {error.employeeCode ? (
                          <p className="text-danger">{error.employeeCode}</p>
                        ) : null} */}
                </div>
                <div className="col-6">
                  <label className="form-label">
                    หน่วยงาน
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <SearchDropdown
                    data={jobDropdown}
                    handleSelectChange={(selected) =>
                      handleSelectChange("jobId", selected)
                    }
                    placeholder="เลือกหน่วยงาน"
                    value={
                      jobDropdown.find((i) => i.value === input.jobId) || null
                    }
                    // className={`${
                    //   error.jobId ? "border border-danger rounded-2" : ""
                    // }`}
                  />
                  {/* {error.employeeCode ? (
                          <p className="text-danger">{error.employeeCode}</p>
                        ) : null} */}
                </div>
              </div>
              <div className="row form-spacing g-2">
                <div className="col-6">
                  <label className="form-label">
                    เริ่มเวลา
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="employeeCode"
                    type="text"
                    // className={`form-control ${
                    //   error.employeeCode ? "border border-danger" : ""
                    // }`}
                    className="form-control"
                    id="employeeCode"
                    placeholder="กรอกรหัสพนักงาน"
                    // value={input.employeeCode ?? ""}
                    // onChange={handleChangeInput}
                  />
                  {/* {error.employeeCode ? (
                          <p className="text-danger">{error.employeeCode}</p>
                        ) : null} */}
                </div>
                <div className="col-6">
                  <label className="form-label">
                    ถึงเวลา
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="employeeCode"
                    type="text"
                    // className={`form-control ${
                    //   error.employeeCode ? "border border-danger" : ""
                    // }`}
                    className="form-control"
                    id="employeeCode"
                    placeholder="กรอกรหัสพนักงาน"
                    // value={input.employeeCode ?? ""}
                    // onChange={handleChangeInput}
                  />
                  {/* {error.employeeCode ? (
                          <p className="text-danger">{error.employeeCode}</p>
                        ) : null} */}
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between gap-3 p-2 bg-light rounded w-100 my-2">
                {/* กล่องแสดงเวลารวม */}
                <div className="d-flex align-items-center">
                  <div
                    className="px-3 py-2 bg-danger text-dark fw-bold rounded"
                    style={{ minWidth: "70px", textAlign: "center" }}
                  >
                    240
                  </div>
                  <span className="ms-2 fw-semibold fs-5">นาที</span>
                </div>

                {/* ปุ่มคำนวณเวลา */}
                <button type="button" className="btn btn-outline-danger btn-sm">
                  ตัวช่วยคำนวณเวลาอีกที
                </button>
              </div>

              <div className="col-12">
                <label className="form-label">หมายเหตุ</label>
                <textarea
                  style={{ resize: "none" }}
                  maxlength="100"
                  name="employeeCode"
                  type="text"
                  rows="4"
                  cols="30"
                  // className={`form-control ${
                  //   error.employeeCode ? "border border-danger" : ""
                  // }`}
                  className="form-control mb-5"
                  id="employeeCode"
                  // value={input.employeeCode ?? ""}
                  // onChange={handleChangeInput}
                ></textarea>
                {/* {error.employeeCode ? (
                          <p className="text-danger">{error.employeeCode}</p>
                        ) : null} */}

                <SubmitOrCancelButton
                  handleCancel={() => handleCancel("addOTModal")}
                  handleSubmit={handleSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
