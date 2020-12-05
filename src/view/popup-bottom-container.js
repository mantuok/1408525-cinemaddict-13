import {createElement} from "../utils/render.js";

const createPopupBottomConainerTemplate = () => {
  return `<div class="film-details__bottom-container">
</div>`;
};

export default class PopupBottomConainer {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createPopupBottomConainerTemplate();
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
