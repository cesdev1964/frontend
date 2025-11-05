import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import "../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import $ from "jquery";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { Link } from "react-router-dom";
import DataTableComponent from "../../components/DatatableComponent";
import { isActiveBadge } from "../../util/isActiveBadge";
import { useOTType } from "../../hooks/otTypeStore";
import MainButton from "../../components/MainButton";
import { handleCancel } from "../../util/handleCloseModal";
import InputTextField from "../../components/inputTextField";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "โค้ดโอที" },
  { index: 2, colName: "ชื่อประเภทโอที" },
  { index: 3, colName: "เปิดใช้งาน" },
  { index: 4, colName: "การจัดการ" },
];

export default function OTCategories({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลโอที");
  const [editMode, setEditMode] = useState(false);
  const [getId, setGetId] = useState("");
  const {
    otTypeData,
    otTypeIsLoading,
    getOtTypeData,
    otTypeErrorMessage,
    createOtType,
    updateOtType,
    success,
  } = useOTType();

  const [input, setInput] = useState({
    OTtypecode: "",
    OTtypename: "",
    isActive: false,
  });

  const fetchDataTable = useCallback(async () => {
    try {
      await getOtTypeData();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getOtTypeData]);

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

  const handleChangeCheckbox = (e) => {
    setInput((prev) => ({
      ...prev,
      isActive: e.target.checked ? true : false,
    }));
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
    }
  }, [error, isSubmit]);

  const columnDefs = [
    { width: "70px", targets: 0, className: "text-center" },
    { width: "70px", targets: 1, className: "text-center" },
    { width: "200px", targets: 2 },
    { width: "100px", targets: 3, className: "text-center" },
    { width: "100px", targets: 4, className: "text-center" },
  ];

  const columns = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: null,
      data: "otTypeCode",
      orderable: true,
    },
    {
      title: null,
      data: "otTypeName",
      orderable: true,
    },
    {
      title: null,
      data: "isActive",
      render: function (data, type, row) {
        return isActiveBadge(row.isActive);
      },
    },
    {
      data: null,
      title: null,
      render: function (data, type, row) {
        return `      
         <div className="d-flex align-items-center justify-content-center">
            <div class="dropdown d-lg-none">
              <button class="btn btn-outline-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                 <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                <a class="dropdown-item text-dark" data-action="edit" data-id="${row.otTypeId}">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              data-id="${row.otTypeId}"
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
      handleEdit(id, "OTModal");
    }
  };

  const handleEdit = async (id, modalId) => {
    ClearInput();
    // await g(id);
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
    const hasThai = /[ก-ฮ]/;
    if (!input.OTtypename) {
      errors.OTtypename = "กรุณากรอกชื่อโอที";
    }
    return errors;
  };

  const handleSubmit = async (e, modalId) => {
    e.preventDefault();
    const reqData = {
      otTypeCode: input.OTtypecode,
      otTypeName: input.OTtypename,
      isActive: input.isActive,
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
            const { otTypeErrorMessage, success } = editMode
              ? await updateOtType(reqData, getId)
              : await createOtType(reqData);
            if (success) {
              swalWithBootstrapButtons.fire({
                title: "บึนทึกรายการสำเร็จ!",
                icon: "success",
              });

              const currentModal = document.getElementById(modalId);
              const modalInstance = bootstrap.Modal.getInstance(currentModal);
              modalInstance.hide();
              await getOtTypeData();
              ClearInput();
              await getUserData();
            } else {
              Swal.fire({
                title: "บันทึกข้อมูลไม่สำเร็จ",
                text: otTypeErrorMessage,
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

  const ClearInput = () => {
    setInput({
      OTtypecode: "",
      OTtypename: "",
      isActive: false,
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
          onClick={() => handleOpenModal("OTModal")}
        />

        <DataTableComponent
          column={columns}
          data={otTypeData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
          isLoading={otTypeIsLoading}
        />

        {/* modal */}
        <div
          className="modal fade"
          id="OTModal"
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
                  onClick={() => handleCancel("OTModal")}
                ></button>
              </div>
              <div class="modal-body">
                <div className="p-4">
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
                          <div className="col-12">
                            {/* <label className="form-label">โค้ดโอที</label>
                            <input
                              name="OTtypecode"
                              type="text"
                              className={`form-control ${
                                error.OTtypecode ? "border border-danger" : ""
                              }`}
                              id="categoryname"
                              placeholder="กรอกโค้ดโอที"
                              value={input.OTtypecode}
                              onChange={handleChangeInput}
                            /> */}
                            <InputTextField
                              onChange={handleChangeInput}
                              isRequire={false}
                              label="โค้ดโอที"
                              name="OTtypecode"
                              placeholder="กรอกโค้ดโอที"
                              value={input.OTtypecode}
                            />
                          </div>
                        </div>
                        <div className="row form-spacing g-3">
                          <div className="col-12">
                            <InputTextField
                              onChange={handleChangeInput}
                              isRequire={true}
                              label="ชื่อโอที"
                              name="OTtypename"
                              placeholder="กรอกชื่อโอที"
                              value={input.OTtypename}
                              error={error.OTtypename}
                            />
                            {/* <label htmlFor="StartDate" class="form-label">
                              ชื่อโอที
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="OTtypename"
                              type="text"
                              className={`form-control ${
                                error.OTtypename ? "border border-danger" : ""
                              }`}
                              id="OTtypename"
                              placeholder="กรอกชื่อโอที"
                              value={input.OTtypename}
                              onChange={(e) => handleChangeInput(e)}
                            />
                            {error.OTtypename ? (
                              <p className="text-danger">{error.OTtypename}</p>
                            ) : null} */}
                          </div>
                          <div className=" d-flex justify-content-between align-items-center w-100 mt-2">
                            <label className="mb-2">เปิดใช้งาน</label>
                            <div className="form-check form-switch form-switch-md ms-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="isActive-toggle"
                                name="isActive"
                                value={input.isActive}
                                onChange={(e) => handleChangeCheckbox(e)}
                                checked={input.isActive === true}
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
                handleSubmit={(e) => handleSubmit(e, "OTModal")}
                handleCancel={() => handleCancel("OTModal")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
