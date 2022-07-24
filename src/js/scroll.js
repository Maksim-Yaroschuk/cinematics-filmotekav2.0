import { toTopBtn } from './refs';

window.addEventListener('scroll', onScroll);
if(toTopBtn)
toTopBtn.addEventListener('click', onToTopBtn);

function onScroll() {
    setThemOnButtonToTop();
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if (scrolled > coords) {
        toTopBtn.classList.add('btn-to-top--visible');
    };
    if (scrolled <= coords && toTopBtn) {
        toTopBtn.classList.remove('btn-to-top--visible');
    };
};
function onToTopBtn() {
    if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
};

onScroll();
onToTopBtn();

function setThemOnButtonToTop() {
    const bodyClassThemChoosed2 = document.querySelector('body').classList.contains('dark');
    const buttonToTop = document.querySelector('.btn-to-top');
    if (bodyClassThemChoosed2) {
        buttonToTop.classList.add('btn-to-top--dark');
    } else {
        buttonToTop.classList.remove('btn-to-top--dark');
    };
};