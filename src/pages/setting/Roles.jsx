import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { useRole } from "../../hooks/roleStore";
import { useNavigate } from "react-router-dom";
import DataTableComponent from "../../components/DatatableComponent";
import { Link } from "react-router-dom";
import { handleCancel } from "../../util/handleCloseModal";

export const tableHead = [
  { colName: "ลำดับ" },
  { colName: "ชื่อบทบาท" },
  { colName: "คำอธิบาย" },
  { colName: "การจัดการ" },
];

export default function Roles({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลบทบาท");
  const [input, setInput] = useState({
    roleName: "",
    description: "",
  });
  const {
    data,
    errorMessage,
    getRoleData,
    isLoading,
    createRole,
    deleteRole,
    updateRole,
    getRoleByIdData,
    dataById,
  } = useRole();
  const [editMode, setEditMode] = useState(false);
  const [editRoleId, setEditRoleId] = useState(null);

  const navigate = useNavigate();

  const handleToPermissionPage = (roleId) => {
    navigate(`/settings/rolepermission/${roleId}`);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchDataTable = useCallback(async () => {
    try {
      await getRoleData();
    } catch (error) {
      alert("ดึงข้อมูลไม่สำเร็จ", errorMessage);
    }
  }, [getRoleData]);

  useEffect(() => {
    fetchDataTable();
    setEditMode(false);
  }, [fetchDataTable]);

  useEffect(() => {
    if (dataById) {
      setInput((prevData) => ({
        ...prevData,
        roleName: dataById.roleName ?? "",
        description: dataById.description ?? "",
      }));
    }
  }, [dataById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
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
      title: "บทบาท",
      data: "roleName",
      orderable: true,
    },

    {
      title: "คำอธิบาย",
      data: "description",
      orderable: true,
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
                <a class="dropdown-item text-dark btn-edit" 
                   data-id="${row.roleId}"
                   data-action="edit" 
                   >
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark btn-permission" 
                   data-id="${row.roleId}"
                   data-action="permission"
                   >
                  <i class="bi bi-person-fill-lock me-2"></i>สิทธิเข้าใช้งาน
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark btn-delete"
                   data-id="${row.roleId}" 
                   data-action="delete">
                  <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              
              class="btn btn-warning me-2 btn-edit"
              title="แก้ไข"
              data-id="${row.roleId}"
              data-action="edit" 
            >
              <i class="bi bi-pen-fill"></i>
            </a>
            <a
              class="btn btn-info me-2 btn-permission"
              title="สิทธิเข้าใช้งาน"
              data-id="${row.roleId}"
               data-action="permission"
            >
              <i class="bi bi-person-fill-lock"></i>
            </a>
            <a
              class="btn btn-danger btn-delete"
              title="ลบ"
              data-id="${row.roleId}"
              data-action="delete"
            >
              <i class="bi bi-trash-fill"></i>
            </a>
          </div>
        </div>
       `;
      },
    },
  ];

    const columnDefs = [
    { width: "70px", targets: 0 ,className:"text-center"},
    { width: "100px", targets: 1 },
    { width: "150px", targets: 2 },
    { width: "90px", targets: 3},
  ];

  const handleAction = (action, id) => {
    if (action === "edit") {
      handleEdit(id);
    } else if (action === "delete") {
      handleDelete(id);
    } else if (action === "permission") {
      handleToPermissionPage(id);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!input.roleName) {
      errors.roleName = "กรุณากรอกชื่อบทบาท";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqData = {
      roleName: input.roleName,
      roleDescription: input.description,
    };

    const errorList = validateForm(input) || [];
    setError(errorList);
    //api post
    if (Object.keys(errorList).length === 0) {
      const response = editMode
        ? await updateRole(reqData, editRoleId)
        : await createRole(reqData);
      if (response.success) {
        setIsSubmit(true);
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          draggable: true,
          buttonsStyling: "w-100",
        });

        const currentModal = document.getElementById("notModal");
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        modalInstance.hide();
        ClearInput();
        await getRoleData();
      } else {
        Swal.fire({
          title: "บันทึกข้อมูลไม่สำเร็จ",
          icon: "error",
        });
      }
    }
  };

  const handleOpenModal = () => {
    ClearInput()
    setEditMode(false);
    const currentModal = document.getElementById("notModal");
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const handleEdit = async (roleId) => {
    ClearInput()
    await getRoleByIdData(roleId); 
    setEditRoleId(roleId);

    const currentModal = document.getElementById("notModal");
    if (currentModal) {
      //เป็นการสร้างใหม่ ก่อนการเรียกใช้
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
      setEditMode(true);
    }
  };

  const handleDelete = (roleId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success custom-width-btn-alert",
        cancelButton: "btn btn-danger custom-width-btn-alert",
      },
      buttonsStyling: "w-100",
    });
    swalWithBootstrapButtons
      .fire({
        title: "คุณต้องการลบรายการใช่หรือไม่",
        text: "ถ้าลบไปแล้วไม่สามารถกลับคืนมาได้ คุณแน่ใจแล้วใช่ไหม",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบได้เลย",
        cancelButtonText: "ยกเลิกการลบ",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteRole(roleId);
          if (response.success) {
            swalWithBootstrapButtons.fire({
              title: "ลบรายการสำเร็จ!",
              text: "คุณทำการลบรายการเรียบร้อยแล้ว",
              icon: "success",
            });
            await getRoleData();
          } else {
            Swal.fire({
              title: "เกิดข้อผิดผลาดในการลบรายการ กรุณาลองใหม่อีกครั้ง",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "ยกเลิก",
            text: "คุณทำการยกเลิกลบรายการเรียบร้อยแล้ว",
            icon: "error",
          });
        }
      });
  };

  const ClearInput = () => {
    setInput({
      roleName: "",
      description: "",
    });
    setError({});
    setEditMode(false);
  };

  return (
    <div className="container-fluid py-4 min-vh-90 d-flex flex-column">
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
            style={{ maxWidth: "200px" }}
            onClick={handleOpenModal}
          >
            <span>
              <i className="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">{addBtnName}</span>
          </a>
        </div>
        {/* table */}

        <DataTableComponent
          column={columnData}
          data={data}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
        />

        {/* modal */}
        <div
          className="modal fade"
          id="notModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-md">
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
                  onClick={()=>handleCancel("notModal")}
                ></button>
              </div>
              <div className="modal-body">
                <div className="employee-content p-4">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <form>
                      {/* ข้อมูลทั่วไป */}
                      <div>
                        <div className="mb-3">
                          <label className="form-label">
                            ชื่อบทบาท
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="roleName"
                            type="text"
                            className={`form-control ${
                              error.roleName ? "border border-danger" : ""
                            }`}
                            placeholder="กรอกชื่อบทบาท"
                            value={input.roleName}
                            onChange={handleChangeInput}
                          />
                          {error.roleName ? (
                            <p className="text-danger">{error.roleName}</p>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <label className="form-label">
                            คำอธิบายบทบาท
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <textarea
                            className="form-control"
                            name="description"
                            placeholder="กรอกคำอธิบาย"
                            rows="3"
                            cols="40"
                            maxlength="100"
                            style={{ resize: "none", overflow: "hidden" }}
                            value={input.description}
                            onChange={handleChangeInput}
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <SubmitOrCancelButton
                handleSubmit={handleSubmit}
                handleCancel={()=>handleCancel("notModal")}
                isLoading={isLoading}
              />
              {isLoading && <span className="loader"></span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
