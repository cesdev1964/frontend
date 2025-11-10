import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import DataTableComponent from "../../components/DatatableComponent";
import { Link, NavLink, useLocation } from "react-router-dom";
import { usePosition } from "../../hooks/positionStore";
import { useEmployee } from "../../hooks/employeeStore";
import { isEmployeeStatusBadge } from "../../util/isActiveBadge";
import MainButton from "../../components/MainButton";
import Swal from "sweetalert2";
import { HttpStatusCode } from "axios";
import SessionExpiryModal from "../../components/modal/SessionExpiryModal";
const token = localStorage.getItem("access_token");

const EmployeesTest = ({ title }) => {
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
  const [isFlow, setIsFlow] = useState(false);

  const fetchDataTable = useCallback(async () => {
    try {
      await getEmployeeData();
    } catch (error) {
      // alert("โหลด API ไม่สำเร็จ", error);
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

  const getPositionName = (Id) => {
    const position = positionDropdown.find((item) => item.value === Id);
    return position ? position.label : "";
  };

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
      data: null,
      orderable: true,
      render: function (data, type, row) {
        return `<span class="badge-style badge-unknown">PC - ${row.levelId}</span>`;
      },
      className: "text-center",
    },
    {
      title: "ตำแหน่ง",
      data: null,
      render: function (data, type, row) {
        return getPositionName(row.positionId);
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
        {/* โหลดข้อมูลในตารางเรียบร้อยตารางจะปรากฏ */}
        <DataTableComponent
          column={columnData}
          data={employeeData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          isLoading={employeeIsLoading}
        />
      </div>
    </div>
  );
};

export default EmployeesTest;
