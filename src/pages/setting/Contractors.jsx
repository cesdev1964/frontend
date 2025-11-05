import React, { useRef, useCallback } from "react";
import { useEffect } from "react";
import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { useState } from "react";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { Link } from "react-router-dom";
import { useContrator } from "../../hooks/contratorStore";
import DataTableComponent from "../../components/DatatableComponent";
import { isActiveBadge } from "../../util/isActiveBadge";
import handleDelete from "../../util/handleDelete";
import MainButton from "../../components/MainButton";

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "ชื่อผู้รับเหมา" },
  { index: 2, colName: "เปิดใช้งาน" },
  { index: 3, colName: "การจัดการ" },
];

export default function Contrators({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลผู้รับเหมา");
  const [editmode, setEditMode] = useState(false);
  const [getId, setGetId] = useState(null);
  const [input, setInput] = useState({
    contractorname: "",
    isactive: false,
  });
  const {
    contratorData,
    contratorIsLoading,
    contratorErrorMessage,
    contratorById,
    getContratorData,
    getContratorById,
    createContrator,
    deleteContrator,
    updateContrator,
  } = useContrator();

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

  const fetchDataTable = useCallback(async () => {
    try {
      await getContratorData();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getContratorData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    if (contratorById) {
      setInput({
        contractorname: contratorById.contractorName ?? "",
        isactive: contratorById.isActive ?? false,
      });
    }
  }, [contratorById]);

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      finishSubmit();
    }
  }, [error, isSubmit]);

  const columnDefs = [
    { width: "70px", targets: 0, className: "text-center" },
    { width: "230px", targets: 1 },
    { width: "100px", targets: 2 },
    { width: "100px", targets: 3, className: "text-center" },
  ];

  const columns = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "ชื่อผู้รับเหมา",
      data: "contractorName",
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
                <a class="dropdown-item text-dark" data-action="edit" data-id="${row.contractorId}">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              data-id="${row.contractorId}"
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
      handleEdit(id, "notModal");
    } else if (action === "delete") {
      handleDelete(
        contratorIsLoading,
        () => deleteContrator(id),
        () => getContratorData()
      );
    }
  };

  const handleEdit = async (id, modalId) => {
    ClearInput();
    await getContratorById(id);
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
    if (!input.contractorname) {
      errors.contractorname = "กรุณากรอกชื่อผู้รับเหมา";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqData = {
      contractorName: input.contractorname,
      isActive: input.isactive,
    };
    const errorList = validateForm(input) || [];
    setError(errorList);

    if (Object.keys(errorList).length === 0) {
      const {contratorErrorMessage,success} = editmode
        ? await updateContrator(reqData, getId)
        : await createContrator(reqData);
      if (success) {
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
        await getContratorData();
      } else {
        Swal.fire({
          title: "บันทึกข้อมูลไม่สำเร็จ",
          text: contratorErrorMessage,
          icon: "error",
        });
      }
    }
  };

  const finishSubmit = () => {
    // console.log("submit data", input);
  };

  const ClearInput = () => {
    setInput({
      contractorname: "",
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
        <MainButton
          btnName={addBtnName}
          icon="bi bi-plus-circle"
          onClick={() => handleOpenModal("notModal")}
        />
        <DataTableComponent
          column={columns}
          data={contratorData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
          isLoading={contratorIsLoading}
        />

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
                  {addBtnName}
                </h1>

                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleCancel("notModal")}
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
                            <label className="form-label">
                              ชื่อผู้รับเหมา
                              <span style={{ color: "red" }}>*</span>
                            </label>
                            <input
                              name="contractorname"
                              type="text"
                              className={`form-control ${
                                error.contractorname
                                  ? "border border-danger"
                                  : ""
                              }`}
                              id="educationname"
                              placeholder="กรอกชื่อผู้รับเหมา"
                              value={input.contractorname ?? ""}
                              onChange={handleChangeInput}
                            />
                            {error.contractorname ? (
                              <p className="text-danger">
                                {error.contractorname}
                              </p>
                            ) : null}
                          </div>
                          <div className=" d-flex justify-content-between align-items-center w-100 mt-2">
                            <label className="mb-2">เปิดใช้งาน</label>
                            <div className="form-check form-switch form-switch-md ms-3">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id="isActive-toggle"
                                name="isactive"
                                value={input.isactive}
                                onChange={handleChangeCheckbox}
                                checked={input.isactive === true}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <SubmitOrCancelButton
                handleSubmit={handleSubmit}
                handleCancel={() => handleCancel("notModal")}
                isLoading={contratorIsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
