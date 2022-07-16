import {
  getSearchMovie,
  getMovieGenres,
  getTrending,
  IMG_BASE_URL,
  IMG_W500,
} from './api';
export function renderMarkup(data) {
  const markupList = createListMarkup(data);
  refs.list.innerHTML = markupList;
}

export function createListMarkup(data) {
  console.log(data);

  return data.results
    .map(
      ({
        original_title,
        poster_path,
        overview,
        vote_average,
        id,
        genre_ids,
      }) =>
        `<li class='poster-list__item' key='${id}'>
    <img
      class='poster-list__img'
      src='${IMG_BASE_URL}${IMG_W500}${poster_path}'
      alt='${original_title}'
      loading='lazy'
    />
    <span class='poster-list__rate'>${vote_average}</span>
    <div class='poster-list__wrap'>
      <h3 class='poster-list__title'>${original_title}</h3>
      <div class='poster-list__info'>
        <p class='poster-list__text'>${genre_ids}</p>
        <p class='poster-list__age'></p>
      </div>
    </div>
  </li>`
    )
    .join('');
}
