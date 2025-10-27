import { useTitle } from "../../hooks/useTitle";
import HeaderPage from "../../components/HeaderPage";
import { Link, useNavigate } from "react-router-dom";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import React, { useEffect, useRef, useState, useCallback } from "react";
import ImageComponent from "../../components/Image";
import Swal from "sweetalert2";
import CopperImage from "../../components/modal/CopperImage";
import { useTitltName } from "../../hooks/titleNameStore";
import { useEducation } from "../../hooks/educationStore";
import { useLevel } from "../../hooks/levelStore";
import { usePosition } from "../../hooks/positionStore";
import { useJob } from "../../hooks/jobStore";
import { useContrator } from "../../hooks/contratorStore";
import { useEmployeeType } from "../../hooks/employeeTypeStore";
import { useFlow } from "../../hooks/flowStore";
import { maskIDCard, maskPhone, onlyDecimal } from "../../util/inputFormat";
import { useDeduction } from "../../hooks/deductionTypeStore";
import DeductionList from "../../components/modal/setting/DeductionList";
import { SearchDropdown } from "../../components/searchDropdown";
import { useEmployee } from "../../hooks/employeeStore";
import { useParams } from "react-router-dom";

var photoName = "";
var photoPath = "";

export default function EmployeeForm({ title, isEdit = false }) {
  useTitle(title);
  const [input, setInput] = useState({
    employeeCode: "",
    titleId: 0,
    firstname: "",
    lastname: "",
    telephoneNo: "",
    cardId: "",
    birthday: "",
    educationId: null,
    jobId: null,
    levelId: null,
    startDate: "",
    endDate: "",
    positionId: null,
    contractorId: null,
    rate: "",
    typeId: null,
    statusId: null,
    file: [],
    flowId: null,
    deductions: [],
  });
  const { publicEmployeeId } = useParams();
  const inputImageRef = useRef(null);
  const [openCopperModal, setOpenCopperModal] = useState(false);
  const [src, setSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const { getEducationDropdown, educationDropdown } = useEducation();
  const { titleData, getTitleNameData } = useTitltName();
  const { levelDropdown, getLevelDropdown } = useLevel();
  const { positionDropdown, getPositionDropdown } = usePosition();
  const { contratorDropdown, getContratorDropdown } = useContrator();
  const { jobDropdown, getJobDropdown } = useJob();
  const { deductionDropdown, getDeductionDropdown } = useDeduction();
  const {
    createEmployee,
    employeeIsLoading,
    employeeErrorMessage,
    getEmployeeById,
    employeeById,
  } = useEmployee();
  const [isOpenNewDeduction, setIsOpenNewDeduction] = useState(false);
  const [listItem, setListItem] = useState(input.deductions || []);
  const [birthdayError, setBirthdayError] = useState("");
  const [error, setError] = useState({});
  const [isFlow, setIsFlow] = useState(false);
  const navigate = useNavigate();
  const {
    flowDropdown,
    getFlowDropdown,
    getFlowById,
    flowById,
    flowIsLoading,
  } = useFlow();
  const { employeeTypeDropdown, getEmployeeTypeDropdown } = useEmployeeType();
  const modalCopperName = "cooperModal";

  const fetchDataTable = useCallback(async () => {
    try {
      await getEducationDropdown();
      await getTitleNameData();
      await getLevelDropdown();
      await getPositionDropdown();
      await getContratorDropdown();
      await getJobDropdown();
      await getEmployeeTypeDropdown();
      await getFlowDropdown();
      await getDeductionDropdown();
      if (publicEmployeeId) {
        await getEmployeeById(publicEmployeeId);
      }
    } catch (error) {
      alert("โหลด API ไม่สำเร็จ", error);
      
    }
  }, [
    getEducationDropdown,
    getTitleNameData,
    getLevelDropdown,
    getLevelDropdown,
    getContratorDropdown,
    getJobDropdown,
    getEmployeeTypeDropdown,
    getDeductionDropdown,
    getEmployeeById,
  ]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  // useEffect(() => {
  //   if (employeeById) {
  //     setInput({
  //       employeeCode: employeeById.employeeCode ?? "",
  //       titleId: employeeById.titleId ?? 0,
  //       firstname: employeeById.firstname ?? "",
  //       lastname: employeeById.lastname ?? "",
  //       jobId: employeeById.jobId ?? null,
  //       levelId: employeeById.levelId ?? null,
  //       startDate: employeeById.startDate ?? null,
  //       endDate: employeeById.endDate ??  null,
  //       positionId: employeeById.positionId ?? null,
  //       contractorId: employeeById.contractorId ?? null,
  //       rate: employeeById.rate ?? "",
  //       typeId: employeeById.typeId ?? null,
  //       statusId: employeeById.statusId ?? null,
  //       file: employeeById.files ?? [],
  //       flowId: employeeById.flowId ?? null,
  //       deductions: employeeById.deductions ?? [],
  //     });
  //   }
  // }, [employeeById]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openCopperImageModal = (e) => {
    e.preventDefault();

    //การเปิดโฟลเดอร์
    const file = e.target.files?.[0];
    if (!file) return;

    const fileSRC = URL.createObjectURL(file);
    const getFileName = file.name;
    // ครวจสอบไฟล์รูปภาพ

    setSrc(fileSRC);

    // เก็ย fileName and filePath กว่าจะอัปเดตค่าใหม่ต้องทำการ render ก่อน
    setInput((prevData) => ({
      ...prevData,
      // photoname: getFileName,
      // photopath: fileSRC,
      file: file,
    }));

    photoName = file.name;
    photoPath = URL.createObjectURL(file);

    console.log("only file data ", file);
    console.log("only file path ", photoPath);
    console.log("only file name ", photoName);
    setOpenCopperModal(true);
  };

  const handleClear = () => {
    setInput({
      employeeCode: "",
      titleId: 0,
      firstname: "",
      lastname: "",
      telephoneNo: "",
      cardId: "",
      birthday: "",
      educationId: null,
      jobId: null,
      levelId: null,
      startDate: "",
      endDate: "",
      positionId: null,
      contractorId: null,
      rate: "",
      typeId: null,
      statusId: null,
      flowId: null,
      deductions: [],
      file: [],
    });
    setError({});
    setIsFlow(false);
    // setSetEditMode(false)
  };

  const avatarUrl = `data:image/jpeg;base64,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`;

  const customComponentOption = ({ innerProps, label }) => {
    return (
      <div
        className="d-flex justify-content-between p-2"
        style={{ cursor: "pointer" }}
        {...innerProps}
      >
        <span>{label}</span>
        <span className="badge-style badge-stillWork">
          คลิกเพื่อดูสายอนุมัติ
        </span>
      </div>
    );
  };

  const handleSelectChange = (name, selected) => {
    setInput((prevData) => ({
      ...prevData,
      [name]: selected ? selected.value : null,
    }));
  };

  const handleOpenFlow = async (flowId) => {
    setIsFlow(true);
    const response = await getFlowById(flowId);
  };

  const handleOpenSection = () => {
    setIsOpenNewDeduction(true);
    setListItem([
      ...listItem,
      { stepNumber: listItem.length + 1, deductionTypeId: null, amount: "" },
    ]);
  };

  const handleAddItem = () => {
    setListItem([
      ...listItem,
      { stepNumber: listItem.length + 1, deductionTypeId: null, amount: "" },
    ]); //ตอนเปิด
  };

  const onlyTextNumber = (value) => {
    if (!value) return "";
    const newValue = value.replace(/[^a-zA-Z0-9]/g, "");
    return newValue;
  };

  const isShowDateTypeOnly = (datetime) => {
    if (datetime) {
      return new Date(datetime).toISOString().split("T")[0];
    } else return null;
  };

  const validateForm = () => {
    let errors = {};
    if (!input.firstname) {
      errors.firstname = "กรุณากรอกชื่อจริง";
    }
    if (!input.lastname) {
      errors.lastname = "กรุณากรอกนามสกุล";
    }
    if (!input.cardId) {
      errors.cardId = "กรุณากรอกเลขบัตรประชาชน";
    } else if (input.cardId.length < 17) {
      errors.cardId = "กรุณากรอกให้ครบ 13 หลัก";
    }
    if (!input.telephoneNo) {
      errors.telephoneNo = "กรุณากรอกเลขโทรศัพท์";
    } else if (input.telephoneNo.length < 12) {
      errors.telephoneNo = "กรุณากรอกให้ครบ 10 หลัก";
    }
    if (!input.rate) {
      errors.rate = "กรุณากรอกอัตราค่าจ้าง";
    }
    if (!input.employeeCode) {
      errors.employeeCode = "กรุณากรอกรหัสพนักงาน";
    }
    //select
    if (!input.titleId || input.titleId === "" || input.titleId === null) {
      errors.titleId = "กรุณาเลือกคำนำหน้า";
    }
    if (
      !input.contractorId ||
      input.contractorId === "" ||
      input.contractorId === null
    ) {
      errors.contractorId = "กรุณาเลือกชื่อผู้รับเหมา";
    }
    if (
      !input.educationId ||
      input.educationId === "" ||
      input.educationId === null
    ) {
      errors.educationId = "กรุณาเลือกระดับการศึกษา";
    }
    if (!input.jobId || input.jobId === "" || input.jobId === null) {
      errors.jobId = "กรุณาเลือกหน่วยงาน";
    }

    if (!input.levelId || input.levelId === "" || input.levelId === null) {
      errors.levelId = "กรุณาเลือกระดับ";
    }

    if (
      !input.positionId ||
      input.positionId === "" ||
      input.positionId === null
    ) {
      errors.positionId = "กรุณาเลือกตำแหน่ง";
    }

    if (!input.typeId || input.typeId === "" || input.typeId === null) {
      errors.typeId = "กรุณาเลือกประเภทงาน";
    }

    if (!input.statusId || input.statusId === "" || input.statusId === null) {
      errors.statusId = "กรุณาเลือกสถานะ";
    }

    if (!input.flowId || input.flowId === "" || input.flowIdo === null) {
      errors.flowId = "กรุณาเลือกสายอนุมัติ";
    }

    // datetime
    if (!input.birthday || input.birthday === "") {
      errors.birthday = "กรุณากรอกวันเกิด";
    }

    if (!input.startDate || input.startDate === "") {
      errors.startDate = "กรุณากรอกวันเริ่มงาน";
    }

    if (input.statusId === "0" && !input.endDate) {
      errors.endDate = "กรุณากรอกวันที่ลาออก";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    console.log("list of deduction", listItem);
    e.preventDefault();
    console.log("input data", input);

    const formData = new FormData();
    formData.append("employeeCode", input.employeeCode);
    formData.append("titleId", input.titleId);
    formData.append("firstname", input.firstname);
    formData.append("lastname", input.lastname);
    formData.append("telephoneNo", onlyTextNumber(input.telephoneNo));
    formData.append("cardId", onlyTextNumber(input.cardId));
    formData.append("birthday", input.birthday);
    formData.append("educationId", input.educationId);
    formData.append("jobId", input.jobId);
    formData.append("levelId", input.levelId);
    formData.append("startDate", input.startDate);
    formData.append("positionId", input.positionId);
    formData.append("contractorId", input.contractorId);
    formData.append("rate", input.rate);
    formData.append("typeId", input.typeId);
    formData.append("flowId", input.flowId);
    formData.append("status", input.statusId);
    // formData.append("deductions",listItem);
    listItem.forEach((item) => {
      formData.append(
        [`deductions[${item.stepNumber}].deductionTypeId`],
        item.deductionTypeId
      );
      formData.append([`deductions[${item.stepNumber}].amount`], item.amount);
    });
    formData.append("file", input.file);

    // เหลือ file
    // เอาวันที่ลาออก ออกด้วย

    console.log("employee data", ...formData.entries());
    const errorList = validateForm(input) || [];
    setError(errorList);
    if (Object.keys(errorList).length === 0) {
      // const response = editMode
      //   ? await updateEducation(reqData, getId)
      //   : await createEducation(reqData);

      const response = await createEmployee(formData);
      if (response.success) {
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          draggable: true,
          buttonsStyling: "w-100",
        });
        handleClear();
        setIsFlow(false);
        navigate("/settings/employees");
      } else {
        Swal.fire({
          title: "บันทึกข้อมูลไม่สำเร็จ",
          text: educationErrorMessage || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
          icon: "error",
        });
      }
    }
    //เมื่อทำการบันทึกข้อมูลใน API เรียบร้อย ให้ทำการ set ตัวแปลให้เป็นค่าว่าง
  };

  const testNevigate = () => {
    navigate("/settings/employees", { state: { refresh: true } });
  };

  return (
    <div className="container-fluid py-4 min-vh-100 d-flex flex-column">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/settings/employees">การจัดการข้อมูลพนักงาน</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container">
        <div className="employee-content p-4">
          <div className="row">
            <div className="col-lg-3 ">
              <div className="employee-image-section">
                <ImageComponent
                  imageSRC={preview || avatarUrl}
                  borderRadius="50%"
                  height="120px"
                  width="120px"
                  alt="profile-avatar"
                  objectfit="cover"
                  border="2px solid rgba(90, 45, 45, 0.15)"
                />
                <button
                  className="btn btn-primary btn-sm my-4"
                  onClick={() => inputImageRef.current.click()}
                >
                  อัปโหลดรูปภาพ
                </button>
                <input
                  style={{ display: "none" }}
                  type="file"
                  accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                  ref={inputImageRef}
                  onChange={openCopperImageModal}
                />
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
              <form>
                {/* ข้อมูลทั่วไป */}
                <div className="mb-3">
                  <h5 className="group-label"># ข้อมูลทั่วไป</h5>
                  <div className="border-top border-danger my-3"></div>
                  <div className="row form-spacing g-2">
                    <div className="col-md-6 col-lg-4">
                      <label className="form-label">
                        รหัสพนักงาน
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        name="employeeCode"
                        type="text"
                        className={`form-control ${
                          error.employeeCode ? "border border-danger" : ""
                        }`}
                        id="employeeCode"
                        placeholder="กรอกรหัสพนักงาน"
                        value={input.employeeCode ?? ""}
                        onChange={handleChangeInput}
                      />
                      {error.employeeCode ? (
                        <p className="text-danger">{error.employeeCode}</p>
                      ) : null}
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <label className="form-label">
                        คำนำหน้า
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="titleId"
                        id="titleId"
                        className={`form-control ${
                          error.titleId ? "border border-danger" : ""
                        }`}
                        onChange={handleChangeInput}
                        value={input.titleId ?? 0}
                      >
                        <option value={""}>เลือกคำนำหน้า</option>
                        {titleData.map((item, index) => (
                          <option value={item.titleId} key={index}>
                            {item.titleNameTH}
                          </option>
                        ))}
                      </select>
                      {error.titleId ? (
                        <p className="text-danger">{error.titleId}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-spacing g-2">
                    <div className="col-md-6 col-lg-4">
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
                        value={input.firstname ?? ""}
                        onChange={handleChangeInput}
                      />
                      {error.firstname ? (
                        <p className="text-danger">{error.firstname}</p>
                      ) : null}
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <label className="form-label">
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
                        value={input.lastname ?? ""}
                        onChange={handleChangeInput}
                      />
                      {error.lastname ? (
                        <p className="text-danger">{error.lastname}</p>
                      ) : null}
                    </div>
                    <div className="col-md-8 col-lg-4">
                      <label className="form-label">
                        วันเดือนปีเกิด
                        <span style={{ color: "red" }}>*</span>
                        <span className="sub-label">(ค.ศ.)</span>
                      </label>
                      <input
                        type="date"
                        id="birthday"
                        className={`form-control ${
                          error.birthday || birthdayError
                            ? "border border-danger"
                            : ""
                        }`}
                        name="birthday"
                        value={input.birthday}
                        onChange={handleChangeInput}
                        defaultValue={Date.now()}
                        onKeyDown={(e) => e.preventDefault()}
                        max={
                          new Date(
                            new Date().setFullYear(
                              new Date().getFullYear() - 18
                            )
                          )
                            .toISOString()
                            .split("T")[0]
                        }
                      />
                      {error.birthday ? (
                        <p className="text-danger">{error.birthday}</p>
                      ) : null}
                      {birthdayError ? (
                        <p className="text-danger">{birthdayError}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="row form-spacing g-2">
                    <div className="col-md-8 col-lg-5">
                      <label className="form-label">
                        ระดับการศึกษา
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <SearchDropdown
                        data={educationDropdown}
                        handleSelectChange={(selected) =>
                          handleSelectChange("educationId", selected)
                        }
                        placeholder="เลือกระดับการศึกษา"
                        value={
                          educationDropdown.find(
                            (i) => i.value === input.educationId
                          ) || null
                        }
                        className={`${
                          error.educationId
                            ? "border border-danger rounded-2"
                            : ""
                        }`}
                      />
                      {error.educationId ? (
                        <p className="text-danger">{error.educationId}</p>
                      ) : null}
                    </div>
                    <div className="col-md-8 col-lg-4">
                      <label className="form-label">
                        เบอร์โทรศัพท์
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        name="telephoneNo"
                        type="tel"
                        className={`form-control ${
                          error.telephoneNo ? "border border-danger" : ""
                        }`}
                        maxLength={12}
                        value={input.telephoneNo ?? ""}
                        placeholder="กรอกหมายเลขโทรศัพท์"
                        onChange={(e) =>
                          setInput((prevData) => ({
                            ...prevData,
                            telephoneNo: maskPhone(e.target.value),
                          }))
                        }
                      />
                      {error.telephoneNo ? (
                        <p className="text-danger">{error.telephoneNo}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-spacing g-2">
                    <div className="col-lg-6">
                      <label className="form-label">
                        เลขบัตรประชาชน
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        className={`form-control ${
                          error.cardId ? "border border-danger" : ""
                        }`}
                        id="cardId"
                        name="cardId"
                        placeholder="กรอกเลขบัตรประชาชน"
                        title="National ID Input"
                        aria-labelledby="InputLabel"
                        aria-invalid
                        aria-required="true"
                        maxLength={17}
                        value={input.cardId ?? ""}
                        onChange={(e) =>
                          setInput((prevData) => ({
                            ...prevData,
                            cardId: maskIDCard(e.target.value),
                          }))
                        }
                      />
                      {error.cardId ? (
                        <p className="text-danger">{error.cardId}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="group-label"># ข้อมูลหน่วยงาน</h5>
                  <div className="border-top border-danger my-3"></div>
                  <div className="row form-spacing g-2">
                    <div className="col-md-6 col-lg-4">
                      <label className="form-label">
                        ระดับ
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <SearchDropdown
                        data={levelDropdown}
                        handleSelectChange={(selected) =>
                          handleSelectChange("levelId", selected)
                        }
                        placeholder="เลือกระดับ"
                        value={
                          levelDropdown.find(
                            (i) => i.value === input.levelId
                          ) || null
                        }
                        className={`${
                          error.levelId ? "border border-danger rounded-2" : ""
                        }`}
                      />
                      {error.levelId ? (
                        <p className="text-danger">{error.levelId}</p>
                      ) : null}
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <label className="form-label">
                        หน่วยงาน
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <SearchDropdown
                        data={jobDropdown}
                        handleSelectChange={(selected) =>
                          handleSelectChange("jobId", selected)
                        }
                        placeholder="เลือกหน่วยงาน"
                        value={
                          jobDropdown.find((i) => i.value === input.jobId) ||
                          null
                        }
                        className={`${
                          error.jobId ? "border border-danger rounded-2" : ""
                        }`}
                      />
                      {error.jobId ? (
                        <p className="text-danger">{error.jobId}</p>
                      ) : null}
                    </div>
                    <div className="col-md-8 col-lg-4">
                      <label className="form-label">
                        ตำแหน่ง
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <SearchDropdown
                        data={positionDropdown}
                        handleSelectChange={(selected) =>
                          handleSelectChange("positionId", selected)
                        }
                        placeholder="เลือกตำแหน่ง"
                        value={
                          positionDropdown.find(
                            (i) => i.value === input.positionId
                          ) || null
                        }
                        className={`${
                          error.positionId
                            ? "border border-danger rounded-2"
                            : ""
                        }`}
                      />
                      {error.positionId ? (
                        <p className="text-danger">{error.positionId}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-spacing g-2">
                    <div className="col-md-6 col-lg-4">
                      <label className="form-label">
                        ผู้รับเหมา
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <SearchDropdown
                        data={contratorDropdown}
                        handleSelectChange={(selected) =>
                          handleSelectChange("contractorId", selected)
                        }
                        placeholder="เลือกผู้รับเหมา"
                        value={
                          contratorDropdown.find(
                            (i) => i.value === input.contractorId
                          ) || null
                        }
                        className={`${
                          error.contractorId
                            ? "border border-danger rounded-2"
                            : ""
                        }`}
                      />
                      {error.contractorId ? (
                        <p className="text-danger">{error.contractorId}</p>
                      ) : null}
                    </div>
                    <div className="col-md-6 col-lg-4">
                      <label className="form-label">
                        ประเภท
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <SearchDropdown
                        data={employeeTypeDropdown}
                        handleSelectChange={(selected) =>
                          handleSelectChange("typeId", selected)
                        }
                        placeholder="เลือกประเภท"
                        value={
                          employeeTypeDropdown.find(
                            (i) => i.value === input.typeId
                          ) || null
                        }
                        className={`${
                          error.typeId ? "border border-danger rounded-2" : ""
                        }`}
                      />
                      {error.typeId ? (
                        <p className="text-danger">{error.typeId}</p>
                      ) : null}
                    </div>
                    <div className="col-md-7 col-lg-4">
                      <label className="form-label">
                        อัตราค่าจ้าง
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="rate"
                        className={`form-control ${
                          error.rate ? "border border-danger" : ""
                        }`}
                        value={input.rate ?? ""}
                        placeholder="กรอกค่าจ้าง"
                        onChange={(e) =>
                          setInput((prevData) => ({
                            ...prevData,
                            rate: onlyDecimal(e.target.value),
                          }))
                        }
                      />
                      {error.rate ? (
                        <p className="text-danger">{error.rate}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="row form-spacing g-2">
                    <div className="col-md-6 col-lg-4">
                      <label className="form-label">
                        วันที่เริ่มงาน
                        <span style={{ color: "red" }}>*</span>
                        <span className="sub-label">(ค.ศ.)</span>
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        className={`form-control ${
                          error.startDate ? "border border-danger" : ""
                        }`}
                        name="startDate"
                        placeholder="ลงวันที่สิ้นสุด"
                        value={input.startDate}
                        onChange={handleChangeInput}
                        defaultValue={Date.now()}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                    </div>
                    {error.startDate ? (
                      <p className="text-danger">{error.startDate}</p>
                    ) : null}
                    <div className="col-md-6 col-lg-4">
                      <label className="form-label">
                        วันที่ลาออก
                        <span className="sub-label">(ค.ศ.)</span>
                      </label>
                      <input
                        type="date"
                        id="endDate"
                        className={`form-control ${
                          error.endDate ? "border border-danger" : ""
                        }`}
                        name="endDate"
                        placeholder="ลงวันที่สิ้นสุด"
                        value={input.endDate}
                        onChange={handleChangeInput}
                        defaultValue={Date.now()}
                        onKeyDown={(e) => e.preventDefault()}
                      />
                      {error.endDate ? (
                        <p className="text-danger">{error.endDate}</p>
                      ) : null}
                    </div>
                    <div className="col-md-5 col-lg-4">
                      <label className="form-label">
                        สถานะ
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        name="statusId"
                        id="statusId"
                        className={`form-control ${
                          error.statusId ? "border border-danger" : ""
                        }`}
                        onChange={handleChangeInput}
                        value={input.statusId ?? null}
                      >
                        <option value={""}>เลือกสถานะ</option>
                        <option value={0}>ลาออก</option>
                        <option value={1}>ปกติ</option>
                      </select>
                      {error.statusId ? (
                        <p className="text-danger">{error.statusId}</p>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <h5 className="group-label"># ข้อมูลการหักเงิน</h5>
                  <div className="border-top border-danger my-3"></div>
                </div>
                {!isOpenNewDeduction || listItem.length === 0 ? (
                  <>
                    <div className="d-flex flex-column align-items-center justify-content-center mb-4">
                      <button
                        className="btn btn-primary mt-2"
                        onClick={handleOpenSection}
                      >
                        <i className="bi bi-plus-circle fs-4"></i>
                        เพิ่มประเภทการหักเงิน
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <DeductionList
                      deductionDropdown={deductionDropdown}
                      deleteAll={() => {
                        setIsOpenNewDeduction(false);
                        setListItem([]);
                      }}
                      listItem={listItem}
                      onAddItem={handleAddItem}
                      setListItem={setListItem}
                      propName="deductionTypeId"
                    />
                  </>
                )}

                <div>
                  <h5 className="group-label"># สายอนุมัติ</h5>
                  <div className="border-top border-danger my-3"></div>
                  <div className="row form-spacing g-2">
                    <div className="col-md-12 col-lg-6">
                      <label className="form-label">
                        สายอนุมัติ
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <SearchDropdown
                        data={flowDropdown}
                        handleSelectChange={(selected) => {
                          handleSelectChange("flowId", selected);
                          handleOpenFlow(selected.value);
                        }}
                        placeholder="เลือกสายอนุมัติ"
                        customComponent={{ Option: customComponentOption }}
                        value={
                          flowDropdown.find((i) => i.value === input.flowId) ||
                          null
                        }
                        className={`${
                          error.flowId ? "border border-danger rounded-2" : ""
                        }`}
                      />
                      {error.flowId ? (
                        <p className="text-danger">{error.flowId}</p>
                      ) : null}
                    </div>
                    {flowById.approvalSteps && (
                      <div
                        className={`alert alert-info alert-dismissible fade ${
                          isFlow ? "show" : ""
                        } mt-3 d-inline-block d-flex flex-column align-items-center justify-content-center`}
                        role="alert"
                      >
                        {flowIsLoading ? (
                          <p className="text-center">...กำลังโหลดสายอนุมัติ</p>
                        ) : (
                          <>
                            <p className="text-center">ลำดับสายอนุมัติ</p>
                            <div className="d-flex flex-wrap justify-content-center gap-4 mt-3">
                              {flowById.approvalSteps.map((item, index) => (
                                <>
                                  <div
                                    className="d-flex flex-column align-items-center"
                                    key={index}
                                  >
                                    <div
                                      className="mb-2"
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        backgroundColor: "#ffffffff",
                                        borderRadius: "50%",
                                        position: "relative",
                                      }}
                                    >
                                      <p
                                        style={{
                                          position: "absolute",
                                          left: "15px",
                                          top: "9px",
                                        }}
                                      >
                                        {item.stepNumber}
                                      </p>
                                    </div>
                                    <p style={{ fontWeight: "bold" }}>
                                      {item.stepName}
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "0.9rem",
                                        lineHeight: "0.1rem",
                                      }}
                                    >
                                      {item.fullName}
                                    </p>
                                  </div>
                                </>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <SubmitOrCancelButton
        handleCancel={handleClear}
        handleSubmit={handleSubmit}
      />
      <CopperImage
        madalName={modalCopperName}
        setPreview={setPreview}
        src={src}
        handleClose={() => setOpenCopperModal(false)}
        show={openCopperModal === true}
      />
    </div>
  );
}
