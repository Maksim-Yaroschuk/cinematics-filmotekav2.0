

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
	const watchedArr = loadLs('Watched') ? loadLs('Watched') : [0] ;
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
	saveLs('Watched', watchedArr);
	console.log('loadLs', loadLs('Watched'));
}

function funAddQueue(id) {
	const queueArr = loadLs('Queue') ? loadLs('Queue') : [0] ;
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
	saveLs('Queue', queueArr);
	console.log('loadLs', loadLs('Queue'));
}

export {
	funAddWatched,
	funAddQueue,
	saveLs,
	loadLs,
	removeLs,
};
