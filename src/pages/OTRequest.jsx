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
import { OTApproveEnum } from "../enum/otApproveEnum";
import Pagination from "../components/Pagination";
import { mockOTreq } from "../MockData";

export default function OTRequest({ title }) {
  useTitle(title);
  const { authdata } = useAuth();
  const [OTdata, setOTData] = useState([]);
  const [error, setError] = useState({});
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
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
  const [otTimeList, setOtTimeList] = useState({ otStart: [], otEnd: [] });
  const [displayTime, setDisplayTime] = useState("");
  const {
    createOTrequest,
    getOTrequestData,
    otData,
    otErrorMessage,
    otIsLoading,
    success,
  } = useOTrequest();
  
  
  
  // กำหนดวันบนปฏิทิน
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  
  const dataOnly = (date) => {
    return date.toISOString().split("T")[0];
  };
  
  //เกี่ยวกับ pagination
  const [currentPage, setcurrentPage] = useState(1);
  const pages = 10; //ตามจำนวนควมเยอะของข้อมูล
  const itemPerPage = 6;
  const totalData = OTdata.length;

  const onPageChange = useCallback(
    (e,page)=>{
      e.preventDefault();
      setcurrentPage(page);
    },[currentPage]
  )

  const currentData = OTdata.slice(
    (currentPage-1)*itemPerPage,
    (currentPage-1)*(itemPerPage*2),
  )

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  useEffect(() => {
    if(mockOTreq){
      setOTData(mockOTreq)
    }
  }, [mockOTreq,currentPage]);


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
    // if (!input.jobId || input.jobId === "" || input.jobId === null) {
    //   errors.jobId = "กรุณาเลือกหน่วยงาน";
    // }
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
    e.preventDefault();

    const errorList = validateForm(input) || [];
    setError(errorList);

    try {
      if (Object.keys(errorList).length === 0) {
        const response = await createOTrequest(reqData);

        if (response.success) {
          setIsSubmit(true);
          Swal.fire({
            title: "บันทึกข้อมูลสำเร็จ",
            icon: "success",
            draggable: true,
          });

          const currentModal = document.getElementById("addOTModal");
          const modalInstance = bootstrap.Modal.getInstance(currentModal);
          modalInstance.hide();

          ClearInput();
          try {
            await getOTrequestData();
          } catch (err) {
            console.error("โหลดข้อมูลไม่สำเร็จ:", err);
          }
        } else {
          Swal.fire({
            title: "บันทึกข้อมูลไม่สำเร็จ",
            text: "ไม่สามารถดำเนินการขอโอทีได้ เนื่องจากคุณได้ทำการขอโอทีในช่วงเวลานี้แล้ว",
            icon: "error",
          });
        }
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
                      <div className="ot-container">
                        {OTdata.length === 0 ? (
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
                            {OTdata.map((item,index)=>{
                              return(
                                <OTcard status={item.status} otType={item.OTheader} reason={item.reson} key={index}/>
                              )
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
        {/* <Pagination
          page={currentPage}
          setPage={setcurrentPage}
          hasNextPage={currentPage < pages} 
          pages={pages} //กำหนดจำนวนหน้าเอง
          onPageChange={onPageChange}
          totalData={totalData} //จำนวนข้อมูลทั้งหมด
          limitItem={itemPerPage} // 1 หน้ามีกี่  item
        /> */}
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
      />
    </div>
  );
}
