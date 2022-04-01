import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './sass/main.css';

const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  form: document.querySelector('.form'),
  input: document.querySelector('.input-group-absolute__input'),
  backdrop: document.querySelector('.backdrop'),
};

refs.openModalBtn.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.backdrop.addEventListener('click', onBackdropClick);
refs.form.addEventListener('submit', onFormSubmit);

function onOpenModal() {
  window.addEventListener('keydown', onEscKeyPress);
  refs.modal.classList.remove('backdrop--hidden');
}

function onCloseModal() {
  refs.modal.classList.add('backdrop--hidden');
}

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}

function onBackdropClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  const formData = {
    name: refs.form.elements.name.value,
    email: refs.form.elements.email.value,
    password: refs.form.elements.password.value,
    date: refs.form.elements.date.value,
  };
  console.log(formData);
  localStorage.setItem('feedback - form - state', JSON.stringify(formData));
  Notify.info(JSON.stringify(formData), {
    timeout: 11000,
  });
  evt.currentTarget.reset();
}
