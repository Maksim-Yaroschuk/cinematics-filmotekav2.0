import axios from 'axios';
import { KEY } from './api';
import { modalBackdrop } from './refs'
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
    r => (movie = `https://www.youtube.com/embed/${r[0].key}`))
    .catch(error => movie=false)
    
  return movie;
 
};

// функция на экспорт. Принимает ключ(id фильма как 'key' в 'li')
// при запросе записывается в movie

// movieTrailer(507086);

export async function trailerMarkup(event)  {
  const movieId = Number(event.target.getAttribute('key'))
  const trailerBtn = document.querySelector('.trailerBtn')
  trailerBtn.setAttribute('disabled', true)

  await movieTrailer(movieId).then(r => {
    if(r) {modalBackdrop.firstElementChild.insertAdjacentHTML('beforeend', 
      `<iframe id="ytplayer" type="text/html" width="782" height="360"
      src="${r}"
      frameborder="0"/>`)
      document.querySelector('#ytplayer').scrollIntoView({block: "center", behavior: "smooth"})
      } 
        else {modalBackdrop.firstElementChild.insertAdjacentHTML('beforeend', 
          `<div class="trailer-placeholder"></div>`)
          document.querySelector('.trailer-placeholder').scrollIntoView({block: "center", behavior: "smooth"})
          }
    })
}




export function trailerBtnListener (key) {
  const trailerBtn = document.querySelector('.trailerBtn')
  trailerBtn.setAttribute('key', key)
  trailerBtn.addEventListener('click', trailerMarkup)
}