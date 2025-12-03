import { useState, useEffect, useCallback } from "react";
import { mockNews } from "../../MockData";
import { useAnnounments } from "../../hooks/announcementsStore";
import { getDateAndTime, shortDateFormate } from "../../util/inputFormat";
import { useNavigate } from "react-router-dom";

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
    setNewData(announmentData);
  }, [announmentData]);

  const filterItemFromSearch = newsdata.filter((item) => {
    if (
      item.title.toLocaleLowerCase().includes(search) ||
      item.content.toLocaleLowerCase().includes(search) ||
      item.status.toLocaleLowerCase().includes(search) ||
      item.summary.toLocaleLowerCase().includes(search)
    ) {
      return item;
    }
  });

  const handleChangeCheckbox = () => {
    setOnClickAccordian((prev) => !prev);
  };
  return (
    <>
      <div class="accordion">
        <div class="accordion-item">
          <input
            id="accordion-trigger-1"
            class="accordion-trigger-input"
            type="checkbox"
            checked={onClickAccordian === true}
            onChange={handleChangeCheckbox}
          ></input>
          <label
            class="accordion-trigger accordion-label"
            for="accordion-trigger-1"
          >
            <i class="fa-solid fa-newspaper me-2 mb-1"></i>
            <strong>ข้อมูลข่าวสาร</strong>
          </label>
          <section class="accordion-animation-wrapper">
            <div class="accordion-animation">
              <div class="accordion-transform-wrapper">
                <div class="accordion-content">
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
                          class="fa-solid fa-newspaper mb-4 text-danger"
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
                              <h5>{item.title}</h5>
                              <span className="badge  text-dark p-2 px-2 fs-6">
                                <i class="bi bi-paperclip me-2"></i>
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
                              {item.summary}
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
