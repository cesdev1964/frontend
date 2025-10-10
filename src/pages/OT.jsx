// src/pages/Home.jsx
import { useState, useEffect } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useTitle } from "../hooks/useTitle";
import Swal from "sweetalert2";
import HeaderPage from "../components/HeaderPage";
import { mockNews } from "../MockData";

export default function OT({ title }) {
  useTitle(title);
  const [newsdata, setNewData] = useState([]);

  useEffect(() => {
    setNewData(mockNews);
  }, [newsdata]);

  return (
    <div>
      <HeaderPage pageName={title} />
      <div className="flex-grow-1 d-flex align-items-start justify-content-center">
        <div className="accordion w-100" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button bg-danger text-danger"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#OThistory"
                aria-expanded="true"
                aria-controls="OThistory"
              >
                <i class="bi bi-hourglass-split me-2 mb-1"></i>
                <strong>ประวัติโอที</strong>
              </button>
            </h2>
            <div
              id="OThistory"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div className="news-container">
                  {newsdata.length === 0 ? (
                    <div className="d-flex flex-column align-items-center justify-content-center p-4">
                      <i
                        class="bi bi-hourglass-split mb-2 text-danger"
                        style={{ fontSize: "60px" }}
                      ></i>
                      <h4 className="text-danger">ไม่พบการขอโอที</h4>
                      <div className="add-btn mt-3">
                        <a
                          className="power py-2"
                          style={{ maxWidth: "200px" }}
                          data-bs-toggle="modal"
                          data-bs-target="#addOTModal"
                        >
                          <span>
                            <i class="bi bi-plus-circle fs-4"></i>
                          </span>{" "}
                          <span className="label">ทำการขอโอที</span>
                        </a>
                      </div>
                    </div>
                  ) : (
                    <>
                      {newsdata.map((item, index) => (
                        <div
                          className="w-100 card p-3 border-start-4 rounded-3 mb-3"
                          style={{ borderLeft: "5px solid #ff7a88" }}
                          key={index}
                        >
                          <h5>{item.header}</h5>
                          <p
                            style={{ lineHeight: "0.6rem", fontSize: "0.9rem" }}
                            className="text-secondary"
                          >
                            <i class="fa-regular fa-calendar-days me-2"></i>
                            {item.postDate} ({item.postTime})
                          </p>
                          <p style={{ fontSize: "0.9rem" }} className="ps-3">
                            {item.content}
                          </p>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* modal add */}
      <div
        class="modal fade"
        id="addOTModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content bg-primary">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                <i className="bi bi-plus-circle fs-4 me-2"></i>
                ทำการขอโอที
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body d-flex flex-column align-items-center">
              <div class="alert alert-info w-100" role="alert">
                วันที่ 21/09/2568 กะ (นับชั่วโมง) OF3 เวลาเข้า 08:00 ออก 00:00 วันหยุด พัก 60 นาที
              </div>
                  <div className="d-flex flex-column align-items-center mb-4">
                <div className="d-flex gap-2 w-75">
                  <button
                    className="btn btn-outline-primary w-100"
                    data-bs-dismiss="modal"
                    // onClick={ClearInput}
                  >
                    ยกเลิก
                  </button>
                  <button
                    className="btn btn-primary w-100"
                    // onClick={handleSubmit}
                  >
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
