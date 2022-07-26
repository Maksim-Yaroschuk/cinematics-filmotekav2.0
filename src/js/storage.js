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

// const moviesData = loadLs('moviesData');
// console.log('moviesData', moviesData);
// const WatchedData = loadLs('WatchedData');
// console.log('WatchedData', WatchedData);
// const QueueData = loadLs('QueueData');
// console.log('QueueData', QueueData);
// const Watched = loadLs('Watched');
// console.log('Watched', Watched);
// const Queue = loadLs('Queue');
// console.log('Queue', Queue);

function addListLibrary(id, select) {
  const sel = select + 'Data';
  const moviesData = loadLs('moviesData');
  const movieData = moviesData.find(movie => movie.id === id);
  const libArr = loadLs(select) ? loadLs(select) : [];
  const libData = loadLs(sel) ? loadLs(sel) : [];
  const index = libArr.indexOf(id);
  if (index < 0) {
    libArr.push(id);
    libData.push(movieData);
  } else {
    libArr.splice(index, 1);
    //const libData = loadLs(sel);
    libData.splice(index, 1);
  }
  saveLs(select, libArr);
  saveLs(sel, libData);
  //moviesData.inclues;
}

// async function addListLibrary(id, select) {
// 	const sel = select + 'Data';
// 	const moviesData = loadLs('moviesData');
// 	const movieData = moviesData.find(movie => movie.id === id);
// 	//const movieData = await getMovieDetails(id);
// 	console.log('moviesData', moviesData);
// 	console.log('movieData', movieData);
// 	console.log('movData',movData);
// 	const libArr = loadLs(select) ? loadLs(select) : [];
// 	const libData = loadLs(sel) ? loadLs(sel) : [];
//  	const index = libArr.indexOf(id);
// 	if (index < 0) {
// 		if (loadLs(sel) || loadLs(sel) !== 0) {
// 			libArr.push(id);
// 			libData.push(movData);
// 		}
//   } else {
//     libArr.splice(index, 1);
//     //const libData = loadLs(sel);
//     libData.splice(index, 1);
//   }
//   saveLs(select, libArr);
//   saveLs(sel, libData);

// }
export { addListLibrary, saveLs, loadLs, removeLs };
export function moviesDataUpdate(data) {
  localStorage.setItem('moviesData', JSON.stringify(data.results));
}
