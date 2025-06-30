import {
    formButton,
    inputNameElement,
    inputCommentElement,
} from './constants.js'
import { renderComments } from './renderComments.js'
import { dataListComments } from './dataListComments.js'
import { validateForm } from './validateForm.js'
import { getCurrentDate } from './getCurentDate.js'
export function addNewComment() {
    if (!validateForm()) return

    const newComment = {
        name: inputNameElement.value.trim(),
        date: getCurrentDate(),
        comment: inputCommentElement.value.trim(),
        likes: 0,
        isLiked: false,
    }

    dataListComments.push(newComment)
    renderComments()

    // Очистка формы
    inputNameElement.value = ''
    inputCommentElement.value = ''

    // Инициализация
    formButton.addEventListener('click', function (e) {
        e.preventDefault()
        addNewComment()
    })
}
