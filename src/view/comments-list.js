import {createElement} from "../utils/render.js"

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
          <span class="film-details__comment-day">${comment.date}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`)
    .join(``);
};

const createCommentsListTemplate = (film, comments) => {
  return `<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span>
  </h3><ul class="film-details__comments-list">${createFilmCommentTemplate(film, comments)}</ul>
  </section>`
};

export default class CommentsList {
  constructor (film, comments) {
    this._film = film;
    this._comments = comments;
    this._element = null;
  };

  getTemplate() {
    return createCommentsListTemplate(this._film, this._comments);
  };

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  };

  removeElement() {
    this._element = null;
  };
};
