import React from "react";
import { Link } from "react-router-dom";
import HeaderPage from "../../components/HeaderPage";
import { SubmitOrCancelButton } from "../../components/SubmitOrCancelBtnForModal";
import UploadFile from "../../components/UploadFile";

export default function AnnounmencementForm({ title = "", isEdit = false }) {
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/settings">ตั้งค่า</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-12">
            <div className="announcement-box  mb-3">
              <div className="d-flex  justify-content-between">
                <h4>หัวเรื่อง</h4>
                <div className="float-end" title="สถานะของข่าว">
                  <select name="status" className="form-control" style={{cursor:"pointer"}}>
                    <option value={"Draft"}>แบบร่างข่าว</option>
                    <option value={"Published"}>เผยแพร่ข่าว</option>
                    <option value={"Archived"}>ปิดข่าว</option>
                  </select>
                </div>
              </div>
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
              ></textarea>

              <label className="form-label">คำโปรยข่าว</label>
              <textarea
                // style={{ resize: "none" }}
                maxLength="200"
                name="summary"
                type="text"
                rows="3"
                cols="30"
                className="form-control"
                placeholder="เขียนคำโปรยที่นี้"
              ></textarea>
            </div>
             <div className="announcement-box border-bottom  mb-3">
              <h4>แนบไฟล์</h4>
               <UploadFile/>
            </div>
          </div>
          <div className="col-lg-7 col-md-12">
            <div className="announcement-box border-bottom  mb-3">
              <h4>เนื้อหาข่าว</h4>
              <textarea
                // style={{ resize: "none" }}
                maxLength="200"
                name="content"
                type="text"
                rows="20"
                cols="30"
                className="form-control"
                placeholder="บรรยายเนื้อหาข่าวที่นี้"
              ></textarea>
            </div>
            <SubmitOrCancelButton handleCancel={""} handleSubmit={""} />
          </div>
        </div>
      </div>
    </div>
  );
}
