import Swal from "sweetalert2";

export default function handleSubmitAlertModal({
  handleClear,
  handleFetchData,
  handleSentAPI,
  modalId
}) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success custom-width-btn-alert",
      cancelButton: "btn btn-danger custom-width-btn-alert",
    },
    buttonsStyling: "w-100",
  });
  swalWithBootstrapButtons
    .fire({
      title: "คุณต้องการบันทึกรายการใช่หรือไม่",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ยื่นยันการบันทึกรายการ",
      cancelButtonText: "ยกเลิกการบันทึกรายการ",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        const {success,errorMassage} = await handleSentAPI();
        if (success) {
          swalWithBootstrapButtons.fire({
            title: "บึนทึกรายการสำเร็จ!",
            icon: "success",
          });
          const currentModal = document.getElementById(modalId);
          const modalInstance = bootstrap.Modal.getInstance(currentModal);
          modalInstance.hide();
          handleClear?.();
          await handleFetchData?.()
        } else {
          Swal.fire({
            title: "บันทึกข้อมูลไม่สำเร็จ",
            text: errorMassage,
            icon: "error",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "ยกเลิก",
          text: "คุณทำการยกเลิกรายการเรียบร้อยแล้ว",
          icon: "error",
        });
      }
    });
}
