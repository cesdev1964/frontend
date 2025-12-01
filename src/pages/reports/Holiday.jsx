import { React, useState, useEffect, useCallback } from "react";
import HeaderPage from "../../components/HeaderPage";
import { useTitle } from "../../hooks/useTitle";
import LoadingSpin from "../../components/loadingSpin";
import HolidayCard from "../../components/horiday/HolidayCard";
import HolidayYearSlider from "../../components/horiday/HolidayYearSlider";
import SessionExpiryModal from "../../components/modal/SessionExpiryModal";


export default function Weekend({ title }) {
  const year = new Date().getFullYear() + 543;
  useTitle(title);


  const [isLoading, setIsLoading] = useState(false);
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const [yearDisplay, setDisplayTime] = useState(year);

  const navigateYear = (direction) => {
    setDisplayTime(yearDisplay + direction);
  };
  const handleToggleAccordian = () => {
    setOnClickAccordian((prev) => !prev);
  };
  return (
    <div>
      <HeaderPage pageName={title} />
      <div className="container holiday-box">
        {!isLoading ? (
          <>
            {/* <div className="accordion">
              <div className="accordion-item">
                <input
                  id="accordion-trigger-1"
                  className="accordion-trigger-input"
                  type="checkbox"
                  checked={onClickAccordian === true}
                  onChange={handleToggleAccordian}
                ></input>
                <label
                  className="accordion-trigger accordion-label"
                  htmlFor="accordion-trigger-1"
                >
                  <i className="bi bi-calendar-week-fill me-2 mb-1"></i>
                  <strong>{title}</strong>
                </label>
                <section className="accordion-animation-wrapper">
                  <div className="accordion-animation">
                    <div className="accordion-transform-wrapper">
                      <div className="accordion-content position-relative">
                        <div>
                          <HolidayYearSlider
                            yearDisplay={yearDisplay}
                            handleNextYear={() => navigateYear(+1)}
                            handlePrevYear={() => navigateYear(-1)}
                          />
                          <div className="w-100 bg-danger p-1 border-n rounded-3"></div>
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div> */}
            <div className="announcement-box">
              <HolidayYearSlider
                            yearDisplay={yearDisplay}
                            handleNextYear={() => navigateYear(+1)}
                            handlePrevYear={() => navigateYear(-1)}
                          />
                          <div className="w-100 bg-danger p-1 border-n rounded-3"></div>
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
                          <HolidayCard />
            </div>
          </>
        ) : (
          <LoadingSpin />
        )}
      </div>
    </div>
  );
}
