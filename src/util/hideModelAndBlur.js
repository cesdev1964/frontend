export default function hideModalAndBlur(modalId){
   const modal = document.getElementById(modalId);
   if(!modal) return;

   const focusModal = document.activeElement;
   if(focusModal && modal.contains(focusModal)){
    focusModal.blur();
}
const modalInstant = bootstrap.Modal.getOrCreateInstance(modal)
modalInstant.hide();
}