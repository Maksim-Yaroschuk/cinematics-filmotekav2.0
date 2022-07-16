import { getSearchMovie, IMG_BASE_URL, IMG_W500 } from './api';
import { renderMarkup } from './renderMarkup';
refs = {
  form: document.querySelector('.header__search-form'),
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

function clearInput() {
  refs.list.innerHTML = '';
  page = 1;
}
