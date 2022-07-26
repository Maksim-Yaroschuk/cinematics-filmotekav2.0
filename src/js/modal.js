import { list, lib, modalBackdrop, btnOnModalTeam, movieModal, toTopBtn} from './refs';
import { modalMoviemarkup, modalTeamLayout } from './modalMovieMarkup';
import { addListLibrary, funAddQueue } from './storage';

import { libMarkup } from './lib';



import team from './team-info';
import { trailerBtnListener } from './trailer';
const dataWebLocation = document.querySelector('body').getAttribute('data-weblocation');

const btnLibWatch = document.querySelector('.btn--watched');

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
    let moviesData = JSON.parse(localStorage.getItem('moviesData'));
    if (dataWebLocation === 'library') {
      let watchedData = JSON.parse(localStorage.getItem('WatchedData'));
      let queueData = JSON.parse(localStorage.getItem('QueueData'));
      if(watchedData){moviesData.push(...watchedData)}
      if(queueData){moviesData.push(...queueData)}
     
      // moviesData = [...watchedData, ...queueData]
    }
    //Получение данных о фильме в модалку
    const selectedMovieId = Number(selectedMovie.getAttribute('key'));
    const movieData = moviesData.find(movie => movie.id === selectedMovieId);
    renderModalContent(movieData);
    openModal();

    setThemOnModal();

    // записываем айди в модалку
    modalBackdrop.firstElementChild.dataset.id = movieData.id;
    // подключаем кнопки
    onBntAddLibray();

    // onBntAddLibray(selectedMovieId);
    trailerBtnListener(selectedMovieId)
  }
}

// Кнопки
function onBntAddLibray() {
  // ссылки на элемент кнопки
  const btnAddWatched = document.querySelector('.modal__add-watched');
  const btnAddQueue = document.querySelector('.modal__add-queue');
  const idMovie = Number(modalBackdrop.firstElementChild.dataset.id);

  if (dataWebLocation === 'library') {
    setBtnLibrayLocalData(btnAddWatched, btnAddQueue);
  }
  // фц проверяют есть ли в локале фильмы и ставять соответсвенный класс
  if (localStorage.getItem('Watched') !== null) {
    setStileBntWatched(idMovie, btnAddWatched);
  }

  if (localStorage.getItem('Queue') !== null) {
    setStileBntQueue(idMovie, btnAddQueue);
  }

  // слушатели на клик
  btnAddWatched.addEventListener('click', e => {
    // добавить в локал или убрать с локала

    addListLibrary(idMovie, 'Watched');
    updataLibery(e, btnAddWatched, 'Watched');

    // еще раз проверить наличие в локал и изменить кнопку
    setStileBntWatched(idMovie, btnAddWatched);
  });

  btnAddQueue.addEventListener('click', e => {
    // добавить в локал или убрать с локала
    addListLibrary(idMovie, 'Queue');
    updataLibery(e, btnAddQueue, 'Queue');
    // еще раз проверить наличие в локал и изменить кнопку
    setStileBntQueue(idMovie, btnAddQueue);
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

function updataLibery(e, btn, list) {
  const dataWebLocation = e.target
    .closest('body')
    .getAttribute('data-weblocation');

  if (dataWebLocation === 'library') {
    lib.innerHTML = '';
    libMarkup(list);
    // const dataBtn = btn.dataset.liery;
    // if (dataBtn === 'true') {
      btn.setAttribute('disabled', true);
    // } else {
      // return
    // }
  }
  return;
}

function setBtnLibrayLocalData(btnAddWatched, btnAddQueue) {
  // const btnLibWatch = document.querySelector('.btn--watched');

  if (btnLibWatch.classList.contains('btn-orange')) {
    btnAddWatched.dataset.liery = true;
    btnAddQueue.dataset.liery = false;
  } else {
    btnAddWatched.dataset.liery = false;
    btnAddQueue.dataset.liery = true;
  }
} 

function openModal() {
  modalBackdrop.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
	document.body.classList.add('modal-open')
  toTopBtn.classList.remove('btn-to-top--visible');
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
	modalBackdrop.firstElementChild.classList.remove('team-modal')
	modalBackdrop.firstElementChild.classList.add('modal')
  modalBackdrop.classList.remove('modal-open');
  document.body.style.overflow = 'overlay';
	document.body.classList.remove('modal-open')
  document.removeEventListener('keydown', offModalForEscape);
  modalBackdrop.removeEventListener('keydown', offModalForClickBeackdrop);
  modalBackdrop.firstElementChild.dataset.id = '';

  movieModal.innerHTML = ''
  toTopBtn.classList.add('btn-to-top--visible');
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
`;

const modalTeamList = document.createElement('ul');
const titleTeam = document.createElement('h1');

function onModalTeam(e) {
  e.preventDefault();

  renderTeamModal();
  openModal();
	modalBackdrop.firstElementChild.classList.add('team-modal')
	modalBackdrop.firstElementChild.classList.remove('modal')
}

function renderTeamModal() {
	modalBackdrop.firstElementChild.innerHTML=''
  modalTeamList.innerHTML = ''
  titleTeam.innerHTML = ''
  modalBackdrop.firstElementChild.insertAdjacentElement('beforeend', titleTeam)
  titleTeam.classList.add('team-modal__title')
  titleTeam.insertAdjacentHTML('beforeend', 'Cinematics GO IT JS #48')

	modalBackdrop.firstElementChild.insertAdjacentElement('beforeend', modalTeamList)
	modalBackdrop.firstElementChild.insertAdjacentHTML('beforeend', modalCloseBtn)
	modalTeamList.classList.add('team-modal__list')
	team.map((member) => {
		const markup = `<li class="team-modal__item">
		<img src="${member.img}" class="team-modal__pic">
		<h2 class="team-modal__name">${member.name}</h2>
    <p class="team-modal__role">${member.role}</p>
		<div>
		<a href="${member.git}" target="_blank" class="team-modal__link">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
        />
      </svg>
		</a>
		</div>
		</li>`
		modalTeamList.insertAdjacentHTML('beforeend', markup)
	})
}

function setThemOnModal() {
  const bodyClassThem = document
    .querySelector('body')
    .classList.contains('dark');

  if (bodyClassThem) {
    modalBackdrop.firstElementChild.classList.add('modal-dark');
  } else {
    modalBackdrop.firstElementChild.classList.remove('modal-dark');
  }
}

// export { moviesData };

