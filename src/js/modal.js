import { list } from './refs';
import { modalMoviemarkup } from './modalMovieMarkup';
const modalBackdrop = document.querySelector('.modal-backdrop');
const modal = document.querySelector('.modal-backdrop').firstElementChild;

const bntModalOpen = document.querySelector('.btn__open-modal');
//('.poster-list__item');
const btnModalCloss = document.querySelector('.btn__closs-modal');

list.addEventListener('click', onModal);
function onModal(event) {
  const selectedMovie = event.target.closest('li');
  const selectedMovieId = Number(selectedMovie.getAttribute('key'));
  const moviesData = JSON.parse(localStorage.getItem('moviesData'));
  const movieData = moviesData.find(movie => movie.id === selectedMovieId);

  //Рендер данных о фильме в модалку

  //Проверка "если нажали на 'li' то открываем модалку и считываем 'key'"
  if (selectedMovie) {
    modalBackdrop.classList.add('modal-open');
    document.body.style.overflow = 'hidden';
    //Закрытие модалки
    btnModalCloss.addEventListener('click', offModal);
    modalBackdrop.addEventListener('click', offModalForClickBeackdrop);
    document.addEventListener('keydown', offModalForEscape);
  }
  modal.innerHTML = modalMoviemarkup(movieData);
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
