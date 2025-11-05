export function validateFormInput(input) {
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
  }else if(input.rate.length > 12){
    errors.rate = "กรุณากรอกจำนวนเงินไม่เกิน 9,999,999.99 บาท";
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

  if (input.statusId === "" || input.statusId === null) {
    errors.statusId = "กรุณาเลือกสถานะ";
  }

  if (!input.flowId || input.flowId === "" || input.flowId === null) {
    errors.flowId = "กรุณาเลือกสายอนุมัติ";
  }

  // datetime
  if (!input.birthday || input.birthday === "") {
    errors.birthday = "กรุณากรอกวันเกิด";
  }

  if (!input.startDate || input.startDate === "") {
    errors.startDate = "กรุณากรอกวันเริ่มงาน";
  }

  // if (input.statusId === "0" && !input.endDate) {
  //   errors.endDate = "กรุณากรอกวันที่ลาออก";
  // }

  return errors;
}

export function validateDeductionInput(listItem) {
  let errors = {};

  // ถ้าเป็นกรณี edit จะใช้เป็นเลข index
  listItem.forEach((item, index) => {
    if (!item.deductionTypeId || item.deductionTypeId === null) {
      errors[`deductionType_${index}`] = "กรุณาเลือกประเภทการหักเงิน";
    }

    if (!item.amount || item.amount === "") {
      errors[`amount_${index}`] = "กรุณากรอกจำนวนเงิน";
    }else if(item.amount.length > 12){
       errors[`amount_${index}`] = "กรุณากรอกจำนวนเงินไม่เกิน 9,999,999.99 บาท";
    }
  });

  return errors;
}
