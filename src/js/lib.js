import { loadLs } from './storage';
import { createListMarkup, createLibMarkup } from './renderMarkup';
import { lib } from './refs';

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');
const btnResetLs = document.querySelector('.reset-localStor');
if (btnWatched!==null) {
	btnWatched.addEventListener("click", () => {
		libMarkup('Watched');
	});
	btnQueue.addEventListener("click", () => {
		libMarkup('Queue');
	});
	btnResetLs.addEventListener("click", () => { localStorage.clear() });
}

function libMarkup(selectLs) {
	let sel = selectLs + 'Data';
	//console.log('sel', sel);
	const QueueList = loadLs(selectLs);
	//console.log('List', QueueList);
	if (!QueueList || !QueueList.length ) {
		return console.log('ваш список пуст!');
	}
	let dat = loadLs(sel);
	lib.innerHTML = createLibMarkup(dat);
};

