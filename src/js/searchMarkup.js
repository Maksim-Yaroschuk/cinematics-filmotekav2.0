import { getSearchMovie, IMG_BASE_URL, IMG_W500 } from './api';
refs = {
  form: document.querySelector('.search-form'),
  list: document.querySelector('.poster-list'),
};

refs.form.addEventListener('submit', search);

let name = '';
let page = 1;

function search(evn) {
  evn.preventDefault();
  const { searchMovie } = evn.currentTarget;

  name = searchMovie.value.toLowerCase().trim();
  console.log(name);
  clearInput();
  if (name === '') {
    alert('Please enter request.');
    return;
  }
  getSearchMovie(name).then(r => renderMarkup(r));

  evn.currentTarget.reset();
}

function renderMarkup(data) {
  const markupList = createListMarkup(data);
  refs.list.innerHTML = markupList;
}

function createListMarkup(data) {
  return data.results
    .map(
      ({ original_title, poster_path, overview, vote_average }) =>
        `<li class='poster-list__item'>
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
        <p class='poster-list__text'></p>
        <p class='poster-list__age'></p>
      </div>
    </div>
  </li>`
    )
    .join('');
}

function clearInput() {
  refs.list.innerHTML = '';
  page = 1;
}
