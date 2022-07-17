const modal = document.querySelector('.modal-backdrop');
const bntModalOpen = document.querySelector('.btn__open-modal');
const btnModalCloss = document.querySelector('.btn__closs-modal');

bntModalOpen.addEventListener('click', onModal);

function onModal() {
  modal.classList.add('modal-open');
  document.body.style.overflow = 'hidden';

  btnModalCloss.addEventListener('click', offModal);
  modal.addEventListener('click', offModalForClickBeackdrop);
  document.addEventListener('keydown', offModalForEscape);
}

function offModalForEscape(e) {
  if (e.key === 'Escape') {
    offModal();
  }
}

function offModalForClickBeackdrop(e) {
  if (e.target === modal) {
    offModal();
  }
}

function offModal() {
  modal.classList.remove('modal-open');
  document.body.style.overflow = 'auto';
  document.removeEventListener('keydown', offModalForEscape);
  modal.removeEventListener('keydown', offModalForClickBeackdrop);
}
