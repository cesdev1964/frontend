import React, { useRef ,useCallback} from "react";
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
import MainButton from "../../components/MainButton";
import { useJobCategory } from "../../hooks/jobCategoriesStore";
import DataTableComponent from "../../components/DatatableComponent";
import SessionExpiryModal from "../../components/modal/SessionExpiryModal";
import ModalComponent from "../../components/modal/ModalComponent";
import InputTextField from "../../components/inputTextField";
import { isActiveBadge } from "../../util/isActiveBadge";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "ประเภทงาน" },
  { index: 2, colName: "เปิดใช้งาน" },
  { index: 3, colName: "การจัดการ" },
];

export default function JobCategories({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [data, setData] = useState({});
  const [error, setError] = useState({});
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลประเภทงาน");
  const [editMode, setEditMode] = useState(false);
  const [getId, setGetId] = useState("");
  const [input, setInput] = useState({
    categoryname: "",
    isAction: false,
  });
  const operateModalId = "jobCategoryModal";

  const {
    jobCategoryData,
    jobCategoryIsLoading,
    jobCategoryById,
    getJobCategoryData,
    getJobCategoryById,
    createJobCategory,
    updateJobCategory,
  } = useJobCategory();

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
      handleEdit(id, operateModalId);
    }
  };

  const fetchDataTable = useCallback(async () => {
    try {
      await getJobCategoryData();
    } catch (error) {
      <SessionExpiryModal/>;
      return;
    }
  }, [getJobCategoryData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
      if (jobCategoryById) {
        setInput((prevData) => ({
          ...prevData,
          categoryname: jobCategoryById.name ?? "",
          isActive: jobCategoryById.isActive ?? false,
        }));
      }
    }, [jobCategoryById]);

  const columnDefs = [
    { width: "20%", targets: 0,className:"text-center" },
    { width: "40%", targets: 1 },
    { width: "20%", targets: 2 },
    { width: "20%", targets: 3 },

  ];
  const columns = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "ประเภทงาน",
      data: "name",
      orderable: true,
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
                <a class="dropdown-item text-dark" data-action="edit" data-id="${row.jobCategoryId}">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              data-id="${row.jobCategoryId}"
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

   const handleEdit = async (id, modalId) => {
    ClearInput();
    await getJobCategoryById(id);
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
    if (!input.categoryname) {
      errors.categoryname = "กรุณากรอกชื่อประเภทงาน";
    }
    return errors;
  };

  const handleSubmit = (e, modalId) => {
    e.preventDefault();

    const reqData = {
      jobCategoryName: input.categoryname,
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
            const { jobCategoryErrorMessage, success } = editMode
              ? await updateJobCategory(reqData, getId)
              : await createJobCategory(reqData);
            if (success) {
              swalWithBootstrapButtons.fire({
                title: "บึนทึกรายการสำเร็จ!",
                icon: "success",
              });

              const currentModal = document.getElementById(modalId);
              const modalInstance = bootstrap.Modal.getInstance(currentModal);
              modalInstance.hide();
              await getJobCategoryData();
              ClearInput();
            } else {
              Swal.fire({
                title: "บันทึกข้อมูลไม่สำเร็จ",
                text: jobCategoryErrorMessage,
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
      categoryname: "",
      isAction: false,
    });
    setError({});
  };

  return (
    <div className="container py-4 min-vh-90 d-flex flex-column">
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

        <MainButton
          btnName={addBtnName}
          icon={"bi bi-plus-circle"}
          onClick={() => handleOpenModal(operateModalId)}
        />

        <DataTableComponent
          column={columns}
          data={jobCategoryData}
          tableHead={tableHead}
          tableRef={tableRef}
          isLoading={jobCategoryIsLoading}
          columnDefs={columnDefs}
          onAction={handleAction}
        />

        {/* modal */}
        <ModalComponent
                  icon="bi bi-plus-circle"
                  modalId={operateModalId}
                  title={title}
                >
                  <div className="p-4">
                    <form>
                      <div className="row">
                        <div className="col-12 mb-3">
                          <InputTextField
                            onChange={handleChangeInput}
                            isRequire={true}
                            label="ประเภทงาน"
                            name="categoryname"
                            placeholder="กรอกชื่อประเภทงาน"
                            value={input.categoryname}
                            error={error.categoryname}
                          />
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
                    </form>
                  </div>
                  <SubmitOrCancelButton
                    handleSubmit={(e) => handleSubmit(e, operateModalId)}
                    handleCancel={() => handleCancel(operateModalId)}
                  />
                </ModalComponent>
      </div>
    </div>
  );
}
