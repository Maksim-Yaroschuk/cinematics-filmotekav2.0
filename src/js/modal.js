import { list, modalBackdrop } from './refs';
import { modalMoviemarkup } from './modalMovieMarkup';

list.addEventListener('click', createModal);

function createModal(event) {
  const selectedMovie = event.target.closest('li');
  //Проверка "если нажали на 'li' то открываем модалку и считываем 'key'"
  if (selectedMovie) {
    //Получение данных о фильме в модалку
    const selectedMovieId = Number(selectedMovie.getAttribute('key'));
    const moviesData = JSON.parse(localStorage.getItem('moviesData'));
    const movieData = moviesData.find(movie => movie.id === selectedMovieId);

    renderModalContent(movieData);
    openModal();
  }
}

function openModal() {
  modalBackdrop.classList.add('modal-open');
  document.body.style.overflow = 'hidden';

  setCloseOptionModal();
}

function setCloseOptionModal() {
  modalBackdrop.addEventListener('click', offModalForClickBeackdrop);
  document.addEventListener('keydown', offModalForEscape);
  document
    .querySelector('.modal__btn-closs')
    .addEventListener('click', offModal);
}

function renderModalContent(movieData) {
  modalBackdrop.firstElementChild.innerHTML = modalMoviemarkup(movieData);
}

function offModalForEscape(e) {
  if (e.key === 'Escape') {
    offModal();
  }
}

function offModalForClickBeackdrop(e) {
  if (e.target === modalBackdrop) {
    offModal();
  }
}

function offModal() {
  modalBackdrop.classList.remove('modal-open');
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', offModalForEscape);
  modalBackdrop.removeEventListener('keydown', offModalForClickBeackdrop);
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
