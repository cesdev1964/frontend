import React, { useEffect, useRef, useState, useCallback } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import Swal from "sweetalert2";
import DataTableComponent from "../../components/DatatableComponent";
import { Link, NavLink } from "react-router-dom";
import { useTitltName } from "../../hooks/titleNameStore";
import { useEducation } from "../../hooks/educationStore";
import { useLevel } from "../../hooks/levelStore";
import { usePosition } from "../../hooks/positionStore";
import { useJob } from "../../hooks/jobStore";
import { useContrator } from "../../hooks/contratorStore";
import { useEmployeeType } from "../../hooks/employeeTypeStore";
import EmployeeManagementModal from "../../components/modal/EmployeeModal";
import { useEmployee } from "../../hooks/employeeStore";
import { isEmployeeStatusBadge } from "../../util/isActiveBadge";

var fileName = "";
var filePath = "";

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

  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState({});
  const [addBtnName, setAddBtnName] = useState("เพิ่มพนักงานใหม่");
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputImageRef = useRef(null);
  const [openCopperModal, setOpenCopperModal] = useState(false);
  const { educationDropdown, getEducationDropdown } = useEducation();
  const { titleData, getTitleNameData } = useTitltName();
  const { levelDropdown, getLevelDropdown } = useLevel();
  const { positionDropdown, getPositionDropdown } = usePosition();
  const { contratorData, getContratorDropdown } = useContrator();
  const { jobData, getJobDropdown } = useJob();
  const { employeeTypeData, getEmployeeTypeDropdown } = useEmployeeType();
  const {
    employeeData,
    getEmployeeData,
    employeeIsLoading,
    createEmployee,
    updateEmployee,
    employeeErrorMessage,
  } = useEmployee();
  const [isFlow, setIsFlow] = useState(false);

  const fetchDataTable = useCallback(async () => {
    try {
      await getEducationDropdown();
      await getTitleNameData();
      await getLevelDropdown();
      await getPositionDropdown();
      await getContratorDropdown();
      await getJobDropdown();
      await getEmployeeTypeDropdown();
      await getEmployeeData();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [
    getEducationDropdown,
    getTitleNameData,
    getLevelDropdown,
    getLevelDropdown,
    getContratorDropdown,
    getJobDropdown,
    getEmployeeTypeDropdown,
    getEmployeeData,
    getPositionDropdown,
  ]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, selected) => {
    setInput((prevData) => ({
      ...prevData,
      [name]: selected ? selected.value : null,
    }));
  };

  const modalCopperName = "cooperModal";

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
            <li>
              <a class="dropdown-item text-dark btn-delete"
                 data-action="delete"
                 data-id="${row.publicEmployeeId}" 
              >
                <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
              </a>
            </li>
           </ul>
        </div>
        
        <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
          <a
              href="/settings/employees/form/${row.publicEmployeeIdd}"
              class="btn btn-warning me-2"
              title="แก้ไข"
            >
              <i class="bi bi-pen-fill"></i>
            </a>
          <button
            class="btn btn-danger btn-delete"
            title="ลบ"
            data-action="delete"
            data-id="${row.publicEmployeeId}" 
          >
            <i class="bi bi-trash-fill"></i>
          </button>
        </div>
      </div>`;
      },
    },
  ];
  // validate cardID

  const avatarUrl = `data:image/jpeg;base64,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`;

  const handleClear = () => {
    setInput({
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
    setOpenModal(false);
    setError({});
    setIsFlow(false);
    // setSetEditMode(false)
  };

  const validateForm = () => {
    let errors = {};
    if (!input.firstname) {
      errors.firstname = "กรุณากรอกชื่อจริง";
    }
    if (!input.lastname) {
      errors.lastname = "กรุณากรอกนามสกุล";
    }
    if (!input.cardId) {
      errors.cardId = "กรุณากรอกเลขบัตรประชาชน";
    } else if (input.cardId.length < 17) {
      errors.cardId = "กรุณากรอกให้ครบ 13 หลัก";
    }
    if (!input.telephoneNo) {
      errors.telephoneNo = "กรุณากรอกเลขโทรศัพท์";
    } else if (input.telephoneNo.length < 12) {
      errors.telephoneNo = "กรุณากรอกให้ครบ 10 หลัก";
    }
    if (!input.rate) {
      errors.rate = "กรุณากรอกอัตราค่าจ้าง";
    }
    if (!input.employeeCode) {
      errors.employeeCode = "กรุณากรอกรหัสพนักงาน";
    }
    //select
    if (!input.titleId || input.titleId === "" || input.titleId === null) {
      errors.titleId = "กรุณาเลือกคำนำหน้า";
    }
    if (
      !input.contractorId ||
      input.contractorId === "" ||
      input.contractorId === null
    ) {
      errors.contractorId = "กรุณาเลือกชื่อผู้รับเหมา";
    }
    if (
      !input.educationId ||
      input.educationId === "" ||
      input.educationId === null
    ) {
      errors.educationId = "กรุณาเลือกระดับการศึกษา";
    }
    if (!input.jobId || input.jobId === "" || input.jobId === null) {
      errors.jobId = "กรุณาเลือกหน่วยงาน";
    }

    if (!input.levelId || input.levelId === "" || input.levelId === null) {
      errors.levelId = "กรุณาเลือกระดับ";
    }

    if (
      !input.positionId ||
      input.positionId === "" ||
      input.positionId === null
    ) {
      errors.positionId = "กรุณาเลือกตำแหน่ง";
    }

    if (!input.typeId || input.typeId === "" || input.typeId === null) {
      errors.typeId = "กรุณาเลือกประเภทงาน";
    }

    if (!input.statusId || input.statusId === "" || input.statusId === null) {
      errors.statusId = "กรุณาเลือกสถานะ";
    }

    if (!input.flowId || input.flowId === "" || input.flowIdo === null) {
      errors.flowId = "กรุณาเลือกสายอนุมัติ";
    }

    // datetime
    if (!input.birthday || input.birthday === "") {
      errors.birthday = "กรุณากรอกวันเกิด";
    }

    if (!input.startDate || input.startDate === "") {
      errors.startDate = "กรุณากรอกวันเริ่มงาน";
    }

    if (input.statusId === "0" && !input.endDate) {
      errors.endDate = "กรุณากรอกวันที่ลาออก";
    }

    return errors;
  };

  const onlyTextNumber = (value) => {
    if (!value) return "";
    const newValue = value.replace(/[^a-zA-Z0-9]/g, "");
    return newValue;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("filePath", filePath);
    // console.log("fileName", fileName);

    const formData = new FormData();
    formData.append("employeeCode", input.employeeCode);
    formData.append("titleId", input.titleId);
    formData.append("firstname", input.firstname);
    formData.append("lastname", input.lastname);
    formData.append("telephoneNo", input.telephoneNo);
    formData.append("cardId", input.cardId);
    formData.append("birthday", input.birthday);
    formData.append("educationId", input.educationId);
    formData.append("jobId", input.jobId);
    formData.append("levelId", input.levelId);
    formData.append("startDate", input.startDate);
    formData.append("positionId", input.positionId);
    formData.append("contractorId", input.contractorId);
    formData.append("rate", input.rate);
    formData.append("typeId", input.typeId);
    formData.append("flowId", input.flowId);
    formData.append("status", input.statusId);
    // เหลือ file กับ deduction ที่เป็น list

    // เอาวันที่ลาออก ออกด้วย

    console.log("employee data", ...formData.entries());
    const errorList = validateForm(input) || [];
    setError(errorList);
    if (Object.keys(errorList).length === 0) {
      // const response = editMode
      //   ? await updateEducation(reqData, getId)
      //   : await createEducation(reqData);

      // const response = await createEmployee(formData);
      if (response.success) {
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          draggable: true,
          buttonsStyling: "w-100",
        });
        const currentModal = document.getElementById("educationmodal");
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        modalInstance.hide();
        ClearInput();
        setOpenModal(false);
        setIsFlow(false);
        await getEducationData();
      } else {
        Swal.fire({
          title: "บันทึกข้อมูลไม่สำเร็จ",
          text: educationErrorMessage || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
          icon: "error",
        });
      }
    }
    //เมื่อทำการบันทึกข้อมูลใน API เรียบร้อย ให้ทำการ set ตัวแปลให้เป็นค่าว่าง
  };

  const handleEdit = () => {
    setOpenModal(true);
  };

  const openCopperImageModal = (e) => {
    e.preventDefault();
    //การเปิดโฟลเดอร์
    const file = e.target.files?.[0];
    if (!file) return;

    //  console.log("file data",file);
    const fileSRC = URL.createObjectURL(file);
    const getFileName = file.name;
    setSrc(fileSRC);

    // เก็ย fileName and filePath กว่าจะอัปเดตค่าใหม่ต้องทำการ render ก่อน
    setInput((prevData) => ({
      ...prevData,
      filename: getFileName,
      filepath: fileSRC,
    }));

    fileName = file.name;
    filePath = URL.createObjectURL(file);

    console.log("only file path ", filePath);
    console.log("only file name ", fileName);
    // oprn modal
    // const copperModal = document.getElementById(modalCopperName);
    // const modal = bootstrap.Modal.getOrCreateInstance(copperModal);
    // modal.show();
    setOpenCopperModal(true);
  };

  const onCloseModal = useCallback(() => {
    handleClear();
    setOpenModal(false);
    setIsFlow(false);
  }, [handleClear]);

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
        {/* <div className="add-btn">
          <button
            type="button"
            className="power py-2"
            style={{ maxWidth: "200px" }}
            onClick={() => setOpenModal(true)}
          >
            <span>
              <i className="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">{addBtnName}</span>
          </button>
        </div> */}
        <NavLink
          to="/settings/employees/form"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="add-btn">
            <button
              type="button"
              className="power py-2 "
              style={{ maxWidth: "500px" }}
            >
              <span>
                <i className="bi bi-plus-circle fs-4"></i>
              </span>{" "}
              <span className="label">{title}</span>
            </button>
          </div>
        </NavLink>
        {/* ตารางข้อมูล */}
        <DataTableComponent
          column={columnData}
          data={employeeData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          isLoading={employeeIsLoading}
        />

        {/* modal */}
      </div>
      <EmployeeManagementModal
        clear={handleClear}
        input={input}
        setInput={setInput}
        isOpen={openModal}
        modalTitle={title}
        onClose={onCloseModal}
        submit={handleSubmit}
        error={error}
        setFlow={setIsFlow}
        isFlow={isFlow}
      />
    </div>
  );
};

export default Employees;
