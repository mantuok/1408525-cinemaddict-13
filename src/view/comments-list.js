import AbstractView from "./abstract.js";
import {getHumanDateFormat} from "../utils/day.js";

const createFilmCommentTemplate = (film, comments) => {
  const filmComments = comments.filter((comment) => film.comments.includes(comment.id));
  return filmComments.map((comment) =>
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

const createCommentsListTemplate = (film, comments) => {
  return `<ul class="film-details__comments-list">${createFilmCommentTemplate(film, comments)}</ul>`;
};

export default class CommentsList extends AbstractView {
  constructor(film, comments) {
    super();
    this._film = film;
    this._comments = comments;
  }

  getTemplate() {
    return createCommentsListTemplate(this._film, this._comments);
  }
}
