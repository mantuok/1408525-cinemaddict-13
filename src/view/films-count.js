import {createElement} from "../utils/render.js";

const createFilmsCountTemplate = (filmCount) => (
  `<section class="footer__statistics">
  <p>${filmCount} movies inside</p>
</section>`
);

export default class FilmsCount {
  constructor(value) {
    this._value = value;
    this._element = null;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._value);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
