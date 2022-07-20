const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const toggleThemeImage = document.getElementById('toggle-theme-image');

function setLightTheme() {
   document.body.classList.remove('dark');
   toggleThemeImage.href.baseVal = '/icons.adfc4680.svg#icon-moon-line'
   // toggleThemeImage.src = '../images/moon-line.svg';
   localStorage.theme = 'light';
};

function setDarkTheme() {
   document.body.classList.add('dark')
   toggleThemeImage.href.baseVal = '/icons.adfc4680.svg#icon-day-sunny'
   // toggleThemeImage.src = '../images/day-sunny.svg';
   localStorage.theme = 'dark';
};

toggleThemeBtn.addEventListener('click', () => {
   console.log(toggleThemeImage.href)
   
   if (document.body.classList.contains('dark')) {
      setLightTheme(); 
   } else {
      setDarkTheme();
   }
});

if (localStorage.theme === 'dark') {
   setDarkTheme();
}



