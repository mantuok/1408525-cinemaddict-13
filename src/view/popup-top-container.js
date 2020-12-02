import {createElement} from "../utils/render.js"

const createPopupTopConainerTemplate = () => {
  return `<div class="film-details__top-container">
  <div class="film-details__close">
    <button class="film-details__close-btn" type="button">close</button>
  </div>
</div>`;
};

export default class PopupTopConainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPopupTopConainerTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate())
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
