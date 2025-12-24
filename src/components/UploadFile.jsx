import React, { useState } from "react";
import ImageComponent from "./Image";
import Swal from "sweetalert2";

export default function UploadFile({
  selectedFile,
  setSelectedFile,
  onRemove,
  transactionFile,
  setTransectionFile,
}) {

  const getfileSize = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 ไบต์";
    const kilobyte = 1024;
    const decimal = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(kilobyte));
    return (
      parseFloat((bytes / Math.pow(kilobyte, i)).toFixed(decimal)) +
      " " +
      sizes[i]
    );
  };

  const inputChangeFile = (e) => {
    // debugger;
    let fileImage = [];
    const files = Array.from(e.target.files);

    files.forEach((file, index) => {
      fileImage.push(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        const newFileUpload = {
          attachmentId: index + 1, // ✅ รันต่อจากของเดิม
          fileName: file.name,
          filePath: URL.createObjectURL(file),
          filesize: getfileSize(file.size),
          fileimage: reader.result,
          attachments: file,
        };
        setSelectedFile((prev) => [...prev, newFileUpload]);
        //เก็บไว้เฉพาะที่ส่งไปกลับเป็นไฟล์
        setTransectionFile((prev) => [
          ...prev,
          {
            attachmentId: newFileUpload.attachmentId,
            attachments: newFileUpload.attachments,
          },
        ]);
      };

      reader.readAsDataURL(file);
    });

  };


  return (
    <div>
      <div className="file-upload-area" title="แนบไฟล์ที่นี้">
        <div className="uploadIcon">
          <i className="bi bi-file-earmark-arrow-up-fill fs-1 text-white"></i>
        </div>
        <div className="upload-text">แนบไฟล์ที่บริเวณนี้</div>
        <input
          type="file"
          id="fileInput"
          className="file-input"
          multiple
          onChange={(e) => inputChangeFile(e)}
          accept=".pdf,image/jpeg,image/png,.jpg,.jpeg,.png"
        ></input>
        {/* พื้นที่สำหรับวางไฟล์ */}
      </div>

      <div
        className="file-list mt-4 p-1"
        style={{ maxHeight: "300px", overflowY: "auto" }}
      >
        {selectedFile.length > 0 &&
          selectedFile.map((item) => (
            <div className="filter-container pe-4" key={item.attachmentId}>
              <div className="d-flex gap-3 align-items-center  justify-content-between">
                <div className="d-flex gap-3 align-items-center">
                  {item.fileName.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                    <ImageComponent
                      imageSRC={item.fileimage}
                      height="60px"
                      width="60px"
                      borderRadius="10px"
                      alt="news-file"
                      objectfit="cover"
                    />
                  ) : item.fileName.match(/.(pdf)$/i) ? (
                    <i className="bi bi-file-earmark-pdf fs-1"></i>
                  ) : (
                    <i className="bi bi-file-earmark fs-1"></i>
                  )}
                  <div className="text-wrap">
                    <div style={{ fontSize: "0.9rem" }}>{item.fileName}</div>
                    {/* <div className="muted" style={{fontSize:"0.8rem"}}>ขนาดไฟล์ : {item.filesize}</div> */}
                  </div>
                </div>
                <a title="ลบไฟล์" onClick={() => onRemove(item.attachmentId)}>
                  {/* แนปรหัสไฟล์แนปเพื่อทำการลบ */}
                  <i className="bi bi-x-circle-fill text-danger"></i>
                </a>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
// onClick={() => onRemove(file.fileId)}
