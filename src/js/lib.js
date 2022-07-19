//import { renderMarkup } from './renderMarkup';//createListMarkup getMovieDetails,
//import { list } from './refs';
//import { renderMarkup , createListMarkup} from './renderMarkup';
import { loadLs } from './storage';
import { getTrending, getSearchMovieId } from './api';
import { getSearchMovie, IMG_BASE_URL, IMG_W500 } from './api';
import { renderMarkup } from './renderMarkup';
import { list, form, warning, imgError } from './refs';
//import { filterWatched, filterQueue } from './storage';

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');
if(btnWatched ){
console.log('btnWatched', btnWatched);
console.log('btnQueue', btnQueue);}
// 

if (btnWatched!==null) {
	btnWatched.addEventListener("click", filterWatched);
	btnQueue.addEventListener("click", filterQueue);
}

function filterWatched() {
	const WatchedList = loadLs('Watched');
	console.log('WatchedList',WatchedList);
	if (!WatchedList || !WatchedList.length) {
		return console.log('ваш список Watched пуст!');
	}
	const datas = loadLs('WatchData');
	console.log('datas', datas);
	getTrending(2).then((r) => {
		console.log('ваш список Watched', r);
	renderMarkup(r)});//.console.log('btnQueue', btnQueue);
	
};




function searchId(evn) {
  
  const { searchMovie } = evn.currentTarget;
  
  const dat= loadLs(WatchData);
 	const name = dat.find(movie => movie.id === id).name;
  const result = getSearchMovie(name);
  if (result.results.length < 1) {
    warningShown();
    form.reset();
  } else {
    warningUnShown();
    renderMarkup(result);
    form.reset();
  }
}







function filterQueue(){
	const QueueList = loadLs('Queue');
	console.log('QueueArList', QueueList);
	if (!QueueList || !QueueList.length ) {
		return console.log('ваш список Queue пуст!');
	}
	let dat = loadLs('moviesData');
	console.log('dat', dat);
	const name = dat.find(movie => movie.id === 616037);

	console.log('name ', name );
	for (let i = 1; i < dat.length; i++)
		dat.forEach(q => {
			//renderMarkup(q);
			console.log('result', q);
		});
		
	//console.log('ваш список Queue', q);
};

// function filterLiberty(val){
// 	const list = loadLs(val);
// 	console.log('WatchedArr', list);

// 	if (!list.length) {
// 		return console.log('ваш список пуст!');
// 	}
// 	 list.map(() => {
// 		getSearchMovieId();
// 		//getMovieDetails();
// 		//createListMarkup(data);
// 	 })
// 	renderMarkup(data);

// };



// export const getTrending = async (page = 1) => {
//   const { data } = await axios.get(
//     `/trending/movie/week?api_key=${KEY}&page=${page}`
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
// btnWatched.addEventListener("click", filterWatched);
// btnQueue.addEventListener("click", filterQueue);//("click",funAddWatched );//
// btnAddWatched.addEventListener("click",funAddWatched );
// btnAddQueue.addEventListener("click", funAddQueue);
// list.addEventListener('click', createId);
//console.log('btnAddWatched', btnAddWatched);
// console.log('btnAddQueue', btnAddQueue);