
export const saveLs = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

export const loadLs = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export const removeLs = key => {

try {

    localStorage.removeItem(key);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

export function funAddWatched(id) {
	
	const watchedArr = loadLs('Watched') ? loadLs('Watched') : [0] ;
	const index = watchedArr.indexOf(id);
	console.log('index',index);
	if (index<0) {	
		watchedArr.push(id);
	} else {
		watchedArr.splice(index, 1);
		console.log('WatchedArr', watchedArr);
	}
	saveLs('Watched', watchedArr);
	console.log('loadLs', loadLs('Watched'));
	//localStorage.clear();
}

export function funAddQueue(id) {
	const queueArr = loadLs('Queue') ? loadLs('Queue') : [0] ;
	console.log('QueueArr', queueArr);
	const index = queueArr.indexOf(id);
	console.log('index',index);
	if (index<0) {
		queueArr.push(id);
	} else {
		queueArr.splice(index, 1);
		console.log('QueueArr', queueArr);
	}
	saveLs('Queue', queueArr);
	console.log('loadLs', loadLs('Queue'));
}


export function moviesDataUpdate (data) { 
	localStorage.setItem('moviesData', JSON.stringify(data.results))
}

