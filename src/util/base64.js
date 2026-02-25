  //encode and decode

  export const  utf8ToBase64 = (str) => {
     const encoder = new TextEncoder();
     const data = encoder.encode(str);
     const binaryString = String.fromCharCode.apply(null, data);
     return btoa(binaryString); //btoa() คือคำสั่งการเข้ารหัส
  }

  export const base64Toutf8 = (b64) =>{
       const binaryString = atob(b64); //คำสั่ง ถอดรหัส
       const bytes = new Uint8Array(binaryString.length);
       for(let i = 0;i<binaryString.length;i++){
         bytes[i] = binaryString.charCodeAt(i);
       }
       const decoder = new TextDecoder();
       return decoder.decode(bytes);
      }

  export const checkDataIsBase64 = (data)=>{
     const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
     const isBase64 = base64Regex.test(data) && isNaN(data);

     if(!isBase64){
       return data;
     }else {
        const decodeData = base64Toutf8(data);
        return decodeData;
     }
  }