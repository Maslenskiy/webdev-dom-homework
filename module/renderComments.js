import {listComments} from './constants.js';
import {dataListComments} from './dataListComments.js';
import {sanitizeText} from './utilities/sanitizeText.js';
import {formatCommentText} from './formatCommentText.js';
import {initEventListeners} from './initEventListeners.js'


export function renderComments() {
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

