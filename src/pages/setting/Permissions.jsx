import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { usePermission } from "../../hooks/permissionStore";
import { isActiveBadge } from "../../util/isActiveBadge";
import "/cc-init.js";
import { Link } from "react-router-dom";
import DataTableComponent from "../../components/DatatableComponent";
import handleDelete from "../../util/handleDelete";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "รหัสสิทธิ์เข้าใช้งาน" },
  { index: 2, colName: "ชื่อสิทธิ์เข้าใช้งาน" },
  { index: 3, colName: "เปิดใช้งาน" },
  { index: 4, colName: "การจัดการ" },
];

export default function Permissions({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูล Permission");
  const {
    getPermission,
    getPermissionById,
    createPermission,
    deletePermission,
    updatePermission,
    permissionData,
    permissionLoading,
    permissionError,
    permissionDataById,
  } = usePermission();

  const [editMode, setEditMode] = useState(false);
  const [editPermissionId, setEditPermissionId] = useState(null);
  const [input, setInput] = useState({
    permissioncode: "",
    permissionname: "",
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

  const fetchDataTable = useCallback(async () => {
    try {
      await getPermission();
    } catch (error) {
      alert("ดึงข้อมูลไม่สำเร็จ :", error.message);
    }
  }, [getPermission]);

  useEffect(() => {
    fetchDataTable();
    
  }, [fetchDataTable]);

  useEffect(() => {
    if (permissionDataById) {
      console.log("permission data",permissionDataById)
      setInput({
        permissioncode: permissionDataById.permissionCode ?? "",
        permissionname: permissionDataById.permissionName ?? "",
        isactive: permissionDataById.isActive ?? false,
      });
    }
  }, [permissionDataById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const columnData = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "รหัสสิทธิ์เข้าใช้งาน",
      data: "permissionCode",
      orderable: true,
    },

    {
      title: "ชื่อสิทธิ์เข้าใช้งาน",
      data: "permissionName",
      orderable: true,
    },
    {
      title: "เปิดใช้งาน",
      data: "isActive",
      orderable: true,
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
                <a class="dropdown-item text-dark" 
                   data-action="edit"
                   data-id = "${row.permissionId}"
                   
                   >
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark"
                   data-action="delete" 
                   data-id = "${row.permissionId}"
                >
                  <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              class="btn btn-warning me-2"
              title="แก้ไข"
              data-action="edit"
              data-id = "${row.permissionId}"
            >
              <i class="bi bi-pen-fill"></i>
            </a>
            <a
              class="btn btn-danger"
              title="ลบ"
              data-action="delete"
              data-id = "${row.permissionId}"
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
    setEditMode(false);
    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const handleAction = (action, id) => {
    if (action === "edit") {
      handleEdit(id, "permissionModal");
    } else if (action === "delete") {
      // handleDelete(id);
      handleDelete(
        permissionLoading,
        () => deletePermission(id),
        () => getPermission()
      );
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!input.permissionname) {
      errors.permissionname = "กรุณากรอกชื่อสิทธิ์เข้าใช้งาน";
    }
    if (!input.permissioncode) {
      errors.permissioncode = "กรุณากรอกโค้ดสิทธิ์เข้าใช้งาน";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqData = {
      permissionCode: input.permissioncode,
      permissionName: input.permissionname,
      isActive: input.isactive,
    };
    const errorList = validateForm(input) || [];
    setError(errorList);

    if (Object.keys(errorList).length === 0) {
      const response = editMode
        ? await updatePermission(reqData, editPermissionId)
        : await createPermission(reqData);

      if (response.success) {

        await getPermission();
        ClearInput();
        const currentModal = document.getElementById("permissionModal");
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        modalInstance.hide();
        setIsSubmit(true);
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          draggable: true,
          buttonsStyling: "w-100",
        });
      } else {
        Swal.fire({
          title: "บันทึกข้อมูลไม่สำเร็จ",
          text: permissionError || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
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
      permissioncode: "",
      permissionname: "",
      isactive: false,
    });
    setError({});
    setEditMode(false);
  };

  const handleEdit = async (Id, modalId) => {
    await getPermissionById(Id);
    setEditPermissionId(Id);
    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
      setEditMode(true);
    }
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
            style={{ maxWidth: "350px" }}
            onClick={() => handleOpenModal("permissionModal")}
          >
            <span>
              <i className="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">{addBtnName}</span>
          </a>
        </div>

        <DataTableComponent
          column={columnData}
          data={permissionData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
        />

        {/* modal */}
        <div
          className="modal fade"
          id="permissionModal"
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
                  onClick={ClearInput}
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
                            <label className="form-label">
                              โค้ดสิทธิ์เข้าใช้งาน
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="permissioncode"
                              type="text"
                              className={`form-control ${
                                error.permissioncode
                                  ? "border border-danger"
                                  : ""
                              }`}
                              placeholder="กรอกโค้ดสิทธิ์เข้าใช้งาน"
                              value={input.permissioncode}
                              onChange={handleChangeInput}
                            />
                            {error.permissioncode ? (
                              <p className="text-danger">
                                {error.permissioncode}
                              </p>
                            ) : null}
                            <label className="form-label mt-2">
                              ชื่อสิทธิ์เข้าใช้งาน
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="permissionname"
                              type="text"
                              className={`form-control ${
                                error.permissionname
                                  ? "border border-danger"
                                  : ""
                              }`}
                              placeholder="กรอกชื่อสิทธิ์เข้าใช้งาน"
                              value={input.permissionname}
                              onChange={handleChangeInput}
                            />
                            {error.permissionname ? (
                              <p className="text-danger">
                                {error.permissionname}
                              </p>
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
                handleSubmit={handleSubmit}
                handleCancel={ClearInput}
                isLoading={permissionLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
