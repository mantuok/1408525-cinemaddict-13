import {createElement} from "../utils/render.js";

const createFilmsListsContainerTemplate = () => {
  return `<section class="films">
  </section>`;
};

export default class FilmsListsContainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsListsContainerTemplate();
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
