import Observer from "./observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._items = [];
  }

  set(films) {
    this._items = films.slice();
  }

  get() {
    return this._items;
  }

  update(updateType, update) {
    const index = this._items.findIndex((item) => item.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._items = [
      ...this._items.slice(0, index),
      update,
      ...this._items.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  isEmpty() {
    return this._items.length === 0;
  }
}
