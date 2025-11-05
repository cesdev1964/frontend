import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../auth/AuthContext";
import { useTitle } from "../hooks/useTitle";
import Swal from "sweetalert2";
import HeaderPage from "../components/HeaderPage";
import MainButton from "../components/MainButton";
import OTcard from "../components/OT/OTcard";
import { handleCancel } from "../util/handleCloseModal";
import { useEmployee } from "../hooks/employeeStore";
import { useOTrequest } from "../hooks/otRequestStore";
import CreateOTmodal from "../components/modal/OT/createOTmodal";
import Pagination from "../components/Pagination";
import { mockOTreq } from "../MockData";

export default function OTRequest({ title }) {
  useTitle(title);
  const { authdata } = useAuth();
  const [error, setError] = useState({});
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [displayTime, setDisplayTime] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  const [input, setInput] = useState({
    startDate: currentDate,
    endDate: currentDate,
    startTime: "",
    endTime: "",
    breakOverrideRequested: false,
    breakOverrideMinites: 0,
    totalMinutes: 0,
    otTypeId: null,
    jobId: null,
    reason: "",
  });
  const { employeeById, getEmployeeById } = useEmployee();
  const [currentPage, setCurrentPage] = useState(1);
  const { createOTrequest, getOTrequestData, otIsLoading } = useOTrequest();

  // กำหนดวันบนปฏิทิน
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  //เกี่ยวกับ pagination
  let NUM_OF_RECORDS = mockOTreq.length;
  let LIMIT = 5;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = mockOTreq.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );

  const handleChangeAccordian = () => {
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
    ClearInput();
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
    if (!input.otTypeId || input.otTypeId === "" || input.otTypeId === null) {
      errors.otTypeId = "กรุณาเลือกประเภทโอที";
    }
    if (
      !input.startTime ||
      input.startTime === "" ||
      input.startTime === null
    ) {
      errors.startTime = "กรุณาเลือกเวลาเริ่มโอที";
    }
    if (!input.endTime || input.endTime === "" || input.endTime === null) {
      errors.endTime = "กรุณาเลือกเวลาสิ้นสุดโอที";
    }
    return errors;
  };

  const compareDate = (startDateInput, endDateInput) => {
    const startDate = new Date(startDateInput).toISOString().split("T")[0];
    const endDate = new Date(endDateInput).toISOString().split("T")[0];

    //  แยกเป็น วัน เดือน ปี แล้วค่อยเอามาบวกกัน จากนั้นก็ค่อยเปรียบเทียบ
    var [startYear, startMonth, startDay] = startDate.split("-").map(Number);
    var [endYear, endMonth, endDay] = endDate.split("-").map(Number);

    var startSum = startYear + startMonth + startDay;
    var endSum = endYear + endMonth + endDay;

    if (endSum < startSum) return true;
    else return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { employeeById } = await getEmployeeById(authdata.publicEmployeeId);

    const reqData = {
      startDate: input.startDate,
      endDate: input.endDate,
      startTime: `${input.startTime}:00`,
      endTime: `${input.endTime}:00`,
      breakOverrideRequested: false,
      breakOverrideMinutes: 0,
      totalMinutes: input.totalMinutes,
      otTypeId: input.otTypeId,
      jobId: employeeById.employee.jobId,
      reason: input.reason,
    };

    if (compareDate(input.startDate, input.endDate)) {
      Swal.fire({
        title: "กรุณาเลือกวันที่ใหม่ค่ะ/ครับ",
        text: "วันที่เริ่ม ควรน้อยกว่า วันที่สิ้นสุด",
        icon: "error",
      });
      return;
    }

    const errorList = validateForm(input) || [];
    setError(errorList);

    try {
      if (Object.keys(errorList).length === 0) {
        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success custom-width-btn-alert",
          cancelButton: "btn btn-danger custom-width-btn-alert",
        },
        buttonsStyling: "w-100",
      });
      swalWithBootstrapButtons
        .fire({
          title: "คุณต้องการบันทึกรายการใช่หรือไม่",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยื่นยันการบันทึกรายการ",
          cancelButtonText: "ยกเลิกการบันทึกรายการ",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const {otErrorMessage,success} = await createOTrequest(reqData);
            if (success) {
              swalWithBootstrapButtons.fire({
                title: "บึนทึกรายการสำเร็จ!",
                icon: "success",
              });
              const currentModal = document.getElementById("addOTModal");
              const modalInstance = bootstrap.Modal.getInstance(currentModal);
              modalInstance.hide();
              ClearInput();

            } else {
              Swal.fire({
                title: "บันทึกข้อมูลไม่สำเร็จ",
                text: otErrorMessage,
                icon: "error",
              });
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "ยกเลิก",
              text: "คุณทำการยกเลิกรายการเรียบร้อยแล้ว",
              icon: "error",
            });
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error.message,
        icon: "error",
      });
    }
  };

  const ClearInput = () => {
    setInput({
      startDate: currentDate,
      endDate: currentDate,
      startTime: "",
      endTime: "",
      breakOverrideRequested: false,
      breakOverrideMinites: 0,
      totalMinutes: 0,
      otTypeId: null,
      jobId: null,
      reason: "",
    });
    setDisplayTime("")
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
                onChange={handleChangeAccordian}
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
                      <div className="ot-container">
                        {mockOTreq.length === 0 ? (
                          <div className="d-flex flex-column align-items-center justify-content-center p-4">
                            <i
                              className="bi bi-hourglass-split mb-2 text-danger"
                              style={{ fontSize: "60px" }}
                            ></i>
                            <h4 className="text-danger">ไม่พบการขอโอที</h4>
                          </div>
                        ) : (
                          <>
                            {/* เอาสัก 6 รายการต่อหน้า */}
                            {currentData.map((item, index) => {
                              return (
                                <>
                                  <OTcard
                                    status={item.status}
                                    otType={item.OTheader}
                                    reason={item.reson}
                                    key={index}
                                  />
                                </>
                              );
                            })}
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
        <div className="pagination-wrapper">
          <Pagination
            totalRecords={NUM_OF_RECORDS}
            pageLimit={LIMIT}
            pageNeighbours={2}
            onPageChanged={onPageChanged}
            currentPage={currentPage}
          />
        </div>
      </div>

      {/* modal add */}
      <CreateOTmodal
        error={error}
        handleCancel={() => handleCancel("addOTModal")}
        handleChangeInput={handleChangeInput}
        handleSelectChange={(selected) =>
          handleSelectChange("otTypeId", selected)
        }
        handleSubmit={(e) => handleSubmit(e, "addOTModal")}
        input={input}
        setInput={setInput}
        IsLoading={otIsLoading}
        displayTime={displayTime}
        setDisplayTime={setDisplayTime}
      />
    </div>
  );
}
