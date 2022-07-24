import { getMovieDetails } from "./api"; 

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

// Функція яку ми правили!!!

async function addListLibrary(id, select) {
  const sel = select + 'Data';

  const movData = await getMovieDetails(id)

  console.log(movData)

  // const moviesData = loadLs('moviesData');
  // const movieData = moviesData.find(movie => movie.id === id);
  const libArr = loadLs(select) ? loadLs(select) : [];
  const libData = { results: loadLs(sel) ?loadLs(sel): [] }
  console.log(libData)
  const index = libArr.indexOf(id);
  if (index < 0) {
    libArr.push(id);
    libData.results.push(movData);
  } else {
    libArr.splice(index, 1);
    //const libData = loadLs(sel);
    libData.splice(index, 1);
  }
  saveLs(select, libArr);
  saveLs(sel, libData);

}

export { addListLibrary, funAddQueue, saveLs, loadLs, removeLs };
export function moviesDataUpdate(data) {
  localStorage.setItem('moviesData', JSON.stringify(data.results));
}
