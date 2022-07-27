import Notiflix from 'notiflix';

export function chooseThemeForNotiflix() {
    if (document.querySelector('body').classList.contains('dark')) {
        notiflixDark();
    } else {
        notiflixLight();
    };
};

function notiflixDark() {
    Notiflix.Report.init({
            borderRadius: '15px',
            backgroundColor: '#4b4d52',
        info: {
            svgColor: '#ff6b08',
            titleColor: 'bisque',
            messageColor: 'bisque',
            buttonBackground: '#ff6b08',
            buttonColor: 'bisque',
            backOverlayColor: 'rgba(255, 227, 194, 0.2)',
        },
        success: {
            svgColor: '#ff6b08',
            titleColor: 'bisque',
            messageColor: 'bisque',
            buttonBackground: '#ff6b08',
            buttonColor: 'bisque',
            backOverlayColor: 'rgba(255, 227, 194, 0.2)',
        },
        warning: {
            svgColor: '#ff6b08',
            titleColor: 'bisque',
            messageColor: 'bisque',
            buttonBackground: '#ff6b08',
            buttonColor: 'bisque',
            backOverlayColor: 'rgba(255, 227, 194, 0.2)',
        }
    });
    Notiflix.Confirm.init({
        borderRadius: '15px',
        backgroundColor: '#4b4d52',
        titleColor: 'bisque',
        backOverlayColor: 'rgba(255, 227, 194, 0.2)',
        messageColor: 'bisque',
        okButtonColor: 'bisque',
        okButtonBackground: '#ff6b08',
        cancelButtonColor: 'bisque',
        cancelButtonBackground: '#ff6b08',
    })
};

function notiflixLight() {
    Notiflix.Report.init({
        borderRadius: '15px',
        info: {
            svgColor: '#ff6b08',
            buttonBackground: '#ff6b08',
            backOverlayColor: 'rgba(255, 108, 10, 0.2)',
        },
        success: {
            svgColor: '#ff6b08',
            buttonBackground: '#ff6b08',
            backOverlayColor: 'rgba(255, 108, 10, 0.2)',
        },
        warning: {
            svgColor: '#ff6b08',
            buttonBackground: '#ff6b08',
            backOverlayColor: 'rgba(255, 108, 10, 0.2)',
        }
    });
    Notiflix.Confirm.init({
        borderRadius: '15px',
        backOverlayColor: 'rgba(255, 108, 10, 0.2)',
        titleColor: '#ff6b08',
        okButtonBackground: '#ff6b08',
        cancelButtonBackground: '#ff6b08',
    })
};