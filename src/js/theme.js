const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const toggleThemeImage = document.getElementById('toggle-theme-image');

function setLightTheme() {
   document.body.classList.remove('dark');
   toggleThemeImage.src = '../images/moon-line.svg';
   localStorage.theme = 'light';
};

function setDarkTheme() {
   document.body.classList.add('dark')
   toggleThemeImage.src = '../images/day-sunny.svg';
   localStorage.theme = 'dark';
};

toggleThemeBtn.addEventListener('click', () => {
   if (document.body.classList.contains('dark')) {
      setLightTheme(); 
   } else {
      setDarkTheme();
   }
});

if (localStorage.theme === 'dark') {
   setDarkTheme();
}



