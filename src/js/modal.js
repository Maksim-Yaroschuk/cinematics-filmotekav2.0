import { list, modalBackdrop, btnOnModalTeam } from './refs';
import { modalMoviemarkup } from './modalMovieMarkup';
import { saveLs, loadLs, funAddWatched, funAddQueue} from './storage';


if(list){
	list.addEventListener('click', createModal);
}


btnOnModalTeam.addEventListener('click', onModalTeam);

function createModal(event) {
	const selectedMovie = event.target.closest('li');
	//Проверка "если нажали на 'li' то открываем модалку и считываем 'key'"
	if (selectedMovie) {
    //Получение данных о фильме в модалку
		const selectedMovieId = Number(selectedMovie.getAttribute('key'));
		console.log('selectedMovieId', selectedMovieId);
		const moviesData = JSON.parse(localStorage.getItem('moviesData'));
		const movieData = moviesData.find(movie => movie.id === selectedMovieId);
		renderModalContent(movieData);
		openModal();
		const btnAddWatched = document.querySelector('.modal__watched');
		const btnAddQueue = document.querySelector('.modal__queue');
		if (btnAddWatched) {
			console.log('btnAddWatched',btnAddWatched );
			console.log('btnAddQueue', btnAddQueue);
			btnAddWatched.addEventListener("click",()=>{
				funAddWatched(selectedMovieId);
			});
			btnAddQueue.addEventListener("click", ()=>{funAddQueue(selectedMovieId)});
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

//Модальне вікно футера зі списком команди


//const btnOnModalTeam = document.querySelector('.team-link');
//const btnOffModalTeam = document.querySelector('.modal__close');
//const backdropModalTeam = document.querySelector('.backdrop-team');
//if(btnOnModalTeam){
//btnOnModalTeam.addEventListener('click', onModalTeam);}

function onModalTeam(e) {
  e.preventDefault();

  createTeamModal();
  openModal();
}

function createTeamModal() {
  const teamModalCard = `<button class="modal__btn-closs btn__closs-modal">
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
</button> <ul class="team__list">
  <li class="team__item">
      <a href="https://github.com/dimaniagara">
        <img class ="team__image" src="./images/team/Dima.jfif" />
      </a>
      <p class="team__subtitle">Dmitri Suhak</p>
      <p class="team__text text">Junior Developer</p>
  </li>
  <li class="team__item">
    <a href="https://github.com/dimaniagara">
      <img class ="team__image" src="./images/team/Dima.jfif" />
    </a>
      <p class="team__subtitle">Name Last Name</p>
      <p class="team__text text">Position</p>
  </li>
  <li class="team__item">
    <a href="https://github.com/dimaniagara">
      <img class ="team__image" src="./images/team/Dima.jfif" />
    </a>
      <p class="team__subtitle">Name Last Name</p>
      <p class="team__text text">Position</p>
  </li>
  <li class="team__item">
    <a href="https://github.com/dimaniagara">
      <img class ="team__image" src="./images/team/Dima.jfif" />
    </a>
      <p class="team__subtitle">Name Last Name</p>
      <p class="team__text text">Position</p>
  </li>
  <li class="team__item">
    <a href="https://github.com/dimaniagara">
      <img class ="team__image" src="./images/team/Dima.jfif" />
    </a>
      <p class="team__subtitle">Name Last Name</p>
      <p class="team__text text">Position</p>
  </li>
  <li class="team__item">
    <a href="https://github.com/dimaniagara">
      <img class ="team__image" src="./images/team/Dima.jfif" />
    </a>
      <p class="team__subtitle">Name Last Name</p>
      <p class="team__text text">Position</p>
  </li>
  <li class="team__item">
    <a href="https://github.com/dimaniagara">
      <img class ="team__image" src="./images/team/Dima.jfif" />
    </a>
      <p class="team__subtitle">Name Last Name</p>
      <p class="team__text text">Position</p>
  </li>
  <li class="team__item">
    <a href="https://github.com/dimaniagara">
      <img class ="team__image" src="./images/team/Dima.jfif" />
    </a>
      <p class="team__subtitle">Name Last Name</p>
      <p class="team__text text">Position</p>
  </li>
  <li class="team__item">
    <a href="https://github.com/dimaniagara">
      <img class ="team__image" src="./images/team/Dima.jfif" />
    </a>
      <p class="team__subtitle">Name Last Name</p>
      <p class="team__text text">Position</p>
  </li>
</ul>`;
  modalBackdrop.firstElementChild.innerHTML = teamModalCard;
}
