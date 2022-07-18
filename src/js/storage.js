//import { renderMarkup } from './renderMarkup';//createListMarkup getMovieDetails,
import { list } from './refs';
import { createListMarkup, renderMarkup } from './renderMarkup';

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
//const poster = document.querySelector('.poster-list__item');

console.log('btnWatched', btnWatched);
console.log('btnQueue', btnQueue);
console.log('btnAddWatched', btnAddWatched);
console.log('btnAddQueue', btnAddQueue);
//console.log('poster', poster);

btnWatched.addEventListener("click", filterWatched);
btnQueue.addEventListener("click", filterQueue);
btnAddWatched.addEventListener("click",funAddWatched );
btnAddQueue.addEventListener("click", funAddQueue);
//poster.addEventListener("click", funAddQueue);


function funAddWatched() {
	const WatchedArr = load('Watched');
	console.log('WatchedArr', WatchedArr);
	const id = Number(selectedMovie.getAttribute('key'));
	console.log('id', id);
	const index = WatchedArr.indexOf(id);
	console.log('index',index);
	if (index<0) {
		WatchedArr.push(id);
	} else {
		WatchedArr.splice(id, 1);
		console.log('WatchedArr', WatchedArr);
	}
	save('Watched', WatchedArr);
	console.log('load', load('Watched'));
}

function funAddQueue() {
	const QueueArr = load('Queue');
	console.log('QueueArr', QueueArr);
	const id = Number(selectedMovie.getAttribute('key'));
	console.log('id', id);
	const index = QueueArr.indexOf(id);
	console.log('index',index);
	if (index<0) {
		QueueArr.push(id);
	} else {
		QueueArr.splice(id, 1);
		console.log('QueueArr', QueueArr);
	}
	save('Queue', QueueArr);
	console.log('load', load('Queue'));
}


function filterWatched(){
	const WatchedList = load('Watched');
	console.log('WatchedList',WatchedList);

	if (!WatchedList) {
		return console.log('ваш список Watched пуст!');
	}
	//  watchedList.map(() => {
	// 	getMovieDetails();
	// 	createListMarkup(data)
	//  })
	// renderMarkup(data);
};


function filterQueue(){
	const QueueList = load('Queue');
	console.log('QueueArList', QueueList);

	if (!QueueList) {
		return console.log('ваш список Queue пуст!');
	}
	//  watchedList.map(() => {
	// 	getMovieDetails();
	// 	createListMarkup(data)
	//  })
	// renderMarkup(data);
};

function filterLiberty(val){
	const list = load(val);
	console.log('WatchedArr', list);

	if (!list.length) {
		return console.log('ваш список пуст!');
	}
	 list.map(() => {
		getSearchMovieId();
		//getMovieDetails();
		createListMarkup(data);
	 })
	renderMarkup(data);
};

const getSearchMovieId = async (id) => {
  const { data } = await axios.get(
    `/search/movie?api_key=${KEY}&language=en-US&id=${id}`
  );
  return data;
};

function funAddLib(val) {
	const array = load(val);
	console.log('array', array);
	const id = Number(selectedMovie.getAttribute('key'));
	console.log('id', id);
	const index = array.indexOf(id);
	console.log('index',index);
	if (index<0) {
		WatchedArr.push(id);
	} else {
		WatchedArr.splice(id, 1);
		console.log('array', array);
	}
	save(val, array);
	console.log('load', load(val));
}

