import {
    formButton,
    inputNameElement,
    inputCommentElement,
} from './constants.js'
import { renderComments } from './renderComments.js'
import { dataListComments } from './dataListComments.js'
import { validateForm } from './validateForm.js'
import { getCurrentDate } from './getCurentDate.js'
import {apiListCommets } from './dataListComments.js'

export function generateId() {
    return Date.now().toString() + Math.floor(Math.random() * 10000).toString();
}

export function addNewComment() {
    if (!validateForm()) return

    const newComment = {
        id: generateId(),
        author: { name: inputNameElement.value.trim() },
        date: getCurrentDate(),
        text: inputCommentElement.value.trim(),
        likes: 0,
        isLiked: false,
    }

    // Сначала отправляем на сервер
    fetch('https://wedev-api.sky.pro/api/v1/maslinskiy-yuriy/comments', {
        method: 'POST',
        body: JSON.stringify({
            text: newComment.text,
            name: newComment.author.name
        })
    })
    .then((response) => response.json())
    .then(() => {
        // После успешного добавления — получаем все комментарии
        return fetch('https://wedev-api.sky.pro/api/v1/maslinskiy-yuriy/comments');
    })
    .then((response) => response.json())
    .then((data) => {
        if (Array.isArray(data.comments)) {
            apiListCommets(data.comments)
            renderComments()
        } else {
            console.error('Ошибка: data.comments не массив', data)
        }
        // Очищаем форму только после успешного ответа
        inputNameElement.value = ''
        inputCommentElement.value = ''
    })
}

