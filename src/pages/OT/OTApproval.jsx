import { useState, useEffect, useCallback } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import Pagination from "../../components/Pagination";
import Filter from "../../components/Filter";
import { SearchDropdown } from "../../components/searchDropdown";
import OTApproveCard from "../../components/OT/OTApprovalCard";
import { useJob } from "../../hooks/jobStore";
import { useOTApprove } from "../../hooks/otApproveStore";
import SessionExpiryModal from "../../components/modal/SessionExpiryModal";

export default function OTApproval({ title }) {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return <SessionExpiryModal />;
  }
  useTitle(title);
  const [otData, setOtData] = useState([]);
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const currentDate = new Date().toISOString().split("T")[0];
  const [isLoading, setIsLoading] = useState(false);

  const [input, setInput] = useState({
    startDate: currentDate,
    endDate: currentDate,
    jobId: null,
    search: "",
  });
  const { jobDropdown, getJobDropdownAll } = useJob();
  const [currentPage, setCurrentPage] = useState(1);

  const { getOTApprovalPending, otApproveData } = useOTApprove();
  // การ fetch data
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await getOTApprovalPending();
      await getJobDropdownAll();
      setIsLoading(false);
    } catch (error) {
      // alert("โหลด API ไม่สำเร็จ", error);
      setIsLoading(false);
    }
  }, [getOTApprovalPending, getJobDropdownAll]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!otApproveData) return;
    setOtData(otApproveData);
  }, [otApproveData]);

  //เกี่ยวกับ pagination
  let NUM_OF_RECORDS = otData.length;
  let LIMIT = 5;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = otData.slice(
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
              <label className="form-label">
                ค้นหา{" "}
                <span
                  data-bs-toggle="tooltip"
                  data-bs-html="true"
                  title="ค้นหาด้วยรหัสพนักงาน หรือ ชื่อพนักงาน"
                >
                  <i className="bi bi-info-circle fs-6"></i>
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
                        <div className="d-flex flex-column align-items-center justify-content-center p-1">
                          {isLoading ? (
                            <div
                              className="spinner-border text-danger"
                              role="status"
                              style={{ width: "3rem", height: "3rem" }}
                            ></div>
                          ) : (
                            <>
                              {otData.length === 0 ? (
                                <div className="w-100 d-flex flex-column align-items-center justify-content-center p-3">
                                  <i
                                    className="bi bi-file-earmark mb-2 text-danger"
                                    style={{ fontSize: "60px" }}
                                  ></i>
                                  <h4 className="text-danger">
                                    ไม่พบรายการโอทีที่ต้องดำเนินการอนุมัติ
                                  </h4>
                                </div>
                              ) : (
                                <>
                                  {/* เอาสัก 6 รายการต่อหน้า */}
                                  {currentData.map((item) => {
                                    return (
                                      <div className="w-100">
                                        <OTApproveCard
                                          data={item}
                                          key={item.otRequestId}
                                          fetchData={() =>
                                            getOTApprovalPending()
                                          }
                                        />
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                            </>
                          )}
                        </div>
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
