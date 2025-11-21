import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { Link } from "react-router-dom";
import { useLevel } from "../../hooks/levelStore";
import DataTableComponent from "../../components/DatatableComponent";
import handleDelete from "../../util/handleDelete";
import MainButton from "../../components/MainButton";
import ModalComponent from "../../components/modal/ModalComponent";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "ระดับ" },
  { index: 2, colName: "การจัดการ" },
];

export default function Levels({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลระดับ");
  const [editmode, setEditMode] = useState(false);
  const [getId, setGetId] = useState(null);
  const [input, setInput] = useState({
    levelname: "",
  });
  const {
    levelData,
    levelIsLoading,
    levelErrorMessage,
    success,
    levelById,
    getLevelData,
    getLevelById,
    createLevel,
    deleteLevel,
    updateLevel,
  } = useLevel();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchDataTable = useCallback(async () => {
    try {
      await getLevelData();
    } catch (error) {
      return;
    }
  }, [getLevelData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    if (levelById) {
      setInput({
        levelname: levelById.levelName ?? "",
      });
    }
  }, [levelById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const columnDefs = [
    { width: "70px", targets: 0, className: "text-center" },
    { width: "230px", targets: 1 },
    { width: "100px", targets: 2, className: "text-center" },
  ];

  const columns = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "ระดับ",
      data: "levelName",
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
                <a class="dropdown-item text-dark" data-action="edit" data-id="${row.levelId}">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark" data-action="delete" data-id="${row.levelId}">
                  <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              data-id="${row.levelId}"
              data-action="edit"
              class="btn btn-warning me-2"
              title="แก้ไข"
            >
              <i class="bi bi-pen-fill"></i>
            </a>
            <a
              data-action="delete"
              data-id="${row.levelId}"
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
      handleEdit(id, "levelModal");
    } else if (action === "delete") {
      handleDelete(
        levelIsLoading,
        () => deleteLevel(id),
        () => getLevelData()
      );
    }
  };

  const handleEdit = async (id, modalId) => {
    ClearInput();
    await getLevelById(id);
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
    if (!input.levelname) {
      errors.levelname = "กรุณากรอกระดับในองค์กร";
    } else if (!editmode) {
      if (input.levelname <= 0) {
        errors.levelname = "กรุณากรอกระดับให้มากกว่า 0";
      }
    }
    return errors;
  };

  const handleSubmit = async (e, modalId) => {
    e.preventDefault();
    const reqData = {
      levelName: editmode ? input.levelname : `PC-${input.levelname}`,
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
            const { levelErrorMessage, success } = editmode
              ? await updateLevel(reqData, getId)
              : await createLevel(reqData);
            if (success) {
              swalWithBootstrapButtons.fire({
                title: "บึนทึกรายการสำเร็จ!",
                icon: "success",
              });

              const currentModal = document.getElementById(modalId);
              const modalInstance = bootstrap.Modal.getInstance(currentModal);
              modalInstance.hide();
              ClearInput();
              await getLevelData();
            } else {
              Swal.fire({
                title: "บันทึกข้อมูลไม่สำเร็จ",
                text: levelErrorMessage,
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
      levelname: "",
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

        <MainButton
          btnName={addBtnName}
          icon={"bi bi-plus-circle"}
          onClick={() => handleOpenModal("levelModal")}
        />
        {/* </div> */}

        <DataTableComponent
          column={columns}
          data={levelData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
          isLoading={levelIsLoading}
        />

        {/* modal */}
       
        <ModalComponent
          icon="bi bi-plus-circle"
          modalId="levelModal"
          title={title}
        >
          <div className="employee-content p-4">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "250px",
              }}
            >
              <form>
                <div>
                  <label class="form-label">
                    ระดับในองค์กร
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="input-group">
                    {!editmode && (
                      <span className="input-group-text">PC -</span>
                    )}
                    <input
                      name="levelname"
                      type={editmode ? "text" : "number"}
                      className={`form-control ${
                        error.levelname ? "border border-danger" : ""
                      }`}
                      id="educationname"
                      placeholder="กรอกระดับ"
                      value={input.levelname}
                      onChange={handleChangeInput}
                    />
                  </div>
                  {error.levelname ? (
                    <p className="text-danger">{error.levelname}</p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
          <SubmitOrCancelButton
            handleSubmit={(e) => handleSubmit(e, "levelModal")}
            handleCancel={ClearInput}
            isLoading={levelIsLoading}
          />
        </ModalComponent>
      </div>
    </div>
  );
}
