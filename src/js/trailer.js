import axios from 'axios';
import { KEY } from './api';

const getMoviesTrailer = async key => {
  const { data } = await axios.get(`/movie/${key}/videos?api_key=${KEY}`);

  return data.results.filter(item => {
    if (item.site === 'YouTube') {
      return item;
    }
  });
};

export const movieTrailer = async keyId => {
  let movie = '';
  await getMoviesTrailer(keyId).then(
    r => (movie = `https://www.youtube.com/embed/${r[0].key}`)
  );
  return movie;
 
};

// функция на экспорт. Принимает ключ(id фильма как 'key' в 'li')
// при запросе записывается в movie

movieTrailer(507086);
