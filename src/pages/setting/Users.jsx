import React, { useRef, useState, useEffect, useCallback } from "react";
import { useTitle } from "../../hooks/useTitle";
import "../../../node_modules/datatables.net-bs5/css/dataTables.bootstrap5.min.css";
import "datatables.net-bs5";
import HeaderPage from "../../components/HeaderPage";
import Swal from "sweetalert2";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import { useRole } from "../../hooks/roleStore";
import { useUser } from "../../hooks/userStore";
import { useTitltName } from "../../hooks/titleNameStore";
import { isActiveBadge } from "../../util/isActiveBadge";
import DataTableComponent from "../../components/DatatableComponent";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const tableHead = [
  { index: 0, colName: "ลำดับ" },
  { index: 1, colName: "ชื่อผู้ใช้" },
  { index: 2, colName: "ชื่อ นามสกุล" },
  { index: 3, colName: "เปิดใช้งาน" },
  { index: 4, colName: "การจัดการ" },
];

export default function Users({ title }) {
  useTitle(title);
  const tableRef = useRef();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [addBtnName, setAddBtnName] = useState("เพิ่มผู้ใช้งานใหม่");
  const { data, errorMessage, getRoleData, isLoading } = useRole();
  const { titleData, titleIsLoading, getTitleNameData } = useTitltName();
  const {
    userdata,
    userIsLoading,
    userError,
    getUserData,
    register,
    success,
    deleteUser,
    getUserByIdData,
    userById,
    updateUser,
  } = useUser();
  const [input, setInput] = useState({
    titleId: 0,
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    mustchangepassword: 0,
    isactive: false,
    roles: [],
    employeeId: 0,
  });
  const [editMode, setEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
    handleClear();
    setEditMode(false);
  };
  const handleClose = () => setOpenModal(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: checked ? true : false,
    }));
  };

  const handleClear = () => {
    setInput({
      titleId: 0,
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      mustchangepassword: 0,
      isactive: false,
      roles: [],
      employeeId: 0,
    });
    setError({});
  };

  const fetchDataTable = useCallback(async () => {
    try {
      await getRoleData();
      await getUserData();
      await getTitleNameData();
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
    }
  }, [getRoleData, getUserData, getTitleNameData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  //ใส่ใน input ของ edit mode
  useEffect(() => {
    if (userById) {
      setInput({
        username: userById.username ?? "",
        employeeId: userById.employeeId ?? 0,
        titleId: userById.titleId ?? 0,
        firstname: userById.firstname ?? "",
        lastname: userById.lastname ?? "",
        isactive: userById.isActive ?? false,
        roles: userById?.roles?.map((item) => item.roleId) ?? [],
      });
    }
  }, [userById]);

  const columnData = [
    {
      data: null,
      render: function (data, type, row, meta) {
        return meta.row + 1;
      },
    },
    {
      title: "ชื่อผู้ใช้",
      data: "username",
      orderable: true,
    },

    {
      title: "ชื่อ-นามสกุล",
      data: null,
      orderable: true,
      render: function (data, type, row) {
        return `<p>${row.firstname} ${row.lastname}</p>`;
      },
    },
    {
      title: "เปิดใช้งาน",
      data: "isActive",
      orderable: true,
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
                <a class="dropdown-item text-dark btn-edit " data-id="${row.userId}" data-action="edit">
                  <i class="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                </a>
              </li>
              <li>
                <a class="dropdown-item text-dark btn-delete" data-id="${row.userId}" data-action="delete">
                  <i class="bi bi-trash-fill me-2"></i> ลบข้อมูล
                </a>
              </li>
             </ul>
          </div>
          
          <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
            <a
              data-id="${row.userId}"
              class="btn btn-warning me-2 btn-edit"
              title="แก้ไข"
              data-action="edit"
            >
              <i class="bi bi-pen-fill"></i>
            </a>
            <a
              
              data-id="${row.userId}"
              class="btn btn-danger btn-delete"
              title="ลบ"
              data-action="delete"
            >
              <i class="bi bi-trash-fill"></i>
            </a>
          </div>
        </div>
       `;
      },
    },
  ];

  //เข้าถึง function delete
  const handleAction = (action, id) => {
    if (action === "edit") {
      // console.log("Edit:", id);
      handleEdit(id);
    } else if (action === "delete") {
      // console.log("Delete:", id);
      handleDelete(id);
    }
  };

  const validateForm = () => {
    let errors = {};

    if (!input.username) {
      errors.username = "กรุณากรอกชื่อผู้ใช้";
    }

    if (!editMode) {
      if (!input.password) {
        errors.password = "กรุณากรอกรหัสผ่าน";
      } else {
        if (input.password.length < 8) {
          errors.password = "กรุณากรอกรหัสผ่าน 8 ตัวอักษรขึ้นไป";
        }
      }
    }
    if (input.titleId === 0 || input.titleId === "") {
      errors.titleId = "กรุณาเลือกคำนำหน้า";
    }
    if (!input.firstname) {
      errors.firstname = "กรุณากรอกชื่อจริงของท่าน";
    }

    if (!input.lastname) {
      errors.lastname = "กรุณากรอกนามสกุลของท่าน";
    }

    if (input.roles.length === 0) {
      errors.roles = "กรุณาเพิ่มบทบาทอย่างน้อย 1 บทบาท";
    }

    return errors;
  };

  // ในการเลือก role
  const handleAddRole = (roleId) => {
    setInput((prevData) => {
      const roleItem = prevData.roles || [];
      if (roleItem.includes(roleId)) return prevData; //ตรวจสอบว่ามี role ที่เลือกไปแล้วไหม
      return {
        ...prevData,
        roles: [...roleItem, roleId], //add role ใหม่ลงใน list
      };
    });
  };

  const handleRemoveRole = (roleId) => {
    setInput((prevData) => {
      const roleItem = prevData.roles || [];
      return {
        ...prevData,
        roles: roleItem.filter((select) => select !== roleId), //add role ใหม่ลงใน list
      };
    });
  };

  const getRoleName = (roleId) => {
    const roleName = data.find((item) => item.roleId === roleId);
    if (roleName) {
      return roleName.roleName;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqAddData = {
      username: input.username,
      password: input.password,
      isActive: input.isactive,
      employeeId: input.employeeId,
      titleId: input.titleId,
      firstname: input.firstname,
      lastname: input.lastname,
      roleIds: input.roles,
    };

    const reqUpdateData = {
      employeeId: input.employeeId,
      titleId: input.titleId,
      firstname: input.firstname,
      lastname: input.lastname,
      roleIds: input.roles,
      isActive: input.isactive,
    };

    const errorList = validateForm(input);
    setError(errorList);
    console.log("add new data", reqAddData);
    if (Object.keys(errorList).length === 0) {
      const response = editMode
        ? await updateUser(reqUpdateData, editUserId)
        : await register(reqAddData);
      if (response.success) {
        setIsSubmit(true);
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          draggable: true,
          buttonsStyling: "w-100",
        });

        // const currentModal = document.getElementById("addModal");
        // const modalInstance = bootstrap.Modal.getInstance(currentModal);
        // modalInstance.hide();

        resetAll();
        // handleClose();
        //โหลดตารางใหม่
        await getUserData();
      } else {
        Swal.fire({
          title: "บันทึกข้อมูลไม่สำเร็จ",
          icon: "error",
        });
      }
    }
  };

  const resetAll = () => {
    handleClear();
    setEditMode(false);
    setEditUserId(null);
    setOpenModal(false);
  };

  const handleCancel = () => {
    if (!editMode) {
      resetAll();
    } else {
      setOpenModal(false);
    }
  };

  const handleEdit = async (userId) => {
    setEditUserId(userId);
    setEditMode(true);
    // const currentModal = document.getElementById("addModal");
    // if (currentModal) {
    //   const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
    //   modal.show();
    // }
    await getUserByIdData(userId);

    setOpenModal(true);
  };

  const handleDelete = (userId) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success custom-width-btn-alert",
        cancelButton: "btn btn-danger custom-width-btn-alert",
      },
      buttonsStyling: "w-100",
    });
    swalWithBootstrapButtons
      .fire({
        title: "คุณต้องการลบรายการใช่หรือไม่",
        text: "ถ้าลบไปแล้วไม่สามารถกลับคืนมาได้ คุณแน่ใจแล้วใช่ไหม",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบได้เลย",
        cancelButtonText: "ยกเลิกการลบ",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await deleteUser(userId);
          if (response.success) {
            swalWithBootstrapButtons.fire({
              title: "ลบรายการสำเร็จ!",
              text: "คุณทำการลบรายการเรียบร้อยแล้ว",
              icon: "success",
            });
            await getUserData();
          } else {
            Swal.fire({
              title: "เกิดข้อผิดผลาดในการลบรายการ กรุณาลองใหม่อีกครั้ง",
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "ยกเลิก",
            text: "คุณทำการยกเลิกลบรายการเรียบร้อยแล้ว",
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="container py-4 min-vh-90 d-flex flex-column">
      {/* Breadcrumb */}
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
          <button
            type="button"
            className="power py-2"
            style={{ maxWidth: "200px" }}
            // data-bs-toggle="modal"
            // data-bs-target="#addModal"
            onClick={handleOpen}
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
          data={userdata}
          onAction={handleAction}
          tableHead={tableHead}
          tableRef={tableRef}
        />
        {/* modal */}

        {/* <div
          className="modal fade show"
          id="addModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
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
                  onClick={handleClear}
                ></button>
              </div>
              <div class="modal-body">
                <div className="p-4">
                  <div className="row form-spacing g-3">
                    <div
                      className={`col-md-12 ${
                        editMode ? "col-lg-8 offset-lg-2" : "col-lg-6"
                      }`}
                    >
                      <label className="form-label">
                        ชื่อผู้ใช้
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        name="username"
                        type="text"
                        className={`form-control ${
                          error.username ? "border border-danger" : ""
                        }`}
                        id="username"
                        placeholder="กรอกชื่อผู้ใช้"
                        value={input.username}
                        onChange={handleChangeInput}
                      />
                      {error.username ? (
                        <p className="text-danger">{error.username}</p>
                      ) : null}

                      <div className="mt-3">
                        <div className="mb-2">
                          <label class="form-label">
                            คำนำหน้า
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            name="titleId"
                            id="titleId"
                            className={`form-select ${
                              error.titleId ? "border border-danger" : ""
                            }`}
                            onChange={handleChangeInput}
                            value={input.titleId}
                            dis
                          >
                            <option value={0}>เลือกคำนำหน้า</option>
            
                            {titleData.map((item) => (
                              <option value={item.titleId} key={item.titleId}>
                                {item.titleNameTH}
                              </option>
                            ))}
                          </select>
                          {error.titleId ? (
                            <p className="text-danger">{error.titleId}</p>
                          ) : null}
                        </div>
                        <div className="mb-2">
                          <label className="form-label">
                            ชื่อจริง
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="firstname"
                            type="text"
                            className={`form-control ${
                              error.firstname ? "border border-danger" : ""
                            }`}
                            id="firstname"
                            placeholder="กรอกชื่อจริง"
                            value={input.firstname}
                            onChange={handleChangeInput}
                          />
                          {error.firstname ? (
                            <p className="text-danger">{error.firstname}</p>
                          ) : null}
                        </div>
                        <div className="mb-2">
                          <label class="form-label">
                            นามสกุล
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="lastname"
                            type="text"
                            className={`form-control ${
                              error.lastname ? "border border-danger" : ""
                            }`}
                            id="lastname"
                            placeholder="กรอกนามสกุล"
                            value={input.lastname}
                            onChange={handleChangeInput}
                          />
                          {error.lastname ? (
                            <p className="text-danger">{error.lastname}</p>
                          ) : null}
                          <div class=" d-flex justify-content-end align-items-center w-100 mt-2">
                            <label className="mb-2">เปิดใช้งาน</label>
                            <div class="form-check form-switch form-switch-md ms-3">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                id="isActive-toggle"
                                name="isactive"
                                checked={input.isactive === true}
                                value={input.isactive}
                                onChange={handleChangeCheckbox}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="col-md-12 col-lg-6"
                      style={{
                        display: editMode ? "none" : "block",
                      }}
                    >
                      <div className="d-flex flex-column align-items-start border border-1 border-secondary rounded-3 p-3 mb-2 gap-1">
                        <label for="StartDate" class="form-label">
                          รหัสผ่าน
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="input-group">
                          <input
                            className={`form-control ${
                              error.password ? "border border-danger" : ""
                            }`}
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={input.password}
                            onChange={handleChangeInput}
                          />

                          <button
                            type="button"
                            className="btn btn-outline-primary bg-light"
                            aria-label={
                              showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"
                            }
                            onClick={() => setShowPassword((s) => !s)}
                          >
                            {showPassword ? (
                              <i className="bi bi-eye-slash"></i>
                            ) : (
                              <i className="bi bi-eye"></i>
                            )}
                          </button>
                        </div>
                        {error.password ? (
                          <p className="text-danger">{error.password}</p>
                        ) : null}
                        <div class=" d-flex justify-content-between align-items-center w-100 mt-2">
                          <label className="mb-2">บังคับเปลี่ยนรหัส</label>
                          <div class="form-check form-switch form-switch-md ms-3">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="isActive-toggle"
                              name="mustchangepassword"
                              value={input.mustchangepassword}
                              onChange={handleChangeCheckbox}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-top border-danger my-3"></div>
                  <h5 className="group-label"># เลือกบทบาท</h5>
                  <div className="col-lg-12">
                    <div className="d-flex my-3 gap-2 flex-wrap">
                      {data
                        ?.filter((item) => !input.roles?.includes(item.roleId))
                        .map((item) => (
                          <button
                            className="btn btn-primary"
                            key={item.roleId}
                            onClick={() => handleAddRole(item.roleId)}
                          >
                            {item.roleName}
                          </button>
                        ))}
                    </div>
                    <div
                      style={{
                        border: "2px dotted #f19999",
                        paddingLeft: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <div className="d-flex my-3 gap-2  flex-wrap">
                        {input.roles?.map((item) => (
                          <div
                            className="border border-danger p-1 pe-0 rounded-3 bg-light ps-2"
                            style={{ fontSize: "0.9rem" }}
                            key={item}
                          >
                            {getRoleName(item)}
                            <button
                              className="border-0 bg-transparent"
                              onClick={() => handleRemoveRole(item)}
                            >
                              <i className="bi bi-x text-danger"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                    {error.roles ? (
                      <p className="text-danger mt-2">{error.roles}</p>
                    ) : null}
                  </div>
                </div>
              </div>

              <SubmitOrCancelButton
                handleCancel={handleClear}
                handleSubmit={handleSubmit}
                isLoading={userIsLoading}
              />
            </div>
          </div>
        </div> */}

        <Modal
          size="lg"
          show={openModal}
          onHide={() => {
            if (!editMode) resetAll(); //ล้างค่าให้หมด เมื่อเปลี่ยนเป็น Add
            setOpenModal(false);
          }}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton className="bg-primary">
            <Modal.Title>
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <i className="bi bi-plus-circle fs-4 me-2"></i>
                {title}
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-primary">
            <div className="p-4">
              <div className="row form-spacing g-3">
                <div
                  className={`col-md-12 ${
                    editMode ? "col-lg-8 offset-lg-2" : "col-lg-6"
                  }`}
                >
                  <label className="form-label">
                    ชื่อผู้ใช้
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    name="username"
                    type="text"
                    className={`form-control ${
                      error.username ? "border border-danger" : ""
                    }`}
                    id="username"
                    placeholder="กรอกชื่อผู้ใช้"
                    value={input.username}
                    onChange={handleChangeInput}
                  />
                  {error.username ? (
                    <p className="text-danger">{error.username}</p>
                  ) : null}

                  <div className="mt-3">
                    <div className="mb-2">
                      <label class="form-label">
                        คำนำหน้า
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="titleId"
                        id="titleId"
                        className={`form-select ${
                          error.titleId ? "border border-danger" : ""
                        }`}
                        onChange={handleChangeInput}
                        value={input.titleId}
                        dis
                      >
                        <option value={0}>เลือกคำนำหน้า</option>
                        {titleData.map((item) => (
                          <option value={item.titleId} key={item.titleId}>
                            {item.titleNameTH}
                          </option>
                        ))}
                      </select>
                      {error.titleId ? (
                        <p className="text-danger">{error.titleId}</p>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <label className="form-label">
                        ชื่อจริง
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        name="firstname"
                        type="text"
                        className={`form-control ${
                          error.firstname ? "border border-danger" : ""
                        }`}
                        id="firstname"
                        placeholder="กรอกชื่อจริง"
                        value={input.firstname}
                        onChange={handleChangeInput}
                      />
                      {error.firstname ? (
                        <p className="text-danger">{error.firstname}</p>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <label class="form-label">
                        นามสกุล
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        name="lastname"
                        type="text"
                        className={`form-control ${
                          error.lastname ? "border border-danger" : ""
                        }`}
                        id="lastname"
                        placeholder="กรอกนามสกุล"
                        value={input.lastname}
                        onChange={handleChangeInput}
                      />
                      {error.lastname ? (
                        <p className="text-danger">{error.lastname}</p>
                      ) : null}
                      <div class=" d-flex justify-content-end align-items-center w-100 mt-2">
                        <label className="mb-2">เปิดใช้งาน</label>
                        <div class="form-check form-switch form-switch-md ms-3">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="isActive-toggle"
                            name="isactive"
                            checked={input.isactive === true}
                            value={input.isactive}
                            onChange={handleChangeCheckbox}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-12 col-lg-6"
                  style={{
                    display: editMode ? "none" : "block",
                  }}
                >
                  <div className="d-flex flex-column align-items-start border border-1 border-secondary rounded-3 p-3 mb-2 gap-1">
                    <label for="StartDate" class="form-label">
                      รหัสผ่าน
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <div className="input-group">
                      <input
                        className={`form-control ${
                          error.password ? "border border-danger" : ""
                        }`}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={input.password}
                        onChange={handleChangeInput}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-primary bg-light"
                        aria-label={
                          showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"
                        }
                        onClick={() => setShowPassword((s) => !s)}
                      >
                        {showPassword ? (
                          <i className="bi bi-eye-slash"></i>
                        ) : (
                          <i className="bi bi-eye"></i>
                        )}
                      </button>
                    </div>
                    {error.password ? (
                      <p className="text-danger">{error.password}</p>
                    ) : null}
                    <div class=" d-flex justify-content-between align-items-center w-100 mt-2">
                      <label className="mb-2">บังคับเปลี่ยนรหัส</label>
                      <div class="form-check form-switch form-switch-md ms-3">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="isActive-toggle"
                          name="mustchangepassword"
                          value={input.mustchangepassword}
                          onChange={handleChangeCheckbox}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-top border-danger my-3"></div>
              <h5 className="group-label"># เลือกบทบาท</h5>
              <div className="col-lg-12">
                <div className="d-flex my-3 gap-2 flex-wrap">
                  {data
                    ?.filter((item) => !input.roles?.includes(item.roleId))
                    .map((item) => (
                      <button
                        className="btn btn-primary"
                        key={item.roleId}
                        onClick={() => handleAddRole(item.roleId)}
                      >
                        {item.roleName}
                      </button>
                    ))}
                </div>
                <div
                  style={{
                    border: "2px dotted #f19999",
                    paddingLeft: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div className="d-flex my-3 gap-2  flex-wrap">
                    {input.roles?.map((item) => (
                      <div
                        className="border border-danger p-1 pe-0 rounded-3 bg-light ps-2"
                        style={{ fontSize: "0.9rem" }}
                        key={item}
                      >
                        {getRoleName(item)}
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => handleRemoveRole(item)}
                        >
                          <i className="bi bi-x text-danger"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                {error.roles ? (
                  <p className="text-danger mt-2">{error.roles}</p>
                ) : null}
              </div>
            </div>
            <SubmitOrCancelButton
              handleCancel={handleCancel}
              handleSubmit={handleSubmit}
              isLoading={userIsLoading}
            />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
