import { getMovieGenres, IMG_BASE_URL, IMG_W400 } from './api';

import { list, lib } from './refs';
import { saveLs } from './storage';
async function getGenres() {
  const genres = await getMovieGenres().then(({ genres }) => genres);

  return { genres };
}


export function renderMarkup(data) {
  getGenres().then(({ genres }) => {
    //Добавление списка жанров в localStorage
    saveLs('genresList', genres);
    if (data.results) {
      data.results.forEach(film => {
        const { genre_ids, release_date } = film;
        genres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1, 'Other');
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          film.genre_names = genre_ids.join(', ');
          if (film.release_date) {
            film.release_date = release_date.slice(0, 4);
          }
        });
      });
    }
    const markupList = createListMarkup(data.results);
    if (list) {
      list.innerHTML = markupList;
    }
  });
 
}

export function createListMarkup(data) {
  if (data) {
    return data
      .map(
        ({
          original_title,
          poster_path,
          overview,
          vote_average,
          id,
          genre_names,
          release_date,
        }) => {
          let posterPath = ``
          if(poster_path){posterPath=`${IMG_BASE_URL}${IMG_W400}/${poster_path}`}
          else{posterPath='https://i.ibb.co/GPMFHG6/keep-calm-poster-not-found-1.png'}
          return `<li class='poster-list__item' key='${id}'>
            <img
              class='poster-list__img'
              src='${posterPath}'
              alt='${original_title}'
              width
              loading='lazy'
            />
            <span class='poster-list__rate'>${vote_average.toFixed(1)}</span>
            <div class='poster-list__wrap'>
              <h2 class='poster-list__title'>${original_title}</h2>
              <div class='poster-list__info'>
                <p class='poster-list__text'>${genre_names}</p>
                <p class='poster-list__age'>| ${release_date}</p>
              </div>
            </div>
          </li>`}
      )
      .join('');
  }
}

export function renderLibMarkup(data) {
  getGenres().then(({ genres }) => {
    //Добавление списка жанров в localStorage
    saveLs('genresList', genres);
    if (data.results) {
      data.results.forEach(film => {
        const { genre_ids, release_date } = film;
        genres.forEach(({ name, id }) => {
          if (genre_ids.includes(id)) {
            if (genre_ids.length > 2) {
              genre_ids.splice(2, genre_ids.length - 1, 'Other');
            }
            genre_ids.splice(genre_ids.indexOf(id), 1, name);
          }
          film.genre_names = genre_ids.join(', ');
          if (film.release_date) {
            film.release_date = release_date.slice(0, 4);
          }
        });
      });
    }
    const markupLibList = createListMarkup(data.results);
    if (lib) {
      lib.innerHTML = markupLibList;
    }
  });
  //saveLs('moviesData', data.results);
}

// export { moviesData }
