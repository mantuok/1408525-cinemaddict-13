import AbstractView from "./abstract.js";

const createCommentsTitle = (film) => {
  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span>
  </h3>`;
};

export default class CommentsTitle extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
  }
  getTemplate() {
    return createCommentsTitle(this._film);
  }
}
