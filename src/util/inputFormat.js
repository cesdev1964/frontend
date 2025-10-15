  // input format
  // 0-0000-00000-00-0

export  function maskIDCard (value) {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{1})(\d)/, "$1-$2") 
      .replace(/^(\d{1}-\d{4})(\d)/, "$1-$2")
      .replace(/^(\d{1}-\d{4}-\d{5})(\d{2})(\d)?/, "$1-$2-$3");
  };

  //000-000-0000
export  function maskPhone (value){
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(\d{3})(\d)/, "$1-$2")
      .replace(/(\d{4})/, "$1");
  };