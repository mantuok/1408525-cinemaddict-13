import AbstractView from "./abstract.js";
import {getHumanDateFormat} from "../utils/day.js";

const createFilmCommentTemplate = (comments) => {
  return comments.map((comment) =>
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${getHumanDateFormat(comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`)
    .join(``);
};

const createCommentsListTemplate = (comments) => {
  return `<ul class="film-details__comments-list">${createFilmCommentTemplate(comments)}</ul>`;
};

export default class CommentsList extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsListTemplate(this._comments);
  }
}
