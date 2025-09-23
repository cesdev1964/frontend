import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import "../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import $ from "jquery";
import HeaderPage from "../../components/HeaderPage";
import { mockemployeetableData } from "../../MockData";

const Employee = ({ title }) => {
  useTitle(title);
  const [input, setInput] = useState({
    titleId: 0,
    firstname: "",
    lastname: "",
    telephoneNo: "",
    cardId: "",
    birthday: null,
    educationId: 0,
    jobId: 0,
    levelId: 0,
    startDate: null,
    endDate: null,
    positionId: 0,
    contractorId: 0,
    rate: 0.0,
    typeId: 0,
    statusId: 0,
  });

  const tableHead = [
    { index: 1, colName: "รหัสพนักงาน" },
    { index: 2, colName: "ชื่อพนักงาน" },
    { index: 3, colName: "ระดับ" },
    { index: 4, colName: "ตำแหน่ง" },
    { index: 5, colName: "สถานะ" },
    { index: 6, colName: "การจัดการ" },
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
  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      responsive: true,
      paging: true,
      searching: true,
      scrollX: true,
      autoWidth: false,
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
      data: mockemployeetableData,
      columnDefs: [
        { width: "70px", targets: 0 },
        { width: "160px", targets: 1 },
        { width: "100px", targets: 2 },
        { width: "100px", targets: 4 },
        { width: "120px", targets: 5 },
      ],
      columns: [
        {
          title: "รหัสพนักงาน",
          data: "empId",
          orderable: true,
        },
        {
          title: "ชื่อพนักงาน",
          data: "empName",
          orderable: true,
        },

        {
          title: "ระดับ",
          data: "level",
          orderable: true,

          render: function (data, type, row) {
            return levelBadge(row.level);
          },
        },
        {
          title: "ตำแหน่ง",
          data: "position",
        },
        {
          title: "สถานะ",
          data: "status",
          render: function (data, type, row) {
            console.log("statusNumber:", row.status);
            return statusBadge(row.status);
          },
        },
        {
          data: null,
          title: "การจัดการ",
          render: function (data, type, row) {
            return `
                    <div class="btn-group btn-group-sm " role="group">
                      <a
                        href="#"
                        class="btn btn-warning actionBtn"
                        title="ดูรายละเอียด"
                        data-toggle="tooltip"
                      >
                        <i class="bi bi-pen-fill"></i>
                      </a>
                      <a
                        href="#"
                        class="btn btn-danger actionBtn"
                        title="Export Excel"
                        data-toggle="tooltip"
                      >
                        <i class="bi bi-trash-fill"></i>
                      </a>
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

    return () => {
      table.destroy();
    };
  }, []);

  const avatarUrl = `data:image/jpeg;base64,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`;

  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/settings">ตั้งค่า</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            พนักงาน
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
            data-bs-target="#notModal"
          >
            <span>
              <i className="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">เพิ่มพนักงานใหม่</span>
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
          id="notModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-danger d-flex flex-column">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  <i className="bi bi-plus-circle fs-4 me-2"></i>
                  เพิ่มข้อมูลพนักงานใหม่
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
                  <div className="row">
                    <div className="col-lg-3 ">
                      <div className="employee-image ">
                        <img src={avatarUrl} alt="profile-image" />
                        <button
                          className="btn btn-primary btn-sm my-4"
                          data-bs-dismiss="modal"
                        >
                          อัปโหลดรูปภาพ
                        </button>
                      </div>
                    </div>
                    <div
                      className="my-3 col-lg-9 "
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      {/* firstname: "",
    lastname: "",
    telephoneNo: "",
    cardId: "",
    birthday: null,
    educationId: 0,
    jobId: 0,
    levelId: 0,
    startDate: null,
    endDate: null,
    positionId: 0,
    contractorId: 0,
    rate: 0.0,
    typeId: 0,
    statusId: 0, */}

                      <form>
                        {/* ข้อมูลทั่วไป */}
                        <div className="mb-3">
                          <h5 className="group-label"># ข้อมูลทั่วไป</h5>
                          <div className="border-top border-danger my-3"></div>
                          <div className="row form-spacing g-2">
                            <div className="col-md-4 col-lg-3">
                              <label for="StartDate" class="form-label">
                                คำนำหน้า
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="titleId"
                                id="titleId"
                                className="form-select"
                              >
                                <option value={""}>เลือกคำนำหน้า</option>
                                <option value={1}>นาย</option>
                                <option value={2}>นางสาว</option>
                              </select>
                            </div>
                          </div>
                          <div className="row form-spacing g-2">
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" className="form-label">
                                ชื่อจริง
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="firstname"
                                type="text"
                                className="form-control"
                                id="firstname"
                                value=""
                                placeholder="กรอกชื่อจริง"
                              />
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" class="form-label">
                                นามสกุล
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="lastname"
                                type="text"
                                className="form-control"
                                id="lastname"
                                value=""
                                placeholder="กรอกนามสกุล"
                              />
                            </div>
                            <div className="col-md-8 col-lg-4">
                              <label for="StartDate" class="form-label">
                                วันเดือนปีเกิด
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="StartDate"
                                value=""
                                placeholder="เลือกวันที่"
                              />
                            </div>
                          </div>
                          <div className="row form-spacing g-2">
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" className="form-label">
                                ระดับการศึกษา
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="educationId"
                                id="educationId"
                                className="form-select"
                              >
                                <option value={""}>เลือกระดับการศึกษา</option>
                                <option value={1}>ประถมศึกษาตอนต้น</option>
                                <option value={2}>ประถมศึกษาตอนปลาย</option>
                              </select>
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" class="form-label">
                                เบอร์โทรศัพท์
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                name="telephoneNo"
                                type="tel"
                                className="form-control"
                                id="StartDate"
                                value=""
                                placeholder="000-000-0000"
                              />
                            </div>
                          </div>
                          <div className="row form-spacing g-2">
                            <div className="col-lg-6">
                              <label for="StartDate" class="form-label">
                                เลขบัตรประชาชน
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                className="form-control"
                                id="cardId"
                                type="tel"
                                name="cardId"
                                placeholder="X-XXXX-XXXXX-XX-X"
                                autocomplete="off"
                                autofocus
                                title="National ID Input"
                                aria-labelledby="InputLabel"
                                aria-invalid
                                aria-required="true"
                                required
                                tabindex="1"
                              />
                            </div>
                          </div>
                        </div>
                        {/* ข้อมูลหน่วยงาน */}
                        <div>
                          <h5 className="group-label"># ข้อมูลหน่วยงาน</h5>
                          <div className="border-top border-danger my-3"></div>
                          <div className="row form-spacing g-2">
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" className="form-label">
                                ระดับ
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="levelId"
                                id="levelId"
                                className="form-select"
                              >
                                <option value={""}>เลือกระดับ</option>
                                <option value={1}>PC 1</option>
                                <option value={2}>PC 2</option>
                                <option value={3}>PC 3</option>
                                <option value={4}>PC 4</option>
                              </select>
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" class="form-label">
                                หน่วยงาน
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="jobId"
                                id="jobId"
                                className="form-select"
                              >
                                <option value={""}>เลือกหน่วยงาน</option>
                              </select>
                            </div>
                            <div className="col-md-8 col-lg-4">
                              <label for="StartDate" class="form-label">
                                ตำแหน่ง
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="positionId"
                                id="positionId"
                                className="form-select"
                              >
                                <option value={""}>เลือกตำแหน่ง</option>
                              </select>
                            </div>
                          </div>
                          <div className="row form-spacing g-2">
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" className="form-label">
                                ผู้รับเหมา
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select
                                name="contractorId"
                                id="contractorId"
                                className="form-select"
                              >
                                <option value={""}>เลือกผู้รับเหมา</option>
                              </select>
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" class="form-label">
                                ประเภท
                                <span style={{ color: "red" }}>*</span>
                              </label>
                             <select
                                name="typeId"
                                id="typeId"
                                className="form-select"
                              >
                                <option value={""}>เลือกประเภท</option>
                              </select>
                            </div>
                            <div className="col-md-5 col-lg-4">
                              <label for="StartDate" class="form-label">
                                อัตราค่าจ้าง
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="rate"
                                value=""
                                placeholder="0.00"
                                step="0.01" min="0"
                              />
                            </div>
                          </div>
                          <div className="row form-spacing g-2">
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" className="form-label">
                                วันที่เริ่มงาน
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="StartDate"
                                value=""
                                placeholder="เลือกวันที่"
                              />
                            </div>
                            <div className="col-md-6 col-lg-4">
                              <label for="StartDate" class="form-label">
                                วันที่ลาออก
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="StartDate"
                                value=""
                                placeholder="เลือกวันที่"
                              />
                            </div>
                            <div className="col-md-5 col-lg-4">
                              <label for="StartDate" class="form-label">
                                สถานะ
                                <span style={{ color: "red" }}>*</span>
                              </label>
                              <select name="statusId" id="statusId" className="form-select">
                                <option value={""}>เลือกสถานะ</option>
                                <option value={1}>ประจำการ</option>
                                <option value={0}>ลาออก</option>
                                <option value={2}>ไม่ระบุ</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center mb-4">
                <div className="d-flex gap-2 w-50">
                  <button
                    className="btn btn-outline-primary w-100"
                    data-bs-dismiss="modal"
                  >
                    ยกเลิก
                  </button>
                  <button
                    className="btn btn-primary w-100"
                    data-bs-dismiss="modal"
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        ;
      </div>
    </>
  );
};

export default Employee;
