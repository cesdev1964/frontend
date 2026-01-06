import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { Link } from "react-router-dom";
import DataTableComponent from "../../components/DatatableComponent";
import { isActiveBadge } from "../../util/isActiveBadge";
import MainButton from "../../components/MainButton";
import ModalComponent from "../../components/modal/ModalComponent";
import { useHoliday } from "../../hooks/้holidayStore";
import LoadingSpin from "../../components/loadingSpin";
import { handleCancel } from "../../util/handleCloseModal";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "วันที่" },
  { index: 2, colName: "ชื่อวันหยุด" },
  { index: 3, colName: "กำหนดครึ่งวัน" },
  { index: 4, colName: "การจัดการ" },
];

export default function Holidays({ title }) {
  useTitle(title);

  const tableRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลวันหยุด");
  const [editmode, setEditMode] = useState(false);
  const [getId, setGetId] = useState(null);
  const modalName = useState("holidayModal");
  const [input, setInput] = useState({
    holidayDate: "",
    holidayName: "",
    isHalfDay: false,
  });
  const maxInputHolidayName = 100;
  const thisYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(Number(thisYear) ?? 0);

  const {
    holidayData,
    getHolidayData,
    createHoliday,
    getHolidayDataByYear,
    getHolidayById,
    updateHoliday,
    holidayById,
  } = useHoliday();

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
      isHalfDay: e.target.checked ? true : false,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!selectedYear) {
          setIsLoading(false);
          return;
        }
        await getHolidayDataByYear(selectedYear);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        return;
      }
    };
    fetchData();
  }, [getHolidayDataByYear, selectedYear]);

  useEffect(() => {
    if (holidayById) {
      setInput({
        holidayDate: holidayById.date,
        holidayName: holidayById.description,
        isHalfDay: holidayById.isHalfDay,
      });
    }
  }, [holidayById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);
  // console.log("select year to query datatable",selectedYear);

  const columnDefs = [
    { width: "70px", targets: 0, className: "text-center mobile-hide-column" },
    { width: "100px", targets: 1 },
    { width: "200px", targets: 2 },
    { width: "80px", targets: 3, className: "text-center mobile-hide-column" },
    { width: "80px", targets: 4 },
  ];

  const columns = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },

    {
      title: "วันที่",
      data: "thaiShortDate",
      orderable: true,
    },
    {
      title: "ชื่อวันหยุด",
      data: "description",
      orderable: true,
      render: function (title) {
        return `<span class="d-inline-block text-truncate" style="max-width: 200px;">
       ${title}</span>`;
      },
    },
    {
      data: "isHalfDay",
      orderable: true,
      render: function (isHalfDay) {
        return `<span class="d-inline-block" style="max-width: 200px; font-size: 0.85rem;" >
                <i class="bi bi-circle-fill me-2 text-${
                  isHalfDay ? "primary" : "success"
                }" style="font-size: 0.5rem;"></i>
                 ${isHalfDay ? "หยุดครึ่งวัน" : "หยุดเต็มวัน"}</span>`;
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
                <a class="dropdown-item text-dark" data-action="edit" data-id="${row.holidayId}">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              data-id="${row.holidayId}"
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
      handleEdit(id, modalName);
    }
  };

  const handleEdit = async (id, modalId) => {
    ClearInput();
    await getHolidayById(id);
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
    if (!input.holidayName) {
      errors.holidayName = "กรุณากรอกชื่อวันหยุด";
    }
    if (!input.holidayDate) {
      errors.holidayDate = "กรุณาใส่วันที่";
    }
    return errors;
  };

  const handleSubmit = async (e, modalName) => {
    e.preventDefault();

    const reqData = {
      holidayDate: input.holidayDate,
      description: input.holidayName,
      isHalfDay: input.isHalfDay,
    };
    const errorList = validateForm(input) || [];
    setError(errorList);

    // console.log("req data", reqData);

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
            const { holidayErrorMessage, success } = editmode
              ? await updateHoliday(reqData, getId)
              : await createHoliday(reqData);

            if (success) {
              swalWithBootstrapButtons.fire({
                title: "บึนทึกรายการสำเร็จ!",
                icon: "success",
              });
              const currentModal = document.getElementById(modalName);
              const modalInstance = bootstrap.Modal.getInstance(currentModal);
              modalInstance.hide();
              ClearInput();
              await getHolidayDataByYear(selectedYear);
            } else {
              Swal.fire({
                title: "บันทึกข้อมูลไม่สำเร็จ",
                text: holidayErrorMessage,
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
      holidayDate: "",
      holidayName: "",
      isHalfDay: false,
    });
    setError({});
    setEditMode(false);
  };

  const getYearList = (thisYear) => {
    const yList = [];

    for (let i = thisYear - 3; i <= thisYear + 3; i++) {
      yList.push(i);
    }

    return yList;
  };

  const yearList = getYearList(thisYear);

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
          icon="bi bi-plus-circle"
          onClick={() => handleOpenModal(modalName)}
        />
        <div className="mt-3" style={{ maxWidth: "350px" }}>
          <div className="w-100">
            <label class="form-label">เลือกปี</label>
            <select
              className={`form-select ${
                error.statusId ? "border border-danger" : ""
              }`}
              onChange={(e) => setSelectedYear(e.target.value)}
              value={selectedYear}
            >
              <option value={""}>เลือกปี</option>
              {yearList &&
                yearList.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {isLoading ? (
          <LoadingSpin />
        ) : (
          <DataTableComponent
            column={columns}
            data={holidayData}
            onAction={handleAction}
            tableHead={tableHead}
            tableRef={tableRef}
            columnDefs={columnDefs}
          />
        )}

        {/* modal */}

        <ModalComponent
          icon="bi bi-plus-circle"
          modalId={modalName}
          title={title}
        >
          <div className="employee-content p-4">
            <div className="col-lg-3 "></div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <form>
                <div>
                  <div className="row form-spacing g-3">
                    <div className="col-12">
                      <label className="form-label">
                        วันที่
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control ${
                          error.holidayDate ? "border border-danger" : ""
                        }`}
                        name="holidayDate"
                        placeholder="ลงวันที่"
                        value={input.holidayDate}
                        onChange={handleChangeInput}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                    </div>
                    <div className="col-md-12">
                      <label className="form-label">
                        ชื่อวันหยุด
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <textarea
                        style={{ resize: "none" }}
                        maxLength={maxInputHolidayName}
                        type="text"
                        rows="3"
                        cols="30"
                        name="holidayName"
                        className={`form-control ${
                          error.holidayName ? "border border-danger" : ""
                        }`}
                        placeholder="กรอกชื่อวันหยุด"
                        value={input.holidayName}
                        onChange={handleChangeInput}
                      ></textarea>
                      <p
                        className={`text ${
                          (input.holidayName?.length < maxInputHolidayName || input?.holidayName === undefined )
                            ? "muted"
                            : "text-danger"
                        } text-end`}
                        style={{ fontSize: "0.7rem" }}
                      >
                        [{input.holidayName?.length}/{maxInputHolidayName}]
                      </p>
                      {/* {error.holidayName ? (
                        <p className="text-danger">{error.holidayName}</p>
                      ) : null} */}
                    </div>
                    <div className=" d-flex justify-content-between align-items-center w-100 mt-2">
                      <label className="mb-2">กำหนดให้เป็นวันลาครึ่งวัน</label>
                      <div className="form-check form-switch form-switch-md ms-3">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="isActive-toggle"
                          name="isHalfDay"
                          value={input.isHalfDay}
                          onChange={handleChangeCheckbox}
                          checked={input.isHalfDay === true}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <SubmitOrCancelButton
            handleSubmit={(e) => handleSubmit(e, modalName)}
            handleCancel={() => handleCancel(modalName)}
          />
        </ModalComponent>
      </div>
    </div>
  );
}
