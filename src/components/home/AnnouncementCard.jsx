import { useState, useEffect } from "react";
import { mockNews } from "../../MockData";
import SearchBox from "../SearchBox";

export default function AnnouncementCard() {
  const [newsdata, setNewData] = useState([]);
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const [search, setSearch] = useState("");
  useEffect(() => {
    setNewData(mockNews);
  }, [newsdata]);

  const filterItemFromSearch = newsdata.filter((item) => {
    if (
      item.header.toLocaleLowerCase().includes(search) ||
      item.content.toLocaleLowerCase().includes(search)
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
            onClick={handleChangeCheckbox}
          ></input>
          <label
            class="accordion-trigger accordion-label"
            for="accordion-trigger-1"
          >
            <i class="fa-solid fa-newspaper me-2 mb-1"></i>
            <strong>ข่าวประกาศ</strong>
          </label>
          <section class="accordion-animation-wrapper">
            <div class="accordion-animation">
              <div class="accordion-transform-wrapper">
                <div class="accordion-content">
                  <div className="search-box">
                    <div className="searchBar me-3">
                      {/* <i className="bi bi-search text-muted searchIcon"></i> */}
                      <input
                        type="text"
                        autoComplete="current-password"
                        placeholder="ค้นหาข่าวประกาศ"
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
                            className="w-100 card p-3 border-start-4 rounded-3 mb-3"
                            style={{ borderLeft: "5px solid #ff7a88" }}
                            key={index}
                          >
                            <h5>{item.header}</h5>
                            <p
                              style={{
                                lineHeight: "0.6rem",
                                fontSize: "0.9rem",
                              }}
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
          </section>
        </div>
      </div>
    </>
  );
}
