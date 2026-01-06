import { React, useState, useCallback, useEffect } from "react";
import { useEmployee } from "../../hooks/employeeStore";
import LoadingSpin from "../loadingSpin";
import { useTitltName } from "../../hooks/titleNameStore";

export default function 
EmployeeList({
  jobData,
  setEmployee,
  activeJobId,
  setActiveJobId,
}) {
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

  //ข้อมูลที่นำไป map 

  const employeeList = employeeData.filter(
    (item) =>item.jobId === jobData.value
  );

  const handleChangeAccordian = () => {
    setOnClickAccordian((prev) => !prev);
  };

  //ส่งข้อมูลออกไปนอกตัวลูก
  const handleSelectEmployee = (employee,e) => {
    //  เป็นการ switch state โดยการแทนทีค่าด้วยเงื่อนทีี่มีค่าในตัวแปรก่อน และค่อยนำออก ถ้าไม่มีก็นำค่าเข้าตัวแปร สลับกันไป
    e.stopPropagation();
    const isSelect = selectedEmployeeID === employee.publicEmployeeId;

    if (isSelect) {
      setSelectedEmployeeID(null);
      setEmployee({
        employeeId: "",
        employeeName: "",
        jobId: "",
      });
    } else {
      setSelectedEmployeeID(employee.publicEmployeeId);
      setEmployee({
        employeeId: employee.publicEmployeeId,
        employeeName: `คุณ ${employee.firstname} ${employee.lastname}`,
        jobId: employee.jobId,
      });
    }
  };

  const isOpen = activeJobId === jobData.value;

  const handleToggle = () => {
    if (!isOpen) {
      setEmployee({
        employeeId: "",
        employeeName: "",
        jobId: "",
      });
      setSelectedEmployeeID(null)
      setActiveJobId(jobData.value);
    }
  };

  return (
    <div >
      <div className="accordion-item mb-2" title="เปิดดูรายชื่อได้ที่นี้">
        <h2 className="accordion-header" id={headingId}>
          <button
            className={`accordion-button ${isOpen ? "" : "collapsed"}`}
            type="button"
            onClick={handleToggle}
          >
            <label
              className="accordion-header-label"
              htmlFor={`job-${jobData.value}`}
            >
              <strong>{jobData.label} <span style={{fontWeight:"normal",color:"gray"}} >({employeeList.length})</span></strong>
            </label>
          </button>
        </h2>
        <div
          id={collapseId}
          className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
          aria-labelledby={headingId}
          data-bs-parent="#accordionJobList"
        >
          <div className="border-top border-primary my-2"></div>
          <div className="accordion-body">
            {!isLoading ? (
              <>
               {employeeList.length>0?(
                <>
                {employeeList.map((employee, index) => (
                  <>
                    <ul className="nav w-100 text-center">
                      <li key={employee.publicEmployeeId}>
                        <a
                          onClick={(e) => handleSelectEmployee(employee,e)}
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
               ):(
                <>
                 <p className="text-center">--ไม่พบรายชื่อ--</p>
                </>
               )}
              </>
            ) : (
              <LoadingSpin />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
