// import { getSearchMovie, IMG_BASE_URL, IMG_W500 } from './api';
// import { renderMarkup } from './renderMarkup';
// import { list, form, warning, imgError } from './refs';
// // form.addEventListener('submit', search);

// let name = '';
// let page = 1;

// async function search(evn) {
//   evn.preventDefault();
//   const { searchMovie } = evn.currentTarget;
//   clearInput();
//   name = searchMovie.value.toLowerCase().trim();
//   if (name === '') {
//     warningShown();
//     return;
//   };
// 	console.log(name)
//   const result = await getSearchMovie(name);
//   if (result.results.length < 1) {
//     warningShown();
//     form.reset();
//   } else {
//     warningUnShown();
//     renderMarkup(result);
//     form.reset();
//   }
// }

// function clearInput() {
//   list.innerHTML = '';
//   page = 1;
// }

// function warningShown() {
//   warning.classList.remove('visually-hidden');
//   imgError.classList.remove('visually-hidden');
//   list.classList.add('visually-hidden');
// }

// function warningUnShown() {
//   warning.classList.add('visually-hidden');
//   imgError.classList.add('visually-hidden');
//   list.classList.remove('visually-hidden');
// }
