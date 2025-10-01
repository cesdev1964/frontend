import React, { useRef } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import "../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import $ from "jquery";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { useRole } from "../../hooks/roleStore";
import { useNavigate } from "react-router-dom";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "รหัสบทบาท" },
  { index: 3, colName: "ชื่อบทบาท" },
  { index: 4, colName: "คำอธิบาย" },
  { index: 5, colName: "การจัดการ" },
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
    dataById
  } = useRole();
  const [editMode,setEditMode] = useState(false);
  const [editRoleId,setEditRoleId] = useState(null);
  const navigate = useNavigate();

  const handleToPermissionPage = (roleId) => {
    navigate(`/settings/rolepermission/:${roleId}`);
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchDataTable = async () => {
      try {
        await getRoleData();
      } catch (error) {
        alert("ดึงข้อมูลไม่สำเร็จ", errorMessage);
      }
    };
    fetchDataTable();
  }, [getRoleData]);

  //ตอนโหลตข้อมูลทั้งหมด
  useEffect(() => {
    setEditMode(false)
    if (data) {
      GetDataTable();
    }
  }, [data]);

  useEffect(()=>{
   if(dataById){
      setInput((prevData) => ({
        ...prevData,
        roleName : dataById.roleName  ?? "",
        description : dataById.description ?? ""
      }));
    }
  },[dataById])

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
    }
  }, [error, isSubmit]);

  const GetDataTable = () => {
    $(tableRef.current).DataTable({
      data: data,
      destroy: true,
      responsive: true,
      paging: true,
      searching: true,
      autoWidth: true,
      language: {
        decimal: "",
        emptyTable: "ไม่มีข้อมูลในตาราง",
        info: "แสดง _START_ ถึง _END_ จาก _TOTAL_ รายการ",
        infoEmpty: "แสดง 0 ถึง 0 จาก 0 รายการ",
        infoFiltered: "(กรองจาก _MAX_ รายการทั้งหมด)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "แสดง _MENU_ รายการ",
        loadingRecords: "กำลังโหลด...",
        processing: "กำลังประมวลผล...",
        search: "ค้นหา:",
        zeroRecords: "ไม่พบข้อมูลที่ตรงกัน",
      },
      columnDefs: [
        { width: "70px", targets: 0 },
        { width: "70px", targets: 1 },
        { width: "200px", targets: 2 },
        { width: "230px", targets: 3 },
        { width: "120px", targets: 4 },
      ],
      columns: [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        {
          title: "รหัสบทบาท",
          data: "roleId",
          orderable: true,
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
                <a class="dropdown-item text-dark btn-edit" data-role-id="${row.roleId}">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark btn-permission" data-role-id="${row.roleId}">
                  <i class="bi bi-person-fill-lock me-2"></i>สิทธิเข้าใช้งาน
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark btn-delete" data-role-id="${row.roleId}">
                  <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              
              class="btn btn-warning me-2 btn-edit"
              title="แก้ไข"
              data-role-id="${row.roleId}"
            >
              <i class="bi bi-pen-fill"></i>
            </a>
            <a
              class="btn btn-info me-2 btn-permission"
              title="สิทธิเข้าใช้งาน"
              data-role-id="${row.roleId}"
            >
              <i class="bi bi-person-fill-lock"></i>
            </a>
            <a
              class="btn btn-danger btn-delete"
              title="ลบ"
              data-role-id="${row.roleId}"
            >
              <i class="bi bi-trash-fill"></i>
            </a>
          </div>
        </div>
       `;
          },
        },
      ],
      dom:
        window.innerWidth <= 570
          ? '<"top"lf>rt<"bottom"ip><"clear">'
          : '<"top"lf>rt<"bottom"ip><"clear">',
    });
  };

  //  เข้าสู่ ปุ่ม action
  $(tableRef.current).on("click", ".btn-permission", function () {
    const id = $(this).data("roleId");
    handleToPermissionPage(id);
  });

  $(tableRef.current).on("click", ".btn-delete", function () {
    const id = $(this).data("roleId");
    handleDelete(id);
  });

  $(tableRef.current).on("click", ".btn-edit", function () {
    const id = $(this).data('roleId');
    handleEdit(id);
  });

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
      const response = editMode? await updateRole(reqData,editRoleId) : await createRole(reqData);
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

  const handleEdit =async (roleId) => {
    await getRoleByIdData(roleId); //ผูก api เรียกใช้ข้อมูล
    setEditRoleId(roleId)

    const currentModal = document.getElementById("notModal");
    if (currentModal) {
      //เป็นการสร้างใหม่ ก่อนการเรียกใช้
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
      setEditMode(true)
      
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
    <div className="container py-4 min-vh-90 d-flex flex-column">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/settings">ตั้งค่า</a>
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
            data-bs-toggle="modal"
            data-bs-target="#notModal"
          >
            <span>
              <i class="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">{addBtnName}</span>
          </a>
        </div>
        <div className="mt-4">
          <table
            ref={tableRef}
            className="table table-striped"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                {tableHead.map((row) => (
                  <th
                    key={row.index}
                    style={{
                      background: "#ffe8da",
                      fontWeight: "600",
                      padding: "12px 8px",
                    }}
                  >
                    {row.colName}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

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
                  onClick={ClearInput}
                ></button>
              </div>
              <div class="modal-body">
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
                          <label class="form-label">
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
                handleCancel={ClearInput}
              />
              {isLoading && <span className="loader"></span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
