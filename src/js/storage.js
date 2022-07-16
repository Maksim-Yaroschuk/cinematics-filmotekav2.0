
//save(),load(),remove(),
import { renderMarkup } from './renderMarkup';//createListMarkup
import { createListMarkup } from './renderMarkup';//createListMarkup
//import modal from './js/modal';
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error("Set state error: ", error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
};

const remove = key => {

try {
    localStorage.removeItem(key);
    
  } catch (error) {
    console.error("Get state error: ", error.message);
  }
}

export default {
	save,
	load,
	remove,
};

//console.log(getSearchMovie);

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');
const btnAddWatched = document.querySelector('.modal__watched');
const btnAddQueue = document.querySelector('.modal__queue');
console.log('btnWatched', btnAddWatched);
console.log('btnQueue', btnAddWatched);
console.log('btnAddWatched', btnAddWatched);
console.log('btnAddQueue', btnAddWatched);
btnWatched.addEventListener("click", filterWatched);
btnQueue.addEventListener("click", filterQueue);
btnAddWatched.addEventListener("click", toggle(addWatched,remWatched));
btnAddQueue.addEventListener("click", toggle(addQueue, remQueue));

const filterWatched = (watched) => {
	const watchedList = localStorage.getItem(watched)//.id;load
	watchedList.map(() => {

		//// getMovieDetails();
		createListMarkup(data)
	})
	renderMarkup(data);
};

const filterQueue = (queue) => {
	const queueList = localStorage.getItem(queue)//.id;
	queueList.map(() => {
		//// getMovieDetails();
		createListMarkup(data)
	})
	renderMarkup(data);
};

const toggle = (yes, no, e, save) => {
	let val = localStorage.toggleVal.getItem();
	if (val) {
		val = false;
		yes(e,save);
	} else {
		val = true;
		no(e,save);
	}
}

const addWatched = (save) => {
	const id = document.querySelector('.poster-list__item').key;
	console.log('id', id);
	// const id = e.getMovieDetails().then(r => r.id);
	save(watched,id);
};

const addQueue = (save) => {
	const id = document.querySelector('.poster-list__item').key;
	console.log('id', id);
	save(queue,id);
};

const remWatched = (remove) => {
	const id = document.querySelector('.poster-list__item').key;
	console.log('id', id);
	remove(watched,id);
};

const remQueue = (remove) => {
	const id = document.querySelector('.poster-list__item').key;
	console.log('id', id);
	remove(queue,id);
};

