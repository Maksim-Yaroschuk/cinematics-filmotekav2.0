import { loadLs, saveLs } from './storage';
const themeBtn = document.getElementById('toggle-theme-btn');
const themeImage = document.getElementById('toggle-theme-image');
const sun = document.querySelector('.sun');//.hidden = true;
const moon = document.querySelector('.moon');//.hidden = true;

const titleCard = document.querySelector('.poster-list__title');

const themeValue = loadLs('theme') ? loadLs('theme') : 'light';

saveLs('theme', themeValue);
document.body.classList.add(themeValue);
if (themeValue === 'light') {
	sun.style.visibility = 'hidden';
} else {
	moon.style.visibility = 'hidden';
}

themeBtn.addEventListener('click', () => {
	const val = loadLs('theme');
	if (val === 'light') {
		document.body.classList.add('dark');
		document.querySelector('.modal').classList.add('dark')
		moon.style.visibility = 'hidden';
		sun.style.visibility = 'visible';
		saveLs('theme', 'dark');
	} else {
		document.body.classList.remove('dark');
		document.querySelector('.modal').classList.remove('dark')
		sun.style.visibility = 'hidden';
		moon.style.visibility = 'visible';
		saveLs('theme', 'light');
	}
});

