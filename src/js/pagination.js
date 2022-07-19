import * as api from './api';
import * as renderMarkup from './renderMarkup';
import { list, form, warning, imgError} from './refs';
import { moviesDataUpdate } from './storage'

const prevBtn = document.querySelector('.page-btn.prev')
const nextBtn = document.querySelector('.page-btn.next')
const paginationBar = document.querySelector('.pagination-btns')
const paginationSection = document.querySelector('.pagination-section')

prevBtn.classList.add('is-hidden')

let page = 1
let amountOfPages = 1000
let query = ''



if(amountOfPages==1) {
	paginationBar.innerHTML= `<li class="page active">1</li>`
	nextBtn.classList.add('is-hidden')
} else if(amountOfPages>1 &&amountOfPages<6) {
	paginationBar.innerHTML= ``
	for(let i=1; i<=amountOfPages; i++) {
		paginationBar.insertAdjacentHTML('beforeend', `<li class="page">${i}</li>`)
		paginationBar.children[0].classList.add('active')
	}
} else {
	paginationBar.children[8].textContent = amountOfPages
}


nextBtn.addEventListener('click', onNextBtnClick)
prevBtn.addEventListener('click', onPrevBtnClick)
paginationBar.addEventListener('click', onPageClick)
form.addEventListener('submit', search);

function onPageClick(e) {
	if(e.target.className == 'page') {
		renderPagination(e)
	}
}

function onNextBtnClick() {
console.log(search)
	if(page==amountOfPages-1) {
		nextBtn.classList.add('is-hidden')
	} 
	if(page==1) {
		prevBtn.classList.remove('is-hidden')
	}
	if(amountOfPages>1 && amountOfPages<6) {
		paginationBar.children[page].classList.add('active')
		paginationBar.children[page-1].classList.remove('active')
		page+=1
	} else {
		if(page<3) {
			page+=1
			paginationBar.children[page+1].classList.add('active')
			paginationBar.children[page].classList.remove('active')
		} else if(page>=3) {
			page+=1
			if(page<=amountOfPages-2) {
				paginationBar.children[0].classList.remove('is-hidden')
				paginationBar.children[1].classList.remove('is-hidden')
				paginationBar.children[2].textContent = page - 2
				paginationBar.children[3].textContent = page - 1
				paginationBar.children[4].textContent = page 
				paginationBar.children[5].textContent = page + 1
				paginationBar.children[6].textContent = page + 2
			} 
			if(page>=amountOfPages-2) {
				paginationBar.children[7].classList.add('is-hidden')
				paginationBar.children[8].classList.add('is-hidden')
			}
			if(page==amountOfPages-1) {
				paginationBar.children[4].classList.remove('active')
				paginationBar.children[5].classList.add('active')
			}
		}
		if(page==amountOfPages) {
		paginationBar.children[5].classList.remove('active')
		paginationBar.children[6].classList.add('active')
		}
	}
	if(query!='') {
		api.getSearchMovie(query, page).then((data) => {
			window.scrollTo({
				top: 100,
				behavior: 'smooth'
			});
			renderMarkup.renderMarkup(data)
			
			console.log(data)
		})
	} else {
		api.getTrending(page).then((data) => {
			window.scrollTo({
				top: 100,
				behavior: 'smooth'
			});
			console.log(data)
				renderMarkup.renderMarkup(data)
				moviesDataUpdate(data)
			})
	}
}

function onPrevBtnClick() {
	if(page==amountOfPages) {
		nextBtn.classList.remove('is-hidden')
	}
	if(page==2) {
		prevBtn.classList.add('is-hidden')
	} 
	if(amountOfPages>1 && amountOfPages<6) {
		paginationBar.children[page-2].classList.add('active')
		paginationBar.children[page-1].classList.remove('active')
		page-=1
	} else {
		if(page<4) {
			page-=1
			paginationBar.children[page+1].classList.add('active')
			paginationBar.children[page+2].classList.remove('active')
		} else if(page>=3 && page<amountOfPages-2) {
			page-=1
			paginationBar.children[2].textContent = page - 2
			paginationBar.children[3].textContent = page - 1
			paginationBar.children[4].textContent = page 
			paginationBar.children[5].textContent = page + 1
			paginationBar.children[6].textContent = page + 2
			if(page==3) {
				paginationBar.children[0].classList.add('is-hidden')
				paginationBar.children[1].classList.add('is-hidden')
			}
		}
		if(page==amountOfPages-2) {
			page-=1
			paginationBar.children[7].classList.remove('is-hidden')
			paginationBar.children[8].classList.remove('is-hidden')
			paginationBar.children[2].textContent = page - 2
			paginationBar.children[3].textContent = page - 1
			paginationBar.children[4].textContent = page 
			paginationBar.children[5].textContent = page + 1
			paginationBar.children[6].textContent = page + 2
		} else if(page==amountOfPages-1) {
			page-=1
			paginationBar.children[4].classList.add('active')
			paginationBar.children[5].classList.remove('active')
		} else if(page==amountOfPages) {
			page-=1
			paginationBar.children[5].classList.add('active')
			paginationBar.children[6].classList.remove('active')
		}
	}
	if(query!='') {
		api.getSearchMovie(query, page).then((data) => {
			window.scrollTo({
				top: 150,
				behavior: 'smooth'
			});
			renderMarkup.renderMarkup(data)
			
			console.log(data)
		})
	} else {
		api.getTrending(page).then((data) => {
			window.scrollTo({
				top: 150,
				behavior: 'smooth'
			});
			console.log(data)
				renderMarkup.renderMarkup(data)
				moviesDataUpdate(data)
			})
	}
}

function renderPagination(e) {
	if(amountOfPages>1 && amountOfPages<6) {
		paginationBar.children[page-1].classList.remove('active')
		page = parseInt(e.target.textContent)
		paginationBar.children[page-1].classList.add('active')
	} else {
		page = parseInt(e.target.textContent)
		if(page==1) {
			paginationBar.innerHTML= `
			<li class="page is-hidden">1</li>
			<li class="page is-hidden">...</li>
			<li class="page active">1</li>
			<li class="page">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="page">...</li>
			<li class="page">${amountOfPages}</li>`
		} else if(page==2) {
			paginationBar.innerHTML= `
			<li class="page is-hidden">1</li>
			<li class="page is-hidden">...</li>
			<li class="page">1</li>
			<li class="page active">2</li>
			<li class="page">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="page">...</li>
			<li class="page">${amountOfPages}</li>`
		} else if(page==3) {
			paginationBar.innerHTML= `
			<li class="page is-hidden">1</li>
			<li class="page is-hidden">...</li>
			<li class="page">1</li>
			<li class="page">2</li>
			<li class="page active">3</li>
			<li class="page">4</li>
			<li class="page">5</li>
			<li class="page">...</li>
			<li class="page">${amountOfPages}</li>`
		} else if(page>3) {
			if(page<=amountOfPages-2) {
				paginationBar.innerHTML= `
			<li class="page">1</li>
			<li class="page">...</li>
			<li class="page">${page-2}</li>
			<li class="page">${page-1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page+1}</li>
			<li class="page">${page+2}</li>
			<li class="page">...</li>
			<li class="page">${amountOfPages}</li>`
			} 
			if(page>=amountOfPages-2) {
				paginationBar.innerHTML= `
			<li class="page">1</li>
			<li class="page">...</li>
			<li class="page">${page-2}</li>
			<li class="page">${page-1}</li>
			<li class="page active">${page}</li>
			<li class="page">${page+1}</li>
			<li class="page">${page+2}</li>
			<li class="page is-hidden">...</li>
			<li class="page is-hidden">${amountOfPages}</li>`
			}
			if(page==amountOfPages-1) {
				paginationBar.innerHTML= `
				<li class="page">1</li>
				<li class="page">...</li>
				<li class="page">${amountOfPages-4}</li>
				<li class="page">${amountOfPages-3}</li>
				<li class="page">${amountOfPages-2}</li>
				<li class="page active">${amountOfPages-1}</li>
				<li class="page">${amountOfPages}</li>
				<li class="page is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`
				}
			}
			if(page==amountOfPages) {
				paginationBar.innerHTML= `
				<li class="page">1</li>
				<li class="page">...</li>
				<li class="page">${amountOfPages-4}</li>
				<li class="page">${amountOfPages-3}</li>
				<li class="page">${amountOfPages-2}</li>
				<li class="page">${amountOfPages-1}</li>
				<li class="page active">${amountOfPages}</li>
				<li class="page is-hidden">...</li>
				<li class="page is-hidden">${amountOfPages}</li>`
			}
	}
	if(page==amountOfPages) {
		nextBtn.classList.add('is-hidden')
	} else {
		nextBtn.classList.remove('is-hidden')
	}
	if(page==1) {
		prevBtn.classList.add('is-hidden')
	} else {
		prevBtn.classList.remove('is-hidden')
	}

	if(query!='') {
		api.getSearchMovie(query, page).then((data) => {
			window.scrollTo({
				top: 100,
				behavior: 'smooth'
			});
			renderMarkup.renderMarkup(data)
			
			console.log(data)
		})
	} else {
		api.getTrending(page).then((data) => {
			window.scrollTo({
				top: 100,
				behavior: 'smooth'
			});
			//Добавление данных о фильмах этой страницы в localStorage
			moviesDataUpdate(data)
			//
			renderMarkup.renderMarkup(data)
		})
	}
}

function clearPagination(amountOfPages) {
	paginationBar.innerHTML= `	<li class="page is-hidden">1</li>
	<li class="dots is-hidden">...</li>
	<li class="page active">1</li>
	<li class="page">2</li>
	<li class="page">3</li>
	<li class="page">4</li>
	<li class="page">5</li>
	<li class="dots">...</li>
	<li class="page">${amountOfPages}</li>`
}

function search(e) {
  e.preventDefault();
  const { searchMovie } = e.currentTarget;
  query = searchMovie.value.toLowerCase().trim();
	if(query=='') {
		paginationSection.classList.add('is-hidden')
		warningShown();
		form.reset();
	} else {
		warningUnShown();
		form.reset();
		paginationSection.classList.remove('is-hidden')
	}
	api.getSearchMovie(query, page).then((data) => {
		moviesDataUpdate(data)
		amountOfPages = data.total_pages
		clearPagination(amountOfPages)
		if(amountOfPages==1) {
			prevBtn.classList.add('is-hidden')
			paginationBar.innerHTML= `<li class="page active">1</li>`
			nextBtn.classList.add('is-hidden')
		} else if(amountOfPages>1 &&amountOfPages<6) {
			paginationBar.innerHTML= ``
			for(let i=1; i<=amountOfPages; i++) {
				paginationBar.insertAdjacentHTML('beforeend', `<li class="page">${i}</li>`)
				paginationBar.children[0].classList.add('active')
			}
		} else {
			paginationBar.children[8].textContent = amountOfPages
		}
		if (data.results.length < 1 || query=='') {
			warningShown();
			form.reset();
			paginationSection.classList.add('is-hidden')
		}  else {
			warningUnShown();
			renderMarkup.renderMarkup(data);
			form.reset();
			paginationSection.classList.remove('is-hidden')
		} 
	})
	page=1
}

function warningShown() {
  warning.classList.remove('visually-hidden');
  imgError.classList.remove('visually-hidden');
  list.classList.add('visually-hidden');
}

function warningUnShown() {
  warning.classList.add('visually-hidden');
  imgError.classList.add('visually-hidden');
  list.classList.remove('visually-hidden');
}