import { SubmitOrCancelButton } from "../../SubmitOrCancelBtnForModal";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export function NameTitleModal({
  title,
  ClearInput,
  input,
  handleChangeInput,
  handleSubmit,
  IsLoading,
  error,
}) {
  return (
    <>
      <div
        className="modal fade"
        id="notModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content bg-primary d-flex flex-column">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                <i className="bi bi-plus-circle fs-4 me-2"></i>
                {title}
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={ClearInput}
              ></button>
            </div>
            <div className="modal-body">
              <div className="employee-content p-4">
                <div className="col-lg-3 "></div>
                <div
                  className="col-lg-9 "
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <form>
                    <div>
                      <div className="row form-spacing g-3">
                        <div className="col-md-12">
                          <label className="form-label">
                            คำนำหน้า (ภาษาไทย)
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            name="titleNameTH"
                            type="text"
                            className={`form-control ${
                              error.titleNameTH ? "border border-danger" : ""
                            }`}
                            placeholder="กรอกคำนำหน้าเป็นภาษาไทย"
                            value={input.titleNameTH ?? ""}
                            onChange={handleChangeInput}
                          />
                          {error.titleNameTH ? (
                            <p className="text-danger">{error.titleNameTH}</p>
                          ) : null}
                        </div>
                        <div className="col-md-12">
                          <label className="form-label">
                            คำนำหน้า (ภาษาอังกฤษ)
                          </label>
                          <input
                            name="titleNameEng"
                            type="text"
                            className={`form-control`}
                            id="titleNameEng"
                            placeholder="กรอกคำนำหน้าเป็นภาษาอังกฤษ"
                            value={input.titleNameEng ?? ""}
                            onChange={handleChangeInput}
                          />
                          
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <SubmitOrCancelButton
              handleSubmit={handleSubmit}
              handleCancel={ClearInput}
              isLoading={IsLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
