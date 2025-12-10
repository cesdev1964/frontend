import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import DataTableComponent from "../../components/DatatableComponent";
import { Link, NavLink, useLocation } from "react-router-dom";
import { usePosition } from "../../hooks/positionStore";
import { useEmployee } from "../../hooks/employeeStore";
import { isEmployeeStatusBadge } from "../../util/isActiveBadge";
import MainButton from "../../components/MainButton";
import { useLevel } from "../../hooks/levelStore";
import LoadingSpin from "../../components/loadingSpin";

const Employees = ({ title }) => {
  useTitle(title);
  const [input, setInput] = useState({
    employeeCode: "",
    titleId: 0,
    firstname: "",
    lastname: "",
    telephoneNo: "",
    cardId: "",
    birthday: "",
    educationId: null,
    jobId: null,
    levelId: null,
    startDate: "",
    endDate: "",
    positionId: null,
    contractorId: null,
    rate: "",
    typeId: null,
    statusId: null,
    photoname: "",
    photopath: "",
    flowId: null,
    deductions: [],
  });
  const { positionDropdown, getPositionDropdown } = usePosition();
  const location = useLocation();
  const { employeeData, getEmployeeData, employeeIsLoading } = useEmployee();
  const { levelDropdown, getLevelDropdown } = useLevel();
  const [isLoading, setLoading] = useState(false);

  const fetchDataTable = useCallback(async () => {
    setLoading(true);
    try {
      await getEmployeeData();
      await getLevelDropdown();
      await getPositionDropdown();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return;
    }
  }, [getEmployeeData, location.state]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  const tableHead = [
    { index: 0, colName: "ลำดับ" },
    { index: 1, colName: "รหัสพนักงาน" },
    { index: 2, colName: "ชื่อพนักงาน" },
    { index: 3, colName: "ระดับ" },
    { index: 4, colName: "ตำแหน่ง" },
    { index: 5, colName: "สถานะ" },
    { index: 6, colName: "การจัดการ" },
  ];

  const tableRef = useRef();

  const handleAction = (action, id) => {
    if (action === "edit") {
      handleEdit(id);
    } else if (action === "delete") {
      handleDelete(id);
    }
  };

  const columnData = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "รหัสพนักงาน",
      data: "employeeCode",
      orderable: true,
    },
    {
      title: "ชื่อพนักงาน",
      data: null,
      orderable: true,
      render: function (data, type, row) {
        return `<p>${row.firstname} ${row.lastname}</p>`;
      },
    },
    {
      title: "ระดับ",
      data: "levelId",
      orderable: true,
      render: function (levelId) {
        return `<span class="badge-style badge-unknown">${getLevelName(
          levelId
        )}</span>`;
      },
      className: "text-center",
    },
    {
      title: "ตำแหน่ง",
      data: "positionId",
      render: function (positionId) {
        return getPositionName(positionId);
      },
    },
    {
      title: "สถานะ",
      data: null,
      render: function (data, type, row) {
        return isEmployeeStatusBadge(row.status);
      },
    },
    {
      data: null,
      title: "การจัดการ",
      render: function (data, type, row) {
        return `
      <div className="d-flex align-items-center justify-content-center">
          <div class="dropdown d-lg-none">
            <button class="btn btn-outline-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
               <i class="bi bi-three-dots-vertical"></i>
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
              <a class="dropdown-item text-dark"
                href="/settings/employees/form/${row.publicEmployeeId}"
              >
                <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
              </a>
            </li>
           </ul>
        </div>
        
        <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
          <a
              href="/settings/employees/form/${row.publicEmployeeId}"
              class="btn btn-warning me-2"
              title="แก้ไข"
            >
              <i class="bi bi-pen-fill"></i>
            </a>
        </div>
      </div>`;
      },
    },
  ];

  const columnDefs = [
    {
      maxWidth: "70px",
      targets: 0,
      className: "text-center mobile-hide-column",
    },
    { maxWidth: "70px", targets: 1, className: "mobile-hide-column fs-6" },
    { maxWidth: "200px", targets: 2 },
    { maxWidth: "100px", targets: 3 },
    {
      maxWidth: "120px",
      targets: 4,
      className: "text-center mobile-hide-column",
    },
    { maxWidth: "120px", targets: 5, className: "text-center" },
    { maxWidth: "120px", targets: 6, className: "text-center" },
  ];

  const getLevelName = (levelId) => {
    if (!levelDropdown) return "";
    return levelDropdown.find((item) => item.value === levelId)?.label;
  };
  const getPositionName = (Id) => {
    if (!positionDropdown) return "";
    return positionDropdown.find((item) => item.value === Id)?.label;
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/settings">ตั้งค่า</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container">
        {/* ปุ่มเพิ่ม */}
        <NavLink
          to="/settings/employees/form"
          style={{ textDecoration: "none" }}
        >
          <MainButton btnName={title} icon={"bi bi-plus-circle"} />
        </NavLink>
        {/* ตารางข้อมูล */}
        {isLoading === true ? (
          <LoadingSpin />
        ) : (
          <DataTableComponent
            column={columnData}
            data={employeeData}
            onAction={handleAction}
            tableHead={tableHead}
            tableRef={tableRef}
            isLoading={employeeIsLoading}
            columnDefs={columnDefs}
          />
        )}
      </div>
    </div>
  );
};

export default Employees;
