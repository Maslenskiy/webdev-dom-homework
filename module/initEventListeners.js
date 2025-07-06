import { renderComments } from './renderComments.js'
import { dataListComments } from './dataListComments.js'
import { inputCommentElement } from './constants.js'

// Функция для обработки клика по лайку
function handleLikeClick(index) {
    const comment = dataListComments[index];
    if (comment.isLiked) {
        comment.isLiked = false;
        comment.likes--;
    } else {
        comment.isLiked = true;
        comment.likes++;
    }
    renderComments();
}

export function initEventListeners() {
    // Обработчики для комментариев
    document.querySelectorAll('.comment').forEach((commentEl) => {
        commentEl.addEventListener('click', function (e) {
            if (!e.target.closest('.like-button')) {
                const id = this.dataset.id;
                const comment = dataListComments.find(c => String(c.id) === String(id));
                if (comment) {
                    inputCommentElement.value = `> ${comment.author.name}: ${comment.text}\n`;
                    inputCommentElement.focus();
                }
            }
        })
    })

    // Обработчики для лайков
    document.querySelectorAll('.like-button').forEach((btn) => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const commentEl = btn.closest('.comment');
            const id = commentEl.dataset.id;
            const index = dataListComments.findIndex(c => String(c.id) === String(id));
            if (index !== -1) {
                handleLikeClick(index);
            }
        });
    });
}
