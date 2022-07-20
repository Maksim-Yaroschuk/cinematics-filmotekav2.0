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
///localStorage.clear();
const moviesData = loadLs('moviesData');
console.log('moviesData', moviesData);
const WatchedData = loadLs('WatchedData');
console.log('WatchedData', WatchedData);
const QueueData = loadLs('QueueData');
console.log('QueueData', QueueData);
const Watched = loadLs('Watched');
console.log('Watched', Watched);
const Queue = loadLs('Queue');
console.log('Queue', Queue);

function funAddWatched(id) {
	const moviesData = loadLs('moviesData');
	const movieData = moviesData.find(movie => movie.id === id);
	const libArr = loadLs('Watched') ? loadLs('Watched') : [];
	const libData = loadLs('WatchedData') ? loadLs('WatchedData') : [{}];
	const index = libArr.indexOf(id);
	if (index < 0) {
		libArr.push(id);
		libData.push(movieData);
	} else {
		libArr.splice(index, 1);
		const libData = loadLs('WatchedData');
		libData.splice(index, 1);
	  console.log('libArr', libArr);
	}
  saveLs('Watched', libArr);
	console.log('loadLs', loadLs('Watched'));
	saveLs('WatchedData', libData);
}
function funAddQueue(id) {
	const moviesData = loadLs('moviesData');
	const movieData = moviesData.find(movie => movie.id === id);
	const libArr = loadLs('Queue') ? loadLs('Queue') : [];
	const libData = loadLs('QueueData') ? loadLs('QueueData') : [{}];
	const index = libArr.indexOf(id);
	if (index < 0) {
		libArr.push(id);
		libData.push(movieData);
	} else {
		libArr.splice(index, 1);
		const libData = loadLs('QueueData');
		libData.splice(index, 1);
	  console.log('libArr', libArr);
	}
  saveLs('Queue', libArr);
	console.log('loadLs', loadLs('Queue'));
	saveLs('QueueData', libData);
}

export { funAddWatched, funAddQueue, saveLs, loadLs, removeLs };
export function moviesDataUpdate(data) {
  localStorage.setItem('moviesData', JSON.stringify(data.results));
}
