import {createElement} from "../utils/render.js";

const createEmptyFilmsListTemplate = () => {
  return `<section class="films-list">
  <h2 class="films-list__title">There are no movies in our database</h2>
</section>`;
};

export default class EmptyFilmsList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createEmptyFilmsListTemplate();
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
