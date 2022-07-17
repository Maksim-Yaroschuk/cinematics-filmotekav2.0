// import { getTrending } from './js/api';
// import modal from './js/modal';
//import './js/trendings';
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

const btnWatched = document.querySelector(".btn--watched");
const btnQueue = document.querySelector(".btn--queue");
const btnAddWatched = document.querySelector(".modal__watched");
const btnAddQueue = document.querySelector(".modal__queue");
const poster = document.querySelector('.poster-list__item');
console.log('btnWatched', btnWatched);
console.log('btnQueue', btnQueue);
console.log('btnAddWatched', btnAddWatched);
console.log('btnAddQueue', btnAddQueue);
console.log('poster', poster);

//btnWatched.addEventListener("click", filterWatched);
//btnQueue.addEventListener("click", filterQueue);
btnAddWatched.addEventListener("click",funAddWatched );
btnAddQueue.addEventListener("click", funAddQueue);
poster.addEventListener("click", funAddQueue);

function funAddWatched(e) {
	const id = e.currentTarget.parentElement.getAttribute(key);//id
	console.log(id);
	if (load(id)) {
		remove(id);
		console.log('id', load(id));
	} else {
		save(id, `'Watched:'${id}`);
		console.log('id', load(id));
		k.push(id);
	}
//console.log('kid',k);
}
function funAddQueue(e) {
	const id = e.currentTarget.parentElement.getAttribute(key);//.id;	
	console.log(id);
	if (load(id)) {
		remove(id);
		console.log('id', load(id));
		
	} else {
		save(id, `'Queue:'${id}`);
		console.log('id', load(id));
		
	}

}
const filterWatched = () => {
	console.log('hay');
	//if()load()
	// watchedList.map(() => {

	// 	//// getMovieDetails();
	// 	createListMarkup(data)
	// })
	// renderMarkup(data);
};


const filterQueue = () => {
	console.log('hay');
	// const queueList = load()//.id;
	// queueList.map(() => {
	// 	//// getMovieDetails();
	// 	createListMarkup(data)
	// })
	// renderMarkup(data);
};


// const handler = () => { console.log('id', 'id') };

// const filterWatched = () => {
// 	const watchedList = localStorage.getItem()//.id;load


// const toggle = (yes, no, e, save) => {
// 	let val = localStorage.toggleVal.getItem();
// 	if (val) {
// 		val = false;
// 		yes(e,save);
// 	} else {
// 		val = true;
// 		no(e,save);
// 	}
// }

// const addWatched = (save) => {
// 	const id = document.querySelector('.poster-list__item').key;
// 	console.log('id', id);
// 	// const id = e.getMovieDetails().then(r => r.id);
// 	save(watched,id);
// };

// const addQueue = (save) => {
// 	const id = document.querySelector('.poster-list__item').key;
// 	console.log('id', id);
// 	save(queue,id);
// };

// const remWatched = (remove) => {
// 	const id = document.querySelector('.poster-list__item').key;
// 	console.log('id', id);
// 	remove(watched,id);
// };

// const remQueue = (remove) => {
// 	const id = document.querySelector('.poster-list__item').key;
// 	console.log('id', id);
// 	remove(queue,id);
// };

