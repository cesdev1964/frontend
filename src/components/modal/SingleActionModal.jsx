import { useEffect, useState } from "react";

function SingleActionModal({
  title = "",
  subTiTle = "",
  type = "",
  isOpen,
  onClose,
}) {

  const [isVisible,setIsVisible] = useState(false);
  useEffect(()=>{
    if(isOpen){
        setIsVisible(true);
    }else{
        const timerDelay = setTimeout(()=>setIsVisible(false),3000)
        return ()=>clearTimeout(timerDelay);
    }

  },[isOpen])

  if(!isVisible) return null;

  const displayModal = (type) => {
    switch (type) {
      case "successModal":
        return (
          <div
            className={`modal fade ${isOpen ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                  <button
                    type="button"
                    class="btn-close"
                    onClick={onClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body d-flex flex-column align-items-center">
                  <div
                    className="mb-4"
                    style={{
                      width: "140px",
                      height: "140px",
                      backgroundColor: "#bfead1",
                      borderRadius: "50%",
                      position: "relative",
                    }}
                  >
                    <i
                      className="bi bi-check-circle"
                      style={{
                        fontSize: "80px",
                        position: "absolute",
                        left: "30px",
                        top: "18px",
                        color: "#11422a",
                      }}
                    ></i>
                  </div>
                  <h4 className="mb-3">{title}</h4>
                  <p className="text-mute">{subTiTle}</p>
                  <button
                    className="btn btn-success my-4 w-50"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
            <div className={` fade ${isOpen ? "show" : ""}`}></div>
          </div>
        );
      case "notModal":
        return (
          <div
            className={`modal fade ${isOpen ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
            style={{ display: isOpen ? "block" : "none" }}
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                  <button
                    type="button"
                    class="btn-close"
                    onClick={onClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body d-flex flex-column align-items-center">
                  <div
                    className="mb-4"
                    style={{
                      width: "140px",
                      height: "140px",
                      backgroundColor: "#ffd7db",
                      borderRadius: "50%",
                      position: "relative",
                    }}
                  >
                    <i
                      className="bi bi-x-circle"
                      style={{
                        fontSize: "80px",
                        position: "absolute",
                        left: "30px",
                        top: "18px",
                        color: "#FF7584",
                      }}
                    ></i>
                  </div>
                  <h4 className="mb-3">{title}</h4>
                  <p className="text-mute">{subTiTle}</p>
                  <button
                    className="btn btn-primary my-4 w-50"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        //   case "warnModal":
        return (
          <div
            class="modal fade"
            id={type}
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body d-flex flex-column align-items-center">
                  <div
                    className="mb-4"
                    style={{
                      width: "140px",
                      height: "140px",
                      backgroundColor: "#ffe3bf",
                      borderRadius: "50%",
                      position: "relative",
                    }}
                  >
                    <i
                      className="bi bi-exclamation-circle"
                      style={{
                        fontSize: "80px",
                        position: "absolute",
                        left: "30px",
                        top: "18px",
                        color: "#5b3a1c",
                      }}
                    ></i>
                  </div>
                  <h4 className="mb-3">{title}</h4>
                  <p className="text-mute">{subTiTle}</p>
                  <div className="d-flex  w-100 mx-auto gap-3">
                    <button
                      className="btn btn-outline-primary mt-4 w-50"
                      data-bs-dismiss="modal"
                    >
                      ปิด
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="btn btn-primary mt-4 w-50"
                      // data-bs-dismiss={isCloseModal ? "modal" : ""}
                      // data-bs-toggle="modal"
                      // data-bs-target={isOpenSuccessModal ? "#successModal" : ""}
                      disabled={loading}
                    >
                      {loading ? "กำลังโหลด..." : "ลบ"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <div>{displayModal(type)}</div>;
}

export default SingleActionModal;

// switchCase ในการเลือก
