import AbstractView from "./abstract.js";
import {getHumanDateFormat} from "../utils/day.js";
import he from "he";

const createFilmCommentTemplate = (comments) => {
  return comments.map((comment) =>
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment.text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${getHumanDateFormat(comment.date)}</span>
          <button class="film-details__comment-delete" data-id="${comment.id}">Delete</button>
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
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createCommentsListTemplate(this._comments);
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.deleteButtonClick = callback;
    this.getElement().addEventListener(`click`, this._deleteButtonClickHandler);
  }

  _deleteButtonClickHandler(evt) {
    if (evt.target.className !== `film-details__comment-delete`) {
      return;
    }
    evt.preventDefault();
    this._callback.deleteButtonClick(evt.target.dataset.id);
  }

}
