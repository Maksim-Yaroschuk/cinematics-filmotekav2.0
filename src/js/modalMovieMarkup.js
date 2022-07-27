import { IMG_BASE_URL, IMG_W400 } from './api'
import {loadLs} from './storage'

//Функция конвертации id жанра в название жанра

const genresConverting = (genresIds) => {
  const genresList = loadLs('genresList')
  const genreArray = []
  genresIds.map(genreId => {
    genresList.map(genre => {
      if (genreId === genre.id) {genreArray.push(genre.name)} 
    })
  })
  return(genreArray.join(', '));
}

//Функция создания разметки модального окна фильма
const modalMoviemarkup = ({poster_path, popularity, vote_average, vote_count, original_title, genre_ids, overview}) => {
let posterPath = ``
if(poster_path){posterPath=`${IMG_BASE_URL}${IMG_W400}/${poster_path}`}else{posterPath='https://i.ibb.co/GPMFHG6/keep-calm-poster-not-found-1.png'}
return `
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
<div class="modal__movi-poster">
<img src="${posterPath}" alt="placeholder" />
</div>

<div class="modal_movi-info">
<h2 class="modal__title">${original_title}</h2>

<div class="modal__info-card info-card">
  <ul class="info-card__list-parametrs">
    <li class="info-card__item info-card__item-paramter">Vote / Votes</li>
    <li class="info-card__item info-card__item-point">
      <span>${vote_average.toFixed(
        1
      )}</span> <span>/</span> <span>${vote_count}</span>
    </li>
    <li class="info-card__item info-card__item-paramter">Popularity</li>
    <li class="info-card__item info-card__item-point">${popularity.toFixed(
      1
    )}</li>
    <li class="info-card__item info-card__item-paramter">Original Title</li>
    <li class="info-card__item info-card__item-point">${original_title}</li>
    <li class="info-card__item info-card__item-paramter">Genre</li>
    <li class="info-card__item info-card__item-point">${genresConverting(
      genre_ids
    )}</li>
  </ul>
  
</div>

<div class="modal__about">
  <h3 class="modal__about-title">ABOUT </h3>
  <p class="modal__about-text">
    ${overview}
  </p>
</div>
<div class="modal__buttons">
      <button type="button" class="modal__add-watched" data-watched='false' data-liery='false'>add to watched</button>
      <button type="button" class="modal__add-queue" data-queue='false' data-liery='false'>add to queue</button>
      
    </div>
   <div class='trailerBtnWrap'> <button class="trailerBtn"></button></div>
  
    </div>
    </div>`;
}

const modalTeamLayout = `<button class="modal__btn-closs btn__closs-modal">
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
 
export { modalMoviemarkup, modalTeamLayout };