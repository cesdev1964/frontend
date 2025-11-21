// input format
// 0-0000-00000-00-0

export function maskIDCard(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{1})(\d)/, "$1-$2")
    .replace(/(\d{1}-\d{4})(\d)/, "$1-$2")
    .replace(/(\d{1}-\d{4}-\d{5})(\d{2})(\d)/, "$1-$2-$3");
}

//000-000-0000
export function maskPhone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(\d{4})/, "$1");
}

export function formatNumber(input) {
  if (input) {
    return input.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

export function onlyDecimal(input) {
  if (!input || input <= 0 || input.indexOf(0) === 0) return "";
  // check for decimal
  if (input.indexOf(".") >= 0) {
    let [left_side, right_side] = input.split(".");
    left_side = formatNumber(left_side);
    right_side = right_side.substring(0, 2);
    // right_side = right_side.padEnd(2,0);
    return left_side + "." + right_side;
  } else {
    var left_side = formatNumber(input);
    return left_side;
  }
}

export function telephoneFormat(telephoneNumber) {
  const cleaned = ("" + telephoneNumber).replace(/\D/g, "");
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else if (!cleaned) return "";
  else return "";
}

export function IDcardFormat(thaiIDNumber) {
  const cleaned = ("" + thaiIDNumber).replace(/\D/g, "");
  if (cleaned.length === 13) {
    return cleaned.replace(
      /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/,
      "$1-$2-$3-$4-$5"
    );
  } else if (!cleaned) return "";
  else return "";
}
//ddd,ddd.dd
export function decimalFormat(stringNumber) {
  let num = Number(stringNumber);
  let decimalFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return decimalFormatter.format(num);
}

//dd-mm-yyyy
export function shortDateFormate(inputdate) {
  if (!inputdate) return;
  const date = new Date(inputdate);
  const formateDate = date.toLocaleDateString("en-GB");
  const formateWithDateHtphens = formateDate.replace(/\//g, "-");
  return formateWithDateHtphens;
}
//dd-mm-yyyy / hh:mm
export const getDateAndTime = (datetime) => {
  const [date, timeFull] = new Date(datetime).toISOString().split("T");
  const dateTime = new Date(datetime);
  const hr = dateTime.getHours().toString().padStart(2, "0");
  const min = dateTime.getMinutes().toString().padStart(2, "0");

  if (date) {
    const [year, month, day] = date.split("-");
    const dateFormat = `${day}-${month}-${year}`;
    return `${dateFormat} / ${hr}:${min} น.`;
  }
};

//get date from datetime => yyyy-mm-dd
export const getDateOnly = (datetime) => {
  const date = new Date(datetime);
  const getYear = date.getFullYear();
  const getMonth = String(date.getMonth() + 1).padStart(2, "0");
  const getDay = String(date.getDate()).padStart(2, "0");
  return `${getYear}-${getMonth}-${getDay}`;
};

export const convertStringDateToDatetime = (dateString) => {
  const dateObject = new Date(dateString);

  const isoFormat = dateObject.toISOString();
  return isoFormat
};
