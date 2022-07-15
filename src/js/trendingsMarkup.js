import { getTrending, IMG_BASE_URL, IMG_W400 } from './api';
import { list } from './refs'

// Закинув твій реф в файл refs.js
// const refs = {
//   list: document.querySelector('.poster-list'),
// };

getTrending(2).then(r => renderMarkup(r));

function renderMarkup(data) {
  const markupList = createListMarkup(data);
  list.innerHTML = markupList;
}

function createListMarkup(data) {
  return data.results
    .map(
      ({ original_title, poster_path, overview, vote_average }) =>
        `<li class='poster-list__item'>
    <img
      class='poster-list__img'
      src='${IMG_BASE_URL}${IMG_W400}${poster_path}'
      alt='${original_title}'
      loading='lazy'
    />
    <span class='poster-list__rate'>${vote_average}</span>
    <div class='poster-list__wrap'>
      <h3 class='poster-list__title'>${original_title}</h3>
      <div class='poster-list__info'>
        <p class='poster-list__text'>${overview}</p>
        <p class='poster-list__age'></p>
      </div>
    </div>
  </li>`
    )
    .join('');
}
