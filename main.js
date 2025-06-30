"use strict";
const inputNameElement = document.getElementById('input-name');
const inputCommentElement = document.getElementById('input-comment');
const formButton = document.getElementById('form-button');
const listComments = document.getElementById('comments');

const dataListComments = [
  {name: "Глеб Фокин", date: "12.02.22 12:18", comment: 'Это будет первый комментарий на этой странице', likes: 3, isLiked: false},
  {name: "Варвара Н.", date: "13.02.22 19:22", comment: "Мне нравится как оформлена эта страница! ❤", likes: 75, isLiked: true}
];

// Функция для безопасного отображения текста
function sanitizeText(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Функция для форматирования цитат (сохраняем > для цитирования)
function formatCommentText(text) {
  // Разделяем текст на строки
  const lines = text.split('\n');
  
  // Обрабатываем каждую строку
  return lines.map(line => {
    // Если строка начинается с >, оставляем как есть (но экранируем остальное)
    if (line.startsWith('>')) {
      return '&gt;' + sanitizeText(line.substring(1));
    }
    // Иначе полностью экранируем строку
    return sanitizeText(line);
  }).join('<br>'); // Объединяем строки с <br> для переносов
}

function getCurrentDate() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function renderComments() {
  listComments.innerHTML = dataListComments.map((comment, index) => `
    <li class="comment" data-index="${index}">
      <div class="comment-header">
        <div>${sanitizeText(comment.name)}</div>
        <div>${comment.date}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${formatCommentText(comment.comment)}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
        </div>
      </div>
    </li>
  `).join('');

  initEventListeners();
}

function initEventListeners() {
  // Обработчики для комментариев
  document.querySelectorAll('.comment').forEach(commentEl => {
    commentEl.addEventListener('click', function(e) {
      if (!e.target.closest('.like-button')) {
        const index = this.dataset.index;
        const comment = dataListComments[index];
        inputCommentElement.value = `> ${comment.name}: ${comment.comment}\n`;
        inputCommentElement.focus();
      }
    });
  });

  // Обработчики для лайков
  document.querySelectorAll('.like-button').forEach((btn, index) => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      dataListComments[index].isLiked = !dataListComments[index].isLiked;
      dataListComments[index].likes += dataListComments[index].isLiked ? 1 : -1;
      renderComments();
    });
  });
}

function validateForm() {
  const name = inputNameElement.value.trim();
  const comment = inputCommentElement.value.trim();
  let isValid = true;

  // Сброс предыдущих ошибок
  inputNameElement.classList.remove('error');
  inputCommentElement.classList.remove('error');

  if (!name) {
    inputNameElement.classList.add('error');
    isValid = false;
  }

  if (!comment) {
    inputCommentElement.classList.add('error');
    isValid = false;
  }

  if (!isValid) {
    alert('Пожалуйста, заполните все поля корректно.');
    return false;
  }

  return true;
}

function addNewComment() {
  if (!validateForm()) return;

  const newComment = {
    name: inputNameElement.value.trim(),
    date: getCurrentDate(),
    comment: inputCommentElement.value.trim(),
    likes: 0,
    isLiked: false
  };

  dataListComments.push(newComment);
  renderComments();

  // Очистка формы
  inputNameElement.value = '';
  inputCommentElement.value = '';
}

// Инициализация
formButton.addEventListener('click', function(e) {
  e.preventDefault();
  addNewComment();
});

renderComments();
