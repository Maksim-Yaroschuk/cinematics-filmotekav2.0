const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const toggleThemeImage = document.getElementById('toggle-theme-image');
const titleCard = document.getElementsByClassName('.poster-list__title')

function setLightTheme() {
   document.body.classList.remove('dark');
   toggleThemeImage.href.baseVal = '/icons.adfc4680.svg#icon-moon-line'
   localStorage.theme = 'light';
};

function setDarkTheme() {
   document.body.classList.add('dark')
   // document.titleCard.classList.add('dark')
   toggleThemeImage.href.baseVal = '/icons.adfc4680.svg#icon-day-sunny'
   localStorage.theme = 'dark';
};

toggleThemeBtn.addEventListener('click', () => {
   // console.log(titleCard)
   
   if (document.body.classList.contains('dark')) {
      setLightTheme(); 
   } else {
      setDarkTheme();
   }
});

if (localStorage.theme === 'dark') {
   setDarkTheme();
}



