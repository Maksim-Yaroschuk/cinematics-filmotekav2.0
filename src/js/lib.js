import { loadLs } from './storage';
import { renderMarkup } from './renderMarkup';


const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');
if(btnWatched ){
console.log('btnWatched', btnWatched);
console.log('btnQueue', btnQueue);}
// 

if (btnWatched!==null) {
	btnWatched.addEventListener("click", () => {
		libMarkup('Watched');
	});
	btnQueue.addEventListener("click", () => {
		libMarkup('Queue');
	});
}




function libMarkup(selectLs){
	const QueueList = loadLs(selectLs);
	console.log('QueueArList', QueueList);
	if (!QueueList || !QueueList.length ) {
		return console.log('ваш список Queue пуст!');
	}
	let dat = loadLs('moviesData');
	console.log('dat', dat);
	//const name = dat.find(movie => movie.id === 504827);console.log('name ', name );
	dat.forEach(q => {
			renderMarkup(q);
			console.log('result', q);
		});
		
	//console.log('ваш список Queue', q);
};

