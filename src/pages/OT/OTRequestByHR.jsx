import { React, useCallback, useState, useEffect } from "react";
import HeaderPage from "../../components/HeaderPage";
import { useTitle } from "../../hooks/useTitle";
import { useJob } from "../../hooks/jobStore";
import { useOTrequest } from "../../hooks/otRequestStore";
import EmployeeList from "../../components/OT/EmployeeList";
import MainButton from "../../components/MainButton";
import OTrequestList from "../../components/OT/OTrequestList";
import CreateOTmodal from "../../components/modal/OT/createOTmodal";
import { handleCancel } from "../../util/handleCloseModal";
import Swal from "sweetalert2";
export default function OTRequestByHR({ title }) {
  const currentDate = new Date().toISOString().split("T")[0];
  useTitle(title);
  const {
    createOTrequest,
    otIsLoading,
    getOTrequestByEmployeeID,
    deleteOTrequest,
    otById,
  } = useOTrequest();
  const { getJobDropdown, jobDropdown } = useJob();
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const [displayTime, setDisplayTime] = useState("");
  const [error, setError] = useState({});
  const [employee, setEmployee] = useState({
    employeeId: "",
    employeeName: "",
    jobId : ""
  });

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

  const [otReqData, setOTreqData] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      await getJobDropdown();
      if (employee.employeeId) {
        await getOTrequestByEmployeeID(employee.employeeId);
      }
    } catch (error) {
      return;
    }
  }, [getJobDropdown, getOTrequestByEmployeeID, employee.employeeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!jobDropdown || !otById) return;
    setOTreqData(otById);
  }, [jobDropdown, otById]);

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
    const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
    if (currentModal) {
      modal.hide();
      if (employee.employeeId === "") {
        Swal.fire({
          title: "กรุณาเลือกพนักงานก่อนการลงโอทีย้อนหลัง",
          text: "สามารถกดเลือกพนักงานได้จาก เมนูหน่วยงาน",
          icon: "error",
        });
      } else {
        modal.show();
      }
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqData = {
      startDate: input.startDate,
      endDate: input.endDate,
      startTime: `${input.startTime}:00`,
      endTime: `${input.endTime}:00`,
      breakOverrideRequested: false,
      breakOverrideMinutes: 0,
      totalMinutes: input.totalMinutes,
      otTypeId: input.otTypeId,
      jobId: employee.jobId, 
      // ไปดึงมาจาก employee.jobNo
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
              const { otErrorMessage, success } = await createOTrequest(
                reqData
              );
              if (success) {
                swalWithBootstrapButtons.fire({
                  title: "บึนทึกรายการสำเร็จ!",
                  icon: "success",
                });
                const currentModal = document.getElementById("addOTModal");
                const modalInstance = bootstrap.Modal.getInstance(currentModal);
                modalInstance.hide();
                fetchData();
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
    setDisplayTime("");
  };

  return (
    <div>
      <HeaderPage pageName={title} />
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-12">
            <div className="mb-3">
            <h5>หน่วยงาน <br/><span>(เลือกพนักงานที่นี้)</span></h5>
              <div style={{ maxHeight: "600px", overflowY: "auto" }}>
                <div className="p-2">
                  {jobDropdown.length > 0 && (
                    <div>
                      {jobDropdown.map((item) => (
                        <EmployeeList
                          jobData={item}
                          key={item.value}
                          setEmployeeId={setEmployee}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9 col-md-12">
            <div className="announcement-box border-bottom  mb-3">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <h5>ขอโอทีย้อนหลัง</h5>
                <MainButton
                  btnName="ขอโอทีย้อนหลัง"
                  icon="bi bi-plus-circle"
                  onClick={() => handleOpenModal("addOTModal")}
                />
              </div>
              {otById && employee.employeeId ? (
                <OTrequestList
                  otData={otReqData}
                  header={`รายการโอทีของ :  ( ${employee.employeeName} )`}
                  otIsLoading={otIsLoading}
                  deleteOTrequest={deleteOTrequest}
                  fetchData={fetchData}
                />
              ) : (
                <OTrequestList
                  otData={[]}
                  header={`เลือกรายชื่อพนักงานที่ต้องการขอโอทีย้อนหลัง`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
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
        isHRrole={true}
      />
    </div>
  );
}
