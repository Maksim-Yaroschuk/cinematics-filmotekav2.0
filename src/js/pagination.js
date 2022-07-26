import * as api from './api';
import * as renderMarkup from './renderMarkup';
import { list, form, warning, divError, filterForm, logo, paginationBar, spinner} from './refs';
import { loadLs, moviesDataUpdate, saveLs } from './storage';
import { getSearchForm } from './filter';

if (form) {
  form.addEventListener('submit', search);
};

const prevBtn = document.querySelector('.page-btn.prev');
const nextBtn = document.querySelector('.page-btn.next');
const paginationSection = document.querySelector('.pagination-section');
const toMainBtn = document.querySelector('.to_main__link');

const refs = {
	filterForm: document.querySelector('#filter-form'),
  sortForm: document.querySelector('#sortForm'),
  genreForm: document.querySelector('#genreForm'),
  yearForm: document.querySelector('#yearForm'),
  btnReset: document.querySelector('#btnResetFilter'),
};

if (toMainBtn) {
	toMainBtn.addEventListener('click', (e) => {
		page = 1
		saveLs('page-pg', page)
	} )
}

if (refs.genreForm) {
  refs.genreForm.addEventListener('input', eventGenre);
};
if (refs.yearForm) {
  refs.yearForm.addEventListener('input', eventYear);
};
if (refs.sortForm) {
  refs.sortForm.addEventListener('input', eventSort);
};

if (prevBtn) {
  prevBtn.classList.add('is-hidden');
};
if (refs.btnReset) {
  refs.btnReset.addEventListener('click', submitResetFilter);
};

function submitResetFilter(evn) {
	spinner.classList.remove('done');
	nextBtn.classList.remove('is-hidden')
  evn.preventDefault();
  refs.filterForm[0].options.selectedIndex = 0;
  refs.filterForm[1].options.selectedIndex = 0;
  refs.filterForm[2].options.selectedIndex = 0;
  genre = '';
  year = '';
  sort = '';
	page = 1;
	if(query==='') {
		amountOfPages = 1000;
	} else {
		amountOfPages = loadLs('total-pages')
	}
	saveLs('genre-pg', genre);
	saveLs('year-pg', year);
	saveLs('sort-pg', sort);
	saveLs('page-pg', page);
	saveLs('total-pages', amountOfPages);
  getSearchForm(page, query, genre, year, sort).then(data => {
		renderMarkup.renderMarkup(data);
		moviesDataUpdate(data);
		saveLs('total-pages', amountOfPages);
		spinner.classList.add('done');
	});
	saveLs('page-pg', page);
	clearPagination(amountOfPages)
}

logo.addEventListener('click', onLogoClick);

function onLogoClick(e) {
	amountOfPages = 1000;
	page=1;
	genre='';
	year='';
	query='';
	sort='';
  saveLs('page-pg', page);
  saveLs('genre-pg', genre);
  saveLs('year-pg', year);
  saveLs('total-pages', amountOfPages);
  saveLs('query-pg', query);
	saveLs('sort-pg', sort);
}

if (!loadLs('total-pages')) {
  saveLs('total-pages', 1000);
}
if (!loadLs('page-pg')) {
  saveLs('page-pg', 1);
}

let searchPage = 1;
let page = loadLs('page-pg');
let amountOfPages = loadLs('total-pages');
let query = loadLs('query-pg');
let genre = loadLs('genre-pg');
let year = loadLs('year-pg');
let sort = loadLs('sort-pg');

function eventGenre(evn) {
  if (evn) {
		spinner.classList.remove('done');
    nextBtn.classList.remove('is-hidden');
    genre = evn.target.value;
    page = 1;
    saveLs('page-pg', page);
    saveLs('genre-pg', genre);
    getSearchForm(page, query, genre, year, sort).then(data => {
      renderMarkup.renderMarkup(data);
      if (data.total_pages > 500) {
        amountOfPages = 500;
      } else {
        amountOfPages = data.total_pages;
      }
      clearPagination(amountOfPages);
      saveLs('total-pages', amountOfPages);
			spinner.classList.add('done');
    });
  }
}

function eventYear(evn) {
  if (evn) {
		spinner.classList.remove('done');
    page = 1;
    saveLs('page-pg', page);
    year = evn.target.value;
    saveLs('year-pg', year);
    getSearchForm(page, query, genre, year, sort).then(data => {
      renderMarkup.renderMarkup(data);
      if (data.total_pages > 500) {
        amountOfPages = 500;
      } else {
        amountOfPages = data.total_pages;
      }
      clearPagination(amountOfPages);
			spinner.classList.add('done');
			if(query=='') {
				saveLs('total-pages', amountOfPages);
			}
			if (amountOfPages === 1) {
				prevBtn.classList.add('is-hidden');
				paginationBar.innerHTML = `<li class="page active">1</li>`;
				nextBtn.classList.add('is-hidden');
			} else if (amountOfPages > 1 && amountOfPages < 6) {
				paginationBar.innerHTML = ``;
				nextBtn.classList.remove('is-hidden');
				for (let i = 1; i <= amountOfPages; i++) {
					paginationBar.insertAdjacentHTML(
						'beforeend',
						`<li class="page">${i}</li>`
					);
					paginationBar.children[0].classList.add('active');
				}
			} else {
				paginationBar.children[8].textContent = amountOfPages;
			}
    });
  }
}

function eventSort(evn) {
  if (evn) {
		spinner.classList.remove('done');
    page = 1;
    saveLs('page-pg', page);
    sort = evn.target.value;
    saveLs('sort-pg', sort);
    getSearchForm(page, query, genre, year, sort).then(data => {
      renderMarkup.renderMarkup(data);
      if (data.total_pages > 500) {
        amountOfPages = 500;
      } else {
        amountOfPages = data.total_pages;
      }
      clearPagination(amountOfPages);
      saveLs('total-pages', amountOfPages);
			spinner.classList.add('done');
    });
  }
}

if (nextBtn) {
  nextBtn.addEventListener('click', onNextBtnClick);
  prevBtn.addEventListener('click', onPrevBtnClick);
  paginationBar.addEventListener('click', onPageClick);
}

if(location.pathname.split("/").slice(-1) == 'library.html') {
	amountOfPages = 1000;
	page=1;
	genre='';
	year='';
	query='';
	sort='';
  saveLs('page-pg', page);
  saveLs('genre-pg', genre);
  saveLs('year-pg', year);
  saveLs('total-pages', amountOfPages);
  saveLs('query-pg', query);
	saveLs('sort-pg', sort);
}

if(location.pathname.split("/").slice(-1) != 'library.html') {
	spinner.classList.remove('done');
	getSearchForm(page, query, genre, year, sort).then(data => {
		renderMarkup.renderMarkup(data);
		moviesDataUpdate(data);
		saveLs('total-pages', amountOfPages);
		spinner.classList.add('done');
		if(query) {
			document.querySelector('#genreForm').classList.add('is-hidden');
			document.querySelector('#sortForm').classList.add('is-hidden');
		}
	});
	saveLs('page-pg', page);
	if (amountOfPages > 1 && amountOfPages < 6) {
		paginationBar.children[page - 1].classList.remove('active');
		paginationBar.children[page - 1].classList.add('active');
	} else {
		if (page == 1) {
			paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page active">1</li>
			<li class="page">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
		} else if (page == 2) {
			paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page">1</li>
			<li class="page active">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
		} else if (page == 3) {
			paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page">1</li>
			<li class="page">2</li>
			<li class="page active">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
		} else if (page > 3) {
			if (page <= amountOfPages - 2) {
				paginationBar.innerHTML = `
			<li class="page">1</li>
			<li class="dots">...</li>
			<li class="page">${page - 2}</li>
			<li class="page">${page - 1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page + 1}</li>
			<li class="page">${page + 2}</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
			}
			if (page >= amountOfPages - 2) {
				paginationBar.innerHTML = `
			<li class="page">1</li>
			<li class="dots">...</li>
			<li class="page">${page - 2}</li>
			<li class="page">${page - 1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page + 1}</li>
			<li class="page">${page + 2}</li>
			<li class="dots is-hidden">...</li>
			<li class="page is-hidden">${amountOfPages}</li>`;
			}
			if (page == amountOfPages - 1) {
				paginationBar.innerHTML = `
				<li class="page">1</li>
				<li class="dots">...</li>
				<li class="page">${amountOfPages - 4}</li>
				<li class="page">${amountOfPages - 3}</li>
				<li class="page">${amountOfPages - 2}</li>
				<li class="page active">${amountOfPages - 1}</li>
				<li class="page">${amountOfPages}</li>
				<li class="dots is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`;
			}
		}
		if (page == amountOfPages) {
			paginationBar.innerHTML = `
				<li class="page">1</li>
				<li class="dots">...</li>
				<li class="page">${amountOfPages - 4}</li>
				<li class="page">${amountOfPages - 3}</li>
				<li class="page">${amountOfPages - 2}</li>
				<li class="page">${amountOfPages - 1}</li>
				<li class="page active">${amountOfPages}</li>
				<li class="dots is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`;
		}
	}
	if (page == amountOfPages) {
		nextBtn.classList.add('is-hidden');
	} else {
		nextBtn.classList.remove('is-hidden');
	}
	if (page == 1) {
		prevBtn.classList.add('is-hidden');
	} else {
		prevBtn.classList.remove('is-hidden');
	}	
}

function onPageClick(e) {
  if (e.target.className == 'page') {
    renderPagination(e);
  }
}

function onNextBtnClick() {
	spinner.classList.remove('done');
  if (page == amountOfPages - 1) {
    nextBtn.classList.add('is-hidden');
  }
  if (page == 1) {
    prevBtn.classList.remove('is-hidden');
  }
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page].classList.add('active');
    paginationBar.children[page - 1].classList.remove('active');
    page += 1;
  } else {
    if (page < 3) {
      page += 1;
      paginationBar.children[page + 1].classList.add('active');
      paginationBar.children[page].classList.remove('active');
    } else if (page >= 3) {
      page += 1;
      if (page <= amountOfPages - 2) {
        paginationBar.children[0].classList.remove('is-hidden');
        paginationBar.children[1].classList.remove('is-hidden');
        paginationBar.children[2].textContent = page - 2;
        paginationBar.children[3].textContent = page - 1;
        paginationBar.children[4].textContent = page;
        paginationBar.children[5].textContent = page + 1;
        paginationBar.children[6].textContent = page + 2;
      }
      if (page >= amountOfPages - 2) {
        paginationBar.children[7].classList.add('is-hidden');
        paginationBar.children[8].classList.add('is-hidden');
      }
      if (page == amountOfPages - 1) {
        paginationBar.children[4].classList.remove('active');
        paginationBar.children[5].classList.add('active');
      }
    }
    if (page == amountOfPages) {
      paginationBar.children[5].classList.remove('active');
      paginationBar.children[6].classList.add('active');
    }
  }
  getSearchForm(page, query, genre, year, sort).then(data => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
    renderMarkup.renderMarkup(data);
    moviesDataUpdate(data);
		spinner.classList.add('done');
  });
  saveLs('page-pg', page);
}

function onPrevBtnClick() {
	spinner.classList.remove('done');
  if (page == amountOfPages) {
    nextBtn.classList.remove('is-hidden');
  }
  if (page == 2) {
    prevBtn.classList.add('is-hidden');
  }
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page - 2].classList.add('active');
    paginationBar.children[page - 1].classList.remove('active');
    page -= 1;
  } else {
    if (page < 4) {
      page -= 1;
      paginationBar.children[page + 1].classList.add('active');
      paginationBar.children[page + 2].classList.remove('active');
    } else if (page >= 3 && page < amountOfPages - 2) {
      page -= 1;
      paginationBar.children[2].textContent = page - 2;
      paginationBar.children[3].textContent = page - 1;
      paginationBar.children[4].textContent = page;
      paginationBar.children[5].textContent = page + 1;
      paginationBar.children[6].textContent = page + 2;
      if (page == 3) {
        paginationBar.children[0].classList.add('is-hidden');
        paginationBar.children[1].classList.add('is-hidden');
      }
    }
    if (page == amountOfPages - 2) {
      page -= 1;
      paginationBar.children[7].classList.remove('is-hidden');
      paginationBar.children[8].classList.remove('is-hidden');
      paginationBar.children[2].textContent = page - 2;
      paginationBar.children[3].textContent = page - 1;
      paginationBar.children[4].textContent = page;
      paginationBar.children[5].textContent = page + 1;
      paginationBar.children[6].textContent = page + 2;
    } else if (page == amountOfPages - 1) {
      page -= 1;
      paginationBar.children[4].classList.add('active');
      paginationBar.children[5].classList.remove('active');
    } else if (page == amountOfPages) {
      page -= 1;
      paginationBar.children[5].classList.add('active');
      paginationBar.children[6].classList.remove('active');
    }
  }
  getSearchForm(page, query, genre, year, sort).then(data => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
    renderMarkup.renderMarkup(data);
    moviesDataUpdate(data);
		spinner.classList.add('done');
  });
  saveLs('page-pg', page);
}

function renderPagination(e) {
	spinner.classList.remove('done');
  page = parseInt(e.target.textContent);
  if (amountOfPages > 1 && amountOfPages < 6) {
    paginationBar.children[page - 1].classList.remove('active');
    paginationBar.children[page - 1].classList.add('active');
  } else {
    if (page == 1) {
      paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page active">1</li>
			<li class="page">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
    } else if (page == 2) {
      paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page">1</li>
			<li class="page active">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
    } else if (page == 3) {
      paginationBar.innerHTML = `
			<li class="page is-hidden">1</li>
			<li class="dots is-hidden">...</li>
			<li class="page">1</li>
			<li class="page">2</li>
			<li class="page active">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
    } else if (page > 3) {
      if (page <= amountOfPages - 2) {
        paginationBar.innerHTML = `
			<li class="page">1</li>
			<li class="dots">...</li>
			<li class="page">${page - 2}</li>
			<li class="page">${page - 1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page + 1}</li>
			<li class="page">${page + 2}</li>
			<li class="dots">...</li>
			<li class="page">${amountOfPages}</li>`;
      }
      if (page >= amountOfPages - 2) {
        paginationBar.innerHTML = `
			<li class="page">1</li>
			<li class="dots">...</li>
			<li class="page">${page - 2}</li>
			<li class="page">${page - 1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page + 1}</li>
			<li class="page">${page + 2}</li>
			<li class="dots is-hidden">...</li>
			<li class="page is-hidden">${amountOfPages}</li>`;
      }
      if (page == amountOfPages - 1) {
        paginationBar.innerHTML = `
				<li class="page">1</li>
				<li class="dots">...</li>
				<li class="page">${amountOfPages - 4}</li>
				<li class="page">${amountOfPages - 3}</li>
				<li class="page">${amountOfPages - 2}</li>
				<li class="page active">${amountOfPages - 1}</li>
				<li class="page">${amountOfPages}</li>
				<li class="dots is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`;
      }
    }
    if (page == amountOfPages) {
      paginationBar.innerHTML = `
				<li class="page">1</li>
				<li class="dots">...</li>
				<li class="page">${amountOfPages - 4}</li>
				<li class="page">${amountOfPages - 3}</li>
				<li class="page">${amountOfPages - 2}</li>
				<li class="page">${amountOfPages - 1}</li>
				<li class="page active">${amountOfPages}</li>
				<li class="dots is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`;
    }
  }
  if (page == amountOfPages) {
    nextBtn.classList.add('is-hidden');
  } else {
    nextBtn.classList.remove('is-hidden');
  }
  if (page == 1) {
    prevBtn.classList.add('is-hidden');
  } else {
    prevBtn.classList.remove('is-hidden');
  }

  getSearchForm(page, query, genre, year, sort).then(data => {
    window.scrollTo({
      top: 100,
      behavior: 'smooth',
    });
    renderMarkup.renderMarkup(data);
    moviesDataUpdate(data);
		spinner.classList.add('done');
  });
  saveLs('page-pg', page);
}

// if(!paginationBar.lastElementChild.classList.contains('is-hidden')) {
// 	window.onload = function() {paginationBar.lastElementChild.textContent = amountOfPages}
// }

function clearPagination(amountOfPages) {
  prevBtn.classList.add('is-hidden');
  paginationBar.innerHTML = `	<li class="page is-hidden">1</li>
	<li class="dots is-hidden">...</li>
	<li class="page active">1</li>
	<li class="page">2</li>
	<li class="page">3</li>
	<li class="page">4</li>
	<li class="page">5</li>
	<li class="dots">...</li>
	<li class="page">${amountOfPages}</li>`;
}

function search(e) {
	spinner.classList.remove('done');
  e.preventDefault();
  genre = '';
	document.querySelector('#genreForm').classList.add('is-hidden');
	document.querySelector('#sortForm').classList.add('is-hidden');
  searchPage = 1;
  prevBtn.classList.add('is-hidden');
	nextBtn.classList.remove('is-hidden')
  const { searchMovie } = e.currentTarget;
  query = searchMovie.value.toLowerCase().trim();
  saveLs('query-pg', query);
  if (query == '') {
    paginationSection.classList.add('is-hidden');
    warningShown();
    form.reset();
		spinner.classList.add('done');
  } else {
    warningUnShown();
    form.reset();
    paginationSection.classList.remove('is-hidden');
  }
  api.getSearchMovie(query, searchPage).then(data => {
    moviesDataUpdate(data);
    amountOfPages = data.total_pages;
    saveLs('total-pages', amountOfPages);
    clearPagination(amountOfPages);
		spinner.classList.add('done');
    if (amountOfPages === 1) {
      prevBtn.classList.add('is-hidden');
      paginationBar.innerHTML = `<li class="page active">1</li>`;
      nextBtn.classList.add('is-hidden');
    } else if (amountOfPages > 1 && amountOfPages < 6) {
      paginationBar.innerHTML = ``;
      for (let i = 1; i <= amountOfPages; i++) {
        paginationBar.insertAdjacentHTML(
          'beforeend',
          `<li class="page">${i}</li>`
        );
        paginationBar.children[0].classList.add('active');
      }
    } else {
      paginationBar.children[8].textContent = amountOfPages;
    }
    if (data.results.length < 1 || query === '') {
      warningShown();
      form.reset();
      paginationSection.classList.add('is-hidden');
			query='';
			saveLs('query-pg', query)
			spinner.classList.add('done');
    } else {
      warningUnShown();
      renderMarkup.renderMarkup(data);
      form.reset();
      paginationSection.classList.remove('is-hidden');
    }
  });
}

function warningShown() {
	// warning.classList.remove('visually-hidden');
	divError.classList.remove('visually-hidden');
	list.classList.add('visually-hidden');
	filterForm.classList.add('visually-hidden');
}

function warningUnShown() {
	// warning.classList.add('visually-hidden');
	divError.classList.add('visually-hidden');
	list.classList.remove('visually-hidden');
	filterForm.classList.remove('visually-hidden');
}

