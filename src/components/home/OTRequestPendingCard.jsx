import React, { useState, useCallback, useEffect } from "react";
import { useOTApprove } from "../../hooks/otApproveStore";
import FlowIcon from "../../assets/icon/FlowIcon";
import { shortDateFormate } from "../../util/inputFormat";

export default function OTRequestPendingCard() {
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const { getOTApprovalPending, otApproveData } = useOTApprove();
  const [otData, setOtData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    return new Date(dateTime).toISOString().split("T")[0];
  };
  const otReqList = Object.groupBy(otData, (otItem) => {
    return getOnlyDate(otItem.requestedAt);
  });

  const otCountByDate = Object.entries(otReqList).map(([date, items]) => ({
    date: date,
    count: items.length,
  }));
  // console.log("Ot list with", otReqList);
  //   console.log("Ot count with same date ", otCountByDate);

  return (
    <div className="mt-4">
      <div class="accordion">
        <div class="accordion-item">
          <input
            id="accordion-OTrequest"
            class="accordion-trigger-input"
            type="checkbox"
            checked={onClickAccordian === true}
            onChange={handleChangeCheckbox}
          ></input>
          <label
            class="accordion-trigger accordion-label"
            for="accordion-OTrequest"
          >
            <i className="bi bi-list-task me-2 mb-1"></i>
            <strong>รายการขอโอที ที่ต้องอนุมัติ</strong>
          </label>
          <section class="accordion-animation-wrapper">
            <div class="accordion-animation">
              <div class="accordion-transform-wrapper">
                <div class="accordion-content otReq-container">
                  {/* <div className="card otReqCard">
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
                          className="text-secondary mt-2"
                        >
                          <i class="fa-regular fa-calendar-days me-2"></i>
                          วันที่ขอโอที
                        </p>
                      </div>
                      <span className="badge bg-secondary text-dark p-2 px-2 fs-6">
                        100000
                      </span>
                    </div>
                  </div> */}
                  {otCountByDate.length > 0 ? (
                    <>
                      {otCountByDate.map((item) => {
                        return (
                          <div className="card otReqCard">
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
                                  className="text-secondary mt-2"
                                >
                                  <i class="fa-regular fa-calendar-days me-2"></i>
                                  {shortDateFormate(item.date)}
                                </p>
                              </div>
                              <span className="badge bg-secondary text-dark p-2 px-2 fs-6">
                                {item.count}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <div className="d-flex flex-column align-items-center justify-content-center p-4">
                        <i
                          className="bi bi-file-earmark text-danger"
                          style={{ fontSize: "60px" }}
                        ></i>
                        <h5 className="text-danger mt-4">
                          ไม่พบรายการที่ต้องอนุมัติ
                        </h5>
                      </div>
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
