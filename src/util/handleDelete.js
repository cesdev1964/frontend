import Swal from "sweetalert2";

export default function handleDelete(isLoading, deleteAPI, updatePage) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success custom-width-btn-alert",
      cancelButton: "btn btn-danger custom-width-btn-alert",
    },
    buttonsStyling: "w-100",
  });
  swalWithBootstrapButtons
    .fire({
      title: "คุณต้องการลบรายการใช่หรือไม่",
      text: "ถ้าลบไปแล้วไม่สามารถกลับคืนมาได้ คุณแน่ใจแล้วใช่ไหม",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${isLoading ? "...กำลังดำเนินการ" : "ใช่ ลบได้เลย"}`,
      cancelButtonText: "ยกเลิกการลบ",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const response = await deleteAPI();
        if (response.success) {
          swalWithBootstrapButtons.fire({
            title: "ลบรายการสำเร็จ!",
            text: "คุณทำการลบรายการเรียบร้อยแล้ว",
            icon: "success",
          });
          await updatePage();
        } else {
          Swal.fire({
            title: "เกิดข้อผิดผลาดในการลบรายการ กรุณาลองใหม่อีกครั้ง",
            icon: "error",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "ยกเลิก",
          text: "คุณทำการยกเลิกลบรายการเรียบร้อยแล้ว",
          icon: "error",
        });
      }
    });
}
