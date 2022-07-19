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

function funAddWatched(id) {
	const moviesData = JSON.parse(localStorage.getItem('moviesData'));
    const movieData = moviesData.find(movie => movie.id === id);
  const watchedArr = loadLs('Watched') ? loadLs('Watched') : [0];
  const index = watchedArr.indexOf(id);
  if (index < 0) {
	  watchedArr.push(id);
	  saveLs('WatchData', movieData);
  } else {
    watchedArr.splice(index, 1);
	  console.log('WatchedArr', watchedArr);
	  removeLs('WatchData');
  }
  saveLs('Watched', watchedArr);
  console.log('loadLs', loadLs('Watched'));
  //localStorage.clear();
}

function funAddQueue(id) {
	const moviesData = JSON.parse(localStorage.getItem('moviesData'));
    const movieData = moviesData.find(movie => movie.id === id);
  const queueArr = loadLs('Queue') ? loadLs('Queue') : [0];
  const index = queueArr.indexOf(id);
  if (index < 0) {
	  queueArr.push(id);
	  saveLs('QueueData', movieData);
  } else {
    queueArr.splice(index, 1);
    removeLs('QueueData');
  }
  saveLs('Queue', queueArr);
  console.log('loadLs', loadLs('Queue'));
}

export { funAddWatched, funAddQueue, saveLs, loadLs, removeLs };
export function moviesDataUpdate(data) {
  localStorage.setItem('moviesData', JSON.stringify(data.results));
}
