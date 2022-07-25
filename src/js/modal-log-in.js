import { openModalBtn, closeModalBtn, modal, backdropLogIn, inputPassword, buttonShowPassword, iconForShowPassword, iconForUnShowPassword } from './refs';

// (() => {
  //const refsLogIn = {
    // openModalBtn: document.querySelector("[data-modal-open]"),
    // closeModalBtn: document.querySelector("[data-modal-close]"),
    // modal: document.querySelector("[data-modal-login]"),
	//};
	
if (openModalBtn) { 
  openModalBtn.addEventListener("click", openModalLogIn);
  closeModalBtn.addEventListener("click", closeModalLogIn);
};

function openModalLogIn() {
  setThemOnModalLogIn();
  document.body.style.overflow = 'hidden';
  buttonShowPassword.addEventListener("click", showPassword);
  modal.classList.remove("is-hidden");
  backdropLogIn.addEventListener('click', offModalLogInForClickBeackdrop);
  document.addEventListener('keydown', offModalLogInForEscape);
};

export function closeModalLogIn() {
  document.body.style.overflow = 'overlay';
  buttonShowPassword.removeEventListener("click", showPassword);
  modal.classList.add("is-hidden");
  backdropLogIn.removeEventListener('click', offModalLogInForClickBeackdrop);
  document.removeEventListener('keydown', offModalLogInForEscape);
};

function offModalLogInForClickBeackdrop(event) {
  if (event.target === backdropLogIn) {
    closeModalLogIn();
  }
}

function offModalLogInForEscape(event) {
  if (event.key === 'Escape') {
    closeModalLogIn();
  }
}

function showPassword() {
  if (inputPassword.getAttribute('type') === 'password') {
    inputPassword.removeAttribute('type');
    inputPassword.setAttribute('type', 'text');
    iconForShowPassword.classList.add('visually-hidden');
    iconForUnShowPassword.classList.remove('visually-hidden');
  } else {
    inputPassword.removeAttribute('type');
    inputPassword.setAttribute('type', 'password');
    iconForShowPassword.classList.remove('visually-hidden');
    iconForUnShowPassword.classList.add('visually-hidden');
  };
};

function setThemOnModalLogIn() {
  const bodyClassThemChoosed = document.querySelector('body').classList.contains('dark');
  const modalDiv = document.querySelector('.modal_login');
  if (bodyClassThemChoosed) {
    modalDiv.classList.add('modal_login--dark');
  } else {
    modalDiv.classList.remove('modal_login--dark');
  };
};