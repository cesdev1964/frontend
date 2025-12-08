import { useState, useEffect, useCallback } from "react";
import { mockNews } from "../../MockData";
import { useAnnounments } from "../../hooks/announcementsStore";
import { getDateAndTime, shortDateFormate } from "../../util/inputFormat";
import { useNavigate } from "react-router-dom";
import { AnnounmentStatusEnum } from "../../enum/announcementEnum";

export default function AnnouncementCard() {
  const [newsdata, setNewData] = useState([]);
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const [search, setSearch] = useState("");
  const { getAnnounmentData, announmentData } = useAnnounments();
  const navigate = useNavigate();

  const fetchDataTable = useCallback(async () => {
    try {
      await getAnnounmentData();
    } catch (error) {
      return;
    }
  }, [getAnnounmentData]);

  useEffect(() => {
    fetchDataTable();
  }, [fetchDataTable]);

  useEffect(() => {
    if (!announmentData) return;
    let displayOnlyPublic = announmentData.filter(
      (item) => item.status === AnnounmentStatusEnum.PUBLISHED
    );
    setNewData(displayOnlyPublic);
  }, [announmentData]);

  const filterItemFromSearch = newsdata.filter((item) => {
    if (
      item.title.toLocaleLowerCase().includes(search) ||
      item.content.toLocaleLowerCase().includes(search) ||
      item.status.toLocaleLowerCase().includes(search)
    ) {
      return item;
    }
  });

  const handleChangeCheckbox = () => {
    setOnClickAccordian((prev) => !prev);
  };
  return (
    <>
      <div className="accordion">
        <div className="accordion-item">
          <input
            id="accordion-trigger-1"
            className="accordion-trigger-input"
            type="checkbox"
            checked={onClickAccordian === true}
            onChange={handleChangeCheckbox}
          ></input>
          <label
            className="accordion-trigger accordion-label"
            htmlFor="accordion-trigger-1"
          >
            <i className="fa-solid fa-newspaper me-2 mb-1"></i>
            <strong>ข้อมูลข่าวสาร</strong>
          </label>
          <section className="accordion-animation-wrapper">
            <div className="accordion-animation">
              <div className="accordion-transform-wrapper">
                <div className="accordion-content">
                  <div className="search-box">
                    <div className="searchBar me-3">
                      <input
                        type="text"
                        autoComplete="current-password"
                        placeholder="ค้นหาข้อมูลข่าวสาร"
                        className={`searchInput form-control`}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="news-container mt-3">
                    {filterItemFromSearch.length === 0 ||
                    newsdata.length === 0 ? (
                      <div className="d-flex flex-column align-items-center justify-content-center p-4">
                        <i
                          className="fa-solid fa-newspaper mb-4 text-danger"
                          style={{ fontSize: "60px" }}
                        ></i>
                        <h5 className="text-danger">ไม่พบข่าวประกาศ</h5>
                      </div>
                    ) : (
                      <>
                        {filterItemFromSearch.map((item, index) => (
                          <div
                            className="w-100 p-3 rounded-3 mb-3 otReqCard shadow-sm"
                            key={index}
                            onClick={() =>
                              navigate(
                                `/announcement/${item.publicAnnouncementId}`
                              )
                            }
                          >
                            <div className="d-flex align-items-center justify-content-between">
                              <p
                                style={{
                                  fontSize: "1.1rem",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.title}
                              </p>
                              <span className="badge  text-dark p-2 px-2 fs-6">
                                <i className="bi bi-paperclip me-2"></i>
                                {item.attachmentCount}
                              </span>
                            </div>

                            <p className="OT-description-label mt-3">
                              {" "}
                              วันที่ลงข่าวสาร :{" "}
                              <span className="OT-description-value">
                                {shortDateFormate(item.publishedAt)}
                              </span>
                            </p>
                            <p
                              style={{ fontSize: "0.9rem" }}
                              className="ps-3 text-primary"
                            >
                              <em>{item.summary}</em>
                            </p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
