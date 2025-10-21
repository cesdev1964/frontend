  export function handleCancel(modalId){
    const currentModal = document.getElementById(modalId);
        const modalInstance = bootstrap.Modal.getInstance(currentModal);
        modalInstance.hide();
  }