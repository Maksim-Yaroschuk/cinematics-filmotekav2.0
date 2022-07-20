import axios from 'axios';
import { KEY } from './api';
import { saveLs } from './storage';
import { renderMarkup } from './renderMarkup';

const refs = {
  filterForm: document.querySelector('#filter-form'),
  sortForm: document.querySelector('#sortForm'),
  genreForm: document.querySelector('#genreForm'),
  yearForm: document.querySelector('#yearForm'),
};

if (refs.filterForm) {
  refs.genreForm.addEventListener('input', eventGenre);
  refs.yearForm.addEventListener('input', eventYear);
  refs.sortForm.addEventListener('input', eventSort);
}

let query = '';
let genre = '';
let year = '';
let sort = '';

//Выводит выбранный жанр
function eventGenre(evn) {
  if (evn) {
    genre = evn.target.value;
  }
  return console.log(
    getSearchForm(query, genre, year, sort).then(r => renderMarkup(r))
  );
}
//Выводит выбранный год
function eventYear(evn) {
  if (evn) {
    year = evn.target.value;
  }
  return console.log(
    getSearchForm(query, genre, year, sort).then(r => renderMarkup(r))
  );
}
//Выводит выбранный сорт
function eventSort(evn) {
  if (evn) {
    sort = evn.target.value;
  }
  return console.log(
    getSearchForm(query, genre, year, sort).then(r => renderMarkup(r))
  );
}

export const getSearchForm = async (
  query = '',
  genre = '',
  year = '',
  sort = ''
) => {
  let f = {
    year:
      year !== '' && year !== 'start' ? `&primary_release_year=${year}` : '',
    genre: genre !== '' && genre !== 'start' ? `&with_genres=${genre}` : '',
    queryFetch: `&query=${query}`,
    sort: sort !== '' && sort !== 'start' ? `&sort_by=${sort}` : '',
    discover: `/discover`,
  };
  if (query === '') {
    f.queryFetch = '';
  }
  if (query !== '' && genre === '') {
    f.discover = '/search';
  }
  if (query !== '' && genre !== '') {
    f.week = '';
  }
  if (query !== '') {
    f.trendingFetch = '';
  }
  let { data } = await axios.get(
    `${f.discover}/movie?api_key=${KEY}${f.genre}${f.year}${f.sort}&language=en-US${f.queryFetch}&page=1`
  );
  saveLs('moviesData', data.results);

  return data;
};
