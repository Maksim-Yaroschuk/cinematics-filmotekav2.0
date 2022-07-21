import { loadLs } from './storage';
import { renderLibMarkup } from './renderMarkup';
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
	IndexWatched = loadLs('Watched');
	IndexQueue = loadLs('Queue');
	if ((IndexQueue === 0 || IndexWatched ===0)&& IndexQueue > IndexWatched){
	document.addEventListener("DOMContentLoaded", () => {
	  libMarkup('Queue');
	});
	} else {
		document.addEventListener("DOMContentLoaded", () => {
	  libMarkup('Watched');
	});
	}
}
function funEmptyLib(libName) {
	lib.classList.remove('list-empty');
	libIndex = loadLs(libName);//'Queue'//'Watched'
	console.log('libIndex',libIndex);
	if (libIndex) {
		lib.classList.add('list-empty');
		const markupLibList = createEmptyLibMarkup(libName);
		lib.innerHTML = markupLibList;
	}
}

function createEmptyLibMarkup(data) {
	return `
		<div class='list-empty__shild blink'>
			<h3 class= 'list-empty__title'>Ваш список ${data} пуст!</h3>
			<p class='blink' >для добавления фильма в список ${data} выбери в окне постера соответствующую кнопку </p>
	</div>`
}

function libMarkup(selectLs) {
	lib.classList.remove('list-empty');
	lib.innerHTML = '';
	
	let sel = selectLs + 'Data';
	//console.log('sel', sel);
	const lsList = loadLs(selectLs);
	//console.log('lsList', lsList);
	if (!lsList || !lsList.length) {
		funEmptyLib(selectLs);
		return console.log('ваш список пуст!');
	}
  let data = { results: loadLs(sel) };
  renderLibMarkup(data);
}
