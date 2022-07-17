import { getSearchMovie, IMG_BASE_URL, IMG_W500 } from './api';
import { renderMarkup } from './renderMarkup';
import { list, form, warning } from './refs';
form.addEventListener('submit', search);

let name = '';
let page = 1;

async function search(evn) {
  evn.preventDefault();
  const { searchMovie } = evn.currentTarget;
  name = searchMovie.value.toLowerCase().trim();
  clearInput();
  if (name === '') {
    warningShown();
    return;
  };
  const result = await getSearchMovie(name);
  if (result.results.length < 1) {
    warningShown();
    form.reset();
  } else {
    warningUnShown();
    renderMarkup(result);
    form.reset();
  }
}

function clearInput() {
  list.innerHTML = '';
  page = 1;
}

function warningShown() {
  warning.classList.remove("visually-hidden");
}

function warningUnShown() {
  warning.classList.add("visually-hidden");
}