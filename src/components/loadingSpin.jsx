export default function LoadingSpin() {
  return (
    // <div className="d-flex align-items-center justify-content-center">
    //   <span className="loader"></span>
    // </div>
     <>
            <div className="d-flex align-items-center justify-content-center">
              <div
                className="spinner-border text-danger"
                role="status"
                style={{ width: "3rem", height: "3rem", marginTop: "300px" }}
              >
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
          </>
  );
}
