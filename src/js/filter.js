import axios from 'axios';
import { KEY } from './api';

const refs = {
  sortForm: document.querySelector('#sortForm'),
  genreForm: document.querySelector('#genreForm'),
  yearForm: document.querySelector('#yearForm'),
};
refs.genreForm.addEventListener('input', eventGenre);
refs.yearForm.addEventListener('input', eventYear);
refs.sortForm.addEventListener('input', eventSort);

//Выводит выбранный жанр
function eventGenre(evn) {
  let genre = '';
  if (evn) {
    genre = evn.target.value;
  }
  return genre;
}
//Выводит выбранный год
function eventYear(evn) {
  let year = '';
  if (evn) {
    year = evn.target.value;
  }
  return year;
}
//Выводит выбранный сорт
function eventSort(evn) {
  let sort = '';
  if (evn) {
    sort = evn.target.value;
  }
  return sort;
}

export const getSearchForm = async (query, genre, year, sort) => {
  let f = {
    year: `&primary_release_year=${year}`,
    genre: `&with_genres=${genre}`,
    queryFetch: `&query=${query}`,
    trendingFetch: `/trending`,
    sort: `&sort_by=${sort}`,
    discover: `/discover`,
    week: `/week`,
  };
  if (sort === 'start' || sort === '') {
    f.sort = '';
  }
  if (year === 'start' || year === '') {
    f.year === '';
  }
  if (genre === 'start' || genre === '') {
    f.genre = '';
  }
  if (query === '') {
    f.queryFetch = '';
    f.discover = '';
  }
  if (query !== '' && genre === '') {
    f.trendingFetch = '';
    f.week = '';
    f.discover = '/search';
  }
  if (query !== '' && genre !== '') {
    f.trendingFetch = '';
    f.week = '';
  }
  const { data } = await axios.get(
    `${f.trendingFetch}${f.discover}/movie${f.week}?api_key=${KEY}${f.genre}${f.year}${f.sort}&language=en-US${f.queryFetch}&page=1`
  );
  return data;
};

getSearchForm('cat', 28, 2020, 'original_title.asc').then(r => console.log(r));
