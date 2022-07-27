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
    libData.splice(index, 1);
  }
  saveLs(select, libArr);
  saveLs(sel, libData);
}

export { addListLibrary, saveLs, loadLs, removeLs };
export function moviesDataUpdate(data) {
  localStorage.setItem('moviesData', JSON.stringify(data.results));
}
