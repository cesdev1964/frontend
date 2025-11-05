import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { Link } from "react-router-dom";
import { useEducation } from "../../hooks/educationStore";
import DataTableComponent from "../../components/DatatableComponent";
import handleDelete from "../../util/handleDelete";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "ระดับการศึกษา" },
  { index: 2, colName: "การจัดการ" },
];

export default function Educations({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลการศึกษา");
  const [editMode, setEditMode] = useState(false);
  const [getId, setGetId] = useState(null);
  const [input, setInput] = useState({
    educationname: "",
  });

  const {
    educationData,
    educationIsLoading,
    educationErrorMessage,
    educationById,
    getEducationData,
    getEducationById,
    createEducation,
    deleteEducation,
    updateEducation,
  } = useEducation();

  const fetchDataTable = useCallback(async () => {
    try {
      await getEducationData();
    } catch (error) {
      alert("ดึงข้อมูลไม่สำเร็จ :", error.message);
    }
  }, [getEducationData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    if (educationById) {
      setInput({
        educationname: educationById.educationName ?? "",
      });
    }
  }, [educationById]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const columnsData = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "ระดับการศึกษา",
      data: "educationName",
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
                <a class="dropdown-item text-dark"
                   data-action="edit"
                   data-id = "${row.educationId}"
                >
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark"
                   data-action="delete"
                   data-id = "${row.educationId}"
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
              data-id = "${row.educationId}"
            >
              <i class="bi bi-pen-fill"></i>
            </a>
            <a
              class="btn btn-danger"
              title="ลบ"
              data-action="delete"
              data-id = "${row.educationId}"
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
    { width: "70px", targets: 0, className: "text-center" },
    { width: "150px", targets: 1 },
    { width: "70px", targets: 2, className: "text-center" },
  ];

  const handleAction = (action, id) => {
    if (action === "edit") {
      handleEdit(id, "educationmodal");
    } else if (action === "delete") {
      // handleDelete(id);
      handleDelete(educationIsLoading,()=>deleteEducation(id),()=>h=getEducationData())
    }
  };

  const handleOpenModal = (modalId) => {
    setEditMode(false);
    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const validateForm = () => {
    let errors = {};
    const hasEnglish = /[A-Za-z]/;
    if (!input.educationname) {
      errors.educationname = "กรุณากรอกระดับการศึกษา";
    } else {
      if (hasEnglish.test(input.educationname)) {
        errors.educationname = "กรุณากรอกระดับการศึกษาเป็นภาษาไทย";
      }
    }
    return errors;
  };

  const handleEdit = async (Id, modalId) => {
    await getEducationById(Id);
    setGetId(Id);

    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      //เป็นการสร้างใหม่ ก่อนการเรียกใช้
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
      setEditMode(true);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqData = {
      educationName: input.educationname,
    };
    const errorList = validateForm(input) || [];
    setError(errorList);
    console.log("error list", error);
    if (Object.keys(errorList).length === 0) {
      const {educationErrorMessage,success}= editMode
        ? await updateEducation(reqData, getId)
        : await createEducation(reqData);
      if (success) {
        setIsSubmit(true);
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          draggable: true,
          buttonsStyling: "w-100",
        });
        const currentModal = document.getElementById("educationmodal");
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        modalInstance.hide();
        ClearInput();
        await getEducationData();
      } else {
        Swal.fire({
          title: "บันทึกข้อมูลไม่สำเร็จ",
          text: educationErrorMessage,
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
      educationname: "",
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
        <div className="add-btn">
          <a
            className="power py-2"
            style={{ maxWidth: "200px" }}
            onClick={() => handleOpenModal("educationmodal")}
          >
            <span>
              <i class="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">{addBtnName}</span>
          </a>
        </div>
        {/* table */}
        <DataTableComponent
          column={columnsData}
          data={educationData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
        />

        {/* modal */}
        <div
          className="modal fade"
          id="educationmodal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
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
                            <label  class="form-label">
                              ระดับการศึกษา
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="educationname"
                              type="text"
                              className={`form-control ${
                                error.titleNameTH ? "border border-danger" : ""
                              }`}
                              id="educationname"
                              placeholder="กรอกระดับการศึกษา"
                              value={input.educationname}
                              onChange={handleChangeInput}
                            />
                            {error.educationname ? (
                              <p className="text-danger">
                                {error.educationname}
                              </p>
                            ) : null}
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
