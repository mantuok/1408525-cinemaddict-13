import AbstractView from "./abstract.js";

const createFilmsCountTemplate = (filmCount) => (
  `<section class="footer__statistics">
  <p>${filmCount} movies inside</p>
</section>`
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
