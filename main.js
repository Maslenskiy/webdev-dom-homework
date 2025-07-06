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
import { addNewComment } from "./module/addNewComment.js";

// Инициализация
formButton.addEventListener("click", function (e) {
  e.preventDefault();
  addNewComment();
});

renderComments();
