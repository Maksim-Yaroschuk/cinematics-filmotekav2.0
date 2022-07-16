import { getSearchMovie, IMG_BASE_URL, IMG_W500 } from './api';
import { renderMarkup } from './renderMarkup';
import { list, form } from './refs';
form.addEventListener('submit', search);

let name = '';
let page = 1;

function search(evn) {
  evn.preventDefault();
  const { searchMovie } = evn.currentTarget;

  name = searchMovie.value.toLowerCase().trim();
  clearInput();
  if (name === '') {
    alert('Please enter request.');
    return;
  }
  getSearchMovie(name).then(r => renderMarkup(r));

  evn.currentTarget.reset();
}

function clearInput() {
  list.innerHTML = '';
  page = 1;
}
