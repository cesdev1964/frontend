import { React, useState, useEffect, useCallback } from "react";
import HeaderPage from "../../components/HeaderPage";
import { useTitle } from "../../hooks/useTitle";
import LoadingSpin from "../../components/loadingSpin";
import HolidayCard from "../../components/horiday/HolidayCard";
import HolidayYearSlider from "../../components/horiday/HolidayYearSlider";
import SessionExpiryModal from "../../components/modal/SessionExpiryModal";
import { Link } from "react-router-dom";


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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">  <i class="bi bi-house-door-fill"></i></Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container holiday-box">
        {!isLoading ? (
          <>
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
