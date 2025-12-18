import React, { useState, useCallback, useEffect } from "react";
import OTcard from "./OTcard";
import handleDelete from "../../util/handleDelete";
import Pagination from "../Pagination";

export default function OTrequestList({
  otIsLoading,
  otData,
  fetchData,
  deleteOTrequest,
  header,
}) {
  const [onClickAccordian, setOnClickAccordian] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginate, setShowPaginate] = useState(false);
  const handleChangeAccordian = () => {
    setOnClickAccordian((prev) => !prev);
  };

  //เกี่ยวกับ pagination
  let NUM_OF_RECORDS = otData.length;
  let LIMIT = 4;

  const onPageChanged = useCallback(
    (event, page) => {
      event.preventDefault();
      setCurrentPage(page);
    },
    [setCurrentPage]
  );
  const currentData = otData.slice(
    (currentPage - 1) * LIMIT,
    (currentPage - 1) * LIMIT + LIMIT
  );

  useEffect(() => {
    if (NUM_OF_RECORDS >= LIMIT) {
      setShowPaginate(true);
    } else {
      setShowPaginate(false);
    }
  }, [NUM_OF_RECORDS, LIMIT]);

  return (
    <>
      <div className="announcement-box border border-primary">
        <div className="text-danger">
          <h5>
            <i className="bi bi-list-task me-2 mb-1"></i>
            <strong>{header}</strong>
          </h5>
          <hr className="text-danger" />
          <div className="ot-container">
            {otIsLoading ? (
              <div className="d-flex flex-column align-items-center justify-content-center p-1">
                <div
                  className="spinner-border text-danger"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                ></div>
              </div>
            ) : (
              <>
                {otData.length === 0 ? (
                  <div className="d-flex flex-column align-items-center justify-content-center p-4">
                    <i
                      className="bi bi-file-earmark mb-2 text-danger"
                      style={{ fontSize: "60px" }}
                    ></i>
                    <h4 className="text-danger text-center">ไม่พบการขอโอที</h4>
                  </div>
                ) : (
                  <>
                    {currentData.map((item) => {
                      return (
                        <div>
                          <OTcard
                            otData={item}
                            key={item.otRequestId}
                            handleDelete={() =>
                              handleDelete(
                                otIsLoading,
                                () => deleteOTrequest(item.otRequestId),
                                fetchData
                              )
                            }
                          />
                        </div>
                      );
                    })}
                  </>
                )}
              </>
            )}
          </div>
           {paginate && (
          <div className="pagination-wrapper">
            <Pagination
              totalRecords={NUM_OF_RECORDS}
              pageLimit={LIMIT}
              pageNeighbours={2}
              onPageChanged={onPageChanged}
              currentPage={currentPage}
            />
          </div>
        )}
        </div>
      </div>
    </>
  );
}
