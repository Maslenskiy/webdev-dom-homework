"use strict";
import { renderComments } from "./module/renderComments.js";
import {
  formButton,
  inputNameElement,
  inputCommentElement,
} from "./module/constants.js";
import { dataListComments } from "./module/dataListComments.js";
import { validateForm } from "./module/validateForm.js";
import { getCurrentDate } from "./module/getCurentDate.js";
function addNewComment() {
  if (!validateForm()) return;

  const newComment = {
    name: inputNameElement.value.trim(),
    date: getCurrentDate(),
    comment: inputCommentElement.value.trim(),
    likes: 0,
    isLiked: false,
  };

  dataListComments.push(newComment);
  renderComments();

  // Очистка формы
  inputNameElement.value = "";
  inputCommentElement.value = "";
}

// Инициализация
formButton.addEventListener("click", function (e) {
  e.preventDefault();
  addNewComment();
});

renderComments();
