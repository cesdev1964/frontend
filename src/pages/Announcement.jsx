import { React, useCallback, useEffect, useState } from "react";
import { useTitle } from "../hooks/useTitle";
import HeaderPage from "../components/HeaderPage";
import { Link, useParams } from "react-router-dom";
import { useAnnounments } from "../hooks/announcementsStore";
import { shortDateFormate } from "../util/inputFormat";
import LoadingSpin from "../components/loadingSpin";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Announcement({ title, isPreview = false }) {
  useTitle(title);
  const [isLoading, setIsLoading] = useState(false);
  const { publicAnnouncementId } = useParams();
  const { getAnnouncementsById, announmentById } = useAnnounments();
  const fetchDataTable = useCallback(async () => {
    setIsLoading(true);
    try {
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
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {isPreview ? (
            <li className="breadcrumb-item">
              <Link to="/settings/announcement">การจัดการข่าวสาร</Link>
            </li>
          ) : (
            <li className="breadcrumb-item">
              <Link to="/">
                <i className="bi bi-house-door-fill"></i>
              </Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container">
        {!isLoading ? (
          <div className="announcement-box p-4">

            <div className="border-bottom  border-danger border-4 my-3">
              <h3>{announmentById.title ?? "ไม่พบหัวข้อข่าว"}</h3>

              <p className="OT-description-label mt-3 mb-4">
                {" "}
                <i className="bi bi-calendar-week me-2 text-danger"></i>
                วันที่ลงข่าวสาร :{" "}
                <span className="OT-description-value">
                  {shortDateFormate(announmentById.publishedAt) ??
                    "ไม่พบวันที่ลงข่าว"}
                </span>
              </p>
              <h5 className="text-secondary">{announmentById.summary ?? ""}</h5>
            </div>
            <div className="border-bottom  border-danger border-4 mb-3 px-5 py-5">
              {announmentById.content ? (
                <p style={{textIndent:"1.5em",lineHeight:2}}>{announmentById.content}</p>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center p-4">
                  <i
                    className="fa-solid fa-newspaper mb-4 text-danger"
                    style={{ fontSize: "60px" }}
                  ></i>
                  <h5 className="text-danger">ไม่พบเนื้อหาข่าวสาร</h5>
                </div>
              )}
            </div>
            {announmentById.attachments != undefined && (
              <div>
                <p className="fw-bold">ไฟล์แนป</p>
                <div className="item-flex flex-wrap">
                  {announmentById.attachments.map((item) => (
                    <a
                      className="btn-outline-primary rounded-3 p-1 text-center"
                      title="ดาวน์โหลดไฟล์แนป"
                      key={item.attachmentId}
                      href={`${baseURL}${item.filePath}`}
                      download
                      target="_blank"
                      style={{ textDecoration: "none", cursor: "pointer" }}
                    >
                      <i className="bi bi-file-earmark-arrow-down me-1"></i>
                      {item.fileName}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <LoadingSpin />
        )}
      </div>
    </div>
  );
}
