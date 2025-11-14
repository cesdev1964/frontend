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
import { useJob } from "../../hooks/jobStore";
import handleDelete from "../../util/handleDelete";
import DataTableComponent from "../../components/DatatableComponent";
import { isActiveBadge } from "../../util/isActiveBadge";
import { handleCancel } from "../../util/handleCloseModal";
import MainButton from "../../components/MainButton";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "รหัสหน่วยงาน" },
  { index: 2, colName: "ชื่อหน่วยงาน" },
  { index: 3, colName: "เปิดใช้งาน" },
  { index: 4, colName: "การจัดการ" },
];

export default function Jobs({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลหน่วยงาน");
  const [editmode, setEditMode] = useState(false);
  const [getId, setGetId] = useState(null);
  const [input, setInput] = useState({
    jobname: "",
    jobname2: "",
    jobno: "",
    isactive: false,
  });
  const {
    jobData,
    jobIsLoading,
    jobById,
    getJobData,
    getJobById,
    createJob,
    deleteJob,
    updateJob,
  } = useJob();

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
      await getJobData();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getJobData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    if (jobById) {
      setInput({
        jobname: jobById.jobName ?? "",
        jobname2: jobById.jobName2 ?? "",
        jobno: jobById.jobNo ?? "",
        isactive: jobById.isActive ?? false,
      });
    }
  }, [jobById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const columnDefs = [
    { width: "70px", targets: 0, className: "text-center" },
    { width: "100px", targets: 1, className: "text-center" },
    { width: "230px", targets: 2, className: "mobile-hide-column" },
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
      title: "รหัสชื่อ",
      data: "jobNo",
      orderable: true,
    },
    {
      data: null,
      title: "ชื่อหน่วยงาน",
      render: function (data, type, row, meta) {
        return row.jobName + " " + row.jobName2;
      },
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
                <a class="dropdown-item text-dark" data-action="edit" data-id="${row.jobId}">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" data-action="delete" data-id="${row.jobId}">
                  <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              data-id="${row.jobId}"
              data-action="edit"
              class="btn btn-warning me-2"
              title="แก้ไข"
            >
              <i class="bi bi-pen-fill"></i>
            </a>
            <a
              data-action="delete"
              data-id="${row.jobId}"
              class="btn btn-danger"
              title="ลบ"
            >
              <i class="bi bi-trash-fill"></i>
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
      handleEdit(id, "jobModal");
    } else if (action === "delete") {
      handleDelete(
        jobIsLoading,
        () => deleteJob(id),
        () => getJobData()
      );
    }
  };

  const handleEdit = async (id, modalId) => {
    ClearInput();
    await getJobById(id);
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
    if (!input.jobname) {
      errors.jobname = "กรุณากรอกชื่อหน่วยงาน";
    }
    if (!input.jobno) {
      errors.jobno = "กรุณากรอกรหัสหน่วยงาน";
    }
    return errors;
  };

  const handleSubmit = async (e, modalId) => {
    e.preventDefault();

    const reqData = {
      jobNo: input.jobno,
      jobName: input.jobname,
      jobName2: input.jobname2,
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
            const { jobErrorMessage, success } = editmode
              ? await updateJob(reqData, getId)
              : await createJob(reqData);
            if (success) {
              swalWithBootstrapButtons.fire({
                title: "บึนทึกรายการสำเร็จ!",
                icon: "success",
              });

              const currentModal = document.getElementById(modalId);
              const modalInstance = bootstrap.Modal.getInstance(currentModal);
              modalInstance.hide();
              ClearInput();
              await getJobData();
            } else {
              Swal.fire({
                title: "บันทึกข้อมูลไม่สำเร็จ",
                text: jobErrorMessage,
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
    console.log("submit data", input);
  };

  const ClearInput = () => {
    setInput({
      isactive: false,
      jobname: "",
      jobname2: "",
      jobno: "",
    });
    setError({});
    setEditMode(false);
  };

  return (
    <div className="container-fluid py-4 min-vh-100 d-flex flex-column">
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
       
        <MainButton btnName={title} icon={"bi bi-plus-circle"} onClick={() => handleOpenModal("jobModal")}/>

        <DataTableComponent
          column={columns}
          data={jobData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
          isLoading={jobIsLoading}
        />

        {/* modal */}
        <div
          className="modal fade"
          id="jobModal"
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
                  onClick={() => handleCancel("jobModal")}
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
                        <div className="row">
                          <div className="col-12 mb-3">
                            <label className="form-label">
                              รหัสหน่วยงาน
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="jobno"
                              type="text"
                              className={`form-control ${
                                error.jobno ? "border border-danger" : ""
                              }`}
                              id="jobno"
                              placeholder="กรอกรหัสหน่วยงาน"
                              value={input.jobno}
                              onChange={handleChangeInput}
                              maxLength="10"
                            />
                            {error.jobno ? (
                              <p className="text-danger">{error.jobno}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <label class="form-label">
                              ชื่อหน่วยงาน
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="jobname"
                              type="text"
                              className={`form-control ${
                                error.jobname ? "border border-danger" : ""
                              }`}
                              id="jobname"
                              placeholder="กรอกชื่อหน่วยงาน"
                              value={input.jobname}
                              onChange={handleChangeInput}
                              maxLength="100"
                            />

                            <p
                              className={`text ${
                                input.jobname.length >= 100
                                  ? "text-danger"
                                  : "muted"
                              } text-end`}
                              style={{ fontSize: "0.7rem" }}
                            >
                              [{input.jobname.length}/100]
                            </p>
                            {error.jobname ? (
                              <p className="text-danger">{error.jobname}</p>
                            ) : null}
                          </div>
                          <div className="col-12">
                            <label className="form-label">
                              ชื่อหน่วยงาน (เพิ่มเติม)
                            </label>
                            <input
                              name="jobname2"
                              type="text"
                              className={`form-control ${
                                error.jobname2 ? "border border-danger" : ""
                              }`}
                              id="jobname2"
                              placeholder="กรอกชื่อหน่วยงาน"
                              value={input.jobname2}
                              onChange={handleChangeInput}
                              maxLength="100"
                            />

                            <p
                              className={`text ${
                                input.jobname2.length >= 100
                                  ? "text-danger"
                                  : "muted"
                              } text-end`}
                              style={{ fontSize: "0.7rem" }}
                            >
                              [{input.jobname2.length}/100]
                            </p>
                            {error.jobname2 ? (
                              <p className="text-danger">{error.jobname2}</p>
                            ) : null}
                          </div>
                          <div className=" d-flex justify-content-between align-items-center w-100 mt-2">
                            <label className="mb-2">เปิดใช้งาน</label>
                            <div className="form-check form-switch form-switch-md ms-3">
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
                handleSubmit={(e) => handleSubmit(e, "jobModal")}
                handleCancel={() => handleCancel("jobModal")}
                isLoading={jobIsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
