import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderPage from "../../components/HeaderPage";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import UploadFile from "../../components/UploadFile";
import { useAnnounments } from "../../hooks/announcementsStore";
import Swal from "sweetalert2";

import {
  getDateOnly,
} from "../../util/inputFormat";
import { useParams } from "react-router-dom";
import LoadingSpin from "../../components/loadingSpin";
import { AnnounmentStatusEnum } from "../../enum/announcementEnum";
export default function AnnounmencementForm({ title = "", isEdit = false }) {
  const { publicAnnouncementId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    summary: "",
    content: "",
    status: AnnounmentStatusEnum.DRAFT,
    publichedAt: new Date(),
    files: [],
  });
  const [selectedFile, setSelectedFile] = useState([]);
  const [transectionFile, setTransectionFile] = useState([]);
  const [storeFileIDToDel, setStoreFileIDToDel] = useState([]);
  const {
    createAnnouncement,
    updateAnnouncement,
    announmentById,
    getAnnouncementsById,
  } = useAnnounments();

  //เก็บไฟล์ที่ต้องการลบ
  const fetchDataTable = useCallback(async () => {
    try {
      setIsLoading(true);
      await getAnnouncementsById(publicAnnouncementId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      return;
    }
  }, [getAnnouncementsById]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    if (isEdit) {
      setIsLoading(true);
      if (!announmentById) {
        setIsLoading(false);
        return;
      }
      setInput({
        title: announmentById.title,
        summary: announmentById.summary,
        content: announmentById.content,
        status: announmentById.status,
        publichedAt: new Date(),
        files: announmentById.attachments,
      });
      const announmentList = announmentById.attachments || [];

      if (announmentList.length > 0) {
        const fileMetadataList = announmentList.map((item) => {
          const jsonString = JSON.stringify(item);
          const blobFile = new Blob([jsonString], { type: "application/json" }); //type ตามนามสกุลไฟล์
          return new File([blobFile], item.fileName, { type: blobFile.type });
          // (file = new File([blobFile], { type: "application/json" }));
        });
        // console.log(fileMetadataList);

        //สามารถไม่ส่งไฟล์ได้ / setSeletedFile เป็น state ที่ใช้ในการเก็บไฟล์ upload
        setSelectedFile((prev) => {
          const prevList = announmentList.map((item, index) => ({
            attachmentId: item.attachmentId,
            fileName: item.fileName,
            filePath: item.filePath,
            attachments: fileMetadataList.find((f) => f.name === item.fileName),
          }));
          return JSON.stringify(prev) === JSON.stringify(prevList)
            ? prev
            : prevList;
        });
        //ต้องทำการ convert ข้อมูลฝห้อยู่ในรูป type file เพราะตอนนี้เป็น type obj ตอนนี้ข้อมูลที่ get มากับที่ส่งกับไป คนละข้อมูลกัน
        console.log(selectedFile);
      }
      setIsLoading(false);
    }
  }, [announmentById]);

  // useEffect(() => {
  //   console.log("transectionFile updated:", transectionFile);
  // }, [transectionFile]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearInput = () => {
    setInput({
      title: "",
      summary: "",
      content: "",
      status: AnnounmentStatusEnum.DRAFT,
      publichedAt: new Date(),
      files: [],
    });
    setSelectedFile([]);
    setTransectionFile([]);
  };

  const handleSubmit = async (e) => {
    // debugger;
    e.preventDefault();


    const getDate = getDateOnly(input.publichedAt);

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("summary", input.summary);
    formData.append("content", input.content);
    formData.append("status", input.status);
    formData.append("PublishedAt", getDate);

    // console.log("transection in submit", transectionFile);
    if (transectionFile.length > 0) {
      transectionFile.forEach((item) => {
        if (item.attachments instanceof File) {
          if (isEdit) {
            formData.append(`newFiles`, item.attachments);
          } else {
            formData.append(`files`, item.attachments);
          }
        }
      });
    }

    if (isEdit && storeFileIDToDel.length > 0) {
      storeFileIDToDel.forEach((id) => {
        formData.append("deleteAttachmentIds", id);
      });
    }

    // console.log("input data", [...formData]);

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success custom-width-btn-alert",
        cancelButton: "btn btn-danger custom-width-btn-alert",
      },
      buttonsStyling: "w-100",
    });
    swalWithBootstrapButtons
      .fire({
        title: "คุณต้องการบันทึกรายการใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ยื่นยันการบันทึกรายการ",
        cancelButtonText: "ยกเลิกการบันทึกรายการ",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const { success, announcementErrorMessage } = isEdit
            ? await updateAnnouncement(formData, publicAnnouncementId)
            : await createAnnouncement(formData);
          if (success) {
            swalWithBootstrapButtons.fire({
              title: "บึนทึกรายการสำเร็จ!",
              icon: "success",
            });
            clearInput();
            setStoreFileIDToDel([]);
            navigate("/settings/announcement");
          } else {
            Swal.fire({
              title: "บันทึกข้อมูลไม่สำเร็จ",
              text: announcementErrorMessage,
              icon: "error",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          setStoreFileIDToDel([]);
          swalWithBootstrapButtons.fire({
            title: "ยกเลิก",
            text: "คุณทำการยกเลิกรายการเรียบร้อยแล้ว",
            icon: "error",
          });
        }
      });

    //เมื่อทำการบันทึกข้อมูลใน API เรียบร้อย ให้ทำการ set ตัวแปลให้เป็นค่าว่าง
  };

  const removeFile = (fileID) => {
    // console.log("fileID to remove", fileID);
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
        text: "กรุณาทำการบันทึกข้อมูลหลังการลบไฟล์ เพื่อที่จะให้ให้การลบไฟล์ได้อย่างสมบูรณ์",
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
          //สำหรับทำการเก็บรหัสไฟล์ที่ต้องการลบ
          setStoreFileIDToDel((prev) =>
            prev.includes(fileID) ? prev : [...prev, fileID]
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
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/settings/announcement">การจัดการข่าวสาร</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container">
        {isLoading ? (
          <LoadingSpin />
        ) : (
          <div className="row">
            <div className="col-lg-5 col-md-12">
              <div className="announcement-box  mb-3">
                <div className="d-flex  justify-content-between">
                  <h4>หัวเรื่อง</h4>
                  <div className="float-end" title="สถานะของข่าว">
                    <select
                      name="status"
                      className="form-select "
                      style={{ cursor: "pointer" }}
                      value={input.status}
                      onChange={handleChangeInput}
                    >
                      <option value={AnnounmentStatusEnum.DRAFT}>
                        แบบร่าง : {AnnounmentStatusEnum.DRAFT}
                      </option>
                      <option value={AnnounmentStatusEnum.PUBLISHED}>
                        เผยแพร่ : {AnnounmentStatusEnum.PUBLISHED}
                      </option>
                      <option value={AnnounmentStatusEnum.ARCHIVED}>
                        เก็บไว้ก่อน : {AnnounmentStatusEnum.ARCHIVED}
                      </option>
                    </select>
                  </div>
                </div>
                <hr className="text-danger" />
                <label className="form-label">หัวเรื่องข่าว</label>
                <textarea
                  style={{ resize: "none" }}
                  maxLength="200"
                  name="title"
                  type="text"
                  rows="2"
                  cols="30"
                  className="form-control mb-3"
                  placeholder="เขียนหัวข้อข่าวที่นี้"
                  value={input.title}
                  onChange={handleChangeInput}
                ></textarea>

                <label className="form-label">คำโปรยข่าว</label>
                <textarea
                  maxLength="200"
                  name="summary"
                  type="text"
                  rows="3"
                  cols="30"
                  className="form-control"
                  placeholder="เขียนคำโปรยที่นี้"
                  value={input.summary}
                  onChange={handleChangeInput}
                ></textarea>
              </div>
              <div className="announcement-box border-bottom  mb-3">
                <h4>แนบไฟล์ <span  className="muted ">( สามารถแนปไฟล์ภาพและไฟล์ pdf ได้ )</span></h4>
                <hr className="text-danger" />
                <UploadFile
                  selectedFile={selectedFile}
                  setSelectedFile={setSelectedFile}
                  onRemove={removeFile}
                  transactionFile={transectionFile}
                  setTransectionFile={setTransectionFile}
                />
              </div>
            </div>
            <div className="col-lg-7 col-md-12">
              <div className="announcement-box border-bottom  mb-3">
                <h4>เนื้อหาข่าว</h4>
                <hr className="text-danger" />
                <textarea
                  name="content"
                  type="text"
                  rows="20"
                  cols="30"
                  className="form-control"
                  placeholder="บรรยายเนื้อหาข่าวที่นี้"
                  value={input.content}
                  onChange={handleChangeInput}
                ></textarea>
              </div>
              <SubmitOrCancelButton
                handleCancel={clearInput}
                handleSubmit={(e) => handleSubmit(e)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
