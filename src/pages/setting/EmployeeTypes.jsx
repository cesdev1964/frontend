import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { Link } from "react-router-dom";
import { useEmployeeType } from "../../hooks/employeeTypeStore";
import handleDelete from "../../util/handleDelete";
import DataTableComponent from "../../components/DatatableComponent";
import { isActiveBadge } from "../../util/isActiveBadge";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "ประเภทพนักงาน" },
  { index: 2, colName: "เปิดใช้งาน" },
  { index: 3, colName: "การจัดการ" },
];

export default function EmployeeTypes({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลประเภทของพนักงาน");
  const [input, setInput] = useState({
    typename: "",
    isactive: false,
  });
  const [editmode, setEditMode] = useState(false);
  const [getId, setGetId] = useState(null);
  const {
    employeeTypeData,
    employeeTypeIsLoading,
    employeeTypeErrorMessage,
    success,
    employeeTypeById,
    getEmployeeType,
    getEmployeeTypeById,
    createEmployeeType,
    deleteEmployeeType,
    updateEmployeeType,
  } = useEmployeeType();

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

  const fetchDataTable = useCallback(async () => {
    try {
      await getEmployeeType();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getEmployeeType]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    if (employeeTypeById) {
      setInput({
        typename: employeeTypeById.typeName ?? "",
        isactive: employeeTypeById.isActive ?? false,
      });
    }
  }, [employeeTypeById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const columnDefs = [
    { width: "70px", targets: 0, className: "text-center" },
    { width: "230px", targets: 1 },
    { width: "100px", targets: 2 },
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
      title: "ประเภทพนักงาน",
      data: "typeName",
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
                <a class="dropdown-item text-dark" data-action="edit" data-id="${row.typeId}">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
         <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              data-id="${row.typeId}"
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
    ClearInput();
    setEditMode(false);
    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const handleAction = (action, id) => {
    if (action === "edit") {
      handleEdit(id, "employeeTypeModal");
    } else if (action === "delete") {
      handleDelete(
        employeeTypeIsLoading,
        () => deleteEmployeeType(id),
        () => getEmployeeType()
      );
    }
  };

  const handleEdit = async (id, modalId) => {
    ClearInput();
    await getEmployeeTypeById(id);
    setGetId(id);
    setEditMode(true);

    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!input.typename) {
      errors.typename = "กรุณากรอกชื่อประเภทของพนักงาน";
    }
    return errors;
  };

  const handleSubmit = async (e, modalId) => {
    e.preventDefault();

    const reqData = {
      typeName: input.typename,
      isActive: input.isactive,
    };

    const errorList = validateForm(input) || [];
    setError(errorList);
    if (Object.keys(errorList).length === 0) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success custom-width-btn-alert",
          cancelButton: "btn btn-danger custom-width-btn-alert",
        },
        buttonsStyling: "w-100",
      });
      swalWithBootstrapButtons
        .fire({
          title: "คุณต้องการบันทึกรายการใช่หรือไม่",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "ยื่นยันการบันทึกรายการ",
          cancelButtonText: "ยกเลิกการบันทึกรายการ",
          reverseButtons: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            const { success, employeeTypeErrorMessage } = editmode
              ? await updateEmployeeType(reqData, getId)
              : await createEmployeeType(reqData);
            if (success) {
              swalWithBootstrapButtons.fire({
                title: "บึนทึกรายการสำเร็จ!",
                icon: "success",
              });

              const currentModal = document.getElementById(modalId);
              const modalInstance = bootstrap.Modal.getInstance(currentModal);
              modalInstance.hide();
              ClearInput();
              await getEmployeeType();
            } else {
              Swal.fire({
                title: "บันทึกข้อมูลไม่สำเร็จ",
                text: employeeTypeErrorMessage,
                icon: "error",
              });
            }
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
              title: "ยกเลิก",
              text: "คุณทำการยกเลิกรายการเรียบร้อยแล้ว",
              icon: "error",
            });
          }
        });
    }
  };

  const finishSubmit = () => {
    // console.log("submit data", input);
  };

  const ClearInput = () => {
    setInput({
      typename: "",
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
        <div className="add-btn">
          <a
            className="power py-2"
            style={{ maxWidth: "400px" }}
            onClick={() => handleOpenModal("employeeTypeModal")}
          >
            <span>
              <i class="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">{addBtnName}</span>
          </a>
        </div>
        <DataTableComponent
          column={columns}
          data={employeeTypeData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
          isLoading={employeeTypeIsLoading}
        />

        {/* modal */}
        <div
          className="modal fade"
          id="employeeTypeModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-primary d-flex flex-column">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  <i className="bi bi-plus-circle fs-4 me-2"></i>
                  {title}
                </h1>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={ClearInput}
                ></button>
              </div>
              <div class="modal-body">
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
                            <label class="form-label">
                              ประเภทพนักงาน
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="typename"
                              type="text"
                              className={`form-control ${
                                error.typename ? "border border-danger" : ""
                              }`}
                              placeholder="กรอกชื่อประเภท"
                              value={input.typename}
                              onChange={handleChangeInput}
                            />
                            {error.typename ? (
                              <p className="text-danger">{error.typename}</p>
                            ) : null}
                          </div>
                          <div class=" d-flex justify-content-between align-items-center w-100 mt-2">
                            <label className="mb-2">เปิดใช้งาน</label>
                            <div class="form-check form-switch form-switch-md ms-3">
                              <input
                                class="form-check-input"
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
                handleSubmit={(e) => handleSubmit(e, "employeeTypeModal")}
                handleCancel={() => handleCancel("employeeTypeModal")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
