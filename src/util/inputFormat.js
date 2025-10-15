// input format
// 0-0000-00000-00-0

export function maskIDCard(value) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{1})(\d)/, "$1-$2")
    .replace(/^(\d{1}-\d{4})(\d)/, "$1-$2")
    .replace(/^(\d{1}-\d{4}-\d{5})(\d{2})(\d)?/, "$1-$2-$3");
}

//000-000-0000
export function maskPhone(value) {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(\d{3})(\d)/, "$1-$2")
    .replace(/(\d{4})/, "$1");
}

export function formatNumber(input){
  return input.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function onlyDecimal(input) {
  if(!input || input <=0 || input.indexOf(0)===0) return "";
  // check for decimal
  if(input.indexOf(".")>=0){
    let [left_side, right_side] = input.split(".");
    left_side = formatNumber(left_side);
    right_side = right_side.substring(0,2);
    // right_side = right_side.padEnd(2,0);
    return left_side+"."+right_side
    
  }else {
    var left_side = formatNumber(input);
    return left_side}
}
