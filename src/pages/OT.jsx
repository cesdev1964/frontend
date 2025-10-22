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
import { TimeInput, DateInput } from "../components/DateAndTimeInput";
import { useOTType } from "../hooks/otTypeStore";

export default function OT({ title }) {
  useTitle(title);
  const [newsdata, setNewData] = useState([]);
  const [error, setError] = useState({});
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const { jobDropdown, getJobDropdown } = useJob();
  const [isSubmit, setIsSubmit] = useState(false);
  const currentDate  = new Date().toISOString().split("T")[0]
  const [input, setInput] = useState({
    startDate:  currentDate,
    endDate: currentDate,
    startTime: null,
    endTime: null,
    breakOverrideRequested: false,
    breakOverrideMinites: 0,
    totalMinutes: 0,
    otTypeId: null,
    jobId: null,
    reason: "",
  });
  const { otTypeDropdown, getOtTypeDropdown } = useOTType();



  const fetchDataTable = useCallback(async () => {
    try {
      await getJobDropdown();
      await getOtTypeDropdown();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getJobDropdown, getOtTypeDropdown]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    setNewData(mockNews);
  }, [newsdata]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const handleChangeCheckbox = () => {
    setOnClickAccordian((prev) => !prev);
  };

  const handleSelectChange = (name, selected) => {
    setInput((prevData) => ({
      ...prevData,
      [name]: selected ? selected.value : null,
    }));
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
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

  const validateForm = () => {
    let errors = {};
    // if (!input.startDate) {
    //   errors.startDate = "กรุณาเลือกวันที่เริ่ม";
    // }
    // if (!input.endDate) {
    //   errors.endDate = "กรุณาเลือกวันที่สิ้นสุด";
    // }
    if (!input.startTime) {
      errors.startTime = "กรุณาเลือกเวลาเริ่ม";
    }
    if (!input.endTime) {
      errors.endTime = "กรุณาเลือกเวลาสิ้นสุด";
    }
    if (!input.jobId || input.jobId === "" || input.jobId === null) {
      errors.jobId = "กรุณาเลือกหน่วยงาน";
    }
    if (!input.otTypeId || input.otTypeId === "" || input.otTypeId === null) {
      errors.otTypeId = "กรุณาเลือกประเภทโอที";
    }
    return errors;
  };

  const handleSubmit = (e, modalId) => {
    e.preventDefault();

    // const reqData = {
    //   educationName: input.educationname,
    // };
    const errorList = validateForm(input) || [];
    setError(errorList);
    if (Object.keys(errorList).length === 0) {
      setIsSubmit(true);
      // const response = editMode
      //   ? await updateEducation(reqData, getId)
      //   : await createEducation(reqData);
      // if (response.success) {
      //   setIsSubmit(true);
      //   Swal.fire({
      //     title: "บันทึกข้อมูลสำเร็จ",
      //     icon: "success",
      //     draggable: true,
      //     buttonsStyling: "w-100",
      //   });
      //   const currentModal = document.getElementById("educationmodal");
      //   const modalInstance = bootstrap.Modal.getInstance(currentModal);
      //   modalInstance.hide();
      //   ClearInput();
      //   await getEducationData();
      // } else {
      //   Swal.fire({
      //     title: "บันทึกข้อมูลไม่สำเร็จ",
      //     text: educationErrorMessage || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
      //     icon: "error",
      //   });
      // }
      Swal.fire({
        title: "บันทึกข้อมูลสำเร็จ",
        icon: "success",
        draggable: true,
        buttonsStyling: "w-100",
      });
      const currentModal = document.getElementById(modalId);
      const modalInstance = bootstrap.Modal.getInstance(currentModal);
      modalInstance.hide();
      // ClearInput();
    }
  };

  const ClearInput = () => {
    setInput({
      startDate: currentDate,
      endDate:  currentDate,
      startTime: null,
      endTime: null,
      breakOverrideRequested: false,
      breakOverrideMinites: 0,
      totalMinutes: 0,
      otTypeId: null,
      jobId: null,
      reason: "",
    });
  
  };

  const getTime = (time)=>{
    const timeOnly = time.toISOString().split(" ")[4]
    return timeOnly;
  }

  // console.log("get Time",getTime({Wed Oct 22 2025 15:00:00 GMT+0700 (Indochina Time)}));

  const totalTime = (startTime, endTime) => {
    //  ทำการคำนวณหาจำนวนชั่วโมง
    // แบ่งออกเป็นนาทีกับวินาที

  };

  const convertToMinute = (startTime, endTime) => {
    // แปลงเป็นนาที
    
  };

  const finishSubmit = () => {
    console.log("submit data", input);
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
          <div className="accordion">
            <div className="accordion-item">
              <input
                id="accordion-trigger-1"
                className="accordion-trigger-input"
                type="checkbox"
                checked={onClickAccordian === true}
                onChange={handleChangeCheckbox}
              ></input>
              <label
                className="accordion-trigger accordion-label"
                htmlFor="accordion-trigger-1"
              >
                <i className="bi bi-hourglass-split me-2 mb-1"></i>
                <strong>ประวัติโอที</strong>
              </label>
              <section className="accordion-animation-wrapper">
                <div className="accordion-animation">
                  <div className="accordion-transform-wrapper">
                    <div className="accordion-content">
                      <div className="news-container mt-3">
                        {newsdata.length === 0 ? (
                          <div className="d-flex flex-column align-items-center justify-content-center p-4">
                            <i
                              className="bi bi-hourglass-split mb-2 text-danger"
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
                                  <i className="bi bi-plus-circle fs-4"></i>
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

              <div className="row form-spacing g-2 w-100">
                <div className="col-6">
                  <label className="form-label">
                    วันที่เริ่มขอโอที
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <DateInput
                    // onChange={([startDate]) => setStartDate(startDate)}
                    onChange={([startDate]) =>
                      setInput((prev) => ({
                        ...prev,
                        startDate: startDate ?? prev.startDate,
                      }))
                    }
                    placeholder={"ลงวันที่เริ่ม"}
                    value={input.startDate ?? null}
                    error={error.startDate}
                  /> */}
                  <input
                    type="date"
                    id="StartDate"
                    className={`form-control ${
                      error.startDate ? "border border-danger" : ""
                    }`}
                    name="startDate"
                    placeholder="ลงวันที่เริ่ม"
                    value={input.startDate}
                    onChange={handleChangeInput}
                    // defaultValue={Date.now()}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">
                    วันที่สิ้นสุดโอที
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  {/* <DateInput
                    // onChange={([endDate]) => setStartDate(endDate)}
                    onChange={([endDate]) =>
                      setInput((prev) => ({
                        ...prev,
                        endDate: endDate ?? prev.endDate,
                      }))
                    }
                    placeholder={"ลงวันที่สิ้นสุด"}
                    value={input.endDate ?? null}
                    error={error.endDate}
                  /> */}
                   <input
                    type="date"
                    id="endDate"
                    className={`form-control ${
                      error.endDate ? "border border-danger" : ""
                    }`}
                    name="endDate"
                    placeholder="ลงวันที่สิ้นสุด"
                    value={input.endDate}
                    onChange={handleChangeInput}
                    defaultValue={Date.now()}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </div>
              </div>
              <div className="row form-spacing g-2 w-100">
                <div className="col-12">
                  <label className="form-label">
                    เลือกชนิดโอที
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <SearchDropdown
                    data={otTypeDropdown}
                    handleSelectChange={(selected) =>
                      handleSelectChange("otTypeId", selected)
                    }
                    placeholder="เลือกชนิดโอที"
                    value={
                      otTypeDropdown.find((i) => i.value === input.otTypeId) ||
                      null
                    }
                    className={`${
                      error.otTypeId ? "border border-danger rounded-2" : ""
                    }`}
                  />
                  {error.otTypeId ? (
                    <p className="text-danger">{error.otTypeId}</p>
                  ) : null}
                </div>
                <div className="col-12">
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
                    className={`${
                      error.jobId ? "border border-danger rounded-2" : ""
                    }`}
                  />
                  {error.jobId ? (
                    <p className="text-danger">{error.jobId}</p>
                  ) : null}
                </div>
              </div>
              <div className="row form-spacing g-2">
                <div className="col-6">
                  <label className="form-label">
                    เริ่มเวลา
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  <TimeInput
                    onChange={([startTime]) => {
                      setInput((prev) => ({
                        ...prev,
                        startTime: startTime ?? prev.startTime,
                      }));
                    }}
                    placeholder={"ลงเวลา"}
                    value={input.startTime}
                    error={error.startTime}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">
                    ถึงเวลา
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  <TimeInput
                    onChange={([endTime]) => {
                      setInput((prev) => ({
                        ...prev,
                        endTime: endTime ?? prev.endTime,
                      }));
                    }}
                    placeholder={"ลงเวลา"}
                    value={input.endTime}
                    error={error.endTime}
                  />
                </div>
              </div>
              <div className="totalOTBanner">
                {/* กล่องแสดงเวลารวม */}
                <div className="d-flex align-items-center">
                  <span className="me-2 fw-semibold fs-5">
                    รวมแล้วเป็นเวลา :{" "}
                  </span>
                  {/* แสดงผลเป็นชั่วโมง นาที แต่ส่งเข้าหลังบ้านเป็นนาที เมื่อมีการ input แล้วทั้ง 2 แล้ว ให้แสดงผลด้านล่างนี้ */}
                  <div
                    className="px-3 py-2 bg-danger text-dark fw-bold rounded fs-4"
                    style={{ minWidth: "70px", textAlign: "center" }}
                  >
                    240
                  </div>
                </div>

                {/* ปุ่มคำนวณเวลา */}
              </div>

              <div className="col-12">
                <label className="form-label">หมายเหตุ</label>
                <textarea
                  style={{ resize: "none" }}
                  maxLength="100"
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
                  handleSubmit={(e) => handleSubmit(e, "addOTModal")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
