import { openModalBtn, closeModalBtn, modal } from './refs';

// (() => {
  //const refsLogIn = {
    // openModalBtn: document.querySelector("[data-modal-open]"),
    // closeModalBtn: document.querySelector("[data-modal-close]"),
    // modal: document.querySelector("[data-modal-login]"),
	//};
	
  if(openModalBtn) { 
  openModalBtn.addEventListener("click", toggleModal);
  closeModalBtn.addEventListener("click", toggleModal);
}
export function toggleModal() {
    modal.classList.toggle("is-hidden");
  }
// })();