// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

export const SubmitOrCancelButton = ({ handleSubmit, handleCancel,isLoading = false }) => {
  return (
    <>
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="d-flex gap-3 w-75 action-button">
          <button
            className="btn btn-outline-primary w-100"
            data-bs-dismiss="modal"
            onClick={handleCancel}
          >
            ยกเลิก
          </button>
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            {isLoading?"กำลังบันทึก...":"บันทึก"}
          </button>
        </div>
      </div>
    </>
  );
};
