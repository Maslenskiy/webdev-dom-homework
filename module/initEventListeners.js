import { renderComments } from './renderComments.js'
import { dataListComments } from './dataListComments.js'
import { inputCommentElement } from './constants.js'
export function initEventListeners() {
    // Обработчики для комментариев
    document.querySelectorAll('.comment').forEach((commentEl) => {
        commentEl.addEventListener('click', function (e) {
            if (!e.target.closest('.like-button')) {
                const index = this.dataset.index
                const comment = dataListComments[index]
                inputCommentElement.value = `> ${comment.name}: ${comment.comment}\n`
                inputCommentElement.focus()
            }
        })
    })

    // Обработчики для лайков
    document.querySelectorAll('.like-button').forEach((btn, index) => {
        btn.addEventListener('click', function (e) {
            e.stopPropagation()
            dataListComments[index].isLiked = !dataListComments[index].isLiked
            dataListComments[index].likes += dataListComments[index].isLiked
                ? 1
                : -1
            renderComments()
        })
    })
}
