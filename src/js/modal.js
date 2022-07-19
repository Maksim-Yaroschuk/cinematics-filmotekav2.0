import { list, modalBackdrop } from './refs';
import { modalMoviemarkup } from './modalMovieMarkup';


if(list){
	list.addEventListener('click', createModal);
}
import { saveLs, loadLs, funAddWatched, funAddQueue} from './storage';
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

const btnOnModalTeam = document.querySelector('.team-link');
const btnOffModalTeam = document.querySelector('.modal__close');
const backdropModalTeam = document.querySelector('.backdrop-team');
if(btnOnModalTeam){
btnOnModalTeam.addEventListener('click', onModalTeam);}

function onModalTeam(e) {
  e.preventDefault();

  backdropModalTeam.classList.add('backdrop_is-open');

  btnOffModalTeam.addEventListener('click', offModalTeam);
}

function offModalTeam() {
  backdropModalTeam.classList.remove('backdrop_is-open');
}
