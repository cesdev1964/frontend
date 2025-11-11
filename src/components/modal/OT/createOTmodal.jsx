import { useState, useEffect, useCallback } from "react";
import { SubmitOrCancelButton } from "../../SubmitOrCancelBtnForModal";
import { SearchDropdown } from "../../searchDropdown";
import { OTtimeOptions } from "../../../Data";
import { useOTType } from "../../../hooks/otTypeStore";

export default function CreateOTmodal({
  input,
  setInput,
  handleChangeInput,
  handleSelectChange,
  handleSubmit,
  IsLoading,
  handleCancel,
  error,
  displayTime,
  setDisplayTime,
}) {
  const [otTimeList, setOtTimeList] = useState({ otStart: [], otEnd: [] });
  const { otTypeDropdown, getOtTypeDropdown } = useOTType();

  //date
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const dataOnly = (date) => {
    return date.toISOString().split("T")[0];
  };

  const fetchDataTable = useCallback(async () => {
    try {
      //   await getJobDropdown();
      await getOtTypeDropdown();
    } catch (error) {
      // alert("โหลด API ไม่สำเร็จ", error);
      return;
    }
  }, [getOtTypeDropdown]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    setOtTimeList(OTtimeOptions);

    if (!input.startTime || !input.endTime) {
      return;
    }

    const { display, totalMin } = calculateOTTime(
      input.startTime,
      input.endTime
    );
    setInput((prev) => ({
      ...prev,
      totalMinutes: totalMin,
    }));

    setDisplayTime(display);
  }, [input.startTime, input.endTime]);

  const calculateOTTime = (starttime, endtime) => {
    if (
      !starttime ||
      !endtime ||
      !starttime.includes(":") ||
      !endtime.includes(":")
    ) {
      return "-";
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

      const totalMinute = convertHr * 60 + convertMin;
      return {
        display: `${convertHr} ชั่วโมง ${convertMin} นาที`,
        totalMin: totalMinute,
      };
    }
  };

  return (
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
              onClick={handleCancel}
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
                  handleSelectChange={handleSelectChange}
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
              {/* <div className="col-12">
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
                    </div> */}
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
                >
                  <option value="">เลือกเวลา</option>
                  {otTimeList.otStart?.map((item, index) => (
                    <option value={item.time} key={index}>
                      {item.time}
                    </option>
                  ))}
                </select>
                {error.startTime ? (
                  <p className="text-danger">{error.startTime}</p>
                ) : null}
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
                  <option value="">เลือกเวลา</option>
                  {input.startDate === input.endDate ? (
                    <>
                      {otTimeList.otEnd
                        ?.filter((item) => item.timeType === 0)
                        .map((item, index) => (
                          <option value={item.time} key={index}>
                            {item.time}
                          </option>
                        ))}
                    </>
                  ) : (
                    <>
                      {otTimeList.otEnd?.map((item, index) => (
                        <option value={item.time} key={index}>
                          {item.time}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                {error.endTime ? (
                  <p className="text-danger">{error.endTime}</p>
                ) : null}
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
                    {displayTime ?? "-"}
                    {/* {input.totalMinutes} */}
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
              ></textarea>
              {/* {error.employeeCode ? (
                              <p className="text-danger">{error.employeeCode}</p>
                            ) : null} */}

              <SubmitOrCancelButton
                handleCancel={handleCancel}
                handleSubmit={handleSubmit}
                isLoading={IsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
