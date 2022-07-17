import { toTopBtn } from './refs';

window.addEventListener('scroll', onScroll);
toTopBtn.addEventListener('click', onToTopBtn);

function onScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;
    if (scrolled > coords) {
        toTopBtn.style.transform = "translateX(0)";
    };
    if (scrolled < coords) {
        toTopBtn.style.transform = "translateX(300%)";
    };
};
function onToTopBtn() {
    if (window.pageYOffset > 0) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
};

onScroll();
onToTopBtn();