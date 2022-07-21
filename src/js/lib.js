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

	const indexWatched = loadLs('Watched');
	const indexQueue = loadLs('Queue');
	console.log('indexWatched ', indexWatched );
	console.log('indexQueue', indexQueue);
	if ((indexQueue || indexWatched) && indexQueue > indexWatched) {
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
	const libIndex = loadLs(libName);//'Queue'//'Watched'
	if (libName === 'Queue') {
		btnQueue.classList.add('btn-orange');
		btnWatched.classList.remove('btn-orange');
	} else {
		btnQueue.classList.remove('btn-orange');
		btnWatched.classList.add('btn-orange');
	}
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
