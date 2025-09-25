// src/pages/Home.jsx
import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useTitle } from "../hooks/useTitle";
import SingleActionModal from "../components/modal/singleActionModal";
import Swal from "sweetalert2";
import HeaderPage from "../components/HeaderPage";

export default function TestComponent({ title }) {
  useTitle(title);

  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [IsOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [IsOpenSuccessModal, setIsOpenSuccessModal] = useState(false);

  const callProtected = async () => {
    setLoading(true);

    try {
      const res = await api.get("/api/v1/auth/profile"); // endpoint ที่ต้องใช้ Bearer
      const p = res?.data ?? {};
      setProfile(p);
      console.log("Profile:", p);
    } catch (err) {
      alert("เรียก API ไม่สำเร็จ");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    try {
      setLoading(true);
      setTimeout(() => {
        console.log("ทำงานหลังจาก 3 วินาที");
        // เหมือนกำลังโหลดข้อมูล
        setLoading(false);
        const currentModal = document.getElementById("warnModal");
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        modalInstance.hide();

        // เปิด success modal
        const successModal = new bootstrap.Modal(
          document.getElementById("successModal")
        );
        successModal.show();
      }, 6000);
    } catch (error) {
      setLoading(false);
      const errorModal = new bootstrap.Modal(
        document.getElementById("notModal")
      );
      errorModal.show();
    }
  };

  const onSubmit = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success custom-width-btn-alert",
        cancelButton: "btn btn-danger custom-width-btn-alert",
      },
      buttonsStyling: "w-100",
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <div>
      <HeaderPage pageName={title} />
      <div className="container py-4 min-vh-100 d-flex flex-column">
        {/* Body: จัดให้อยู่กึ่งกลางหน้าจอ */}
        <div className="flex-grow-1 d-flex flex-column align-items-center justify-content-center gap-2">
          <button
            className="btn btn-primary btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#notModal"
            // onClick={()=>setIsOpenErrorModal(true)}
          >
            "Test error modal"
          </button>
          <button
            className="btn btn-success btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#successModal"
            // onClick={()=>setIsOpenSuccessModal(true)}
          >
            "Test success modal"
          </button>

          <button
            className="btn btn-warning btn-lg"
            data-bs-toggle="modal"
            data-bs-target="#warnModal"
          >
            "Test warning modal"
          </button>

          {/* sweetAlert */}
          <button className="btn btn-warning btn-md mb-3" onClick={onSubmit}>
            Test warning sweetAlert modal
          </button>

          {/*ทดสอบ ในส่วนของปุ่ม action แสดงหรือหดเมื่อมีการย่อขยายหน้าจอ */}
          <div className="d-flex align-items-center justify-content-center">
            {/* ปุ่มย่อ */}
            <div className="dropdown d-lg-none">
              <button
                className="btn btn-outline-light"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className="dropdown-item text-dark" href="#">
                    <i className="bi bi-pen-fill me-2"></i> แก้ไขข้อมูล
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-dark" href="#">
                    <i className="bi bi-trash-fill me-2"></i> ลบข้อมูล
                  </a>
                </li>
              </ul>
            </div>

            <div class="btn-group btn-group-sm d-none d-lg-flex" role="group">
              <a href="#" class="btn btn-warning me-2" title="แก้ไข">
                <i class="bi bi-pen-fill"></i>
              </a>
              <a href="#" class="btn btn-danger" title="ลบ">
                <i class="bi bi-trash-fill"></i>
              </a>
            </div>
          </div>
        </div>

        {/* ทดสอบ acordian */}
        <div className="accordion accordion-sm" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseEmployee"
                aria-expanded="true"
                aria-controls="collapseEmployee"
              >
                บริษัท ซีอีเอส จำกัด
              </button>
            </h2>
            <div
              id="collapseEmployee"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="container-fluid p-0">
                  <div className="row">
                    {/* <!-- ด้านซ้าย --> */}
                    <div className="col-12 col-md-4 mb-3 mb-md-0">
                      <div className="p-3 bg-light border">
                        Col 1 (รูปภาพ / เมนู)
                      </div>
                    </div>

                    {/* <!-- ด้านขวา --> */}
                    <div className="col-12 col-md-8">
                      <div className="p-3 bg-light border">
                        Col 2 (รายละเอียด / ข้อมูล)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* error */}
        <div
          class="modal fade"
          id="notModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-danger">
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
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* success */}
        <div
          class="modal fade"
          id="successModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-success">
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
                    backgroundColor: "#ffffffff",
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
                <h4 className="mb-3">บันทึกข้อมูลสำเร็จ</h4>
                <p className="text-mute">ยินดีด้วยจร้า!</p>
                <button
                  className="btn btn-success my-4 w-50"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* warning */}
        <div
          class="modal fade"
          id="warnModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-warning">
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
                <h4 className="mb-3">คุณแน่ใจใช่ไหม </h4>
                <p className="text-mute">คุณต้องการลบข้อมูลนี้</p>
                <div className="d-flex  w-100 mx-auto gap-3">
                  <button
                    className="btn btn-outline-dark mt-4 w-50"
                    data-bs-dismiss="modal"
                  >
                    ปิด
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="btn btn-warning mt-4 w-50"
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

        {/* modal */}
        <SingleActionModal
          type={"notModal"}
          isOpen={IsOpenErrorModal}
          onClose={() => setIsOpenErrorModal(false)}
          title="Oops..."
          subTiTle="Something went wrong!"
        />

        <SingleActionModal
          type={"successModal"}
          isOpen={IsOpenSuccessModal}
          onClose={() => setIsOpenSuccessModal(false)}
          title="บันทึกข้อมูลสำเร็จ"
          subTiTle="ยินดีด้วยจร้า!"
        />
      </div>
    </div>
  );
}
