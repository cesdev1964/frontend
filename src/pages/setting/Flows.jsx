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
import { useFlow } from "../../hooks/flowStore";
import { useUser } from "../../hooks/userStore";
import { SearchDropdown } from "../../components/searchDropdown";
import MainButton from "../../components/MainButton";
import { handleCancel } from "../../util/handleCloseModal";

export const stepList = [
  { value: "หัวหน้าคนที่ 1" },
  { value: "หัวหน้าคนที่ 2" },
  { value: "หัวหน้าคนที่ 3" },
  { value: "หัวหน้าคนที่ 4" },
  { value: "หัวหน้าคนที่ 5" },
];

export const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "ชื่อสายอนุมัติ" },
  { index: 2, colName: "เปิดใช้งาน" },
  { index: 3, colName: "การจัดการ" },
];

export default function Flows({ title }) {
  useTitle(title);
  const tableRef = useRef();
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มข้อมูลสายอนุมัติ");
  const [editmode, setEditMode] = useState(false);
  const [getId, setGetId] = useState(null);
  const [isOpenNewApproveStep, setIsOpenNewApproveStep] = useState(false);
  const [listItem, setListItem] = useState([]);
  const [input, setInput] = useState({
    flowName: "",
    isactive: false,
  });

  const {
    getFlowById,
    flowById,
    getFlowData,
    flowData,
    flowIsLoading,
    createFlow,
    flowErrorMessage,
    updateFlow,
  } = useFlow();
  const { getUserDropdown, userDropdown } = useUser();

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

  const handleChangeEaseItem = (index, field, value) => {
    const updated = [...listItem];
    updated[index][field] = value;
    setListItem(updated);
  };

  const handleChangeSelectEaseItem = (index, field, selected) => {
    const updated = [...listItem];

    updated[index][field] = selected ? selected.value : null;
    setListItem(updated);
  };

  const fetchDataTable = useCallback(async () => {
    try {
      await getFlowData();
      await getUserDropdown();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getFlowData, getUserDropdown]);

  useEffect(() => {
    fetchDataTable();
    console.log("fetch data", flowData);
  }, []);

  useEffect(() => {
    if (!flowById) return;

    setInput({
      flowName: flowById.flowName ? flowById.flowName : "",
      isactive: flowById.isActive ? flowById.isActive : false,
    });

    const approveList = flowById.approvalSteps || [];
    if (approveList.length > 0) {
      setIsOpenNewApproveStep(true);

      setListItem((prev) => {
        const prevList = approveList.map((item) => ({
          stepNumber: item.stepNumber,
          stepName: item.stepName,
          userId: item.userId,
        }));
        return JSON.stringify(prev) === JSON.stringify(prevList)
          ? prev
          : prevList;
      });
    }
  }, [flowById]);

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
      index: "ชื่อสายอนุมัติ",
      data: "flowName",
      orderable: true,
    },
    {
      index: "เปิดใช้งาน",
      data: "isActive",
      render: function (data, type, row) {
        return isActiveBadge(row.isActive);
      },
    },
    {
      data: null,
      index: "การจัดการ",
      render: function (data, type, row) {
        return `      
         <div className="d-flex align-items-center justify-content-center">
            <div class="dropdown d-lg-none">
              <button class="btn btn-outline-light" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                 <i class="bi bi-three-dots-vertical"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                <a class="dropdown-item text-dark" data-action="edit" data-id="${row.flowId}">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              data-id="${row.flowId}"
              data-action="edit"
              class="btn btn-warning me-2"
              index="แก้ไข"
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
    ClearInput();
    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
  };

  const handleAction = (action, id) => {
    if (action === "edit") {
      handleEdit(id, "flowModal");
    }
  };

  const handleEdit = async (flowId, modalId) => {
    ClearInput();
    await getFlowById(flowId);
    setGetId(flowId);

    const currentModal = document.getElementById(modalId);
    if (currentModal) {
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.show();
    }
    setEditMode(true);
  };

  const validateInput = (input) => {
    let errors = {};
    if (!input.flowName) {
      errors.flowName = "กรุณากรอกชื่อสายอนุมัติ";
    }
    return errors;
  };

  const validateStepInput = (listItem) => {
    let errors = {};
    // check error ตาม stepid
    listItem.forEach((item, index) => {
      if (!item.userId || item.userId === null) {
        errors[`userId_${index}`] = "กรุณาเลือกชื่อผู้อนุมัติ";
      }
      if (!item.stepName || item.stepName === "") {
        errors[`stepName_${index}`] = "กรุณาเลือกลำดับของผู้อนุมัติ";
      }
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqData = {
      flowName: input.flowName,
      isActive: input.isactive,
      approveSteps: listItem,
    };
    // console.log("data req", reqData);

    const errorInput = validateInput(input);
    const errorStepInput = validateStepInput(listItem);
    const errorList = { ...errorInput, ...errorStepInput };
    setError(errorList);


    // console.log("Error list", error);
    if (listItem.length === 0) {
      Swal.fire({
        index: "บันทึกข้อมูลไม่สำเร็จ",
        text: "ไม่พบการเพิ่มสายอนุมัติ กรุณาเพิ่มสายอนุมัติ",
        icon: "error",
      });
      return;
    }

    // console.log("approve flow data", listItem);
    // console.log("data", input);

    if (Object.keys(errorList).length === 0) {
      const response = editmode
        ? await updateFlow(reqData, getId)
        : await await createFlow(reqData);
      if (response.success) {
        setIsSubmit(true);
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          draggable: true,
          buttonsStyling: "w-100",
        });
        const currentModal = document.getElementById("flowModal");
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        modalInstance.hide();
        ClearInput();
        await getFlowData();
      } else {
        Swal.fire({
          index: "บันทึกข้อมูลไม่สำเร็จ",
          text: flowErrorMessage || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
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
      flowName: "",
      isactive: false,
    });
    setListItem([]);
    setError({});
    setEditMode(false);
    setIsOpenNewApproveStep(false);
  };

  const handleAddApproveStep = (e) => {
    e.preventDefault();
    setListItem([
      ...listItem,
      { stepNumber: listItem.length + 1, stepName: "", userId: null },
    ]); //ตอนเปิด
  };

  const handleDeleteApproveStep = (index) => {
    // console.log(index);
    setListItem(listItem.filter((select) => select.stepNumber !== index));
  };

  const handleOpenApproveStepSection = () => {
    setIsOpenNewApproveStep(true);
    setListItem([
      ...listItem,
      { stepNumber: listItem.length + 1, stepName: "", userId: null },
    ]);
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
          onClick={() => handleOpenModal("flowModal")}
        />
        <DataTableComponent
          column={columns}
          data={flowData}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
          columnDefs={columnDefs}
          isLoading={flowIsLoading}
        />

        {/* modal */}
        <div
          className="modal fade"
          id="flowModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-primary d-flex flex-column">
              <div className="modal-header">
                <h1 className="modal-index fs-5" id="exampleModalLabel">
                  <i className="bi bi-plus-circle fs-4 me-2"></i>
                  {title}
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => handleCancel("flowModal")}
                ></button>
              </div>
              <div className="modal-body">
                <div className="employee-content p-2">
                  <form className="w-100">
                    {/* ข้อมูลทั่วไป */}
                    <div>
                      <label class="form-label">
                        ชื่อสายอนุมัติ
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        name="flowName"
                        type="text"
                        className={`form-control ${
                          error.flowName ? "border border-danger" : ""
                        }`}
                        placeholder="กรอกชื่อสายอนุมัติ"
                        value={input.flowName}
                        onChange={handleChangeInput}
                      />
                      {error.flowName ? (
                        <p className="text-danger">{error.flowName}</p>
                      ) : null}
                    </div>
                    <div className=" d-flex justify-content-end align-items-center w-100 mt-2">
                      <label className="mb-2">เปิดใช้งาน</label>
                      <div class="form-check form-switch form-switch-md ms-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="isActive-toggle"
                          name="isactive"
                          value={input.isactive}
                          onChange={handleChangeCheckbox}
                          checked={input.isactive === true}
                        />
                      </div>
                    </div>
                    <p className="ms-2">
                      <i className="bi bi-diagram-2-fill"></i>{" "}
                      <strong>สายอนุมัติ</strong>
                    </p>
                    {/* ไม่มีข้อมูล */}
                    {/* มีข้อมูล */}
                  </form>
                  {!isOpenNewApproveStep ? (
                    <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                      <i
                        className="bi bi-diagram-2-fill text-danger"
                        style={{ fontSize: "60px" }}
                      ></i>
                      <h5 className="text-danger">ไม่พบการเพิ่มสายอนุมัติ</h5>

                      <button
                        className="btn btn-primary mt-2"
                        onClick={handleOpenApproveStepSection}
                      >
                        <i className="bi bi-plus-circle fs-4"></i>
                        {addBtnName}
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center mb-4 w-100">
                      <div className="d-flex justify-content-end w-100">
                        <button
                          className="btn btn-outline-primary mb-2"
                          onClick={() => {
                            setIsOpenNewApproveStep(false);
                            setListItem([]);
                          }}
                        >
                          ลบทั้งหมด
                        </button>
                      </div>
                      {/* ส่วนของ card สายอนุมัติ */}
                      {listItem.map((item, index) => (
                        <div className="filter-container" key={index}>
                          <div className="d-flex align-items-top justify-content-between">
                            <p style={{ fontSize: "0.9rem" }}>
                              ลำดับ {item.stepNumber}
                            </p>
                            <a
                              style={{ cursor: "pointer", marginTop: 0 }}
                              onClick={() =>
                                handleDeleteApproveStep(item.stepNumber)
                              }
                            >
                              <i
                                className="bi bi-trash-fill text-center text-danger"
                                title="ลบ"
                              ></i>
                            </a>
                          </div>
                          <div className="row">
                            <div className="col-5">
                              <select
                                style={{ width: "150px" }}
                                name="stepName"
                                id="stepName"
                                className={`form-control ${
                                  error[`stepName_${index}`]
                                    ? "border-danger"
                                    : ""
                                }`}
                                onChange={(e) =>
                                  handleChangeEaseItem(
                                    index,
                                    "stepName",
                                    e.target.value
                                  )
                                }
                                value={item.stepName}
                              >
                                <option value={""}>เลือกลำดับ</option>
                                {stepList.map((item, index) => (
                                  <option value={item.value} key={index}>
                                    {item.value}
                                  </option>
                                ))}
                              </select>
                              {error[`stepName_${index}`] ? (
                                <p
                                  className="text-danger"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {error[`stepName_${index}`]}
                                </p>
                              ) : null}
                            </div>
                            <div className="col-7">
                              <SearchDropdown
                                data={userDropdown}
                                handleSelectChange={(selected) =>
                                  handleChangeSelectEaseItem(
                                    index,
                                    "userId",
                                    selected
                                  )
                                }
                                placeholder="เลือกผู้อนุมัติ"
                                value={userDropdown.find(
                                  (i) => i.value === item.userId
                                )}
                                className={`${
                                  error[`userId_${index}`]
                                    ? "border border-danger rounded-2"
                                    : ""
                                }`}
                              />
                              {error[`userId_${index}`] ? (
                                <p
                                  className="text-danger"
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  {error[`userId_${index}`]}
                                </p>
                              ) : null}
                              <a
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  handleDeleteApproveStep(item.stepId)
                                }
                              ></a>
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        className="btn btn-primary mt-2"
                        onClick={(e)=>handleAddApproveStep(e)}
                        disabled={listItem.length === 5}
                      >
                        <i className="bi bi-plus-circle fs-4"></i>
                        เพิ่มสายอนุมัติเพิ่มเติม
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <SubmitOrCancelButton
                handleSubmit={handleSubmit}
                handleCancel={() => handleCancel("flowModal")}
                isLoading={flowIsLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
