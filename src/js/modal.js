import { list, modalBackdrop, btnOnModalTeam } from './refs';
import { modalMoviemarkup, modalTeamLayout } from './modalMovieMarkup';
import { funAddWatched, funAddQueue } from './storage';

if (list) {
  list.addEventListener('click', createModal);
}

btnOnModalTeam.addEventListener('click', onModalTeam);

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
    onBntAddLibray(selectedMovieId);
  }
}

// Кнопки
function onBntAddLibray(selectedMovieId) {
  // ссылки на элемент кнопки
  const btnAddWatched = document.querySelector('.modal__add-watched');
  const btnAddQueue = document.querySelector('.modal__add-queue');

  // фц проверяют есть ли в локале фильмы и ставять соответсвенный класс
  setStileBntWatched(selectedMovieId, btnAddWatched);
  setStileBntQueue(selectedMovieId, btnAddQueue);

  // слушатели на клик
  btnAddWatched.addEventListener('click', () => {
    // добавить в локал
    funAddWatched(selectedMovieId);
    // еще раз проверить наличие в локал и изменить кнопку
    setStileBntWatched(selectedMovieId, btnAddWatched);
  });

  btnAddQueue.addEventListener('click', () => {
    // добавить в локал
    funAddQueue(selectedMovieId);
    // еще раз проверить наличие в локал и изменить кнопку
    setStileBntQueue(selectedMovieId, btnAddQueue);
  });
}

function setStileBntWatched(selectedMovieId, btnAddWatched) {
  const watched = localStorage.getItem('Watched').includes(selectedMovieId);
  btnAddWatched.dataset.watched = watched;
  if (watched) {
    btnAddWatched.textContent = 'remove from watched';
  } else {
    btnAddWatched.textContent = 'add to watched';
  }
}

function setStileBntQueue(selectedMovieId, btnAddQueue) {
  const queue = localStorage.getItem('Queue').includes(selectedMovieId);
  btnAddQueue.dataset.queue = queue;
  if (queue) {
    btnAddQueue.textContent = 'remove from queue';
  } else {
    btnAddQueue.textContent = 'add to queue';
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

// модалка команды

function onModalTeam(e) {
  e.preventDefault();

  createTeamModal();
  openModal();
}

function createTeamModal() {
  modalBackdrop.firstElementChild.innerHTML = modalTeamLayout;
}
