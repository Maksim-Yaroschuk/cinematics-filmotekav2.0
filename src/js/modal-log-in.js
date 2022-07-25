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
};
export function toggleModal() {
    setThemOnModalLogIn();
    modal.classList.toggle("is-hidden");
};
// })();

function setThemOnModalLogIn() {
  const bodyClassThemChoosed = document.querySelector('body').classList.contains('dark');
  const modalDiv = document.querySelector('.modal_login');
  if (bodyClassThemChoosed) {
    modalDiv.classList.add('modal_login--dark');
  } else {
    modalDiv.classList.remove('modal_login--dark');
  };
};