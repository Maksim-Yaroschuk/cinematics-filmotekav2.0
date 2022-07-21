(() => {
  const refsLogIn = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
	};
	
  if(refsLogIn.openModalBtn){ 
  refsLogIn.openModalBtn.addEventListener("click", toggleModal);
  refsLogIn.closeModalBtn.addEventListener("click", toggleModal);
}
  function toggleModal() {
    refsLogIn.modal.classList.toggle("is-hidden");
  }
})();