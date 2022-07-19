//import { renderMarkup } from './renderMarkup';//createListMarkup getMovieDetails,
import { list } from './refs';
import { renderMarkup } from './renderMarkup';
import { filterWatched, filterQueue } from './storage';

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');

// const btnAddWatched = document.querySelector('.modal__watched');
// const btnAddQueue = document.querySelector('.modal__queue');


console.log('btnWatched', btnWatched);
console.log('btnQueue', btnQueue);
console.log('btnAddWatched', btnAddWatched);
console.log('btnAddQueue', btnAddQueue);

// btnWatched.addEventListener("click", filterWatched);
// btnQueue.addEventListener("click", filterQueue);//("click",funAddWatched );//
// btnAddWatched.addEventListener("click",funAddWatched );
// btnAddQueue.addEventListener("click", funAddQueue);
// list.addEventListener('click', createId);


function filterWatched(){
	const WatchedList = loadLs('Watched');
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
	const QueueList = loadLs('Queue');
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
	const list = loadLs(val);
	console.log('WatchedArr', list);

	if (!list.length) {
		return console.log('ваш список пуст!');
	}
	 list.map(() => {
		getSearchMovieId();
		//getMovieDetails();
		//createListMarkup(data);
	 })
	renderMarkup(data);

};

// const getSearchMovieId = async id => {
//   const { data } = await axios.get(
//     `/search/movie?api_key=${KEY}&language=en-US&id=${id}`
//   );
//   return data;
// };
// function funAddLib(val) {
// 	const array = loadLs(val);
// 	console.log('array', array);
// 	const id = Number(selectedMovie.getAttribute('key'));
// 	console.log('id', id);
// 	const index = array.indexOf(id);
// 	console.log('index',index);
// 	if (index<0) {
// 		WatchedArr.push(id);
// 	} else {
// 		WatchedArr.splice(id, 1);
// 		console.log('array', array);
// 	}
// 	saveLs(val, array);
// 	console.log('loadLs', loadLs(val));
// }
// function createId(event) {
// 	const selectedMovie = event.target.closest('li');
//   console.log('selectedMovie', selectedMovie);
// 	if (selectedMovie) {
// 		//Получение данных о фильме в модалку
// 		modId = Number(selectedMovie.getAttribute('key'));
// 	}
	
// }

// export {
// 	//funAddLib,
// 	//getSearchMovieId,
// 	//filterLiberty,
// 	//filterWatched,
// 	funAddWatched,
// 	funAddQueue,
// 	saveLs,
// 	loadLs,
// 	removeLs,
// };