// import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import LoadingSpin from "./loadingSpin";


export const SubmitOrCancelButton = ({ handleSubmit, handleCancel,isLoading = false }) => {
  return (
    <>
      {isLoading&&
       <LoadingSpin/>
        }
      <div className="d-flex flex-column align-items-center mb-4">
        <div className="d-flex gap-2 w-75">
          <button
            className="btn btn-outline-primary w-75"
            data-bs-dismiss="modal"
            onClick={handleCancel}
          >
            ยกเลิก
          </button>
          <button className="btn btn-primary w-75" onClick={handleSubmit}>
            {isLoading?"กำลังบันทึก...":"บันทึก"}
          </button>
        </div>
      </div>
    </>
  );
};
