import AbstractView from "./abstract.js";

const createFilmsCountTemplate = (filmCount) => (
  `<p>${filmCount} movies inside</p>`
);

export default class FilmsCount extends AbstractView {
  constructor(value) {
    super();
    this._value = value;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._value);
  }
}
