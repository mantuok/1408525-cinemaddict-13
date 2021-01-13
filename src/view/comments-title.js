import AbstractView from "./abstract.js";

const createCommentsTitle = (comments) => {

  return `<h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span>
  </h3>`;
};

export default class CommentsTitle extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
  }
  getTemplate() {
    return createCommentsTitle(this._comments);
  }
}
