// Выполняй это задание в файлах 03-feedback.html и 03-feedback.js. Разбей его на несколько подзадач:

import throttle from "lodash.throttle";

// Отслеживай на форме событие input, и каждый раз записывай в локальное хранилище объект с полями email и message, 
// в которых сохраняй текущие значения полей формы. Пусть ключом для хранилища будет строка "feedback-form-state".

const LOCALSTORAGE_KEY = 'feedback-form-state';
const form = document.querySelector('.feedback-form');
const email = document.querySelector('.feedback-form input');
const message = document.querySelector('.feedback-form textarea');

// Сделай так, чтобы хранилище обновлялось не чаще чем раз в 500 миллисекунд. Для этого добавь в проект и используй библиотеку lodash.throttle.

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

// При загрузке страницы проверяй состояние хранилища, и если там есть сохраненные данные, заполняй ими поля формы. 
// В противном случае поля должны быть пустыми.

let formData = {};

fillingPreviousValues();

function fillingPreviousValues() {
    let savedMessage = localStorage.getItem(LOCALSTORAGE_KEY);
    try {
    savedMessage = JSON.parse(savedMessage);
  } catch (error) {
    console.log(error.name);
    console.log(error.message);
  }

  if (savedMessage) {
    if (savedMessage.email) {
      email.value = savedMessage.email;
      formData.email = savedMessage.email;
    }
    if (savedMessage.message) {
      message.value = savedMessage.message;
      formData.message = savedMessage.message;
    }
  }
}

// При сабмите формы очищай хранилище и поля формы, а также выводи объект с полями email, message и текущими их значениями в консоль.

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}
function onFormSubmit(evt) {
    evt.preventDefault();
    
    console.log(formData);
    
  evt.currentTarget.reset();
  localStorage.removeItem(LOCALSTORAGE_KEY);
  formData = {};
};
