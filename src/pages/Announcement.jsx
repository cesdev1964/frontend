import { React, useCallback, useEffect, useState } from "react";
import { useTitle } from "../hooks/useTitle";
import HeaderPage from "../components/HeaderPage";
import { Link, useParams } from "react-router-dom";
import { useAnnounments } from "../hooks/announcementsStore";
import { shortDateFormate } from "../util/inputFormat";
import LoadingSpin from "../components/loadingSpin";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function Announcement({ title }) {
  useTitle(title);
  const [isLoading, setIsLoading] = useState(false);
  const { publicAnnouncementId } = useParams();
  const { getAnnountmentById, announmentById } = useAnnounments();
  const fetchDataTable = useCallback(async () => {
    setIsLoading(true);
    try {
      await getAnnountmentById(publicAnnouncementId);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      return;
    }
  }, [getAnnountmentById]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);
  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <i class="bi bi-house-door-fill"></i>
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {title}
          </li>
        </ol>
      </nav>
      <HeaderPage pageName={title} />
      <div className="container">
        {!isLoading ? (
          <div dis>
            <div className="announcement-box border-bottom  border-danger border-4 mb-3">
              <h3>{announmentById.title ?? "ไม่พบหัวข้อข่าว"}</h3>

              <p className="OT-description-label mt-3 mb-4">
                {" "}
                <i class="bi bi-calendar-week me-2 text-danger"></i>
                วันที่ลงข่าวสาร :{" "}
                <span className="OT-description-value">
                  {shortDateFormate(announmentById.publishedAt) ??
                    "ไม่พบวันที่ลงข่าว"}
                </span>
              </p>
              <h5 className="text-secondary">{announmentById.summary ?? ""}</h5>
            </div>
            <div className="announcement-box border-bottom  border-danger border-4 mb-3">
              {announmentById.content ? (
                <p>{announmentById.content}</p>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center p-4">
                  <i
                    class="fa-solid fa-newspaper mb-4 text-danger"
                    style={{ fontSize: "60px" }}
                  ></i>
                  <h5 className="text-danger">ไม่พบเนื้อหาข่าวสาร</h5>
                  <p>
                    ในรอบไม่กี่สัปดาห์ที่ผ่านมา
                    นอกจากเรื่องราวของเหล่านักสู้ลูกหนังตัวน้อยๆ จากทีม
                    ‘หมอนทองวิทยา’
                    ที่ปลุกความฝันและเปลวไฟในหัวใจของใครมากมายแล้ว
                    อีกหนึ่งเกมกีฬาที่ได้รับการจับตามองอย่างมากอย่างน่าอัศจรรย์คือการแข่งขันเบสบอล
                    เวิลด์ ซีรีส์ รายการที่มีศักดิ์และสิทธิ์เท่ากับตำแหน่ง
                    ‘แชมป์โลก’ ของเบสบอล ส่วนหนึ่งเป็นเพราะการแข่งขันระหว่าง
                    บลูเจย์ส์ กับแอลเอ ดอดเจอร์ส เป็นไปอย่างดุเดือด
                    พลิกผันไปมาจนถึงเกมสุดท้าย
                    อีกส่วนหนึ่งปฏิเสธไม่ได้ว่าคนจำนวนไม่น้อยอยากจับตาดู โชเฮ
                    โอตานิ นักกีฬาระดับซูเปอร์สตาร์ผู้เป็น ‘ดาวฤกษ์’
                    ของวงการกีฬาในระดับโลก
                    ที่ตอนนี้กลายเป็นแรงบันดาลใจของใครต่อใครอีกมากมายที่อยากต่อ
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <LoadingSpin />
        )}
        {announmentById.attachments != undefined && (
          <div className="announcement-box border-bottom  border-danger border-4">
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
    </div>
  );
}
