import { React, useState, useEffect, useCallback } from "react";
import HeaderPage from "../../components/HeaderPage";
import { useTitle } from "../../hooks/useTitle";
import LoadingSpin from "../../components/loadingSpin";
import HolidayCard from "../../components/horiday/HolidayCard";
import HolidayYearSlider from "../../components/horiday/HolidayYearSlider";
import { Link } from "react-router-dom";
import { mockHolidayData } from "../../Data";

export default function Weekend({ title }) {
  const year = new Date().getFullYear() + 543;
  useTitle(title);

  const [isLoading, setIsLoading] = useState(false);
  const [yearDisplay, setDisplayTime] = useState(year);

  const navigateYear = (direction) => {
    setDisplayTime(yearDisplay + direction);
  };

  const selectYearForRenderHolidayData = mockHolidayData.find(
    (item) => item.year === yearDisplay
  );

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              {" "}
              <i class="bi bi-house-door-fill"></i>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container holiday-box">
        {mockHolidayData.length > 0 ? (
          <>
            {!isLoading ? (
              <>
                <div className="announcement-box">
                  <HolidayYearSlider
                    yearDisplay={yearDisplay}
                    handleNextYear={() => navigateYear(+1)}
                    handlePrevYear={() => navigateYear(-1)}
                  />
                  <div className="w-100 bg-danger p-1 border-n rounded-3"></div>
                  {selectYearForRenderHolidayData &&
                  selectYearForRenderHolidayData.holidayList.length > 0 ? (
                    <>
                      {selectYearForRenderHolidayData.holidayList.map(
                        (item) => (
                          <HolidayCard
                            holidayData={item}
                            key={item.holidayId}
                          />
                        )
                      )}
                    </>
                  ) : (
                    <>
                      <div className="d-flex flex-column align-items-center justify-content-center p-4 mt-4">
                        <i
                          className="fas fa-umbrella-beach mb-4 text-danger"
                          style={{ fontSize: "60px" }}
                        ></i>
                        <h5 className="text-danger">
                          ไม่พบรายงานวันหยุดประจำปี
                        </h5>
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : (
              <LoadingSpin />
            )}
          </>
        ) : (
          <div className="announcement-box">
            <div className="d-flex flex-column align-items-center justify-content-center p-4 mt-4">
              <i
                className="fas fa-umbrella-beach mb-4 text-danger"
                style={{ fontSize: "60px" }}
              ></i>
              <h5 className="text-danger">ไม่พบรายงานวันหยุดประจำปี</h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
