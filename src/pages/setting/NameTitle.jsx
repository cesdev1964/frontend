import React, {useRef } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { useTitltName } from "../../hooks/titleNameStore";
import { NameTitleModal } from "../../components/modal/setting/nameTitleModal";
import DataTableComponent from "../../components/DatatableComponent";
import * as bootstrap from 'bootstrap';  
import { Link } from "react-router-dom";
import handleDelete from "../../util/handleDelete";
window.bootstrap = bootstrap;   

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "คำนำหน้าชื่อ" },
  { index: 2, colName: "คำนำหน้าชื่อ(ENG)" },
  { index: 3, colName: "การจัดการ" },
];

export default function NameTitle({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มคำนำหน้าใหม่");
  const {
    getTitleNameData,
    titleData,
    titleIsLoading,
    getNameTitleById,
    titleById,
    createTitle,
    deleteTitle,
    updateTitle,
  } = useTitltName();
  const [editMode, setEditMode] = useState(false);
  const [editTitleId, setEditTitleId] = useState(null);
  
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
    const fetchDataTable = async () => {
      try {
        await getTitleNameData();
      } catch (error) {
        alert("ดึงข้อมูลไม่สำเร็จ", error);
      }
    };
    fetchDataTable();
    setEditMode(false)
  }, [getTitleNameData]);

  useEffect(() => {
    if (titleById) {
      setInput((prevData) => ({
        ...prevData,
        titleNameTH: titleById.titleNameTH ?? "",
        titleNameEng: titleById.titleNameEng ?? "",
      }));
    }
  }, [titleById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
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
      title: "คำนำหน้าชื่อ",
      data: "titleNameTH",
      orderable: true,
    },

    {
      title: "คำนำหน้าชื่อ(ENG)",
      data: "titleNameEng",
      orderable: true,
    },
    {
      data: null,
      title: "การจัดการ",
      render: function (data, type, row) {
        return `      
         <div class="d-flex align-items-center justify-content-center">
            <div class="dropdown d-lg-none">
              <button class="btn btn-outline-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                 <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                <a class="dropdown-item text-dark btn-edit" 
                   data-id="${row.titleId}" 
                   data-action="edit">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark btn-delete"  
                   data-id="${row.titleId}" 
                   data-action="delete">
                  <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <button
              class="btn btn-warning me-2 btn-edit"
              title="แก้ไข"
              data-id="${row.titleId}"
              data-action="edit"
            >
              <i class="bi bi-pen-fill"></i>
            </button>
            <button
              class="btn btn-danger btn-delete"
              title="ลบ"
              data-id="${row.titleId}"
              data-action="delete"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>
       `;
      },
    },
  ];

  const columnDefs = [
    { width: "70px", targets: 0, className: "text-center" },
    { width: "150px", targets: 1 },
    { width: "150px", targets: 2},
     { width: "100px", targets: 3, className: "text-center" },
  ];

  const handleAction = (action, id) => {
    if (action === "edit") {
      console.log("Edit:", id);
      handleEdit(id);
    } else if (action === "delete") {
      console.log("Delete:", id);
      handleDelete(titleIsLoading,()=>deleteTitle(id),()=>getTitleNameData())
    }
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
 
   const handleOpenModal = ()=>{
    setEditMode(false);
    const currentModal = document.getElementById("notModal");
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqData = {
      titleNameTH: input.titleNameTH,
      titleNameEng: input.titleNameEng,
    };

    const errorList = validateForm(input) || [];
    setError(errorList);

    //api post
    if (Object.keys(errorList).length === 0) {
      const response = editMode
        ? await updateTitle(reqData, editTitleId)
        : await createTitle(reqData);
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

        document.body.focus();
        await getTitleNameData();
        ClearInput();
      } else {
        Swal.fire({
          title: "บันทึกข้อมูลไม่สำเร็จ",
          icon: "error",
        });
      }
    }
  };

  const finishSubmit = () => {
    console.log("submit data", input);
  };

  const handleEdit = async (id) => {
    await getNameTitleById(id);
    setEditTitleId(id);
    setEditMode(true);

    const currentModal = document.getElementById("notModal");
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const ClearInput = () => {
    setInput({
      titleNameTH: "",
      titleNameEng: "",
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
        <div className="add-btn">
          <button
            className="power py-2"
            style={{ maxWidth: "200px" }}
            onClick={handleOpenModal}
          >
            <span>
              <i className="bi bi-plus-circle fs-4"></i>
            </span>{" "}
            <span className="label">{addBtnName}</span>
          </button>
        </div>
        {/* ตารางข้อมูล */}
          <DataTableComponent
            column={columnData}
            data={titleData}
            onAction={handleAction}
            tableHead={tableHead}
            tableRef={tableRef}
            columnDefs={columnDefs}
          />

        {/* modal */}
           <NameTitleModal
             ClearInput={ClearInput}
             IsLoading={titleIsLoading}
             error={error}
             handleChangeInput={handleChangeInput}
             handleSubmit={handleSubmit}
             input={input}
             title={title}
           />
      </div>
    </div>
  );
}
