//save(),load(),remove(),

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


import { getTrending, IMG_BASE_URL, IMG_W400 } from './api';
import { getMovieDetails } from './api';

//console.log(getSearchMovie);

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');
const btnAddWatched = document.querySelector('.btn--addwatched');
const btnAddQueue = document.querySelector('.btn--addqueue');

btnWatched.addEventListener("click", filterWafched);
btnQueue.addEventListener("click", filterQueue);
btnAddWatched.addEventListener("click", toggle(addWafched,remWatched));
btnAddQueue.addEventListener("click", toggle(addQueue, remQueue));

const filterWafched = (wafched) => {
	const wafchedList = localStorage.getItem(wafched)//.id;load
	return wafchedList.map(() => {

		//// getMovieDetails();
		// createListMarkup(data)
	})
	// renderMarkup(data);
};

const filterQueue = (queue) => {
	const queueList = localStorage.getItem(queue)//.id;
	return queueList.map(() => {
		//// getMovieDetails();
		// createListMarkup(data)
	})
	// renderMarkup(data);
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

const addWafched = (save) => {
	const id = document.querySelector('.poster-list__item').key;
	// const id = e.getMovieDetails().then(r => r.id);
	save(watched,id);
};

const addQueue = (save) => {
	const id = document.querySelector('.poster-list__item').key;
	save(queue,id);
};

const remWatched = (remove) => {
	const id = document.querySelector('.poster-list__item').key;
	remove(watched,id);
};

const remQueue = (remove) => {
	const id = document.querySelector('.poster-list__item').key;
	remove(queue,id);
};
