const refs = {
  search: document.querySelector('.search-form'),
  catalog: document.querySelector('.poster-list__item'),
  list: document.querySelector('.poster-list'),
  form: document.querySelector('.header__search-form'),
  // warning: document.querySelector('.header-message'),
  toTopBtn: document.querySelector('.btn-to-top'),
  divError: document.querySelector('.to_main__div'),
  modalBackdrop: document.querySelector('.modal-backdrop'),
  btnOnModalTeam: document.querySelector('.team-link'),
  filterForm: document.querySelector('.filter_form'),
  libCatalog: document.querySelector('.poster-lib__item'),
  lib: document.querySelector('.poster-lib'),
	logo: document.querySelector('.header__logo'),
  movieModal: document.querySelector('.modal'),
  headerLogIn: document.querySelector('.header-logIn'),
  headerLogOut: document.querySelector('.header-logOut'),
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal-login]'),
  formLogIn: document.querySelector('.modal_login__form'),
  formTitleSignIn: document.querySelector('.modal_login__title_signIn'),
  formTitleSignUp: document.querySelector('.modal_login__title_signUp'),
  formWrapName: document.querySelector('.modal_login__wrap_name'),
  formWrapCheckbox: document.querySelector('.modal_login__wrap_checkbox'),
  formCheckbox: document.querySelector('#checkbox'),
  buttonRegister: document.querySelector('.modal_login__button_register'),
  buttonConfirm: document.querySelector('.modal_login__button_confirm'),
  signUp: document.querySelector('.signUp_now'),
  signUpLink: document.querySelector('.signUp_now__link'),
  signIn: document.querySelector('.signIn_now'),
  signInLink: document.querySelector('.signIn_now__link'),
  logOut: document.querySelector('#header-logOut'),
	paginationBar: document.querySelector('.pagination-btns'),
};

export const {
  search,
  catalog,
  list,
  form,
  warning,
  toTopBtn,
  divError,
  modalBackdrop,
  movieModal,
  btnOnModalTeam,
  filterForm,
  libCatalog,
  lib,
  logo,
  headerLogIn,
  headerLogOut,
  openModalBtn,
  closeModalBtn,
  modal,
  formLogIn,
  formTitleSignIn,
  formTitleSignUp,
  formWrapName,
  formWrapCheckbox,
  formCheckbox,
  buttonRegister,
  buttonConfirm,
  signUp,
  signUpLink,
  signIn,
  signInLink,
  logOut,
	paginationBar,
} = refs;
