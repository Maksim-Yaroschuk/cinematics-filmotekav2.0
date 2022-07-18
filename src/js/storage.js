//import { renderMarkup } from './renderMarkup';//createListMarkup getMovieDetails,
import { list } from './refs';
import { createListMarkup, renderMarkup } from './renderMarkup';

const saveLs = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const loadLs = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const removeLs = key => {

try {

    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

// export default {
// 	saveLs,
// 	loadLs,
// 	removeLs,
// };

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');

const btnAddWatched = document.querySelector('.modal__watched');
const btnAddQueue = document.querySelector('.modal__queue');


console.log('btnWatched', btnWatched);
console.log('btnQueue', btnQueue);
console.log('btnAddWatched', btnAddWatched);
console.log('btnAddQueue', btnAddQueue);

// btnWatched.addEventListener("click", filterWatched);
// btnQueue.addEventListener("click", filterQueue);//("click",funAddWatched );//
// btnAddWatched.addEventListener("click",funAddWatched );
// btnAddQueue.addEventListener("click", funAddQueue);
list.addEventListener('click', createId);

let modId;
function createId(event) {
	const selectedMovie = event.target.closest('li');
  console.log('selectedMovie', selectedMovie);
	if (selectedMovie) {
		//Получение данных о фильме в модалку
		modId = Number(selectedMovie.getAttribute('key'));
	}
	
}
function funAddWatched(id) {
	const watchedArr = loadLS('Watched') ? loadLS('Watched') : [0] ;
	console.log('WatchedArr', watchedArr);
	//const id = modId;//Number(selectedMovie.getAttribute('key'));
	const index = watchedArr.indexOf(id);
	console.log('index',index);
	if (index<0) {	
		watchedArr.push(id);
	} else {
		watchedArr.splice(index, 1);
		console.log('WatchedArr', watchedArr);
	}
	saveLS('Watched', watchedArr);
	console.log('loadLS', loadLS('Watched'));
}

function funAddQueue(id) {
	const queueArr = loadLS('Queue') ? loadLS('Queue') : [0] ;
	console.log('QueueArr', queueArr);
	//const id = modId;//Number(selectedMovie.getAttribute('key'));
	console.log('id', id);
	const index = queueArr.indexOf(id);
	console.log('index',index);
	if (index<0) {
		queueArr.push(id);
	} else {
		queueArr.splice(index, 1);
		console.log('QueueArr', queueArr);
	}
	saveLS('Queue', queueArr);
	console.log('loadLS', loadLS('Queue'));
}

function filterWatched(){
	const WatchedList = loadLS('Watched');
	console.log('WatchedList',WatchedList);

	if (!WatchedList || !WatchedList.length) {
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


	if (!QueueList || !QueueList.length ) {

		return console.log('ваш список Queue пуст!');
	}
	//  watchedList.map(() => {
	// 	getMovieDetails();
	// 	createListMarkup(data)
	//  })
	// renderMarkup(data);
};

function filterLiberty(val){
	const list = loadLS(val);
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

const getSearchMovieId = async id => {
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
	saveLS(val, array);
	console.log('load', load(val));
}

export {
	funAddLib,
	getSearchMovieId,
	filterLiberty,
	filterWatched,
	funAddQueue,
	saveLS,
	loadLS,
	removeLS,
};
