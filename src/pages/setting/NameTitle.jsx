// import "./styles.css";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
// import "../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import $ from "jquery";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
// dt(window, $);

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "รหัสตารางคำนำหน้า" },
  { index: 2, colName: "คำนำหน้าชื่อ" },
  { index: 3, colName: "คำนำหน้าชื่อ(ENG)" },
  { index: 4, colName: "การจัดการ" },
];
export const mockeTitletableData = [
  { TitleId: 1, TitleNameTH: "นาย", TitleNameEng: "MR." },
  { TitleId: 2, TitleNameTH: "นาง", TitleNameEng: "MRS." },
  { TitleId: 3, TitleNameTH: "นางสาว", TitleNameEng: "MS" },
];
export default function NameTitle({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [input, setInput] = useState({
    titleNameTH: "",
    titleNameEng: "",
  });

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    setData(mockeTitletableData);
  }, []);
  useEffect(() => {
    try {
      if (!data) {
        return;
      } else {
        GetDataTable();
      }
    } catch (error) {
      console.log("ไม่สามารถโหลดข้อมูลได้", error.message);
    }
  }, [data]);
  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const GetDataTable = () => {
    $(tableRef.current).DataTable({
      data: data,
      destroy: true,
      responsive: true,
      paging: true,
      searching: true,
      // scrollX: true,
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
        { width: "120px", targets: 1 },
        { width: "230px", targets: 2 },
        { width: "230px", targets: 3 },
        { width: "190px", targets: 4 },
      ],
      columns: [
        {
          data: null,
          render: function (data, type, row, meta) {
            return meta.row + 1;
          },
        },
        {
          title: "รหัสตารางคำนำหน้า",
          data: "TitleId",
          orderable: true,
        },
        {
          title: "คำนำหน้าชื่อ",
          data: "TitleNameTH",
          orderable: true,
        },

        {
          title: "คำนำหน้าชื่อ(ENG)",
          data: "TitleNameEng",
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
                <a class="dropdown-item text-dark" href="#">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" href="#">
                  <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              href="#"
              class="btn btn-warning me-2"
              title="แก้ไข"
            >
              <i class="bi bi-pen-fill"></i>
            </a>
            <a
              href="#"
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
      ],
      dom:
        window.innerWidth <= 570
          ? '<"top"lf>rt<"bottom"ip><"clear">'
          : '<"top"lf>rt<"bottom"ip><"clear">',
    });
  };

  const validateForm = () => {
    let errors = {};
    const hasEnglish = /[A-Za-z]/;
    const hasThai = /[ก-ฮ]/;
    if (!input.titleNameTH) {
      errors.titleNameTH = "กรุณากรอกคำนำหน้า";
    } else {
      if (hasEnglish.test(input.titleNameTH)) {
        errors.titleNameTH = "กรุณากรอกเป็นภาษาไทย";
      }
    }
    if (!input.titleNameEng) {
      errors.titleNameEng = "กรุณากรอกคำนำหน้า";
    } else {
      if (hasThai.test(input.titleNameEng)) {
        errors.titleNameEng = "กรุณากรอกเป็นภาษาอังกฤษ";
      }
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ตรวจสอบโดย sweetalert 2
    const errorList = validateForm(input) || [];
    setError(errorList);
    console.log("error list", error);
    //api post
    // setData(data.res)
    if (Object.keys(errorList).length === 0) {
      setIsSubmit(true);
      Swal.fire({
        title: "บันทึกข้อมูลสำเร็จ",
        icon: "success",
        draggable: true,
        buttonsStyling: "w-100",
      });
      //  const newData = GetDataTable();
      //  const table = $(tableRef.current).DataTable({});
      //  table.clear().destroy();
      //  table.row.add(newData);
      //  table.draw();
      const currentModal = document.getElementById("notModal");
      const modalInstance = bootstrap.Modal.getInstance(currentModal);
      modalInstance.hide();
      ClearInput();
    }
  };

  const finishSubmit = () => {
    console.log("submit data", input);
  };

    const ClearInput = () => {
    setInput({
      titleNameTH: "",
    titleNameEng: "",
    });
    setError({});
  };

  return (
    <div className="App">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/settings">ตั้งค่า</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            คำนำหน้า
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
            <span className="label">เพิ่มคำนำหน้าใหม่</span>
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
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-primary d-flex flex-column">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  <i className="bi bi-plus-circle fs-4 me-2"></i>
                  เพิ่มข้อมูลใหม่
                </h1>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
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
                            <label htmlFor="StartDate" class="form-label">
                              คำนำหน้า (ภาษาไทย)
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="titleNameTH"
                              type="text"
                              className={`form-control ${
                                error.titleNameTH ? "border border-danger" : ""
                              }`}
                              id="titleNameTH"
                              placeholder="กรอกคำนำหน้าเป็นภาษาไทย"
                              value={input.titleNameTH}
                              onChange={handleChangeInput}
                            />
                            {error.titleNameTH ? (
                              <p className="text-danger">{error.titleNameTH}</p>
                            ) : null}
                          </div>
                          <div className="col-md-12">
                            <label htmlFor="StartDate" class="form-label">
                              คำนำหน้า (ภาษาอังกฤษ)
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="titleNameEng"
                              type="text"
                              className={`form-control ${
                                error.titleNameEng ? "border border-danger" : ""
                              }`}
                              id="titleNameEng"
                              placeholder="กรอกคำนำหน้าเป็นภาษาอังกฤษ"
                              value={input.titleNameEng}
                              onChange={handleChangeInput}
                            />
                            {error.titleNameEng ? (
                              <p className="text-danger">
                                {error.titleNameEng}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      {/* ข้อมูลหน่วยงาน */}
                    </form>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center mb-4">
                <div className="d-flex gap-2 w-75">
                  <button
                    className="btn btn-outline-primary w-100"
                    data-bs-dismiss="modal"
                    onClick={ClearInput}
                  >
                    ยกเลิก
                  </button>
                  <button
                    className="btn btn-primary w-100"
                    onClick={handleSubmit}
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
