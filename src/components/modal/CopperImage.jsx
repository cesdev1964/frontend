import { useState, useRef } from "react";
import { SubmitOrCancelButton } from "../SubmitOrCancelBtnForModal";
import profileImg from "../../assets/image/Gintama-Sakata.jpg";

export default function CopperImage({ madalName, src, setPreview }) {
  const cropRef = useRef(null);
  const getImageUrl = () => {
    const img = cropRef.current;
    if (!img) return;

    // สร้าง canvas
    const canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // วาดรูปลง canvas
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // แปลงเป็น base64 DataURL
    return canvas.toDataURL("image/jpeg");
  };

  const handleSave = async () => {
    if (cropRef) {
      const dataUrl = getImageUrl();
      //   console.log("Result:", dataUrl);
      const result = await fetch(dataUrl);
      const blob = await result.blob();
      setPreview(URL.createObjectURL(blob));
      //   console.log(blob);
      const currentModal = document.getElementById(madalName);
      const modal = bootstrap.Modal.getOrCreateInstance(currentModal);
      modal.hide();
    }
  };

  const handleClose = () => {};
  return (
    <>
      <div
        class="modal fade modal-nested shadow-lg"
        id={madalName}
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-white">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                อัปโหลดภาพประจำตัว
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="d-flex flex-column align-items-center justify-content-center p-3 mb-3">
              <div style={{ height: "250px", width: "250px" }}>
                <img
                  className="mb-4"
                  src={src ? src : profileImg}
                  alt="profileImg"
                  height="100%"
                  width="100%"
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  ref={cropRef}
                />
              </div>
            </div>
            <SubmitOrCancelButton
              handleCancel={handleClose}
              handleSubmit={handleSave}
            />
          </div>
        </div>
      </div>
    </>
  );
}
