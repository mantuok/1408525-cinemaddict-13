import SmartView from "./smart.js";
import {getHumanDateFormat} from "../utils/day.js";
import he from "he";

const getDeleteButton = (isDeleting, commentId, clickedButton) => {
  if (isDeleting && commentId === clickedButton) {
    return `<button class="film-details__comment-delete" data-id="${commentId}" Disabled}>Deleting...</button>`
  }
  return `<button class="film-details__comment-delete" data-id="${commentId}"}>Delete</button>`
}

const createFilmCommentTemplate = (comments, data) => {
  const {isDeleting, clikedButton} = data;
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
          ${getDeleteButton(isDeleting, comment.id, clikedButton)}
        </p>
      </div>
    </li>`)
    .join(``);
};

const createCommentsListTemplate = (comments, data) => {
  return `<ul class="film-details__comments-list">${createFilmCommentTemplate(comments, data)}</ul>`;
};

export default class CommentsList extends SmartView {
  constructor(comments) {
    super();
    this._comments = comments;
    this._deleteButtonClickHandler = this._deleteButtonClickHandler.bind(this);
    this._data = {
      clikedButton: null,
      isDeleting: false
    }
  }

  getTemplate() {
    return createCommentsListTemplate(this._comments, this._data);
  }

  restoreHandlers() {
    return
  }

  setDeleteButtonClickHandler(callback) {
    this._callback.deleteButtonClick = callback;
    this.getElement()
        .addEventListener(`click`, this._deleteButtonClickHandler);
  }

  _deleteButtonClickHandler(evt) {
    if (evt.target.className !== `film-details__comment-delete`) {
      return;
    }
    evt.preventDefault();
    this._data.clikedButton = evt.target.dataset.id;
    this._callback.deleteButtonClick(evt.target.dataset.id);
  }

}
