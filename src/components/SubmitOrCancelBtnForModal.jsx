export const SubmitOrCancelButton = ({ handleSubmit, handleCancel }) => {
  return (
    <>
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="d-flex gap-2 w-75">
          <button
            className="btn btn-outline-primary w-100"
            data-bs-dismiss="modal"
            onClick={handleCancel}
          >
            ยกเลิก
          </button>
          <button className="btn btn-primary w-100" onClick={handleSubmit}>
            บันทึก
          </button>
        </div>
      </div>
    </>
  );
};
