import { list, lib, modalBackdrop, btnOnModalTeam } from './refs';
import { modalMoviemarkup, modalTeamLayout } from './modalMovieMarkup';
import { addListLibrary, funAddQueue } from './storage';
import team from './team-info';
import { trailerBtnListener } from './trailer';

if (list) {
  list.addEventListener('click', createModal);
}
if (lib) {
  lib.addEventListener('click', createModal);
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
    trailerBtnListener(selectedMovieId)
    
  }
}

// Кнопки
function onBntAddLibray(selectedMovieId) {
  // ссылки на элемент кнопки
  const btnAddWatched = document.querySelector('.modal__add-watched');
  const btnAddQueue = document.querySelector('.modal__add-queue');

  // фц проверяют есть ли в локале фильмы и ставять соответсвенный класс
  if (localStorage.getItem('Watched') !== null) {
    setStileBntWatched(selectedMovieId, btnAddWatched);
  }

  if (localStorage.getItem('Queue') !== null) {
    setStileBntQueue(selectedMovieId, btnAddQueue);
  }

  // слушатели на клик
  btnAddWatched.addEventListener('click', () => {
    // добавить в локал
    addListLibrary(selectedMovieId, 'Watched');
    // еще раз проверить наличие в локал и изменить кнопку
    setStileBntWatched(selectedMovieId, btnAddWatched);
  });

  btnAddQueue.addEventListener('click', () => {
    // добавить в локал
    addListLibrary(selectedMovieId, 'Queue');
    // еще раз проверить наличие в локал и изменить кнопку
    setStileBntQueue(selectedMovieId, btnAddQueue);
  });
}

function setStileBntWatched(selectedMovieId, btnAddWatched) {
  if (localStorage.getItem('Watched') === null) {
    return;
  } else {
    const watched = localStorage.getItem('Watched').includes(selectedMovieId);
    btnAddWatched.dataset.watched = watched;
    if (watched) {
      btnAddWatched.textContent = 'remove from watched';
    } else {
      btnAddWatched.textContent = 'add to watched';
    }
  }
}

function setStileBntQueue(selectedMovieId, btnAddQueue) {
  if (localStorage.getItem('Queue') === null) {
    return;
  } else {
    const queue = localStorage.getItem('Queue').includes(selectedMovieId);
    btnAddQueue.dataset.queue = queue;
    if (queue) {
      btnAddQueue.textContent = 'remove from queue';
    } else {
      btnAddQueue.textContent = 'add to queue';
    }
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

const modalCloseBtn = `
<button class="modal__btn-closs btn__closs-modal">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        class="bi bi-x-lg"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
        />
      </svg>
    </button>
`

const modalTeamList = document.createElement('ul');

function onModalTeam(e) {
  e.preventDefault();

  renderTeamModal();
  openModal();
}

// function createTeamModal() {
//   modalBackdrop.firstElementChild.innerHTML = modalTeamLayout;
// }

function renderTeamModal() {
	modalBackdrop.firstElementChild.innerHTML=''
	modalBackdrop.firstElementChild.insertAdjacentElement('beforeend', modalTeamList)
	modalTeamList.insertAdjacentHTML('beforeend', modalCloseBtn)
	team.map((member) => {
		const markup = `<li>
		<img src="${member.img}">
		<p>${member.name}</p>
		<a href="${member.git}"><img src="./git.img"></a>
		</li>`
		modalTeamList.insertAdjacentHTML('beforeend', markup)
	})
}