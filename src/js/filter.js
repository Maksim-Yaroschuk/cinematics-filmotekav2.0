import axios from 'axios';
import { KEY } from './api';
import { saveLs } from './storage';
import { renderMarkup } from './renderMarkup';
import { loadLs } from './storage';

// const refs = {
//   filterForm: document.querySelector('#filter-form'),
//   sortForm: document.querySelector('#sortForm'),
//   genreForm: document.querySelector('#genreForm'),
//   yearForm: document.querySelector('#yearForm'),
// };

// if (refs.genreForm) {
//   refs.genreForm.addEventListener('input', eventGenre);
//   console.log(refs.genreForm);
// }
// if (refs.yearForm) {
//   refs.yearForm.addEventListener('input', eventYear);
// }
// if (refs.sortForm) {
//   refs.sortForm.addEventListener('input', eventSort);
// }

// let query = '';
// let genre = '';
// let year = '';
// let sort = '';
// let page = loadLs('page-pg');

//Выводит выбранный жанр
// function eventGenre(evn) {
//   if (evn) {
//     genre = evn.target.value;
//     // console.log(refs.genreForm);
//   }
// return getSearchForm(page, query, genre, year, sort).then(r =>
//   renderMarkup(r)
// );
// }
// //Выводит выбранный год
// function eventYear(evn) {
//   if (evn) {
//     year = evn.target.value;
//   }
//   // return getSearchForm(page, query, genre, year, sort).then(r =>
//   //   renderMarkup(r)
//   // );
// }
// //Выводит выбранный сорт
// function eventSort(evn) {
//   if (evn) {
//     sort = evn.target.value;
//   }
// return getSearchForm(page, query, genre, year, sort).then(r =>
//   renderMarkup(r)
// );
// }

export const getSearchForm = async (
  page = '',
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
    discover: `/trending`,
    week: `/week`, //Женя миньйон переделал так что если нету query, то по дефолту делался запрос на тренды недели
  };
  if (query === '') {
    f.queryFetch = '';
  }
  if (query !== '' && genre === '') {
    f.discover = '/search';
    f.week = '';
  }
  if (query === '' && genre !== '') {
    f.discover = '/discover';
    f.week = '';
  }
  if (query !== '') {
    f.trendingFetch = '';
  }
  let { data } = await axios.get(
    `${f.discover}/movie${f.week}?api_key=${KEY}${f.genre}${f.year}${f.sort}&language=en-US${f.queryFetch}&page=${page}`
  );
  saveLs('moviesData', data.results);

  return data;
};
