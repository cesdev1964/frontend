import { React, useState, useCallback, useEffect } from "react";
import { useEmployee } from "../../hooks/employeeStore";
import LoadingSpin from "../loadingSpin";
import { useTitltName } from "../../hooks/titleNameStore";

export default function EmployeeList({ jobData, setEmployeeId }) {
  const { getEmployeeData, employeeData } = useEmployee();
  const { getTitleDropdown, titleDropdown } = useTitltName();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [onClickAccordian, setOnClickAccordian] = useState(false);

  const collapseId = `collapse-job-${jobData.value}`;
  const headingId = `heading-job-${jobData.value}`;

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      await getEmployeeData();
      await getTitleDropdown();
      setIsLoading(false);
    } catch (error) {
      return;
    }
  }, [getEmployeeData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const employeeList = employeeData.filter(
    (item) => item.jobId === jobData.value
  );

  const handleChangeAccordian = () => {
    setOnClickAccordian((prev) => !prev);
  };

  const handleSelectEmployee = (employee) => {
    //  เป็นการ switch state โดยการแทนทีค่าด้วยเงื่อนทีี่มีค่าในตัวแปรก่อน และค่อยนำออก ถ้าไม่มีก็นำค่าเข้าตัวแปร สลับกันไป
    const isSelect = selectedEmployeeID === employee.publicEmployeeId;

    if (isSelect) {
      setSelectedEmployeeID(null);
      setEmployeeId({
        employeeId: "",
        employeeName: "",
        jobId: "",
      });
    } else {
      setSelectedEmployeeID(employee.publicEmployeeId);
      setEmployeeId({
        employeeId: employee.publicEmployeeId,
        employeeName: `คุณ ${employee.firstname} ${employee.lastname}`,
        jobId: employee.jobId,
      });
    }
  };

  return (
    <>
      {/* <div className="accordion w-100">
      <div className="accordion-item mb-2">
        <input
          id={`job-${jobData.value}`}
          className="accordion-trigger-input"
          type="checkbox"
          checked={onClickAccordian === true} 
          onChange={handleChangeAccordian}

        
        ></input>
        <label
          className="accordion-trigger accordion-label"
          htmlFor={`job-${jobData.value}`}
        >
          <strong>{jobData.label}</strong>
        </label>
        <section className="accordion-animation-wrapper">
          <div className="accordion-animation">
            <div className="accordion-transform-wrapper">
              <div className="accordion-content otReq-container">
                {!isLoading ? (
                  <>
                    {employeeList.map((employee, index) => (
                      <>
                        <ul className="nav w-100 text-center" key={index}>
                          <li>
                            <a
                              onClick={() =>
                                handleSelectEmployee(employee)
                              }
                              className={`${
                                selectedEmployeeID === employee.publicEmployeeId
                                  ? "active"
                                  : ""
                              }`}

                           >
                              {" "}
                              <span
                                className="label"
                                style={{ fontSize: "0.8rem" }}
                              >
                                คุณ {employee.firstname} {employee.lastname}
                              </span>
                            </a>
                          </li>
                        </ul>
                      </>
                    ))}
                  </>
                ) : (
                  <LoadingSpin />
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div> */}

      <div className="accordion-item mb-2" title="เปิดดูรายชื่อได้ที่นี้">
        <h2 className="accordion-header" id={headingId}>
          <button
            className="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#${collapseId}`}
            aria-expanded="false"
            aria-controls={collapseId}
          >
            <label
              className="accordion-header-label"
              htmlFor={`job-${jobData.value}`}
            >
              <strong>{jobData.label}</strong>
            </label>
          </button>
        </h2>
        <div
          id={collapseId}
          className="accordion-collapse collapse"
          aria-labelledby={headingId}
          data-bs-parent="#accordionJobList"
        >
          <div className="border-top border-primary my-2"></div>
          <div className="accordion-body">
            {!isLoading ? (
              <>
                {employeeList.map((employee, index) => (
                  <>
                    <ul className="nav w-100 text-center" key={index}>
                      <li>
                        <a
                          onClick={() => handleSelectEmployee(employee)}
                          className={`${
                            selectedEmployeeID === employee.publicEmployeeId
                              ? "active"
                              : ""
                          }`}
                        >
                          {" "}
                          <span
                            className="label"
                            style={{ fontSize: "0.8rem" }}
                          >
                            {titleDropdown.find(
                              (item) => item.value === employee.titleId
                            )?.label ?? "คุณ"}{" "}
                            {employee.firstname} {employee.lastname}
                          </span>
                        </a>
                      </li>
                    </ul>
                  </>
                ))}
              </>
            ) : (
              <LoadingSpin />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
