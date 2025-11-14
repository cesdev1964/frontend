import { React, useState, useCallback, useEffect } from "react";
import { useEmployee } from "../../hooks/employeeStore";
import LoadingSpin from "../loadingSpin";

export default function EmployeeList({ jobData, setEmployeeId }) {
  const { getEmployeeData, employeeData } = useEmployee();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [selectedJobID, setSelectedJobID] = useState({});
  const [onClickAccordian, setOnClickAccordian] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      await getEmployeeData();
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

  const handleSelectEmployee = (employee, jobData) => {

    if (employee) {

      setSelectedEmployeeID(employee.publicEmployeeId);
      setEmployeeId({
        employeeId: employee.publicEmployeeId,
        employeeName: `คุณ ${employee.firstname} ${employee.lastname}`,
        jobId : employee.jobId
      });
    } else {
      setSelectedEmployeeID(null);
    }
  };

  return (
    <div className="accordion w-100">
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
          for={`job-${jobData.value}`}
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
                      // ต้องการให้ active เมื่อมีการเลือกที่รายการนั้นๆ
                      <>
                        <ul className="nav w-100 text-center" key={index}>
                          <li>
                            <a
                              onClick={() =>
                                handleSelectEmployee(employee, jobData)
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
    </div>
  );
}
