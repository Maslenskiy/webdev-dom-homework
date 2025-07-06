import { listComments } from './constants.js'
import { dataListComments } from './dataListComments.js'
import { sanitizeText } from './utilities/sanitizeText.js'
import { formatCommentText } from './formatCommentText.js'
import { initEventListeners } from './initEventListeners.js'
import { apiListCommets } from './dataListComments.js'

export function renderComments() {
    listComments.innerHTML = dataListComments
        .map(
            (comment, index) => `
    <li class="comment" data-id="${comment.id}">
      <div class="comment-header">
        <div>${sanitizeText(comment.author.name)}</div>
        <div>${formatDate(comment.date)}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${formatCommentText(comment.text)}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
        </div>
      </div>
    </li>
  `,
        )
        .join('')

    initEventListeners()
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

fetch('https://wedev-api.sky.pro/api/v1/maslinskiy-yuriy/comments')
.then((response)=> response.json())
.then((data)=>{
  console.log(data.comments)
  apiListCommets(data.comments);
  renderComments();
})