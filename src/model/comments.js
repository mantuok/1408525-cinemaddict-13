import Observer from "./observer.js";

export default class Comments extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  set(updateType, comments) {
    this._items = comments.slice();

    this._notify(updateType);
  }

  get() {
    return this._items;
  }

  delete(actionType, commentId) {
    const index = this._items.findIndex((item) => item.id === commentId);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._items = [
      ...this._items.slice(0, index),
      ...this._items.slice(index + 1)
    ];

    this._notify(actionType, commentId);
  }

  add(actionType, update) {
    const newComment = (
      update.filter((comment) =>
        !this._items.some((other) => comment.id === other.id))
    )[0];
    this._items = [
      ...this._items,
      newComment
    ];

    this._notify(actionType, newComment);
  }

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          text: comment.comment,
          date: new Date(comment.date)
        }
    );
    delete comment.comment;
    delete comment.date;

    return adaptedComment;
  }

  static adaptToServer(comment) {

    const adaptedComment = Object.assign(
        {},
        comment,
        {
          "date": comment.date.toISOString(),
          "comment": comment.text,
        }
    );
    delete comment.text;

    return adaptedComment;
  }
}
