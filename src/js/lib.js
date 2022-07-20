import { loadLs } from './storage';
import { createListMarkup, renderLibMarkup } from './renderMarkup';
import { lib } from './refs';

const btnWatched = document.querySelector('.btn--watched');
const btnQueue = document.querySelector('.btn--queue');


if (btnWatched !== null) {
  btnWatched.addEventListener('click', () => {
    libMarkup('Watched');
  });
  btnQueue.addEventListener('click', () => {
    libMarkup('Queue');
  });
}

export function libMarkup(selectLs) {
  let sel = selectLs + 'Data';
  // console.log('sel', sel);
  const QueueList = loadLs(selectLs);
  // console.log('List', QueueList);
  if (!QueueList || !QueueList.length) {
    return console.log('ваш список пуст!');
  }
  let data = { results: loadLs(sel) };
  // console.log('dat', data);
  // const markupList = createListMarkup(data);
  // console.log('markupList', markupList);
  renderLibMarkup(data);
  // console.log(data);
}

