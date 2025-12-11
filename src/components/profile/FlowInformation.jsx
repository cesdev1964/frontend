import React from "react";
import FlowIcon from "../../assets/icon/FlowIcon";

export default function FlowInformation({ flowById }) {
  return (
    <div>
      <div className="w-100 bg-danger p-2 border-n rounded-3">
        <p className="my-2 text-center fw-bold">
          สายอนุมัติ : <span className="text-primary">{flowById.flowName}</span>
        </p>
        <div className="d-flex flex-wrap justify-content-center gap-4 my-3">
          {flowById.approvalSteps ? (
            <>
              {flowById.approvalSteps?.map((item, index) => (
                <>
                  <div
                    className="d-flex flex-column align-items-center"
                    key={index}
                  >
                    <div
                      className="mb-2"
                      style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#ffffffff",
                        borderRadius: "50%",
                        position: "relative",
                      }}
                    >
                      <p
                        style={{
                          position: "absolute",
                          left: "15px",
                          top: "9px",
                        }}
                      >
                        {item.stepNumber}
                      </p>
                    </div>
                    <p style={{ fontWeight: "bold" }} className="text-danger">
                      {item.stepName}
                    </p>
                    <p
                    className="border p-3 bg-white rounded-3"
                      style={{
                        fontSize: "0.9rem",
                        lineHeight: "0.1rem",
                      }}
                    >
                      {item.fullName}
                    </p>
                  </div>
                </>
              ))}
            </>
          ) : (
            <>
              <div className="d-flex flex-column align-items-center justify-content-center p-4">
                <FlowIcon width="60" colorFill="#f19999" />
                <h5 className="text-danger mt-4">ไม่พบสายอนุมัติ</h5>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
