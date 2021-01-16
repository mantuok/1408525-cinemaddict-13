import Observer from "./observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  deleteComment(actionType, commentId) {
    const index = this._comments.findIndex((comment) => comment.id === parseInt(commentId, 10));

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notify(actionType, commentId);
  }

  addComment(actionType, update) {
    this._comments = [
      update,
      ...this._comments
    ];

    this._notify(actionType, update);
  }
}
