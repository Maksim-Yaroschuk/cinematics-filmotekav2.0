import { loadLs } from './storage';
import { renderLibMarkup, renderMarkup } from './renderMarkup';
import { lib } from './refs';

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');

if (btnWatched !== null) {
  btnWatched.addEventListener('click', () => {
    libMarkup('Watched');
  });
  btnQueue.addEventListener('click', () => {
    libMarkup('Queue');
  });

  const indexWatched = loadLs('Watched') ? loadLs('Watched') : [];
  const indexQueue = loadLs('Queue') ? loadLs('Queue') : [];

  if ((indexQueue || indexWatched) && indexQueue > indexWatched) {
    document.addEventListener('DOMContentLoaded', () => {
      libMarkup('Queue');
    });
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      libMarkup('Watched');
    });
  }
}

function funEmptyLib(libName) {
  const libIndex = loadLs(libName) ? loadLs(libName) : []; //'Queue'//'Watched'
  if (libName === 'Queue') {
    btnQueue.classList.add('btn-orange');
    btnWatched.classList.remove('btn-orange');
  } else {
    btnQueue.classList.remove('btn-orange');
    btnWatched.classList.add('btn-orange');
  }

  if (libIndex) {
    lib.classList.add('list-empty');
    const markupLibList = createEmptyLibMarkup(libName);
    lib.innerHTML = markupLibList;
  }
}

function createEmptyLibMarkup(data) {
  return `
		<div class='list-empty__shild blink'>
			<h3 class= 'list-empty__title'>Your ${data} list is empty!</h3>
			<p class='blink' >to add a movie to the ${data} list, click the corresponding button in the poster window</p>
	</div>`;
}

export function libMarkup(selectLs) {
  if (selectLs === 'Queue') {
    btnQueue.classList.add('btn-orange');
    btnWatched.classList.remove('btn-orange');
  } else {
    btnQueue.classList.remove('btn-orange');
    btnWatched.classList.add('btn-orange');
  }
  lib.classList.remove('list-empty');
  lib.innerHTML = '';

  let sel = selectLs + 'Data';

  const lsList = loadLs(selectLs);

  if (!lsList || !lsList.length) {
    funEmptyLib(selectLs);
    return console.log('ваш список пуст!');
  }
  let data = { results: loadLs(sel) };
  renderLibMarkup(data);
}
