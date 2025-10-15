export default function SessionExpired({onSubmit}) {
  return (
    <>
      <div
        class="modal fade"
        id="notModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static" 
        data-bs-keyboard="false"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-danger">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
            </div>
            <div class="modal-body d-flex flex-column align-items-center">
              <div
                className="mb-4"
                style={{
                  width: "140px",
                  height: "140px",
                  backgroundColor: "#ffc4caff",
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
                    color: "#f14f62ff",
                  }}
                ></i>
              </div>
              <h4 className="mb-3">Oops...</h4>
              <p className="text-mute">Something went wrong!</p>
              <button
                className="btn btn-primary my-4 w-50"
                data-bs-dismiss="modal"
                onClick={onSubmit}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
