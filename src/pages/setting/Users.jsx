import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import "../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import $ from "jquery";
import HeaderPage from "../../components/HeaderPage";
import { mockemployeetableData } from "../../MockData";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";

export default function Users({ title }) {
  useTitle(title);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName,setAddBtnName] = useState("เพิ่มผู้ใช้งานใหม่")
  const [input, setInput] = useState({
    titleId: 0,
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    mustchangepassword: 0,
    isactive: 0,
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setInput({
      titleId: 0,
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      mustchangepassword: 0,
      isactive: 0,
    });
    setError({});
  };

  const tableHead = [
    { index: 0, colName: "ลำดับ" },
    { index: 1, colName: "ชื่อผู้ใช้" },
    { index: 2, colName: "ชื่อ นามสกุล" },
    { index: 3, colName: "เปิดใช้งาน" },
    { index: 4, colName: "การจัดการ" },
  ];

  const statusBadge = (status) => {
    switch (status) {
      case 0:
        return `<span class="badge-style badge-leave">ลาออก</span>`;

      case 1:
        return `<span class="badge-style badge-stillWork">ประจำการ</span>`;

      default:
        return `<span class="badge-style badge-unknown">ไม่ระบุ</span>`;
    }
  };

  const levelBadge = (level) => {
    console.log("level", level);
    switch (level) {
      case 1:
      case 2:
      case 3:
        return `<span class="badge-style badge-leave">PC ${level}</span>`;

      case 4:
      case 5:
      case 6:
        return `<span class="badge-style badge-middle">PC ${level}</span>`;

      case 7:
      case 8:
      case 9:
        return `<span class="badge-style badge-stillWork">PC ${level}</span>`;

      default:
        return `<span class="badge-style badge-unknown">ไม่ระบุ</span>`;
    }
  };

  const tableRef = useRef();
//   useEffect(() => {
//     $(tableRef.current).DataTable({
//       responsive: true,
//       destroy: true,
//       paging: true,
//       searching: true,
//       scrollX: true,
//       autoWidth: true,
//       language: {
//         decimal: "",
//         emptyTable: "ไม่มีข้อมูลในตาราง",
//         info: "แสดง _START_ ถึง _END_ จาก _TOTAL_ รายการ",
//         infoEmpty: "แสดง 0 ถึง 0 จาก 0 รายการ",
//         infoFiltered: "(กรองจาก _MAX_ รายการทั้งหมด)",
//         infoPostFix: "",
//         thousands: ",",
//         lengthMenu: "แสดง _MENU_ รายการ",
//         loadingRecords: "กำลังโหลด...",
//         processing: "กำลังประมวลผล...",
//         search: "ค้นหา:",
//         zeroRecords: "ไม่พบข้อมูลที่ตรงกัน",
//       },
//       data: mockemployeetableData,
//       columnDefs: [
//         { width: "50px", targets: 0 },
//         { width: "70px", targets: 1 },
//         { width: "160px", targets: 2 },
//         { width: "100px", targets: 3 },
//         { width: "160px", targets: 4 },
//         { width: "100px", targets: 5 },
//         { width: "120px", targets: 6 },
//       ],
//       columns: [
//         {
//           data: null,
//           render: function (data, type, row, meta) {
//             return meta.row + 1;
//           },
//         },
//         {
//           title: "รหัสพนักงาน",
//           data: "empId",
//           orderable: true,
//         },
//         {
//           title: "ชื่อพนักงาน",
//           data: "empName",
//           orderable: true,
//         },

//         {
//           title: "ระดับ",
//           data: "level",
//           orderable: true,

//           render: function (data, type, row) {
//             return levelBadge(row.level);
//           },
//         },
//         {
//           title: "ตำแหน่ง",
//           data: "position",
//         },
//         {
//           title: "สถานะ",
//           data: "status",
//         },
//         {
//           data: null,
//           title: "การจัดการ",
//           render: function (data, type, row) {
//             return `
//            <div className="d-flex align-items-center justify-content-center">
//             <div class="dropdown d-lg-none">
//               <button class="btn btn-outline-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
//                  <i class="bi bi-three-dots-vertical"></i>
//               </button>
//               <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
//                 <li>
//                 <a class="dropdown-item text-dark" href="#">
//                   <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
//                 </a>
//               </li>
//               <li>
//                 <a class="dropdown-item text-dark" href="#">
//                   <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
//                 </a>
//               </li>
//              </ul>
//           </div>
          
//           <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
//             <a
//               href="#"
//               class="btn btn-warning me-2"
//               title="แก้ไข"
//             >
//               <i class="bi bi-pen-fill"></i>
//             </a>
//             <a
//               href="#"
//               class="btn btn-danger"
//               title="ลบ"
//             >
//               <i class="bi bi-trash-fill"></i>
//             </a>
//           </div>
//         </div>
//                   `;
//           },
//         },
//       ],
//       dom:
//         window.innerWidth <= 570
//           ? '<"top"lf>rt<"bottom"ip><"clear">'
//           : '<"top"lf>rt<"bottom"ip><"clear">',
//     });
//   }, []);

  const validateForm = () => {
    let errors = {};

    if (!input.username) {
      errors.username = "กรุณากรอกชื่อผู้ใช้";
    }
    if (!input.password) {
      errors.password = "กรุณากรอกรหัสผ่าน";
    } else {
      if (input.password.length < 8) {
        errors.password = "กรุณากรอกรหัสผ่าน 8 ตัวอักษรขึ้นไป";
      }
    }
    if (input.titleId === 0 || input.titleId === "") {
      errors.titleId = "กรุณาเลือกคำนำหน้า";
    }
    if (!input.firstname) {
      errors.firstname = "กรุณากรอกชื่อจริงของท่าน";
    }

    if (!input.lastname) {
      errors.lastname = "กรุณากรอกนามสกุลของท่าน";
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errorList = validateForm(input);
    setError(errorList);

    if (Object.keys(errorList).length === 0) {
      setIsSubmit(true);
      Swal.fire({
        title: "บันทึกข้อมูลสำเร็จ",
        icon: "success",
        draggable: true,
        buttonsStyling: "w-100",
      });
      //   ปิด modal เมื่อบันทึกข้อมูลสำเร็จ
      const currentModal = document.getElementById("addModal");
      const modalInstance = bootstrap.Modal.getInstance(currentModal);
      modalInstance.hide();
      handleClear();
    }
  };
  return (
    <div className="container py-4 min-vh-90 d-flex flex-column">
      {/* Breadcrumb */}
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
          <button
            type="button"
            className="power py-2"
            style={{ maxWidth: "200px" }}
            data-bs-toggle="modal"
            data-bs-target="#addModal"
          >
            <span>
              <i className="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">{addBtnName}</span>
          </button>
        </div>
        {/* ตารางข้อมูล */}
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
          id="addModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
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
                ></button>
              </div>
              <div class="modal-body">
                <div className="p-4">
                  <div className="row form-spacing g-3">
                    <div className="col-md-12 col-lg-6">
                      <label for="StartDate" className="form-label">
                        ชื่อผู้ใช้
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        name="username"
                        type="text"
                        className={`form-control ${
                          error.username ? "border border-danger" : ""
                        }`}
                        id="username"
                        placeholder="กรอกชื่อผู้ใช้"
                        value={input.username}
                        onChange={handleChangeInput}
                      />
                      {error.username ? (
                        <p className="text-danger">{error.username}</p>
                      ) : null}
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <div className="d-flex flex-column align-items-start border border-1 border-secondary rounded-3 p-3 mb-2 gap-1">
                        <label for="StartDate" class="form-label">
                          รหัสผ่าน
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="input-group">
                          <input
                            className={`form-control ${
                              error.password ? "border border-danger" : ""
                            }`}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={input.password}
                            onChange={handleChangeInput}
                          />

                          <button
                            type="button"
                            className="btn btn-outline-primary bg-light"
                            aria-label={
                              showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"
                            }
                            onClick={() => setShowPassword((s) => !s)}
                          >
                            {showPassword ? (
                              <i className="bi bi-eye-slash"></i>
                            ) : (
                              <i className="bi bi-eye"></i>
                            )}
                          </button>
                        </div>
                        {error.password ? (
                          <p className="text-danger">{error.password}</p>
                        ) : null}
                        <div class=" d-flex justify-content-between align-items-center w-100 mt-2">
                          <label className="mb-2">บังคับเปลี่ยนรหัส</label>
                          <div class="form-check form-switch form-switch-md ms-3">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="isActive-toggle"
                              name="mustchangepassword"
                              value={input.mustchangepassword}
                              onChange={handleChangeInput}
                            />
                          </div>
                        </div>
                        <div class=" d-flex justify-content-between align-items-center w-100">
                          <label className="mb-2">เปิดใช้งาน</label>
                          <div class="form-check form-switch form-switch-md ms-3">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="isActive-toggle"
                              name="isactive"
                              value={input.isactive}
                              onChange={handleChangeInput}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row form-spacing g-2">
                    <div className="col-lg-3">
                      <label for="StartDate" class="form-label">
                        คำนำหน้า
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="titleId"
                        id="titleId"
                        className={`form-select ${
                          error.titleId ? "border border-danger" : ""
                        }`}
                        onChange={handleChangeInput}
                        value={input.titleId}
                        dis
                      >
                        <option value={""}>เลือกคำนำหน้า</option>
                        <option value={1}>นาย</option>
                        <option value={2}>นางสาว</option>
                      </select>
                    </div>
                    {error.titleId ? (
                      <p className="text-danger">{error.titleId}</p>
                    ) : null}
                  </div>

                  <div className="row form-spacing g-2">
                    <div className="col-md-12 col-lg-6">
                      <label for="StartDate" className="form-label">
                        ชื่อจริง
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        name="firstname"
                        type="text"
                        className={`form-control ${
                          error.firstname ? "border border-danger" : ""
                        }`}
                        id="firstname"
                        placeholder="กรอกชื่อจริง"
                        value={input.firstname}
                        onChange={handleChangeInput}
                      />
                      {error.firstname ? (
                        <p className="text-danger">{error.firstname}</p>
                      ) : null}
                    </div>
                    <div className="col-md-12 col-lg-6">
                      <label for="StartDate" class="form-label">
                        นามสกุล
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        name="lastname"
                        type="text"
                        className={`form-control ${
                          error.lastname ? "border border-danger" : ""
                        }`}
                        id="lastname"
                        placeholder="กรอกนามสกุล"
                        value={input.lastname}
                        onChange={handleChangeInput}
                      />
                      {error.lastname ? (
                        <p className="text-danger">{error.lastname}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              <SubmitOrCancelButton
                handleCancel={handleClear}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
