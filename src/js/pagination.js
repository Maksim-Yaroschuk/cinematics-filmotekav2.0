const prevBtn = document.querySelector('.page-btn.prev')
const nextBtn = document.querySelector('.page-btn.next')
const paginationBar = document.querySelector('.pagination-btns')


console.log(1)
console.dir(paginationBar)
paginationBar.children[0].firstChild.classList.add('is-hidden')

let page = 1
const amountOfPages = 1

if(amountOfPages==1) {
	paginationBar.innerHTML= `<li class="page"><span>${page}</li>`
}

paginationBar.children[9].textContent = amountOfPages

nextBtn.addEventListener('click', onNextBtnClick)
prevBtn.addEventListener('click', onPrevBtnClick)

function onNextBtnClick() {
	if(page<3) {
		page+=1
		paginationBar.children[page+2].classList.add('active')
		paginationBar.children[page+1].classList.remove('active')
		paginationBar.children[0].firstChild.classList.remove('is-hidden')
	} 
	else if(page>=3) {
		if(page<amountOfPages-2) {
			page+=1
			paginationBar.children[1].classList.remove('is-hidden')
			paginationBar.children[2].classList.remove('is-hidden')
			paginationBar.children[3].textContent = page - 2
			paginationBar.children[4].textContent = page - 1
			paginationBar.children[5].textContent = page 
			paginationBar.children[6].textContent = page + 1
			paginationBar.children[7].textContent = page + 2
		} else
		if(page>amountOfPages-3) {
			paginationBar.children[8].classList.add('is-hidden')
			paginationBar.children[9].classList.add('is-hidden')
			if(page==amountOfPages-1) {
				paginationBar.children[5].classList.remove('active')
				paginationBar.children[6].classList.add('active')
			}
			page+=1
		}
		if(page==amountOfPages) {
			paginationBar.children[6].classList.remove('active')
			paginationBar.children[7].classList.add('active')
		}
	} 
	
		
		console.dir(paginationBar)
		console.log(page)
	}

	

function onPrevBtnClick() {
	if(page<4) {
		page-=1

		paginationBar.children[page+2].classList.add('active')
		paginationBar.children[page+3].classList.remove('active')

		if(page==1) {
			paginationBar.children[0].firstChild.classList.add('is-hidden')
		}
	} else if(page>=3) {
		page-=1

		paginationBar.children[3].textContent = page - 2
		paginationBar.children[4].textContent = page - 1
		paginationBar.children[5].textContent = page 
		paginationBar.children[6].textContent = page + 1
		paginationBar.children[7].textContent = page + 2

		if(page==3) {
			paginationBar.children[1].classList.add('is-hidden')
			paginationBar.children[2].classList.add('is-hidden')
		}
	}
	console.log(page)
}
	
