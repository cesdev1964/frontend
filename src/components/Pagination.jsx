import  { useState, useEffect } from "react";


const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

export default function Pagination({
  totalRecords,
  pageLimit,
  pageNeighbours,
  onPageChanged,
  currentPage,
}) {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / pageLimit));
  }, [setTotalPages]);

  const setNumberPage = () => {
    const totalNumber = pageNeighbours * 2 + 3;
    const totalBlock = totalNumber + 2;

    if (totalPages > totalBlock) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeft = startPage > 2;
      const haRight = totalPages - (endPage > 1);
      const splillOfset = totalNumber - (pages.length + 1);

      switch (true) {
        case hasLeft && !haRight: {
          const extraPage = range(startPage - splillOfset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPage, ...pages];
          break;
        }
        case hasLeft && haRight:

        default:
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  };
  const pages = setNumberPage() || [];
  return (
    <>
      <nav>
        <ul className="pagination">
          {pages.map((page, index) => {
            // กรณีย้อนกลับ
            if (page === LEFT_PAGE) {
              return (
                <li key={index} className={`page-item`}>
                  <a
                    href="/"
                    className="page-link"
                    aria-label="ก่อนหน้า"
                    onClick={(e) => onPageChanged(e, pageNeighbours * 2 - 1)}
                  >
                    <span aria-hidden="true"><i class="bi bi-arrow-left"></i></span>
                  </a>
                </li>
              );
            }
            // กรณีถัดไป
            if (page === RIGHT_PAGE) {
              return (
                <li className={`page-item`}>
                  <a
                    href="/"
                    className="page-link"
                    aria-label="ถัดไป"
                    onClick={(e) => onPageChanged(e, pageNeighbours * 2 + 3)}
                  >
                    <span aria-hidden><i class="bi bi-arrow-right"></i></span>
                  </a>
                </li>
              );
            }
            // ปุ่มหมายเลขหน้า
            return (
              <>
                <li
                  key={index}
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                  <a
                    href="/"
                    className="page-link"
                    onClick={(e) => onPageChanged(e, page)}
                  >
                    {page}
                  </a>
                </li>
              </>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
