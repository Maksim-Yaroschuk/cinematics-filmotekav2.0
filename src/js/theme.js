const toggleThemeBtn = document.getElementById('toggle-theme-btn');
const toggleThemeImage = document.getElementById('toggle-theme-image');
// console.log(toggleThemeImage.href.baseVal)
toggleThemeBtn.addEventListener('click', () => {
   if (document.body.classList.contains('dark')) {
      document.body.classList.remove('dark')
      console.log('toggleThemeImage')
      toggleThemeImage.href.baseVal = '../images/icons.svg#icon-moon-line';
      localStorage.theme = 'light'
   } else {
      document.body.classList.add('dark')
      toggleThemeImage.href.baseVal = '../images/icons.svg#icon-day-sunny';
      localStorage.theme = 'dark'
     
   }
})

if (localStorage.theme === 'dark') {
   document.body.classList.add('dark')
   toggleThemeImage.href.baseVal = '../images/icons.svg#icon-day-sunny';
}