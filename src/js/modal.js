const modal = document.querySelector('.modal-backdrop');
const bntModalOpen = document.querySelector('.poster-list__item');
const btnModalCloss = document.querySelector('.btn__closs-modal');
const modalBeackdrop = document.querySelector('.modal-backdrop');

bntModalOpen.addEventListener('click', onModal);

function onModal() {
  modal.classList.add('modal-open');
  document.body.style.overflow = 'hidden';

  btnModalCloss.addEventListener('click', offModal);
  modalBeackdrop.addEventListener('click', offModalForClickBeackdrop);
  document.addEventListener('keydown', offModalForEscape);
}

function offModalForEscape(e) {
  if (e.key === 'Escape') {
    offModal();
  }
}

function offModalForClickBeackdrop(e) {
  if (e.target === modalBeackdrop) {
    offModal();
  }
}

function offModal() {
  modal.classList.remove('modal-open');
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', offModalForEscape);
  modalBeackdrop.removeEventListener('keydown', offModalForClickBeackdrop);
}

//Модальне вікно футера зі списком команди

const btnOnModalTeam = document.querySelector('.team-link');
const btnOffModalTeam = document.querySelector('.modal__close');
const backdropModalTeam = document.querySelector('.backdrop-team');

btnOnModalTeam.addEventListener('click', onModalTeam);

function onModalTeam(e) {
  e.preventDefault();

  backdropModalTeam.classList.add('backdrop_is-open');

  btnOffModalTeam.addEventListener('click', offModalTeam);
}

function offModalTeam() {
  backdropModalTeam.classList.remove('backdrop_is-open');
}
