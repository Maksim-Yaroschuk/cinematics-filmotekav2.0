import axios from 'axios';
import { KEY } from './api';
import { saveLs } from './storage';

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
  if (query === '' && year !== '') {
    f.discover = '/discover';
    f.week = '';
  }
  let { data } = await axios.get(
    `${f.discover}/movie${f.week}?api_key=${KEY}${f.genre}${f.year}${f.sort}&language=en-US${f.queryFetch}&page=${page}`
  );
  saveLs('moviesData', data.results);

  return data;
};
