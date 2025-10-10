import { useState, useEffect } from "react";
import { mockNews } from "../../MockData";
import SearchBox from "../SearchBox";

export default function AnnouncementCard() {
  const [newsdata, setNewData] = useState([]);
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
  return (
    <div className="accordion" id="accordionExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button bg-danger text-danger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseNews"
            aria-expanded="true"
            aria-controls="collapseNews"
          >
            <i class="fa-solid fa-newspaper me-2 mb-1"></i>
            <strong>ข่าวประกาศ</strong>
          </button>
        </h2>
        <div
          id="collapseNews"
          class="accordion-collapse collapse show"
          data-bs-parent="#accordionExample"
        >
          <div class="accordion-body">
              <SearchBox
                onChange={(e) => setSearch(e.target.value)}
                search={search}
                placeholder="ค้นหาข่าวประกาศ"
              />
            <div className="news-container">
              {filterItemFromSearch.length === 0 || newsdata.length === 0 ? (
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
  );
}
