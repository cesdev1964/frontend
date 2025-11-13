import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { Link,NavLink,useNavigate } from "react-router-dom";
import MainButton from "../../components/MainButton";
import { useDeduction } from "../../hooks/deductionTypeStore";
import DataTableComponent from "../../components/DatatableComponent";
import { handleCancel } from "../../util/handleCloseModal";
import { useAnnounments } from "../../hooks/announcementsStore";
import { shortDateFormate } from "../../util/inputFormat";
import { isAnnouncementStatusBadge } from "../../util/isActiveBadge";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "หัวข้อข่าว" },
  { index: 2, colName: "สถานะข่าว" },
  { index: 3, colName: "วันที่ลงข่าว" },
  { index: 4, colName: "จำนวนไฟล์แนป" },
  { index: 5, colName: "การจัดการ" },
];

export default function AnnouncementSetting({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState(title);
  const [getId, setGetId] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const {
    getAnnounmentData,
    announmentData,
    announmentIsLoading,
  } = useAnnounments();
  const {
    deductionById,
    getDeductionData,
    getDeductionById,
    createDeduction,
    updateDeduction,
  } = useDeduction();
 
  const navigate = useNavigate(); 

  const fetchDataTable = useCallback(async () => {
    try {
      await getAnnounmentData();
    } catch (error) {
      return;
    }
  }, [getAnnounmentData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  const [input, setInput] = useState({
    deductiontypename: "",
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

  useEffect(() => {
    if (deductionById) {
      setInput({
        deductiontypename: deductionById.deductionTypeName,
        isactive: deductionById.isActive,
      });
    }
  }, [deductionById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const columnDefs = [
    { width: "70px", targets: 0, className: "text-center" },
    { width: "200px", targets: 1 },
    { width: "70px", targets: 2, className: "text-center" },
    { width: "70px", targets: 3, className: "text-center" },
    { width: "50px", targets: 4 },
    { width: "100px", targets: 5, className: "text-center" },
  ];

  const columns = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "หัวข้อข่าว",
      data: "title",
      orderable: true,
    },
    {
      title: "สถานะข่าว",
      data: "status",
      orderable: true,
      render: function (data, type, row) {
        return isAnnouncementStatusBadge(row.status);
      },
    },
    {
      title: "วันที่ลงข่าว",
      data: "publishedAt",
      orderable: true,
      render: function (data, type, row) {
        return shortDateFormate(row.publishedAt);
      },
    },
    {
      title: "จำนวนไฟล์แนป",
      data: "attachmentCount",
      orderable: true,
       render: function (data, type, row) {
        return `<span class="badge text-dark p-2 px-2 fs-6">
                      <i class="bi bi-paperclip me-1"></i>${row.attachmentCount}
                </span>`;
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
                 <a class="dropdown-item text-dark" data-action="preview" data-id="${row.publicAnnouncementId}">
                   <i class="bi bi-eye me-2"></i> ดูตัวอย่างหน้าข่าวสาร
                 </a>
               </li>
                 <li>
                 <a class="dropdown-item text-dark" data-action="edit" data-id="${row.publicAnnouncementId}">
                   <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                 </a>
               </li>
              </ul>
           </div>
           
           <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
          <button
              class="btn btn-info me-2 btn-edit"
              title="ดูตัวอย่างหน้าข่าวสาร"
              data-id="${row.publicAnnouncementId}"
              data-action="preview"
            >
              <i class="bi bi-eye"></i>
            </button>
            <button
              class="btn btn-warning"
              title="แก้ไข"
              data-id="${row.publicAnnouncementId}"
              data-action="edit"
            >
              <i class="bi bi-pen-fill"></i>
            </button>
           </div>
         </div>
        `;
      },
    },
  ];

  

  const handleAction = (action, id) => {
    if (action === "edit") {
       navigate(`/settings/announcement/form/${id}`);
    }
    if (action === "preview") {
      navigate(`/settings/announcement/preview/${id}`);
    }
  };

  const handleEdit = async (Id) => {
    ClearInput();
    await getDeductionById(Id);
    setGetId(Id);

    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      //เป็นการสร้างใหม่ ก่อนการเรียกใช้
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
      setEditMode(true);
    }
  };

  const validateForm = () => {
    let errors = {};
    if (!input.deductiontypename) {
      errors.deductiontypename = "กรุณากรอกชื่อประเภทการหักเงิน";
    }
    return errors;
  };

  const handleSubmit = async (e, modalId) => {
    e.preventDefault();

    const reqData = {
      deductionTypeName: input.deductiontypename,
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
            const { success, deductionErrorMessage } = editMode
              ? await updateDeduction(reqData, getId)
              : await createDeduction(reqData);
            if (success) {
              swalWithBootstrapButtons.fire({
                title: "บึนทึกรายการสำเร็จ!",
                icon: "success",
              });

              const currentModal = document.getElementById(modalId);
              const modalInstance = bootstrap.Modal.getInstance(currentModal);
              modalInstance.hide();
              await getDeductionData();
              ClearInput();
            } else {
              Swal.fire({
                title: "บันทึกข้อมูลไม่สำเร็จ",
                text: deductionErrorMessage,
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
      deductiontypename: "",
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

        <NavLink
          to="/settings/announcement/form"
          style={{ textDecoration: "none" }}
        >
          <MainButton btnName={title} icon={"bi bi-plus-circle"} />
        </NavLink>

        <DataTableComponent
          column={columns}
          data={announmentData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
          isLoading={announmentIsLoading}
        />

        
      </div>
    </div>
  );
}
