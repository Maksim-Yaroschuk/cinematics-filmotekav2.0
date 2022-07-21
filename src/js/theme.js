const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const toggleThemeImage = document.getElementById('toggle-theme-image');
const titleCard = document.querySelector('.poster-list__title');

function setLightTheme() {
   document.body.classList.remove('dark');
   titleCard.classList.toggle('dark');
   toggleThemeImage.href.baseVal = '..//images/sprite/SVG/moon-line.svg';
   localStorage.theme = 'light';
};

function setDarkTheme() {
   document.body.classList.add('dark');
   titleCard.classList.add('dark');

   toggleThemeImage.href.baseVal = '../images/sprite/SVG/day-sunny.svg';
   localStorage.theme = 'dark';
};

toggleThemeBtn.addEventListener('click', () => {
    console.log(titleCard)
   
   if (document.body.classList.contains('dark')) {
      setLightTheme(); 
   } else {
      setDarkTheme();
   }
});

if (localStorage.theme === 'dark') {
   setDarkTheme();
}



