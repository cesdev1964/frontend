import React, { useState, useEffect } from "react";
function Button({ active, children, ...props }) {
  return (
    <button
      className={`inline-block py-2 px-2 mx-px text-center leading-none rounded ${
        active
          ? "text-white font-bold btn btn-danger"
          : "btn-outline-primary bg-white"
      } ${typeof children === "number" ? "w-12 px-1" : "px-4"}`}
      {...props}
    >
      {children}
    </button>
  );
}

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

  const setNumberPage = ()=>{
    const totalNumber = pageNeighbours*2+3;
    const totalBlock = totalNumber+2;

    if(totalPages > totalBlock){
      const startPage = Math.max(2,currentPage-pageNeighbours);
      const endPage = Math.min(totalPages-1,currentPage+pageNeighbours);

      let pages = range(startPage,endPage);

      const hasLeft = startPage >2;
      const haRight = totalPages - (endPage>1);
      const splillOfset = totalNumber - (pages.length +1);

      switch (true) {
        case hasLeft && !haRight:{
          const extraPage = range(startPage - splillOfset,startPage-1);
          pages = [LEFT_PAGE,...extraPage,...pages];
          break;
        }
        case hasLeft && haRight:
      
        default:
          pages = [LEFT_PAGE,...pages,RIGHT_PAGE]
          break;
      }
      return [1,...pages,totalPages];
    }
    return range(1,totalPages);
  }
  //   return (
  //     <div className="p-5 d-flex align-items-center justify-content-center">
  //       <Button
  //         className="btn btn-outline-primary bg-white"
  //         onClick={handlePrevPage}
  //         disabled={page <= 1}
  //       >
  //         ก่อนหน้า
  //       </Button>
  //       {pages - page < 1 && page - 4 > 0 && (
  //         <Button
  //           onClick={() => setPage(page - 4)}
  //           className="btn btn-outline-primary bg-white"
  //         >
  //           {page - 4}
  //         </Button>
  //       )}
  //       {pages - page < 2 && page - 3 > 0 && (
  //         <Button
  //           onClick={() => setPage(page - 3)}
  //           className="btn btn-outline-primary bg-white"
  //         >
  //           {page - 3}
  //         </Button>
  //       )}
  //       {pages - page < 2 && page - 2 > 0 && (
  //         <Button
  //           onClick={() => setPage(page - 2)}
  //           className="btn btn-outline-primary bg-white"
  //         >
  //           {page - 2}
  //         </Button>
  //       )}
  //       {pages - page < 1 && page - 1 > 0 && (
  //         <Button
  //           onClick={() => setPage(page - 1)}
  //           className="btn btn-outline-primary bg-white"
  //         >
  //           {page - 1}
  //         </Button>
  //       )}
  //       <Button className="btn btn-outline-primary bg-white">{page}</Button>
  //       {page + 1 <= pages && (
  //         <Button
  //           onClick={() => setPage(page + 1)}
  //           className="btn btn-outline-primary bg-white"
  //         >
  //           {page + 1}
  //         </Button>
  //       )}
  //       {page + 2 <= pages && (
  //         <Button
  //           onClick={() => setPage(page + 2)}
  //           className="btn btn-outline-primary bg-white"
  //         >
  //           {page + 2}
  //         </Button>
  //       )}
  //       {page + 3 <= pages && page < 3 && (
  //         <Button
  //           onClick={() => setPage(page + 3)}
  //           className="btn btn-outline-primary bg-white"
  //         >
  //           {page + 3}
  //         </Button>
  //       )}
  //       {page + 4 <= pages && page < 2 && (
  //         <Button
  //           onClick={() => setPage(page + 4)}
  //           className="btn btn-outline-primary bg-white"
  //         >
  //           {page + 4}
  //         </Button>
  //       )}
  //       <Button
  //         className="btn btn-outline-primary bg-white"
  //         onClick={handleNextPage}
  //         disabled={!hasNextPage}
  //       >
  //         หน้าต่อไป
  //       </Button>
  //     </div>
  //   );
  return (
    <div className="p-5 d-flex align-items-start justify-content-center gap-2">
      <Button key={index} >
      </Button>
      {/* <Button onClick={handlePrevPage} disabled={page <= 1}>
        ก่อนหน้า
      </Button>
      {pages - page < 1 && page - 4 > 0 && (
        <Button onClick={() => setPage(page - 4)}>{page - 4}</Button>
      )}
      {pages - page < 2 && page - 3 > 0 && (
        <Button onClick={() => setPage(page - 3)}>{page - 3}</Button>
      )}
      {pages && page - 2 > 0 && (
        <Button onClick={() => setPage(page - 2)}>{page - 2}</Button>
      )}
      {pages && page - 1 > 0 && (
        <Button onClick={() => setPage(page - 1)}>{page - 1}</Button>
      )}
      <Button active={true}>{page}</Button>
      {page + 1 <= pages && (
        <Button onClick={() => setPage(page + 1)}>{page + 1}</Button>
      )}
      {page + 2 <= pages && (
        <Button onClick={() => setPage(page + 2)}>{page + 2}</Button>
      )}
      {page + 3 <= pages && page < 3 && (
        <Button onClick={() => setPage(page + 3)}>{page + 3}</Button>
      )}
      {page + 4 <= pages && page < 2 && (
        <Button onClick={() => setPage(page + 4)}>{page + 4}</Button>
      )}
      <Button onClick={handleNextPage} disabled={!hasNextPage}>
        ต่อไป
      </Button> */}
    </div>
  );
}
