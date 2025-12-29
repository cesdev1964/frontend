import React, { useState, useCallback, useEffect } from "react";
import { useOTApprove } from "../../hooks/otApproveStore";
import { getDateOnly, shortDateFormate } from "../../util/inputFormat";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination";

export default function OTRequestPendingCard() {
  const navigate = useNavigate();
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const { getOTApprovalPending, otApproveData } = useOTApprove();
  const [otData, setOtData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginate, setShowPaginate] = useState(false);

  const handleChangeCheckbox = () => {
    setOnClickAccordian((prev) => !prev);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      await getOTApprovalPending();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [getOTApprovalPending]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!otApproveData) return;
    setOtData(otApproveData);
  }, [otApproveData]);

  const getOnlyDate = (dateTime) => {
    // return new Date(dateTime).toISOString().split("T")[0];
    const date = new Date(dateTime);
    date.setFullYear(date.getFullYear() - 543);
    return date;
  };
  const otReqList = Object.groupBy(otData, (otItem) => {
    return getOnlyDate(otItem.period.startDate);
  });

  const getThaiDate = (dateTime) => {
    // return new Date(dateTime).toISOString().split("T")[0];
    const date = new Date(dateTime);
    return date;
  };

  const otCountByDate = Object.entries(otReqList).map(([date, items]) => ({
    date: date,
    count: items.length,
  }));

  let NUM_OF_RECORDS = otCountByDate.length;
  let LIMIT = 5;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = otCountByDate.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );

  useEffect(() => {
    if (NUM_OF_RECORDS >= LIMIT) {
      setShowPaginate(true);
    } else {
      setShowPaginate(false);
    }
  }, [NUM_OF_RECORDS, LIMIT]);

  return (
    <div className="mt-4">
      <div className="accordion">
        <div className="accordion-item">
          <input
            id="accordion-OTrequest"
            className="accordion-trigger-input"
            type="checkbox"
            checked={onClickAccordian === true}
            onChange={handleChangeCheckbox}
          ></input>
          <label
            className="accordion-trigger accordion-label"
            htmlFor="accordion-OTrequest"
          >
            <i className="bi bi-list-task me-2 mb-1"></i>
            <strong>รายการขอโอที ที่ต้องอนุมัติ</strong>
          </label>
          <section className="accordion-animation-wrapper">
            <div className="accordion-animation">
              <div className="accordion-transform-wrapper">
                <div className="accordion-content otReq-container">
                
                  {isLoading ? (
                    <>
                      <div
                        className="spinner-border text-danger"
                        role="status"
                        style={{ width: "3rem", height: "3rem" }}
                      ></div>
                    </>
                  ) : (
                    <>
                      {otCountByDate.length > 0 ? (
                        <>
                          {/* {paginate && (
                            <>
                              {otCountByDate.map((item) => {
                                return (
                                  <div
                                    className="otReqCard shadow-sm "
                                    onClick={() =>
                                      navigate({
                                        pathname: `/working/OTApproval`,
                                        search: `?startDate=${getDateOnly(
                                          item.date
                                        )}&endDate=${getDateOnly(item.date)}`,
                                      })
                                    }
                                  >
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div>
                                        <h6 className="fw-bold">
                                          จำนวนการขอโอที ที่คุณต้องทำการอนุมัติ
                                        </h6>
                                        <p
                                          style={{
                                            lineHeight: "0.8rem",
                                            fontSize: "0.9rem",
                                          }}
                                          className="text-primary mt-2"
                                        >
                                          <i className="fa-regular fa-calendar-days me-2"></i>
                                          {shortDateFormate(item.date)}
                                        </p>
                                      </div>
                                      <span className="count-badge">
                                        {item.count}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                              <div className="pagination-wrapper">
                                <Pagination
                                  totalRecords={NUM_OF_RECORDS}
                                  pageLimit={LIMIT}
                                  pageNeighbours={2}
                                  onPageChanged={onPageChanged}
                                  currentPage={currentPage}
                                />
                              </div>
                            </>
                          )} */}
                          {otCountByDate.map((item) => {
                                return (
                                  <div
                                    className="otReqCard shadow-sm "
                                    onClick={() =>
                                      navigate({
                                        pathname: `/working/OTApproval`,
                                        search: `?startDate=${getDateOnly(
                                          item.date
                                        )}&endDate=${getDateOnly(item.date)}`,
                                      })
                                    }
                                  >
                                    <div className="d-flex align-items-center justify-content-between">
                                      <div>
                                        <h6 className="fw-bold">
                                          จำนวนการขอโอที ที่คุณต้องทำการอนุมัติ
                                        </h6>
                                        <p
                                          style={{
                                            lineHeight: "0.8rem",
                                            fontSize: "0.9rem",
                                          }}
                                          className="text-primary mt-2"
                                        >
                                          <i className="fa-regular fa-calendar-days me-2"></i>
                                          {shortDateFormate(item.date)}
                                        </p>
                                      </div>
                                      <span className="count-badge">
                                        {item.count}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                        </>
                      ) : (
                        <div>
                          <div className="d-flex flex-column align-items-center justify-content-center p-4">
                            <i
                              className="bi bi-file-earmark text-danger"
                              style={{ fontSize: "60px" }}
                            ></i>
                            <h5 className="text-danger mt-4">
                              ไม่พบรายการที่รออนุมัติ
                            </h5>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
