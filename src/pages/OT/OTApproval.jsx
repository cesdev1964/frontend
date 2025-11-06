import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../auth/AuthContext";
import { useTitle } from "../../hooks/useTitle";
import Swal from "sweetalert2";
import HeaderPage from "../../components/HeaderPage";
import OTcard from "../../components/OT/OTcard";
import { useEmployee } from "../../hooks/employeeStore";
import { useOTrequest } from "../../hooks/otRequestStore";
import Pagination from "../../components/Pagination";
import LoadingSpin from "../../components/loadingSpin";
import handleDelete from "../../util/handleDelete";
import Filter from "../../components/Filter";
import InputTextField from "../../components/inputTextField";
import { SearchDropdown } from "../../components/searchDropdown";
import OTApproveCard from "../../components/OT/OTApprovalCard";
import {useJob} from "../../hooks/jobStore";

export default function OTApproval({ title }) {
  useTitle(title);
  const { authdata } = useAuth();
  const [otApprovalData, setOtApprovalData] = useState([]);
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const currentDate = new Date().toISOString().split("T")[0];
 
  const [input, setInput] = useState({
    startDate: currentDate,
    endDate: currentDate,   
    jobId: null,
    search : ""
  });
  const { employeeById, getEmployeeById } = useEmployee();
  const {jobDropdown,getJobDropdownAll} = useJob();
  const [currentPage, setCurrentPage] = useState(1);
  const {
    createOTrequest,
    getOTrequestData,
    otIsLoading,
    getOTrequestByEmployeeID,
    deleteOTrequest,
  } = useOTrequest();

  // การ fetch data
  const fetchData = useCallback(async () => {
    console.log("authdata", authdata);
    try {
      if (authdata.publicEmployeeId) {
        const { otById } = await getOTrequestByEmployeeID(
          authdata.publicEmployeeId
        );
        await getJobDropdownAll();
        setOtApprovalData(otById);
      }
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [authdata.publicEmployeeId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  //เกี่ยวกับ pagination
  let NUM_OF_RECORDS = otApprovalData.length;
  let LIMIT = 5;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = otApprovalData.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );

  const handleChangeAccordian = () => {
    setOnClickAccordian((prev) => !prev);
  };

  //   ใช้สำหรับ filter
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


  return (
    <div>
      <HeaderPage pageName={title} />
      <div className="container">
        <Filter>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <label className="form-label">
              ตั้งแต่วันที่
              <span className="sub-label">(ค.ศ.)</span>
            </label>
            <input
              type="date"
              id="startDate"
              className={`form-control`}
              name="startDate"
              placeholder="ลงวันที่สิ้นสุด"
              // value={input.startDate}
              // onChange={handleChangeInput}
              defaultValue={Date.now()}
              onKeyDown={(e) => e.preventDefault()}
            />
            
          </div>
           <div className="col-sm-12 col-md-6 col-lg-3">
            <label className="form-label">
              ถึงวันที่
              <span className="sub-label">(ค.ศ.)</span>
            </label>
            <input
              type="date"
              id="startDate"
              className={`form-control`}
              name="startDate"
              placeholder="ลงวันที่สิ้นสุด"
              // value={input.startDate}
              // onChange={handleChangeInput}
              defaultValue={Date.now()}
              onKeyDown={(e) => e.preventDefault()}
            />
           
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <div className="d-flex flex-column align-items-start ">
              <label class="form-label">
                ค้นหา{" "}
                <span
                  data-bs-toggle="tooltip"
                  data-bs-html="true"
                  title="ค้นหาด้วยรหัสพนักงาน หรือ ชื่อพนักงาน"
                >
                  <i class="bi bi-info-circle fs-6"></i>
                </span>
              </label>
              <input
                name="levelname"
                type="text"
                className={"form-control"}
                id="educationname"
                placeholder="ค้นหารายการอนุมัติ"
                // value={input.levelname}
                // onChange={handleChangeInput}
              />
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3">
            <label className="form-label">หน่วยงาน</label>
            <SearchDropdown
              data={jobDropdown}
                handleSelectChange={(selected) =>
                  handleSelectChange("jobId", selected)
                }
              placeholder="เลือกหน่วยงาน"
              value={jobDropdown.find((i) => i.value === input.jobId) || null}
              //   className={`${
              //     error.jobId ? "border border-danger rounded-2" : ""
              //   }`}
            />
          </div>
        </Filter>

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
                <i className="bi bi-check2-circle me-2 mb-1"></i>
                <strong>{title}</strong>
              </label>
              <section className="accordion-animation-wrapper">
                <div className="accordion-animation">
                  <div className="accordion-transform-wrapper">
                    <div className="accordion-content">
                      <div className="ot-container">
                        {otApprovalData.length === 0 ? (
                        //   <div className="d-flex flex-column align-items-center justify-content-center p-4">
                        //     <i
                        //       className="bi bi-file-earmark mb-2 text-danger"
                        //       style={{ fontSize: "60px" }}
                        //     ></i>
                        //     <h4 className="text-danger">
                        //       ไม่พบรายการโอทีที่ต้องดำเนินการอนุมัติ
                        //     </h4>
                        //   </div>
                        <>
                         <OTApproveCard/>
                         <OTApproveCard/>
                        </>
                        ) : (
                          <>
                            {/* เอาสัก 6 รายการต่อหน้า */}
                            {currentData.map((item) => {
                              {
                                otIsLoading && <LoadingSpin />;
                              }
                              return (
                                <div>
                                  <OTcard
                                    otData={item}
                                    key={item.otRequestId}
                                    handleDelete={() =>
                                      handleDelete(
                                        otIsLoading,
                                        () => deleteOTrequest(item.otRequestId),
                                        fetchData
                                      )
                                    }
                                  />
                                </div>
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
    </div>
  );
}
