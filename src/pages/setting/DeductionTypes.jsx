import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { Link } from "react-router-dom";
import MainButton from "../../components/MainButton";
import { useDeduction } from "../../hooks/deductionTypeStore";
import DataTableComponent from "../../components/DatatableComponent";
import { isActiveBadge } from "../../util/isActiveBadge";
import { handleCancel } from "../../util/handleCloseModal";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "ชื่อประเภทการหักเงิน" },
  { index: 2, colName: "เปิดใช้งาน" },
  { index: 3, colName: "การจัดการ" },
];

export default function DeductionTypes({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลประเภทการหักเงิน");
  const [getId, setGetId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const {
    deductionData,
    deductionIsLoading,
    deductionErrorMessage,
    deductionById,
    deductionDropdown,
    getDeductionData,
    getDeductionById,
    createDeduction,
    updateDeduction,
  } = useDeduction();

  const fetchDataTable = useCallback(async () => {
    try {
      await getDeductionData();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getDeductionData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  const [input, setInput] = useState({
    deductiontypename: "",
    isactive: false,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = (e) => {
    setInput((prev) => ({
      ...prev,
      isactive: e.target.checked ? true : false,
    }));
  };

  useEffect(() => {
    if (deductionById) {
      setInput({
        deductiontypename: deductionById.deductionTypeName,
        isactive: deductionById.isActive,
      });
    }
  }, [deductionById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const columnDefs = [
    { width: "70px", targets: 0, className: "text-center" },
    { width: "100px", targets: 1 },
    { width: "100px", targets: 2, className: "text-center" },
    { width: "100px", targets: 3, className: "text-center" },
  ];

  const columns = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "ชื่อประเภท",
      data: "deductionTypeName",
      orderable: true,
    },
    {
      title: "เปิดใช้งาน",
      data: "isActive",
      render: function (data, type, row) {
        return isActiveBadge(row.isActive);
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
                 <a class="dropdown-item text-dark" data-action="edit" data-id="${row.deductionTypeId}">
                   <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                 </a>
               </li>
              </ul>
           </div>
           
           <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
             <a
               data-id="${row.deductionTypeId}"
               data-action="edit"
               class="btn btn-warning me-2"
               title="แก้ไข"
             >
               <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล 
             </a>
           </div>
         </div>
        `;
      },
    },
  ];

  const handleOpenModal = (modalId) => {
    setEditMode(false);
    ClearInput();
    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const handleAction = (action, id) => {
    if (action === "edit") {
      handleEdit(id, "deductionModal");
    }
  };

  const handleEdit = async (Id, modalId) => {
    ClearInput();
    await getDeductionById(Id);
    setGetId(Id);

    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      //เป็นการสร้างใหม่ ก่อนการเรียกใช้
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
      setEditMode(true);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!input.deductiontypename) {
      errors.deductiontypename = "กรุณากรอกชื่อประเภทการหักเงิน";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqData = {
      deductionTypeName: input.deductiontypename,
      isActive: input.isactive,
    };
    const errorList = validateForm(input) || [];
    setError(errorList);

    if (Object.keys(errorList).length === 0) {
      const response = editMode
        ? await updateDeduction(reqData, getId)
        : await createDeduction(reqData);
      if (response.success) {
        setIsSubmit(true);
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          draggable: true,
          buttonsStyling: "w-100",
        });
        const currentModal = document.getElementById("deductionModal");
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        modalInstance.hide();
        ClearInput();
        await getDeductionData();
      } else {
        Swal.fire({
          title: "บันทึกข้อมูลไม่สำเร็จ",
          text: deductionErrorMessage || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
          icon: "error",
        });
      }
    }
  };

  const finishSubmit = () => {
    console.log("submit data", input);
  };

  const ClearInput = () => {
    setInput({
      deductiontypename: "",
      isactive: false,
    });
    setError({});
    setEditMode(false);
  };

  return (
    <div>
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

        <MainButton
          btnName={addBtnName}
          icon={"bi bi-plus-circle"}
          onClick={() => handleOpenModal("deductionModal")}
        />

        <DataTableComponent
          column={columns}
          data={deductionData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
          isLoading={deductionIsLoading}
        />
        {/* modal */}
        <div
          className="modal fade"
          id="deductionModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-primary d-flex flex-column">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  <i className="bi bi-plus-circle fs-4 me-2"></i>
                  {addBtnName}
                </h1>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={()=>handleCancel("deductionModal")}
                ></button>
              </div>
              <div className="modal-body">
                <div className="employee-content p-4">
                  <div className="col-lg-3 "></div>
                  <div
                    className="col-lg-9 "
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <form>
                      {/* ข้อมูลทั่วไป */}
                      <div>
                        <div className="row form-spacing g-3">
                          <div className="col-md-12">
                            <label htmlFor="StartDate" className="form-label">
                              ชื่อประเภทการหักเงิน
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="deductiontypename"
                              type="text"
                              className={`form-control ${
                                error.deductiontypename
                                  ? "border border-danger"
                                  : ""
                              }`}
                              placeholder="กรอกชื่อประเภทการหักเงิน"
                              value={input.deductiontypename}
                              onChange={handleChangeInput}
                            />
                            {error.deductiontypename ? (
                              <p className="text-danger">
                                {error.deductiontypename}
                              </p>
                            ) : null}
                          </div>
                          <div className=" d-flex justify-content-between align-items-center w-100 mt-2">
                            <label className="mb-2">เปิดใช้งาน</label>
                            <div class="form-check form-switch form-switch-md ms-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="isActive-toggle"
                                name="isactive"
                                value={input.isactive}
                                onChange={handleChangeCheckbox}
                                checked={input.isactive === true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <SubmitOrCancelButton
                handleSubmit={handleSubmit}
                handleCancel={()=>handleCancel("deductionModal")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
