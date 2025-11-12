import React, { useState } from "react";
import ImageComponent from "./Image";
import Swal from "sweetalert2";

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState([]);
  //   const [files, setFiles] = useState([]);

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
    let fileImage = [];
    for (let i = 1; i < e.target.value; i++) {
      fileImage.push(e.target.files[i]);
      let readerFile = new FileReader();
      let file = e.target.files[i];
      readerFile.onloadend = () => {
        setSelectedFile((prev) => {
          return [
            ...prev,
            {
              attachmentId: i,
              fileName: file.name,
              filePath: "",
              filesize: getfileSize(file.size),
              fileimage: reader.result,
            },
          ];
        });
      };
      if (file) {
        readerFile.readAsDataURL(file);
      }
    }
    console.log("add file", selectedFile);
  };

  const removeFile = (fileID) => {
    console.log("fileID to remove", fileID);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success custom-width-btn-alert",
        cancelButton: "btn btn-danger custom-width-btn-alert",
      },
      buttonsStyling: "w-100",
    });
    swalWithBootstrapButtons
      .fire({
        title: "คุณต้องการลบไฟล์ใช่หรือไม่",
        text: "ถ้าลบไปแล้วไม่สามารถกลับคืนมาได้ คุณแน่ใจแล้วใช่ไหม",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: `ลบได้เลย`,
        cancelButtonText: "ยกเลิกการลบ",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setSelectedFile(
            selectedFile.filter((select) => select.attachmentId !== fileID)
          );
          swalWithBootstrapButtons.fire({
            title: "ลบสำเร็จ!",
            text: "คุณทำการลบไฟล์เรียบร้อยแล้ว",
            icon: "success",
          });
        }
      });
  };

  return (
    <div>
      <div className="file-upload-area">
        <div className="uploadIcon">
          <i className="bi bi-file-earmark-arrow-up-fill fs-1 text-white"></i>
        </div>
        <div className="upload-text">แนบไฟล์ที่บริเวณนี้</div>
        <input
          type="file"
          id="fileInput"
          className="file-input"
          multiple
          onChange={inputChangeFile}
        ></input>
        {/* พื้นที่สำหรับวางไฟล์ */}
      </div>
      <div className="file-list mt-4">
        {selectedFile.length > 0 &&
          selectedFile.map((item) => (
            <div className="filter-container pe-4">
              <div className="d-flex gap-3 align-items-center  justify-content-between">
                <div className="d-flex gap-3 align-items-center">
                  {item.fileName.match(/.(jpg|jpeg|png|gif|svg)$/i) ? (
                    <ImageComponent
                      imageSRC={fileimage}
                      height="140px"
                      width="140px"
                      borderRadius="10px"
                      alt="news-file"
                      objectfit="cover"
                    />
                  ) : (
                    <i class="bi bi-file-earmark-pdf fs-1"></i>
                  )}
                  <div>
                    <div>ชื่อไฟล์</div>
                    <div className="muted">ขนาดไฟล์</div>
                  </div>
                </div>
                <a title="ลบไฟล์" onClick={() => removeFile(item.attachmentId)}>
                  <i class="bi bi-x-circle-fill text-danger"></i>
                </a>
              </div>
            </div>
          ))}
        <div className="filter-container pe-4">
          <div className="d-flex gap-3 align-items-center  justify-content-between">
            <div className="d-flex gap-3 align-items-center">
              <i class="bi bi-file-earmark-pdf fs-1"></i>
              <div>
                <div style={{ fontSize: "0.9rem" }}>DownloadPDFButton.jsx</div>
                <div className="muted">ขนาดไฟล์</div>
              </div>
            </div>
            <a title="ลบไฟล์">
              <i class="bi bi-x-circle-fill text-danger"></i>
            </a>
          </div>
        </div>
        <div className="filter-container pe-4">
          <div className="d-flex gap-3 align-items-center  justify-content-between">
            <div className="d-flex gap-3 align-items-center">
              <i class="bi bi-file-earmark-pdf fs-1"></i>
              <div>
                <div style={{ fontSize: "0.9rem" }}>DownloadPDFButton.jsx</div>
                <div className="muted">ขนาดไฟล์</div>
              </div>
            </div>
            <a title="ลบไฟล์" onClick={() => removeFile(1)}>
              <i class="bi bi-x-circle-fill text-danger"></i>
            </a>
          </div>
        </div>
        <div className="filter-container pe-4">
          <div className="d-flex gap-3 align-items-center  justify-content-between">
            <div className="d-flex gap-3 align-items-center">
              <i class="bi bi-file-earmark-pdf fs-1"></i>
              <div>
                <div style={{ fontSize: "0.9rem" }}>bootstrap-icons.svg</div>
                <div className="muted">ขนาดไฟล์</div>
              </div>
            </div>
            <a title="ลบไฟล์">
              <i class="bi bi-x-circle-fill text-danger"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
