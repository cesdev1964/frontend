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
import OTcard from "../components/OT/OTcard";
import { handleCancel } from "../util/handleCloseModal";

let OTtimeOptions = {
  otStart: [
    { time: "04:00", timeType: 0 },
    { time: "04:30", timeType: 0 },
    { time: "05:00", timeType: 0 },
    { time: "05:30", timeType: 0 },
    { time: "06:00", timeType: 0 },
    { time: "06:30", timeType: 0 },
    { time: "07.00", timeType: 0 },
    { time: "07:30", timeType: 0 },
    { time: "08:00", timeType: 0 },
    { time: "10:00", timeType: 0 },
    { time: "12:00", timeType: 0 },
    { time: "13:00", timeType: 0 },
    { time: "17:00", timeType: 0 },
    { time: "18:00", timeType: 0 },
  ],
  otEnd: [
    { time: "8:00", timeType: 0 },
    { time: "12:00", timeType: 0 },
    { time: "13:00", timeType: 0 },
    { time: "17:00", timeType: 0 },
    { time: "18:00", timeType: 0 },
    { time: "19:00", timeType: 0 },
    { time: "20:00", timeType: 0 },
    { time: "21:00", timeType: 0 },
    { time: "21:30", timeType: 0 },
    { time: "22:00", timeType: 0 },
    { time: "23:00", timeType: 0 },
    { time: "00:00", timeType: 1 },
    { time: "00:30", timeType: 1 },
    { time: "01:00", timeType: 1 },
    { time: "01:30", timeType: 1 },
    { time: "02:00", timeType: 1 },
  ],
};

export default function OT({ title }) {
  useTitle(title);
  const [newsdata, setNewData] = useState([]);
  const [error, setError] = useState({});
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const { jobDropdown, getJobDropdown } = useJob();
  const [isSubmit, setIsSubmit] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];
  const [input, setInput] = useState({
    startDate: currentDate,
    endDate: currentDate,
    startTime: OTtimeOptions.otStart[0].time,
    endTime: OTtimeOptions.otEnd[0].time,
    breakOverrideRequested: false,
    breakOverrideMinites: 0,
    totalMinutes: 0,
    otTypeId: null,
    jobId: null,
    reason: "",
  });
  const { otTypeDropdown, getOtTypeDropdown } = useOTType();
  const [otTimeList, setOtTimeList] = useState({ otStart: [], otEnd: [] });

  // กำหนดวันบนปฏิทิน
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const dataOnly = (date) => {
    return date.toISOString().split("T")[0];
  };

  const fetchDataTable = useCallback(async () => {
    try {
      await getJobDropdown();
      await getOtTypeDropdown();
      setOtTimeList(OTtimeOptions);
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getJobDropdown, getOtTypeDropdown, setOtTimeList]);

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
    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const validateForm = () => {
    let errors = {};
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
    console.log("OT req data", input);
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
      endDate: currentDate,
      startTime: OTtimeOptions.otStart[0].time,
      endTime: OTtimeOptions.otEnd[0].time,
      breakOverrideRequested: false,
      breakOverrideMinites: 0,
      totalMinutes: 0,
      otTypeId: null,
      jobId: null,
      reason: "",
    });
  };

  //datetime

  const convertTominute = (DateElement) => {};
  
  const calTimeToMinute = (starttime, endtime) => {
    // console.log(starttime);
    const totalMinute = 0;

    if (
      !starttime ||
      !endtime ||
      !starttime.includes(":") ||
      !endtime.includes(":")
    ) {
      return "0 ชั่วโมง 0 นาที";
    } else {
      var [startHr, startMin] = starttime.split(":").map(Number);
      var [endHr, endMin] = endtime.split(":").map(Number);

      const start = new Date();
      start.setHours(startHr, startMin, 0, 0);
      const end = new Date();
      end.setHours(endHr, endMin, 0, 0);

      if (end < start) {
        end.setDate(end.getDate() + 1);
      }

      var diffTime = end - start;
      var convertHr = Math.floor(diffTime / (1000 * 3600));
      const convertMin = Math.floor((diffTime % (1000 * 3600)) / (1000 * 60));

      //การดึงค่ารวมนาทีทั้งหมด

      // console.log("time array",timeArray)
      return convertHr + " ชั่วโมง " + convertMin + " นาที";
    }
  };

  // ตรวจสอบวันที่เลือก > วันปัจจบันไหม ถ้าใช่ ให้เวลาได้หมด ถ้าไม่ ให้เลือกเฉพาะเวลาในวันปัจจุบัน
  const checkIsNextDay = (datetime, OTtimeOptions) => {
    const today = new Date();
    const inputDate = new Date(datetime);
    if (inputDate > today) {
      return setOtTimeList(otTimeList);
    } else {
      setOtTimeList((prev) => ({
        ...prev,
        otEnd: OTtimeOptions.otEnd.filter((item) => item.timeType !== 1),
      }));
    }
  };

  const finishSubmit = () => {
    console.log("submit data", input);
  };

  return (
    <div>
      <HeaderPage pageName={title} />
      <div className="container">
        <div className="bg-white mb-3 p-3 border rounded-3 border-danger filter-display">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="d-flex flex-column align-items-start ">
                <label class="form-label">กรอง 1</label>
                <input
                  name="levelname"
                  type="text"
                  className={"form-control"}
                  id="educationname"
                  placeholder="กรอง 1"
                  // value={input.levelname}
                  // onChange={handleChangeInput}
                />
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6">
              <div className="d-flex flex-column align-items-start ">
                <label class="form-label">กรอง 2</label>
                <input
                  name="levelname"
                  type="text"
                  className={"form-control"}
                  id="educationname"
                  placeholder="กรอง 2"
                  // value={input.levelname}
                  // onChange={handleChangeInput}
                />
              </div>
            </div>
          </div>
          <div id="button">
            <MainButton
              btnName="ทำการขอโอที"
              onClick={() => handleOpenModal("addOTModal")}
              icon="bi bi-plus"
            />
          </div>
        </div>

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
                          <>
                            <OTcard status={0} />
                            <OTcard status={1} />
                            <OTcard status={2} />
                          </>
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
                    min={dataOnly(today)}
                    max={dataOnly(tomorrow)}
                    name="startDate"
                    placeholder="ลงวันที่เริ่ม"
                    value={input.startDate}
                    onChange={handleChangeInput}
                    defaultValue={Date.now()}
                    onKeyDown={(e) => e.preventDefault()}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label">
                    วันที่สิ้นสุดโอที
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="date"
                    id="endDate"
                    className={`form-control ${
                      error.endDate ? "border border-danger" : ""
                    }`}
                    min={dataOnly(today)}
                    max={dataOnly(tomorrow)}
                    name="endDate"
                    placeholder="ลงวันที่สิ้นสุด"
                    value={input.endDate}
                    onChange={
                      handleChangeInput
                      // checkIsNextDay(e.target.value,otTimeList)
                    }
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
                  <select
                    name="startTime"
                    id="startTime"
                    className={`form-control ${
                      error.startTime ? "border border-danger" : ""
                    }`}
                    onChange={handleChangeInput}
                    value={input.startTime || ""}
                    // defaultValue={OTtimeOptions.otStart[0]}
                  >
                    {otTimeList.otStart?.map((item, index) => (
                      <option value={item.time} key={index}>
                        {item.time}
                      </option>
                    ))}
                  </select>
                  {/* <TimeInput
                    onChange={([startTime]) => {
                      setInput((prev) => ({
                        ...prev,
                        startTime: startTime ?? prev.startTime,
                      }));
                    }}
                    placeholder={"ลงเวลา"}
                    value={input.startTime}
                    error={error.startTime}
                  /> */}
                </div>
                <div className="col-6">
                  <label className="form-label">
                    ถึงเวลา
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <select
                    name="endTime"
                    id="endTime"
                    className={`form-control ${
                      error.startTime ? "border border-danger" : ""
                    }`}
                    onChange={handleChangeInput}
                    value={input.endTime || ""}
                  >
                    {otTimeList.otEnd?.map((item, index) => (
                      <option value={item.time} key={index}>
                        {item.time}
                      </option>
                    ))}
                  </select>
                  {/* <TimeInput
                    onChange={([endTime]) => {
                      setInput((prev) => ({
                        ...prev,
                        endTime: endTime ?? prev.endTime,
                      }));
                    }}
                    placeholder={"ลงเวลา"}
                    value={input.endTime}
                    error={error.endTime}
                  /> */}
                </div>
                <div className="totalOTBanner">
                  {/* กล่องแสดงเวลารวม */}
                  <div className="d-flex align-items-center">
                    <span className="me-2 fw-semibold fs-5">
                      รวมแล้วเป็นเวลา :
                    </span>
                    {/* แสดงผลเป็นชั่วโมง นาที แต่ส่งเข้าหลังบ้านเป็นนาที เมื่อมีการ input แล้วทั้ง 2 แล้ว ให้แสดงผลด้านล่างนี้ */}
                    <div
                      className="px-3 py-2 bg-danger text-dark fw-bold rounded fs-4"
                      style={{ minWidth: "70px", textAlign: "center" }}
                    >
                      {calTimeToMinute(input.startTime, input.endTime)}
                    </div>
                  </div>

                  {/* ปุ่มคำนวณเวลา */}
                </div>
              </div>

              <div className="col-12">
                <label className="form-label">หมายเหตุ</label>
                <textarea
                  style={{ resize: "none" }}
                  maxLength="100"
                  name="reason"
                  type="text"
                  rows="4"
                  cols="30"
                  value={input.reason}
                  onChange={handleChangeInput}
                  // className={`form-control ${
                  //   error.employeeCode ? "border border-danger" : ""
                  // }`}
                  className="form-control mb-5"
                  id="reason"
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
